const jwt = require("jsonwebtoken");

// User Middleware

exports.requireSign = async (req, res, next) => {
    // check if token cookie is present
    try {

        const token = req.cookies.token;
        // return console.log("Middle:", token);
        //console.log("Body:", req.headers);

        if (!token) {
            return res.status(401).json({ message: "Unauthorized. Please login." });
        }

        // verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // set the decoded token in the request object for future use
        req.user = decoded;
        // continue to the next middleware or route handler
        next();
    } catch (err) {
        console.log(err);
        return res.status(400).send("Invalid token.");
    }
};


