const throwError = (req, res, next) => {
  const error = new Error('Not Found!')
  error.status = 404
  next(error)
}

const errorHandler = (error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
}

export default [throwError, errorHandler]
