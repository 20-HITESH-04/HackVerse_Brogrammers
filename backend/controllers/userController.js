const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// Register User Controller
exports.registerUser = async (req, res) => {
    try {
      const { fullName, email, password } = req.body;
  
      // Use safe checks in case req.files is undefined
      const photoPath =
        req.files && req.files.photo
          ? `uploads/${req.files.photo[0].filename}`
          : null;
      const signaturePath =
        req.files && req.files.signature
          ? `uploads/${req.files.signature[0].filename}`
          : null;
  
      // Create the user with file paths
      const user = await User.create({
        fullName,
        email,
        password,
        photo: photoPath,
        signature: signaturePath,
      });
  
      res
        .status(201)
        .json({ message: "User created successfully", user });
    } catch (error) {
      console.error("Error in registerUser:", error);
      res.status(500).json({ message: error.message });
    }
  };

// module.exports = { registerUser };



// @desc    Authenticate user
// @route   POST /api/auth/login
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });

        // Check user and password
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};