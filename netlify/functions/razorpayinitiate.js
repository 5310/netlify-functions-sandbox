const cookie = require('cookie')
const Razorpay = require('razorpay')

const SITEURL = process.env.URL

const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN
const AUTH0_CLIENTID = process.env.AUTH0_CLIENTID
const AUTH0_WEB_CLIENTID = process.env.AUTH0_WEB_CLIENTID

const RAZORPAY_ID = process.env.RAZORPAY_ID
const RAZORUPAY_SECRET = process.env.RAZORPAY_SECRET
const razorpay = new Razorpay({ key_id: RAZORPAY_ID, key_secret: RAZORUPAY_SECRET })

/* 
 * 0. send note purchase request with note ID as a search parameter
 * 1. force login so that the httonly user_id is set
 * 2. fetch the user profile check that user doesn't already have access to this note
 * 3. generate a Razorpay Payment Link with the user_id and note ID in the notes section and redirect to it
 */

exports.handler = async function (event, context) {
    console.log(JSON.stringify({keys: Object.keys(event), event, cookie: event.cookie ?? 'not found'}, null, 2))

    const note_id = event.queryStringParameters.note_id
    const user_id = cookie.parse(event.headers.cookie).user_id

    console.log({note_id, user_id})

    if (!note_id || !user_id) return {
        statusCode: 400,
    }

    const url = new URL(SITEURL)

    const short_url = cookie.parse(event.headers.cookie).razorpay_link
    if (short_url) {
      return {
        statusCode: 302,
        headers: {
          'Location': short_url,
        },
      }
    }
    else {
      try {
        const expire_by = new Date(Date.now() + 30*60*1000 )
        const pl = await razorpay.paymentLink.create({
            amount: 4200,
            currency: 'INR',
            description: 'Unlock a note',
            expire_by: expire_by.getTime(),
            reminder_enable: true,
            // reference_id: `note/${note_id}:${user_id}`, // too long
            // reference_id: `${user_id}`, // not like we get to reuse an existing one
            notes: {
                user_id,
                note_id,
            },
            callback_url: `${SITEURL}/locked`,
            callback_method: 'get'
        })
    
        console.log(pl)
    
        return {
          statusCode: 302,
          headers: {
            'Set-Cookie': `razorpay_link=${pl.short_url}; Path=/auth0; Secure; HttpOnly; Expires=${expire_by.toUTCString()}`, // this path should be the actual notes page, but we don't have one right now
            'Location': pl.short_url,
          },
        }
      } catch (error) {
        console.log(error)
      }
    }
    
    return {statusCode: 501}
  }