const express = require("express");
const csrf = require("csurf");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();
const port = 3001;
const authRoutes = require("./routes/auth.route");
const reportRoutes = require("./routes/report.route")
const api = process.env.API_URL;

// CSRF protection middleware


// Apply middleware
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Apply CSRF protection middleware to specific routes
app.use(csrf({ cookie: true }));


app.use(`${api}/users`, authRoutes);
app.use(`${api}/reports`, reportRoutes)



app.get(`${api}/csrf-token`, (req, res) => {
    try {
        res.json({ csrfToken: req.csrfToken() });
    } catch (error) {
        console.log(error);
    }
    // Generate CSRF token and send it as JSON response
});

// Rest of your server code goes here

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
