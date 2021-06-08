const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
// const { hash } = require("bcryptjs");
const db = require("./db/db");
const { hash, compare } = require("../utils/bc");
const cryptoRandomString = require("crypto-random-string");
const { sendEmail } = require("./ses");

// const requireLoggedInUser = require("../../server/middleware");
const COOKIE_SECRET =
    process.env.COOKIE_SECRET || require("../secrets.json").COOKIE_SECRET;
app.use(compression());
app.use(express.json());

app.use(
    cookieSession({
        secret: COOKIE_SECRET,
        maxAge: 1000 * 60 * 60 * 24 * 14,
        sameSite: "strict",
    })
);

app.use(csurf());

app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.post("/register", (req, res) => {
    console.log("register req body", req.body);
    const { firstname, lastname, email, password } = req.body;
    // console.log(firstname);
    if (!firstname || !lastname || !email || !password) {
        return res.json({
            success: false,
        });
    } else {
        hash(password)
            .then((hashedPw) => {
                return db.registerUser(firstname, lastname, email, hashedPw);
            })
            .then(({ rows }) => {
                console.log({ rows });
                req.session.userId = rows[0].id;
                return res.json({
                    success: true,
                });
            })
            .catch((e) => console.log("error in registration", e));
    }
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({
            errorMsg: "Please fill out all the fields",
            success: false,
        });
    } else {
        let userId;
        return db.isUser(email).then(({ rows }) => {
            if (!rows[0]) {
                return res.json({
                    success: false,
                    errorMsg: "Can you check your credentials once again? :(",
                });
            }
            userId = rows[0].id;
            compare(password, rows[0].password).then((auth) => {
                req.session.userId = userId;
                return res.json({
                    success: true,
                });
            });
        });
    }
});

app.post("/reset-password", (req, res) => {
    const email = req.body.email;
    if (!email) {
        return res.json({
            errorMsg: "Please enter your email",
            success: false,
        });
    } else {
        return db
            .isUser(email)
            .then(({ rows }) => {
                if (!rows[0]) {
                    return res.json({
                        success: false,
                        errorMsg:
                            "Can you check your credentials once again? :(",
                    });
                } else {
                    const secretCode = cryptoRandomString({
                        length: 6,
                    });
                    console.log("secretCode: ", secretCode);
                    db.resetCode(email, secretCode).then(({ rows }) => {
                        sendEmail(
                            email,
                            secretCode,
                            "Code for resetting your email"
                        )
                            .then((result) => {
                                return res.json({
                                    success: true,
                                });
                            })
                            .catch((e) => console.log("error in sendEmail", e));
                    });
                }
            })
            .catch((e) => console.log("error in db.isUser"));
    }
});

app.post("/reset-password-verify", (req, res) => {
    console.log("req.body in password reset", req.body);
    const { email, code, newpass } = req.body;
    db.getResetCode(email, code)
        .then(({ rows }) => {
            console.log("rows in reset-password-verify", rows);
            if (!rows.length) {
                return res.json({
                    success: false,
                    errorMsg: "Sorry, something went wrong, please try again",
                });
            } else {
                return res.json({
                    success: true,
                });
            }
        })
        .then(() => db.updatePassword(email, newpass))
        .catch((e) => console.log("error in reset-password-verify", e));
});

app.get("/user/id.json", function (req, res) {
    res.json({
        userId: req.session.userId,
    });
});

////////////////////////////////////
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
