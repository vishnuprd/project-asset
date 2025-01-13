const Tablet = require('../models/tablet.model.js');

// Create a new Tablet
exports.createTablet = async (req, res) => {
    const { tabletId, brand, model, serialNumber, handledBy, location, division, status, description } = req.body;

    try {
        const tablet = new Tablet({
            tabletId,
            brand,
            model,
            serialNumber,
            handledBy,
            location,
            division,
            status: status || 'Available', 
            description,
        });

        await tablet.save();
        res.status(201).json(tablet);
    } catch (error) {
        console.error('Error creating tablet:', error.message);
        res.status(500).json({ error: error.message });
    }
};


exports.getTablets = async (req, res) => {
    try {
        const tablets = await Tablet.find();
        res.status(200).json(tablets);
    } catch (error) {
        console.error('Error fetching tablets:', error.message);
        res.status(500).json({ error: error.message });
    }
};


exports.getTabletById = async (req, res) => {
    try {
        const tablet = await Tablet.findById(req.params.id);
        if (!tablet) return res.status(404).json({ error: 'Tablet not found' });
        res.status(200).json(tablet);
    } catch (error) {
        console.error('Error fetching tablet:', error.message);
        res.status(500).json({ error: error.message });
    }
};


exports.updateTablet = async (req, res) => {
    try {
        const updatedTablet = await Tablet.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTablet) return res.status(404).json({ error: 'Tablet not found' });
        res.status(200).json(updatedTablet);
    } catch (error) {
        console.error('Error updating tablet:', error.message);
        res.status(400).json({ error: error.message });
    }
};


exports.deleteTablet = async (req, res) => {
    try {
        const deletedTablet = await Tablet.findByIdAndDelete(req.params.id);
        if (!deletedTablet) return res.status(404).json({ error: 'Tablet not found' });
        res.status(200).json({ message: 'Tablet deleted successfully' });
    } catch (error) {
        console.error('Error deleting tablet:', error.message);
        res.status(500).json({ error: error.message });
    }
};
