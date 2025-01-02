const Printer = require('../models/printer.model.js');

exports.createPrinter = async (req, res) => {
    const { printerId, model, serialNumber, handledBy, location, division, status, description } = req.body;
    try {
        const printer = await Printer.create({ printerId, model, serialNumber, handledBy, location, division, status: status || 'Active',  description });
        res.status(201).json(printer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};


exports.getPrinters = async (req, res) => {
    try {
        const printers = await Printer.find();
        res.json(printers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


exports.updatePrinter = async (req, res) => {
    try {
        const printer = await Printer.findByIdAndUpdate
            (req.params.id, req.body, { new: true });
        if (!printer) return res.status(404).json({ error: 'Printer not found' });
        res.json(printer);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.deletePrinter = async (req, res) => {
    try {
        const printer = await Printer.findByIdAndDelete(req.params.id);
        if (!printer) return res.status(404).json({ error: 'Printer not found' });
        res.json(printer);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

