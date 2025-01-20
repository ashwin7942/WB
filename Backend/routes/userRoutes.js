




// const authenticateToken = require('../middleware/authMiddleware');
// const express = require('express');
// const { registerUser, upload } = require('../controllers/userController');
// const router = express.Router();

// // Register route with multer middleware for profile picture upload
// router.post('/register', upload.single('profilePic'), registerUser);
// router.get('/', authenticateToken, getAllUsers);


// module.exports = router;




// const express = require("express");
// const {
//     registerUser,
//     loginUser,
//     getAllUsers,
//     updateUser,
//     deleteUser,
//     upload,
// } = require("../controllers/userController");
// const authenticateToken = require("../middleware/authMiddleware");

// const router = express.Router();

// // Public routes
// router.post("/register", upload.single("profilePic"), registerUser);
// router.post("/login", loginUser);

// // Protected routes
// router.get("/", authenticateToken, getAllUsers);
// router.put("/:id", authenticateToken, upload.single("profilePic"), updateUser);
// router.delete("/:id", authenticateToken, deleteUser);

// module.exports = router;

//registration part
// const express = require('express');
// const {
//     registerUser,
//     upload,
// } = require('../controllers/userController');
// const authenticateToken = require('../middleware/authMiddleware');

// const router = express.Router();

// router.post('/register', upload.single('profilePic'), registerUser);

// module.exports = router;



const express = require('express');
const { registerUser, getUsers, deleteUser, upload } = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// User Registration Route (with file upload)
router.post('/register', upload.single('profilePic'), registerUser);

// Get All Users (with authentication)
router.get('/', getUsers);



module.exports = router;
