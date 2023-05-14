// Copyright © 2016 Jan Keromnes. All rights reserved.
// The following code is covered by the MIT license.

var crypto = require('crypto');

// Use the same hexadecimal digit sizes as GitHub's OAuth2 implementation.
var SIZES = {
  ID: 20,
  SECRET: 40,
  CODE: 20,
  TOKEN: 40
};

// Temporary authorizations for OAuth2 access tokens.
var GRANTS = {};
var GRANT_TIMEOUT_MS = 2 * 60 * 1000;

/**
 * Generate OAuth2 client credentials (ID and secret).
 *
 * @param `callback` A function (error, { id, secret }) { }.
 *
 * @warning While `id` can be public, you should keep `secret` between you and
 *   the client. Only communicate it via secure connections, e.g. HTTPS POST.
 */
exports.generateClientCredentials = function (callback) {
  exports.randomHexString(SIZES.ID + SIZES.SECRET, function (error, client) {
    if (error) {
      callback(error);
      return;
    }
    callback(null, {
      id: client.slice(0, SIZES.ID),
      secret: client.slice(SIZES.ID, SIZES.ID + SIZES.SECRET)
    });
  });
};

/**
 * Generate an OAuth2 authorization code for an access token.
 *
 * @param `id` An OAuth2 client ID.
 * @param `scope` An optional access scope in the format of your choice.
 * @param `state` An unguessable random string. Use '' for no CSRF protection.
 * @param `callback` A function (error, { code }) { }.
 *
 * @warning Before calling this, verify `id` exists, and ask your authenticated
 *   user to authorize the client to access `scope` on their behalf.
 *
 * @warning Send `code` back to the client, but never save it.
 */
exports.generateAuthorizationCode = function (id, scope, state, callback) {
  if (typeof id !== 'string' || id.length < SIZES.ID) {
    callback(new Error('Invalid OAuth2 client ID'));
    return;
  }
  exports.randomHexString(SIZES.CODE, function (error, code) {
    if (error) {
      callback(error);
      return;
    }

    // Temporarily authorize the generation of an OAuth2 access token.
    var grant = {
      scope: scope,
      timer: null
    };
    var grantHash = exports.hash(code + state + id);
    GRANTS[grantHash] = grant;
    grant.timer = setTimeout(function () {
      delete GRANTS[grantHash];
    }, GRANT_TIMEOUT_MS);

    callback(null, {
      code: code
    });
  });
};

/**
 * Generate an OAuth2 access token using an authorization code.
 *
 * @param `id` An OAuth2 client ID.
 * @param `code`  An OAuth2 authorization code.
 * @param `state` The unguessable random string used to generate the code.
 * @param `callback` A function (error, { scope, token, tokenHash }) { }.
 *
 * @warning Before calling this, verify the request contains valid client
 *   credentials (matching ID and secret). If not, you should abort the request.
 *
 * @warning Send `token` back to the client, but never save it.
 */
exports.generateAccessToken = function (id, code, state, callback) {
  var grantHash = exports.hash(code + state + id);
  if (!(grantHash in GRANTS)) {
    callback(new Error('Invalid OAuth2 authorization code'));
    return;
  }
  var scope = GRANTS[grantHash].scope;
  clearTimeout(GRANTS[grantHash].timer);
  delete GRANTS[grantHash];

  exports.randomHexString(SIZES.TOKEN, function (error, token) {
    if (error) {
      callback(error);
      return;
    }
    callback(null, {
      scope: scope,
      token: token,
      tokenHash: exports.hash(token)
    });
  });
};

/**
 * Generate cryptographically strong pseudo-random data in hexadecimal format.
 *
 * @param `length` The number of random hex digits that should be generated.
 * @param `callback` A function (error, string) { }.
 */
exports.randomHexString = function (length, callback) {
  crypto.randomBytes(Math.ceil(Number(length) / 2), function (error, buffer) {
    if (error) {
      callback(error);
      return;
    }
    var string = buffer.toString('hex').slice(0, Number(length));
    callback(null, string);
  });
};

/**
 * Generate a one-way hash of the given data in hexadecimal string format.
 *
 * @param `data` The string to be hashed.
 * @return `hash` The resulting hexadecimal digest.
 */
exports.hash = function (data) {
  return crypto.createHash('sha256').update(String(data)).digest('hex');
};
