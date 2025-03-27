const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadsMiddleware');
const { registerUser, loginUser } = require('../controllers/userController');

// User Routes
// Configure Multer to accept two fields: "photo" and "signature"
router.post(
    "/register",
    upload.fields([
      { name: "photo", maxCount: 1 },
      { name: "signature", maxCount: 1 },
    ]),
    registerUser
  );
router.post('/login', loginUser);

module.exports = router;

