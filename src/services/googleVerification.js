import { OAuth2Client } from 'google-auth-library';

const CLIENT_ID = '301956188397-rtuq8kgubluo5ismq4g9pq4cn9bag7ul.apps.googleusercontent.com';

const client = new OAuth2Client(CLIENT_ID);

// from https://developers.google.com/identity/sign-in/web/backend-auth
// eslint-disable-next-line import/prefer-default-export
export async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    // [CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  return payload;
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
}
