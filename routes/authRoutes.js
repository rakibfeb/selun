const router = require("express").Router();
const { register } = require("../controllers/customerControllers");
const { salonRegister } = require("../controllers/salonControllers");
const { login } = require("../controllers/authControllers");

router.post("/register", register);
router.post("/register/salon", salonRegister);
router.post("/login", login);

module.exports = router;