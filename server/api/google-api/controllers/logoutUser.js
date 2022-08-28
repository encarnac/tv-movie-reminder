const logoutUser = async (req, res, next) => {
    try {
        req.session.destroy();
        res.send()
    } catch(error) {
        next(error)
    }
}

module.exports = logoutUser;