const CCTV = require("../models/cctv.model.js");
const mongoose = require('mongoose');  

const getAllCCTVs = async (req, res) => {
    try {
        const cctvs = await CCTV.find();
        res.status(200).json({
            success: true,
            data: cctvs
        });
    } catch (error) {
        console.error('Error fetching CCTVs:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

const addCCTV = async (req, res) => {
    try {
      const { cctvId, model, serialNumber, ipAddress, location, division, status, description,storageType, storageSize,storageDate } = req.body;
  
     
      if (!model || !serialNumber || !location || !division || !ipAddress) {
        return res.status(400).json({ message: 'Model, Serial Number, Location, Division, and IP Address are required.' });
      }
  
    
      const newCctv = new CCTV({
        cctvId,
        model,
        serialNumber,
        ipAddress,
        location,
        division,
        status: status || 'Active', 
        description,
        storageType : storageType || 'N/A',
        storageSize,
        storageDate
      });
  
     
      const savedCctv = await newCctv.save(); 
      res.status(201).json({ message: 'CCTV added successfully!', data: savedCctv });
    } catch (error) {
      console.error('Error adding CCTV:', error);
      res.status(500).json({ message: 'Error adding CCTV details.', error: error.message });
    }
  };


  const updateCCTV = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Received PUT request for CCTV ID:", id);
        console.log("Request Body:", req.body);

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid CCTV ID format" });
        }

        const updatedCCTV = await CCTV.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!updatedCCTV) {
            console.log("CCTV not found in database");
            return res.status(404).json({ success: false, message: "CCTV not found" });
        }

        console.log("CCTV Updated Successfully:", updatedCCTV);
        res.status(200).json({ success: true, message: "CCTV updated successfully", data: updatedCCTV });
    } catch (error) {
        console.error("Error updating CCTV:", error);
        res.status(500).json({ message: "Failed to update CCTV", error: error.message });
    }
};




const deleteCCTV = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'CCTV ID is required'
            });
        }

        const deletedCCTV = await CCTV.findByIdAndDelete(id);

        if (!deletedCCTV) {
            return res.status(404).json({
                success: false,
                message: 'CCTV not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'CCTV deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting CCTV:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete CCTV',
            error: error.message
        });
    }
};

module.exports = { getAllCCTVs, addCCTV, updateCCTV, deleteCCTV };
