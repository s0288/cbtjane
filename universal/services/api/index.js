/**
 * @typedef ApiOptions
 * @property {string} method HTTP Method. Can be PUT, DELETE, POST, GET
 * @property {string} baseURL Base Url
 * @property {string} url Path
 * @property {Object} [payload] Payload object. Send as body in POST and as query in GET requests
 * @property {Object} [headers] HTTP Headers
 * @property {number} [ttl] Time in milliseconds to cache a request
 */

/**
 *
 * @param {ApiOptions} options
 */
const Api = (options) => {
  const {
    method, baseURL, url, payload = {}, headers = {}, ttl = 0
  } = options
  if (process.env.CLIENT !== 'true') {
    if (!ttl) {
      /* eslint global-require: 0 */
      return require('request-promise-native')({
        body: method === 'GET' ? undefined : payload,
        headers,
        json: true,
        method,
        qs: method === 'GET' ? payload : undefined,
        uri: baseURL + url
      })
    }
    /* eslint global-require: 0 */
    return require('request-promise-cache')({
      body: method === 'GET' ? undefined : payload,
      cacheKey: `${baseURL + url}`,
      cacheTTL: ttl,
      headers,
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
    /* eslint global-require: 0 */
    return require('axios')({
      baseURL,
      data: method === 'GET' ? undefined : payload,
      headers,
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
