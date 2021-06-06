module.exports.requireLoggedInUser = (req, res, next) => {
    if (
        !req.session.userId &&
        req.url != "/login" &&
        req.url != "/registration"
    ) {
        res.redirect("/registration");
    } else {
        next();
    }
};
