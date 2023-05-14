# oauth2provider

Simple, lightweight OAuth2 provider library for Node.js.

## Our Promise

- Simple: Code is easy to read, understand, test and audit.
- Lightweight: No dependencies, code is as short as possible.
- Vanilla: No framework/middleware stuff here. We're straight to the point.
- Self-service: You get to store/authenticate/revoke credentials as you like.

## Getting Started

Installation:

```sh
npm install oauth2provider
```

Usage:

```js
var oauth2provider = require('oauth2provider');
```

Generating OAuth2 client credentials (ID and secret):

```js
var clientId = null;
var clientSecret = null;

oauth2provider.generateClientCredentials(function (error, data) {
  clientId = data.id; // This can be public.
  clientSecret = data.secret; // Keep this safe between you and the client.
});
```

Generating an OAuth2 authorization code:

```js
var clientId = '1234'; // Provided by the client (e.g. via HTTPS query parameter).
var scope = 'a scope'; // An optional access scope in the format of your choice.
var state = 'a state'; // An unguessable random string. Use '' for no CSRF protection.

// TODO: First verify `clientId` exists and ask your authenticated user to authorize `scope`.
oauth2provider.generateAuthorizationCode(clientId, scope, state, function (error, data) {
  data.code; // Send this to the client. Never save this!
});
```

Generating an OAuth2 access token:

```js
var clientId = '1234'; // Provided by the client (e.g. via HTTPS POST data).
var clientSecret = '1234'; // This too. Always use encrypted connections!
var code = '1234'; // This too.
var state = 'a state'; // The same string used to get the code.
var tokens = {}; // A collection of your choice, mapping token *hashes* to access scopes.

// TODO: First verify `clientId` and `clientSecret` exist and match!
oauth2provider.generateAccessToken(clientId, code, state, function (error, data) {
  data.scope; // The access scope provided to get the code.
  data.token; // Send this to the client. Never save this!
  data.tokenHash; // Save this hash for future authentication, e.g. like this:
  tokens[data.tokenHash] = data.scope;
});
```

Authenticating an OAuth2 access request:

```js
var token = '1234'; // Provided by the client (e.g. via HTTPS Authorization header).
var tokenHash = oauth2provider.hash(token); // Always use hashed tokens for authentication.

if (tokenHash in tokens) {
  var scope = tokens[tokenHash];
  // Successfully authenticated!
} else {
  // Invalid token, abort!
  return;
}
```

## TODO

- [x] Generate OAuth2 client ID + secret
- [x] Generate OAuth2 authorization code
- [x] Generate OAuth2 access token from an OAuth2 authorization code
- [ ] Document implementation details using [this form](https://aaronparecki.com/2015/01/15/8/so-you-implemented-an-oauth2-api)
- [ ] Add tests

## LICENSE

[MIT](https://github.com/jankeromnes/oauth2provider/blob/master/LICENSE)
