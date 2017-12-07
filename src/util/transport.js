import LokkaTransport from 'lokka/transport'

// 默认 HTTP 错误处理
function handleHttpErrors(response) {
  console.log(response)
  throw new Error(`Invalid status code: ${response.status}`)
}

// 默认 GraphQL 错误处理
function handleGraphQLErrors(errors, data) {
  const { message } = errors[0]
  const error = new Error(`GraphQL Error: ${message}`)
  error.rawError = errors
  error.rawData = data
  throw error
}

export class Transport extends LokkaTransport {
  constructor(endpoint, options = {}) {
    if (!endpoint)
      throw new Error('endpoint is required!')

    super()

    this._httpOptions = {
      auth: options.auth,
      headers: options.headers || {},
      credentials: options.credentials
    }

    this.endpoint = APP_CONFIG[options.group || 'default'].apiDomain + endpoint
    this.handleHttpErrors = options.handleHttpErrors || handleHttpErrors
    this.handleGraphQLErrors = options.handleGraphQLErrors || handleGraphQLErrors
    this.handleSuccess = options.handleSuccess || function() {}
  }

  _buildOptions(payload) {
    // 默认设置
    const options = {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),

      // CORS
      credentials: 'include',
    }

    if (this._httpOptions.credentials === false)
      delete options.credentials

    Object.assign(options.headers, this._httpOptions.headers)

    return options
  }

  send(query, variables, operationName) {
    const payload = { query, variables, operationName }
    const options = this._buildOptions(payload)

    return fetch(this.endpoint, options).then(response => {
      // HTTP 错误处理
      if (response.status !== 200)
        this.handleHttpErrors(response)

      return response.json()
    }).then(({ data, errors }) => {
      // GraphQL 错误处理
      if (errors) {
        this.handleGraphQLErrors(errors, data)
        return null
      } else { this.handleSuccess(data) }

      return data
    })
  }
}
