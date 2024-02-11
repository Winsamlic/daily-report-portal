const { register, login, registerAdmin, sendMailToAdmin } = require("../controllers/auth.controller");

const router = require(`express`).Router();

router.post(`/register`, register);
router.post(`/to-admin`, sendMailToAdmin);
router.post(`/login`, login);

module.exports = router;