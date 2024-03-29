export const config = { path: "/auth0" }

const DOMAIN = Deno.env.get('AUTH0_DOMAIN')
const CLIENTID = Deno.env.get('AUTH0_EDGE_CLIENTID')
const CLIENTSECRET = Deno.env.get('AUTH0_EDGE_CLIENTSECRET')

async function getToken() {
  try {
    const response = await fetch(
      `https://${DOMAIN}/oauth/token`,
      {
        method: 'POST',
        cache: 'no-cache',
        cors: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: (new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: `${CLIENTID}`,
          client_secret: `${CLIENTSECRET}`,
          audience: `https://${DOMAIN}/api/v2/`
        })).toString(),
      }
    );
    return await response.json();
  } catch (e) {
    return e;
  }
}

async function getUser(token, user_id) {
  try {
    const response = await fetch(
      `https://${DOMAIN}/api/v2/users/${encodeURI(user_id)}`,
      {
        cache: 'no-cache',
        cors: 'no-cors',
        headers: {
          'authorization': `Bearer ${token}`,
          'content-type': 'application/json'
        },
      }
    );
    return response.json();
  } catch (e) {
    console.log('this is in error')
    return e;
  }
}

export default async (request, context) => {
  // const ip = context.ip
  const user_id = context.cookies.get('user_id')
  // const user_access_token = context.cookies.get('access_token')
  const token = (await getToken()).access_token
  const user = await getUser(token, user_id)
  console.log({
    // ip,
    user_id,
    // user_access_token,
    // token,
    user
  })
  return new Response(JSON.stringify(
    {
      // ip,
      user_id,
      user,
    },
    null,
    2
  ))
}