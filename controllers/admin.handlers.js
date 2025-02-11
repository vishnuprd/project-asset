const Admin = require("../models/admin.model.js");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signupAdmin = async (req, res) => {
    const { email, password, role } = req.body;
    try {
       
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

   
        const hashedPassword = await bcrypt.hash(password, 10);

     
        const newAdmin = new Admin({
            email,
            password: hashedPassword,
            role
        });

        await newAdmin.save();

        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        console.error('Error during admin signup:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Admin.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        if (!process.env.TOKEN_SECRET) {
            console.error('JWT_SECRET is not defined in environment variables');
            return res.status(500).json({ message: 'JWT secret key missing in server' });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.TOKEN_SECRET,
            { expiresIn: '10d' }
          );
          
         

        res.json({ token, user: { name: user.name, email: user.email, role: user.role } });

    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};




exports.getAdmin = async (req, res) => {
    try {
        const user = req.user;

        if (!user || !user.id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const dbUser = await Admin.findById(user.id);

        if (!dbUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userWithoutPassword = { ...dbUser._doc };
        delete userWithoutPassword.password;

        res.status(200).json(userWithoutPassword);
    } catch (error) {
        console.error('Error fetching admin data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.logoutAdmin = (req, res) => {
    try {
        res.status(200).json({ message: 'Logout successful. Please remove the token from the frontend storage.' });
    } catch (error) {
        console.error('Error during admin logout:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
