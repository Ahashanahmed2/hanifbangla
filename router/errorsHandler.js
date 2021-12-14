const createErrors = require('http-errors')
function notfound(req, res, next) {
    
    next(createErrors(404,"Please login to view this page."))
}
function errorHandler(err, req, res, next) {
    res.locals.errors = process.env.NODE_ENV == 'development' ? err : { message: err.message }
    if (res.locals.html) {
        res.render('error', {
            title:"ERROR"
        })
    } else {
        res.json(res.locals.errors)
    }
    
}

module.exports = {
    errorHandler,
    notfound
}