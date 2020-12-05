const firstMiddleware = (roleList) => {
    return (req, res, next) => {
        const bearerToken = req.headers['authorization'];
        if (!bearerToken) {
            return res.status(403).send({ message: 'Anda tidak dizinkan untuk masuk!'});
        }
    
        const roleFromToken = bearerToken.slice(7);
        if (roleList.indexOf(roleFromToken) === -1) {
            return res.status(401).send({ message: 'Anda tidak memiliki akses!'});
        }
        next();
    };
}

module.exports.firstMiddleware = firstMiddleware;