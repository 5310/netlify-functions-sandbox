exports.handler = async function (event, context) {
  return {
    statusCode: 302,
    headers: {
      'Location': 'https://dev-n84xs2sw8tzfloyk.us.auth0.com/authorize?response_type=id_token&response_mode=form_post&client_id=261aDeOPIiMTi1pYcuT8KcmlZF3usU9d&redirect_uri=https://sage-conkies-0fe563.netlify.app&nonce=123456789',
    },
  }
}