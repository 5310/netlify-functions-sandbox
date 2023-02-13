export const config = { path: "/auth0" }

const TENANT = Deno.env.get('TENANT')
const CLIENTID = Deno.env.get('CLIENTID')
const CLIENTSECRET = Deno.env.get('CLIENTSECRET')

async function getToken() {
    const domain = `${TENANT}.us.auth0.com`
    try {
        // Default options are marked with *
        const response = await fetch(
            `https://${domain}/oauth/token`, 
            {
                method: 'POST',
                cache: 'no-cache',
                cors: 'no-cors',
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
    } catch (e) {
        return e;
    }
}

export default async (request, context) => new Response(await JSON.stringify({request, response: getToken()}, null, 2))

curl --request POST \
  --url 'https://dev-n84xs2sw8tzfloyk.us.auth0.com/oauth/token' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data grant_type=client_credentials \
  --data 'client_id=261aDeOPIiMTi1pYcuT8KcmlZF3usU9d' \
  --data 'client_secret=sjMwc6g1fqiSegP1_66gYtuLIJ3VYaZIwFdeJ9pwYeYsekhapkfUrLM8_L0ioAxh' \
  --data 'audience=https://dev-n84xs2sw8tzfloyk.us.auth0.com/api/v2/'