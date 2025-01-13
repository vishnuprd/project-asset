const Phone = require('../models/phone.model.js');


exports.createPhone = async (req, res) => {
    try {
        const { phoneId, brand, model, serialNumber, handledBy, location, division, status, description } = req.body;

        if (!phoneId || !brand || !model || !serialNumber || !handledBy || !location || !division || !status) 
        {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const phone = new Phone({ phoneId, brand, model, serialNumber, handledBy, location, division, status :status || 'Available', description });
        await phone.save();
  res.status(201).json(phone);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
   
   


exports.getPhones = async (req, res) => {
    try {
        const phones = await Phone.find();
        res.json(phones);
    } catch (error) {
        console.error(`Error fetching phones: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

exports.getPhoneById = async (req, res) => {
    try {
        const phone = await Phone.findById(req.params.id);
        if (!phone) {
            return res.status(404).json({ error: 'Phone not found' });
        }
        res.json(phone);
    } catch (error) {
        console.error(`Error fetching phone: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};


exports.updatePhone = async (req, res) => {
  try {
         const phoneId = req.params.id;
         console.log('Attempting to update projector with ID:', phoneId);
 
         const updatedPhone = await Phone.findByIdAndUpdate(
             phoneId,
             req.body,
             { new: true, runValidators: true }
         );
 
         if (!updatedPhone) {
             return res.status(404).json({
                 success: false,
                 message: 'Phone not found',
             });
         }
 
         res.status(200).json({
             success: true,
             message: 'Phone updated successfully',
             data: updatedPhone,
         });
     } catch (error) {
         console.error('Error updating phone:', error);
         res.status(500).json({
             success: false,
             message: 'Failed to update phone',
             error: error.message,
         });
     }
 };
    
 
 

exports.deletePhone = async (req, res) => {
    try {
        const phone = await Phone.findByIdAndDelete(req.params.id);
        if (!phone) {
            return res.status(404).json({ error: 'Phone not found' });
        }
        res.json({ message: 'Phone deleted successfully' });
    } catch (error) {
        console.error(`Error deleting phone: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

