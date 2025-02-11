// middleware/verifyrole.js
module.exports = (roles) => {
    return (req, res, next) => {
        const userRole = req.user?.role;
        if (!userRole || !roles.includes(userRole)) {
            return res.status(403).json({ message: 'Forbidden: You do not have the correct role' });
        }
        next();
    };
};
