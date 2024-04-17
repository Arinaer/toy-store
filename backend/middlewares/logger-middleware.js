export function loggerMiddleware(err, req, res, next) {
    console.log(req.method, req.url);
    next();
}