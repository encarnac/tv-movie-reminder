const logoutUser = async (req, res, next) => {
    try {
        console.log('SESSION = ', req.session.userId);
        req.session.destroy();
        res.send();
    } catch(error) {
        next(error);
    }
};

module.exports = logoutUser;