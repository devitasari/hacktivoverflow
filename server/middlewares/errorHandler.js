module.exports = {
  errorHandler(err, req, res, next) {
    console.log(err)
    const status = err.status || 500
    const message = err.message || 'Internal Server Error'

    if (err.name === 'ValidationError') {
      let errors = []

      for (let key in err.errors) {
        errors.push(err.errors[key].message)
      }
      res.status(400).json({ errors })
    } else {
      res.status(status).json({
        errors: [message]
      })
    }
  }
}