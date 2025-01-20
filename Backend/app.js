
// const express = require('express');
// const bodyParser = require('body-parser');
// const path = require('path');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const userRoutes = require('./routes/userRoutes'); // Import user routes
// const connectDB = require('./config/db'); // Import DB connection

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Connect to the database
// connectDB();

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Routes
// app.use('/api/users', userRoutes); // All user-related routes handled here

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });


const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes'); // Correct import

const app = express();
const ejs = require('ejs');



dotenv.config();

const PORT = process.env.PORT || 5000;

// Database Connection
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));



// Route to load index.ejs
app.get('/', (req, res) => {
    res.render('index'); // No need for .ejs
});
// Routes
app.use('/api/users', userRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
