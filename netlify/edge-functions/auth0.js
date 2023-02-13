export const config = { path: "/auth0" }

const DOMAIN = Deno.env.get('AUTH0_DOMAIN')
const CLIENTID = Deno.env.get('AUTH0_CLIENTID')
const CLIENTSECRET = Deno.env.get('AUTH0_CLIENTSECRET')

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
        return response.json().access_token;
    } catch (e) {
        return e;
    }
}

async function getUser(token, user_id) {
    try {
        console.log(token.slice(0, 10), `https://${DOMAIN}/api/v2/users`)
        const response = await fetch(
            `https://${DOMAIN}/api/v2/users`, 
            {
                method: 'POST',
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
        return e;
    }
}

export default async (request, context) => {
    const ip = context.ip
    const user_id = context.cookies.get('user_id')
    const token = (await getToken())
    const user = await getUser(token, user_id)
    return new Response(JSON.stringify(
        {
            ip,
            user_id,
            user,
        }, 
        null, 
        2
    ))
}