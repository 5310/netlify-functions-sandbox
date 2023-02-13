//export default (request, context) => Math.random() > 0.5 ? undefined : context.rewrite("/locked-preview")

const TENANT = Deno.env.get('TENANT')
const CLIENTID = Deno.env.get('CLIENTID')
const CLIENTSECRET = Deno.env.get('CLIENTSECRET')

async function postData() {
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
    return response.json(); // parses JSON response into native JavaScript objects
}

export const config = { path: "/locked" }
