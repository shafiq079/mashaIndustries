const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
    try {
        const token = req.cookies?.token;

        console.log("Received Token:", token);
        if (!token) {
            return res.status(200).json({
                message: "Please Login...!",
                error: true,
                success: false
            });
        }

        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function(err, decoded) {
            if (err) {
                console.log("JWT Verification Error:", err);
                return res.status(401).json({
                    message: "Unauthorized",
                    error: true,
                    success: false
                });
            }

            console.log("Decoded Token:", decoded);
            req.userId = decoded?._id;

            // Proceed to the next middleware or controller
            next();
        });

    } catch (err) {
        console.log("Auth Token Middleware Error:", err);
        res.status(400).json({
            message: err.message || err,
            data: [],
            error: true,
            success: false
        });
    }
}

module.exports = authToken;
