
let langService

if (process.env.CLIENT === 'true') {
  langService = require('../../../source/js/services/language')
}

/**
 * @typedef ApiOptions
 * @property {string} method HTTP Method. Can be PUT, DELETE, POST, GET
 * @property {string} baseURL Base Url
 * @property {string} url Path
 * @property {Object} [payload] Payload object. Send as body in POST and as query in GET requests
 * @property {Object} [headers] HTTP Headers
 * @property {string} [token] User authentication token
 * @property {number} [ttl] Time in milliseconds to cache a request
 * @property {string} [lang] Preferred language
 */

/**
 *
 * @param {ApiOptions} options
 */
const Api = (options) => {
  const {
    method, baseURL, url, payload = {}, headers = {}, ttl = 0, lang = 'en'
  } = options
  let { token } = options
  if (process.env.CLIENT !== 'true') {
    if (!ttl) {
      /* eslint global-require: 0 */
      return require('request-promise-native')({
        body: method === 'GET' ? undefined : payload,
        headers: {
          'x-gtsf-content-language': lang,
          ...(token ? { Authorization: `Token token="${token}"` } : {}),
          ...headers
        },
        json: true,
        method,
        qs: method === 'GET' ? payload : undefined,
        uri: baseURL + url
      })
    }
    /* eslint global-require: 0 */
    return require('request-promise-cache')({
      body: method === 'GET' ? undefined : payload,
      cacheKey: `${baseURL + url}.${lang}`,
      cacheTTL: ttl,
      headers: {
        'x-gtsf-content-language': lang,
        ...(token ? { Authorization: `Token token="${token}"` } : {}),
        ...headers
      },
      json: true,
      method,
      qs: method === 'GET' ? payload : undefined,
      uri: baseURL + url
    })
      .then((resp) => {
        if (!resp.err) {
          return resp.body
        }
        console.log('[REQUEST ERROR]: ', resp.error)
        return resp
      })
  }
  if (process.env.CLIENT === 'true') {
    const cookie = /token=s%3A([^.]+)/.exec(document.cookie)

    if (cookie) {
      token = cookie[1]
    }

    /* eslint global-require: 0 */
    return require('axios')({
      baseURL,
      data: method === 'GET' ? undefined : payload,
      headers: {
        ...(token ? { Authorization: `Token token="${token}"` } : {}),
        'x-gtsf-content-language': langService.getCurrentLanguage(),
        ...headers
      },
      method,
      params: method === 'GET' ? payload : undefined,
      url
    })
      .then((resp) => {
        if (resp.status === 200 || resp.status === 201 || resp.status === 204) {
          return resp.data
        }
        return resp
      })
  }
}

module.exports = Api
