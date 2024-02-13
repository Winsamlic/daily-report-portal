const { register, login, sendMailToAdmin, confirmAdmin, logout } = require("../controllers/auth.controller");
const { requireSign } = require("../middleware");
const router = require(`express`).Router();

router.post(`/register`, register);
router.post(`/to-admin`, requireSign, sendMailToAdmin);
router.post(`/login`, login);
router.get(`/confirm-page/:token`, (req, res) => {
    try {
        res.redirect(`http://localhost:3000/#/confirm-admin?token=${req.params.token}`);
    } catch (error) {
        console.log(error);
    }

});

router.post(`/confirm-admin`, confirmAdmin);
router.get(`/logout`, logout)

module.exports = router;