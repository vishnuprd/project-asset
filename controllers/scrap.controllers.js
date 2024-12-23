const ScrapLaptop = require('../models/scrap.model.js');

// Create a new scrap laptop
exports.createScrap = async (req, res) => {
    const {scrapID,type,assetID,brand,serialNumber,location,description,dateScrapped,status,adminAccount} = req.body;
    console.log(req.body);
    try {
        const scrapLaptop = new ScrapLaptop(req.body);
        await scrapLaptop.save();
        res.status(201).json(scrapLaptop);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all scrap laptops
exports.getScrap = async (req, res) => {
    try {
        const scrapLaptops = await ScrapLaptop.find();
        res.json(scrapLaptops);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a scrap laptop by ID
exports.getScrapById = async (req, res) => {
    try {
        const scrapLaptop = await ScrapLaptop.findById(req.params.id);
        if (!scrapLaptop) return res.status(404).json({ error: 'Scrap Laptop not found' });
        res.json(scrapLaptop);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a scrap laptop
exports.updateScrap = async (req, res) => {
    try {
        const scrapLaptop = await ScrapLaptop.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!scrapLaptop) return res.status(404).json({ error: 'Scrap Laptop not found' });
        res.json(scrapLaptop);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a scrap laptop
exports.deleteScrap = async (req, res) => {
    try {
        const scrapLaptop = await ScrapLaptop.findByIdAndDelete(req.params.id);
        if (!scrapLaptop) return res.status(404).json({ error: 'Scrap Laptop not found' });
        res.json({ message: 'Scrap Laptop deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};