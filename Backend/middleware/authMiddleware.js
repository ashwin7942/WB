// const jwt = require('jsonwebtoken');
// const SECRET_KEY = "your_secret_key";

// const authenticateToken = (req, res, next) => {
//     const token = req.headers['authorization']?.split(' ')[1]; // Bearer token

//     if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

//     try {
//         const verified = jwt.verify(token, SECRET_KEY);
//         req.user = verified; // Add user data to request
//         next();
//     } catch (error) {
//         res.status(403).json({ message: 'Invalid token' });
//     }
// };

// module.exports = authenticateToken;


const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_secret_key";

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

    try {
        const verified = jwt.verify(token, SECRET_KEY);
        req.user = verified;
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid token" });
    }
};

module.exports = authenticateToken;

