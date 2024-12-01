const auth = (req, res, next) => {


    if (!req.session || !req.session.userId) {
        return res.status(401).json({ error: `Authentication required son` });
    }
    next();
};

module.exports = auth;