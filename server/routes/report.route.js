const router = require("express").Router()
const { getAllReports } = require("../controllers/report.controller")
const { requireSign } = require("../middleware/index")


router.get("/", requireSign, getAllReports)


module.exports = router