const DOMAIN = process.env.AUTH0_DOMAIN
const CLIENTID = process.env.AUTH0_CLIENTID
const URL = process.env.URL

exports.handler = async function (event, context) {
  const id_token = (new URLSearchParams(event.body)).get('id_token') ?? ''

  return {
    statusCode: 302,
    headers: {
      'Set-Cookie': `id_token=${id_token}`,
      'Location': url.href,
    },
  }
}