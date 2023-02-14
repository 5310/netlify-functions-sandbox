const SITEURL = process.env.URL
const DOMAIN = process.env.AUTH0_DOMAIN
const CLIENTID = process.env.AUTH0_WEB_CLIENTID

exports.handler = async function (event, context) {
  const url = new URL(`https://${DOMAIN}/v2/logout`)
  url.search = new URLSearchParams({
    client_id: CLIENTID,
    returnTo: `${SITEURL}`,
  })
  return {
    statusCode: 302,
    headers: {
      'Location': url.href,
    },
  }
}