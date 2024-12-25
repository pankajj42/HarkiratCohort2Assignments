const { JWT_SECRET_KEY } = require("../config");
const jwt = require("jsonwebtoken");
// Middleware for handling auth
function adminMiddleware(req, res, next) {
	// Implement admin auth logic
	// You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
	try {
		const value = jwt.verify(req.token, JWT_SECRET_KEY);
		if (value.username) {
			req.username = value.username;
			next();
		} else {
			res.status(403).json({ message: "You are not authorized" });
		}
	} catch (err) {
		res.status(403).json({ message: "Invalid Input" });
	}
}

module.exports = adminMiddleware;
