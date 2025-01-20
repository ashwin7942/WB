



// const User = require('../models/userModel');
// const bcrypt = require('bcrypt');
// const multer = require('multer');
// const jwt = require('jsonwebtoken');


// const SECRET_KEY = "your_secret_key"; // Replace with a secure key

// const loginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Find the user by email
//         const user = await User.findOne({ email });
//         if (!user) return res.status(400).json({ message: 'Invalid email or password' });

//         // Validate the password
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) return res.status(400).json({ message: 'Invalid email or password' });

//         // Generate a JWT token
//         const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

//         res.json({ message: 'Login successful', token });
//     } catch (error) {
//         console.error('Error in loginUser:', error.message);
//         res.status(500).json({ message: error.message });
//     }
// };


// const loginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         const user = await User.findOne({ email });
//         if (!user) return res.status(400).json({ message: "Invalid email or password" });

//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) return res.status(400).json({ message: "Invalid email or password" });

//         // Generate JWT token
//         const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

//         res.json({ message: "Login successful", token });
//     } catch (error) {
//         console.error("Error in loginUser:", error.message);
//         res.status(500).json({ message: error.message });
//     }
// };


// // Configure multer for file uploads
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}-${file.originalname}`);
//     }
// });

// const upload = multer({ storage });

// // Register user function
// const registerUser = async (req, res) => {
//     try {
//         const { name, email, password, phone, gender, age, qualifications } = req.body;
//         const profilePic = req.file ? req.file.path : '';  // Handling file upload

//         // Check if user already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) return res.status(400).json({ message: 'Email already in use' });

//         // Hash password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create new user
//         const user = new User({
//             name,
//             email,
//             password: hashedPassword,
//             phone,
//             gender,
//             age,
//             qualifications,
//             profilePic,
//         });

//         await user.save();

//         // Send response
//         res.status(201).json({
//             message: "User registered successfully",
//             user: user
//         });
//     } catch (error) {
//         console.error('Error in registerUser:', error.message);
//         res.status(500).json({ message: error.message });
//     }
// };

// module.exports = { registerUser, upload ,loginUser};


////recent one



// const User = require('../models/userModel');
// const bcrypt = require('bcrypt');
// const multer = require('multer');
// const jwt = require('jsonwebtoken');

// const SECRET_KEY = "your_secret_key";

// // Configure multer for file uploads
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}-${file.originalname}`);
//     }
// });
// const upload = multer({ storage });

// // Register user
// const registerUser = async (req, res) => {
//     try {
//         const { name, email, password, phone, gender, age, qualifications } = req.body;
//         const profilePic = req.file ? req.file.path : ''; 

//         const existingUser = await User.findOne({ email });
//         if (existingUser) return res.status(400).json({ message: 'Email already in use' });

//         const hashedPassword = await bcrypt.hash(password, 10);

//         const user = new User({
//             name,
//             email,
//             password: hashedPassword,
//             phone,
//             gender,
//             age,
//             qualifications,
//             profilePic,
//         });

//         await user.save();
//         res.status(201).json({ message: "User registered successfully", user });
//     } catch (error) {
//         console.error('Error in registerUser:', error.message);
//         res.status(500).json({ message: error.message });
//     }
// };

// // Login user
// const loginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         const user = await User.findOne({ email });
//         if (!user) return res.status(400).json({ message: "Invalid email or password" });

//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) return res.status(400).json({ message: "Invalid email or password" });

//         const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });
//         res.json({ message: "Login successful", token });
//     } catch (error) {
//         console.error("Error in loginUser:", error.message);
//         res.status(500).json({ message: error.message });
//     }
// };

// // Get all users
// const getAllUsers = async (req, res) => {
//     try {
//         const users = await User.find({}, '-password'); // Exclude passwords
//         res.status(200).json({ success: true, users });
//     } catch (error) {
//         console.error("Error in getAllUsers:", error.message);
//         res.status(500).json({ message: error.message });
//     }
// };

// // Update user
// const updateUser = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { name, phone, gender, age, qualifications } = req.body;
//         const profilePic = req.file ? req.file.path : undefined;

//         const updateData = { name, phone, gender, age, qualifications };
//         if (profilePic) updateData.profilePic = profilePic;

//         const user = await User.findByIdAndUpdate(id, updateData, { new: true });
//         if (!user) return res.status(404).json({ message: "User not found" });

//         res.status(200).json({ message: "User updated successfully", user });
//     } catch (error) {
//         console.error("Error in updateUser:", error.message);
//         res.status(500).json({ message: error.message });
//     }
// };

// // Delete user
// const deleteUser = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const user = await User.findByIdAndDelete(id);
//         if (!user) return res.status(404).json({ message: "User not found" });

//         res.status(200).json({ message: "User deleted successfully" });
//     } catch (error) {
//         console.error("Error in deleteUser:", error.message);
//         res.status(500).json({ message: error.message });
//     }
// };

// module.exports = { registerUser, loginUser, getAllUsers, updateUser, deleteUser, upload };



const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const multer = require('multer');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

// Multer Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

// Register User
const registerUser = async (req, res) => {
    try {
        const { name, email, password, phone, gender, age, qualifications } = req.body;
        const profilePic = req.file ? req.file.path : '';

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email already in use' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            gender,
            age,
            qualifications,
            profilePic,
        });

        await user.save();
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error('Error in registerUser:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

//updates

// Get All Users
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error in getUsers:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};




// Delete User
const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        await User.findByIdAndDelete(userId);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error in deleteUser:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { registerUser, getUsers, deleteUser, upload };

// module.exports = { registerUser, upload };

