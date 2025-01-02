const Domain = require("../models/domain.model.js");


const getAllDomains = async (req, res) => {
    try {
        const domains = await Domain.find();
        res.status(200).json({
            success: true,
            data: domains
        });
    } catch (error) {
        console.error('Error fetching domains:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
};


const AddDomain = async (req, res) => {
    try {
        const { provider, serverName, serverType, serverIp, ownerName, registeredOrganization, registerEmail, purchaseDate, expiryDate, paymentMethod } = req.body;

      
        if (!provider || !serverName || !serverType || !serverIp || !ownerName || !registeredOrganization || !registerEmail || !purchaseDate || !expiryDate || !paymentMethod) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        const newDomain = new Domain(req.body);
        await newDomain.save();

        res.status(201).json({
            success: true,
            message: 'Domain added successfully',
            data: newDomain
        });
    } catch (error) {
        console.error('Error adding domain:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to add domain',
            error: error.message
        });
    }
};


const updateDomain = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Domain ID is required'
            });
        }

        const updatedDomain = await Domain.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!updatedDomain) {
            return res.status(404).json({
                success: false,
                message: 'Domain not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Domain updated successfully',
            data: updatedDomain
        });
    } catch (error) {
        console.error('Error updating domain:', error);
        res.status(400).json({
            success: false,
            message: 'Failed to update domain',
            error: error.message
        });
    }
};


const deleteDomain = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Domain ID is required'
            });
        }

        const deletedDomain = await Domain.findByIdAndDelete(id);

        if (!deletedDomain) {
            return res.status(404).json({
                success: false,
                message: 'Domain not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Domain deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting domain:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete domain',
            error: error.message
        });
    }
};

module.exports = { getAllDomains, AddDomain, updateDomain, deleteDomain };
