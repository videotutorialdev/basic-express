const secondMiddleware = (req, res, next) => {
    const payload = req.body;
    if (payload.name.toLocaleLowerCase().includes('admin')) {
        return res.status(400).send({ message: 'Anda tidak boleh membuat user dengan nama Admin'});
    }

    next();
};

module.exports.secondMiddleware = secondMiddleware;