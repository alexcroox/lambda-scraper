// HTTP response templates
const responses = {
  success: (response, data = {}, code = 200) => {
    response.status(code).json(data)
  },
  error: (response, error, errorCode = 500) => {
    response.status(errorCode).json({ error })
  }
}

module.exports = responses
