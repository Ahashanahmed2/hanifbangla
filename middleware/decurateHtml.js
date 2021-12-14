function decurateHtml(title) {
    return function (req, res, next) {
        res.locals.html = true;
        res.locals.title = title;
        res.locals.error = {};
        res.locals.ipId = {};
        
       
            next()
    }

    
}

module.exports = decurateHtml;