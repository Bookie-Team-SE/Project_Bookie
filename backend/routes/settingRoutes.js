const router = require("express").Router();
const c = require("../controllers/settingController");
const auth = require("../middleware/authMiddleware");

router.get("/", auth, c.get);
router.put("/", auth, c.update);

module.exports = router;