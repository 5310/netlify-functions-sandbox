const cookie = require('cookie')
const Razorpay = require('razorpay')

const SITEURL = process.env.URL

const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN
const AUTH0_CLIENTID = process.env.AUTH0_CLIENTID
const AUTH0_WEB_CLIENTID = process.env.AUTH0_WEB_CLIENTID

const RAZORPAY_ID = process.env.RAZORPAY_ID
const RAZORUPAY_SECRET = process.env.RAZORPAY_SECRET
const razorpay = new Razorpay({ key_id: RAZORPAY_ID, key_secret: RAZORUPAY_SECRET })


exports.handler = async function (event, context) {
    const params = new URLSearchParams(event.body)
    console.log(JSON.stringify({params}, null, 2))
    const notes = params.payload.order.entity.notes
    return {
        statusCode: 200,
        body: JSON.stringify(params, null, 2),
    }
}