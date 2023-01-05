const express = require("express");
const v1 = require("./v1");

const router = express.Router();
const getHealth = (req, res) => {
    return res.status(200).json({ error: false });
}


router.get("/", getHealth);

router.use("/v1", v1);

module.exports = router;