const DOMAIN = process.env.AUTH0_DOMAIN
const CLIENTID = process.env.AUTH0_CLIENTID
const URL = process.env.URL

exports.handler = async function (event, context) {
  const url = new URL(`https://${DOMAIN}/authorize`)
  url.search = new URLSearchParams({
    client_id: CLIENTID,
    none: '123456789',
    redirect_uri: `https://${URL}/.netlify/functions/auth0callback`,
    response_type: 'id_token',
    response_mode: 'form_post',
  })
  return {
    statusCode: 302,
    headers: {
      'Location': url.href,
    },
  }
}