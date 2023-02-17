const SITEURL = process.env.URL

const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN
const AUTH0_CLIENTID = process.env.AUTH0_CLIENTID
const AUTH0_WEB_CLIENTID = process.env.AUTH0_WEB_CLIENTID

const RAZORPAY_ID = process.env.RAZORPAY_ID
const RAZORUPAY_SECRET = process.env.RAZORPAY_SECRET
const Razorpay = require('razorpay')
const razorpay = new Razorpay({ key_id: RAZORPAY_ID, key_secret: RAZORUPAY_SECRET })

/* 
 * 0. send note purchase request with note ID as a search parameter
 * 1. force login so that the httonly user_id is set
 * 2. fetch the user profile check that user doesn't already have access to this note
 * 3. generate a Razorpay Payment Link with the user_id and note ID in the notes section and redirect to it
 */

exports.handler = async function (event, context) {
    console.log(JSON.stringify({payload: event.payload, site: event.site}, null, 2))
    const note_id = event.queryStringParameters.note_id
    const user_id = event.multiValueHeaders.Cookie[0].match(/user_id=(.+)$/)[1]

    if (!note_id || !user_id) return {
        statusCode: 400,
    }

    const url = new URL(SITEURL)

    const pl = await razorpay.paymentLink.create({
        amount: 4200,
        currency: 'INR',
        description: 'Unlock a note',
        notify: {
            email: true
        },
        reminder_enable: true,
        notes: {
            user_id,
            note_id,
        },
        callback_url: SITEURL,
        callback_method: 'get'
    })

    console.log(pl)

    return {
      statusCode: 302,
      headers: {
        'Location': pl.short_url,
      },
    }

    return {statusCode: 200}
  }