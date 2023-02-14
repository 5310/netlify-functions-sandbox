const DOMAIN = process.env.AUTH0_DOMAIN
const CLIENTID = process.env.AUTH0_CLIENTID
const URL = process.env.URL

exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify(event, null, 2),
  }
}