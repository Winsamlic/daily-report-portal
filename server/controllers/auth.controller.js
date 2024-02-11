const connection = require("../db/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { generateRandomNumberString, sendConfirmationEmail, sendEmailToAdmin } = require("../utils");

exports.login = async (req, res) => {

    try {
        const { email, password } = req.body;
        // Query the user from the database based on username or email
        const sql = `SELECT * FROM users WHERE email = ?`;
        const values = [email];

        // Execute the query
        connection.query(sql, values, async (error, results, fields) => {
            if (error) {
                console.error("Error fetching user:", error);
                return res.status(500).json({ ok: false });
            }

            // Check if user exists
            if (results.length === 0) {
                return res.status(400).json({ message: "User not found", ok: false });
            }

            // Retrieve the user's hashed password from the database
            const user = results[0];
            // console.log(user);
            const hashedPassword = user.password;

            // Compare the provided password with the hashed password
            const passwordMatch = await bcrypt.compare(password, hashedPassword);
            if (!passwordMatch) {
                return res.status(401).json({ message: "Invalid password", ok: false });
            }

            // Password is correct, generate JWT token
            const token = jwt.sign({ id: user.user_id, username: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: "40d" });
            res.cookie("token", token, {
                httpOnly: true,
                // sameSite: "none",
                // secure: true, // only works on https
            });
            // Return the JWT token along with user data
            res.status(200).json({ user: { id: user.user_id, username: user.name, email: user.email }, token, ok: true });
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ ok: false });
    }
};

exports.register = async (req, res) => {

    try {
        //    return console.log(req.body);
        const { username, email, password } = req.body;
        // Generate confirmation code
        const confirmationCode = generateRandomNumberString(6) // Generate a random 6-character alphanumeric code

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds

        // SQL query to insert the user into the database
        const sql = `INSERT INTO users (name, email, password, confirmation_code) VALUES (?, ?, ?, ?)`;
        const values = [username, email, hashedPassword, confirmationCode];

        // Execute the query
        connection.query(sql, values, async (error, results, fields) => {
            if (error) {
                console.error("Error inserting user:", error);
                return res.status(500).json({ ok: false });
            }

            // Generate JWT token for the newly registered user
            const token = jwt.sign({ userId: results.insertId }, process.env.JWT_SECRET, { expiresIn: "1h" });

            // Return the inserted user data and token
            const insertedUser = { id: results.insertId, username, email };
            res.status(200).json({ user: insertedUser, token, ok: true });

            // Send confirmation email
            sendConfirmationEmail(email, confirmationCode);
        });
    } catch (error) {
        console.error("Error hashing password:", error);
        res.status(500).json({ ok: false, error, credentials: req.body });
    }
};

exports.registerAdmin = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // Generate confirmation code
        const confirmationCode = generateRandomNumberString(6) // Generate a random 6-character alphanumeric code

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds

        // SQL query to insert the user into the database
        const sql = `INSERT INTO users (name, email, password, confirmation_code, is_admin) VALUES (?, ?, ?, ?, ?)`;
        const values = [username, email, hashedPassword, confirmationCode, 1];

        // Execute the query
        connection.query(sql, values, async (error, results, fields) => {
            if (error) {
                console.error("Error inserting user:", error);
                return res.status(500).json({ ok: false });
            }

            // Generate JWT token for the newly registered user
            const token = jwt.sign({ userId: results.insertId }, process.env.JWT_SECRET, { expiresIn: "1h" });

            // Return the inserted user data and token
            const insertedUser = { id: results.insertId, username, email };
            res.status(200).json({ user: insertedUser, token, ok: true })
        });
    } catch (error) {
        console.error("Error hashing password:", error);
        res.status(500).json({ ok: false, error, credentials: req.body });
    }
}

exports.sendMailToAdmin = async (req, res) => {
    const { email } = req.body;
    // console.log(req.body);
    try {
        const resposta = await sendEmailToAdmin(req.user, email);
        res.status(200).json({ message: "Email sent", ok: true, resposta });
    } catch (error) {
        console.log(error);
    }

}

