const DOMAIN = process.env.AUTH0_DOMAIN
const CLIENTID = process.env.AUTH0_CLIENTID
const SITEURL = process.env.URL

const parseJWT = (token) => {
  var base64Url = token.split('.')[1]
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''))
  return JSON.parse(jsonPayload);
}

exports.handler = async function (event, context) {
  const params = new URLSearchParams(event.body)
  console.log(params)
  const id_token = params.get('id_token') ?? ''
  // const access_token = params.get('access_token') ?? ''
  const url = new URL(SITEURL)
  url.search = new URLSearchParams({
    id_token,
    // access_token,
  })
  const user_profile = parseJWT(id_token)
  return {
    // statusCode: 302,
    // headers: {
    //   'Set-Cookie': `id_token=${id_token}; Secure`, // won't be visible on the frontend anyway, won't show up at all
    //   'Location': SITEURL,
    // },
    // statusCode: 200,
    // headers: {
    //   'Set-Cookie': `id_token=${id_token}; Secure`, // won't be visible to frontend anyway, still won't show up
    // },
    // body: `
    //   <!DOCTYPE html>
    //   <html>
    //   <head><meta http-equiv="refresh" content="0; url='${SITEURL}'"></head>
    //   <body>${id_token}</body>
    //   </html>
    // `
    statusCode: 200,
    headers: {
      'Set-Cookie': `user_id=${user_profile.sub}; Secure; HttpOnly`,
      'Location': url.href,
    },
  }
}