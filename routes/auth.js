const router = require("express").Router();
const User = require('../models/User')
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken')

// Register
router.post('/register', async (req, res) => {
    const newUser = new User({
        userName: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
    })

    try {
        const user = await newUser.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json(err)
        console.log("The Error:", err);
    }
})

// Login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(404).json("Wrong password or username not found!")
        }

        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

        if (originalPassword !== req.body.password) {
            return res.status(401).json("Wrong password or username not found!")
        }

        const accessToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.SECRET_KEY, { expiresIn: "5d" })

        const { password, ...info } = user._doc

        res.status(200).json({ ...info, accessToken })
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post('/isuser', async (req, res) => {

    const authHeader = req.headers.token
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) {
                res.status(403).json('Token is not valid!');
                console.log(err);
            }
            else {
                res.status(200).json(user)
            }
        })
    } else {
        res.status(401).json("You are not authenticated!")
    }
})

module.exports = router;