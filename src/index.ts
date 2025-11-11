import axios from 'axios'
import { isWebLikeEnv } from './env'
import { taroAdapter, xhrAdapter } from './adapters'
// @ts-ignore
import utils from 'axios/lib/utils'
// @ts-ignore
import normalizeHeaderName from 'axios/lib/helpers/normalizeHeaderName'

function setContentTypeIfUnset(headers: any, value: string) {
  if (
    !utils.isUndefined(headers)
    && utils.isUndefined(headers['Content-Type'])
  ) {
    headers['Content-Type'] = value
  }
}

axios.defaults.adapter = isWebLikeEnv ? xhrAdapter : taroAdapter
axios.defaults.transformRequest = isWebLikeEnv
  ? axios.defaults.transformRequest
  : [
    function transformRequest(data, headers) {
      normalizeHeaderName(headers, 'Accept')
      normalizeHeaderName(headers, 'Content-Type')
      if (
        utils.isFormData(data)
          || utils.isArrayBuffer(data)
          || utils.isBuffer(data)
          || utils.isStream(data)
          || utils.isFile(data)
          || utils.isBlob(data)
          // 放行 PostData
          || (data !== null
            && typeof data === 'object'
            && data.toString() === '[object PostData]')
      ) {
        return data
      }
      if (utils.isArrayBufferView(data)) {
        return data.buffer
      }
      if (utils.isURLSearchParams(data)) {
        setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded')
        return data.toString()
      }
      if (utils.isObject(data)) {
        setContentTypeIfUnset(headers, 'application/json')
        return data
      }
      return data
    },
  ]
export * from 'axios'

export * from './helpers'

export { axios }

export default axios
