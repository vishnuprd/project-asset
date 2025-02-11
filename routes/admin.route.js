const express = require('express');
const router = express.Router();
const AdminControllers = require('../controllers/admin.handlers.js'); // Make sure the path is correct
const { verifyToken } = require('../middleware/verifytoken.js');      // Ensure this is correct
const verifyRole = require('../middleware/verifyrole.js');            // Ensure this is correct

router.post('/signup', AdminControllers.signupAdmin); // Admin signup handler
router.post('/login', AdminControllers.login); // Admin login handler
router.get('/getAdmin', verifyToken, verifyRole(['admin', 'hr', 'user']), AdminControllers.getAdmin); // Get admin handler with token and role verification
router.post('/logout', AdminControllers.logoutAdmin); // Admin logout handler

// Routes with role-based middleware
router.get('/admin', verifyToken, verifyRole(['admin']), (req, res) => {
    res.json({ message: "Welcome, Admin!" });
});

router.get('/hr', verifyToken, verifyRole(['hr']), (req, res) => {
    res.json({ message: "Welcome, HR!" });
});

router.get('/user', verifyToken, verifyRole(['admin', 'hr', 'user']), (req, res) => {
    res.json({ message: "Welcome, User!" });
});

module.exports = router;
