export const config = { path: "/auth0" }

const TENANT = Deno.env.get('TENANT')
const CLIENTID = Deno.env.get('CLIENTID')
const CLIENTSECRET = Deno.env.get('CLIENTSECRET')

async function getToken() {
    const domain = `${TENANT}.us.auth0.com`
    // Default options are marked with *
    const response = await fetch(
        `https://${domain}/oauth/token`, 
        {
            method: 'POST',
            cache: 'no-cache',
            headers: {
            // 'Content-Type': 'application/json'
            'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(new URLSearchParams({
                grant_type: 'client_credentials',
                client_id: `${CLIENTID}`,
                client_secret: `${CLIENTSECRET}`,
                audience: `https://${domain}/api/v2/`
            })),
        }
    );
    return response; // parses JSON response into native JavaScript objects
}

export default async (request, context) => new Response(await JSON.stringify(getToken()))