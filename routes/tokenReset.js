const express = require("express");
const router = express.Router();

const {
  requestPasswordReset,
  resetPassword,
} = require("../controllers/tokenResetContoller");

router.route("/requestPasswordReset").post(requestPasswordReset);
router.route("/resetPassword").post(resetPassword);

module.exports = router;
