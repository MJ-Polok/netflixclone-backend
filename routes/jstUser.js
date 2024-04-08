const router = require("express").Router();
const JstUser = require('../models/JstUser')

// JstUser
router.post('/', async (req, res) => {

    const newJstUser = new JstUser({
        jstUserName: req.body.userName,
    })

    try {
        const jstuser = await JstUser.findOne({ jstUserName: req.body.userName })
        console.log(jstuser);
        if (!jstuser) {
            const jstUser = await newJstUser.save();
            res.status(201).json(jstUser);
        } else if (jstuser) {
            res.status(403).json("This user name is taken. Choose another name");
        }
    } catch (err) {
        res.status(500).json(err)
        console.log("The Error:", err);
    }
})

module.exports = router;