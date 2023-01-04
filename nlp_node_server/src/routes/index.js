var express = require('express');
var router = express.Router();
const v1 = require("./v1");

const getHealth = (req, res) => {
  return res.status(200).json({ error: false });
}

/* check health for load balancing */
router.get("/", getHealth);

router.use("/v1", v1);

module.exports = router;
