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
        return response.json();
    } catch (e) {
        return e;
    }
}

export default async (request, context) => 
    new Response(JSON.stringify(
        {
            op: context.geo.ip,
            user_id: context.cookies.get('user_id'),
            token: await getToken()
        }, 
        null, 
        2
    ))