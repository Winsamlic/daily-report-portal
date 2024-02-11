const { register, login, sendMailToAdmin } = require("../controllers/auth.controller");
const { requireSign } = require("../middleware");
const router = require(`express`).Router();

router.post(`/register`, register);
router.post(`/to-admin`, requireSign, sendMailToAdmin);
router.post(`/login`, login);

module.exports = router;