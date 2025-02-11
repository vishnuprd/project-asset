const mongoose = require('mongoose');
const simCard = require('../models/sim.models.js');


exports.addSimCard = async (req, res) => {
    const { simCardId,networkName,handledBy, location, division, status, description } = req.body;
    try {
        
        if (!simCardId || !networkName || !location || !division || !status || !description) {
            return res.status(400).send('All fields are required');
        }
        const router = new simCard(req.body);
        await router.save();

        console.log ('Sim added successfully:', router);
        res.send(router);
    } catch (error) {
        console.error('Error adding sim:', error);
        res.status(400).send(error.message);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });

    }
}


exports.getAllSimCard = async (req, res) => {
    try {
        const simCards = await simCard.find();
        res.status(200).json({
            success: true,
            data: simCards
        });
    } catch (error) {
        console.error('Error fetching sim cards:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

exports.updateSimCard = async (req, res) => {
    try {
           const simCardId = req.params.id;
           console.log('Attempting to update SimCard with ID:', simCardId);
   
           const updatedSimCard = await simCard.findByIdAndUpdate(
               simCardId,
               req.body,
               { new: true }
           );
   
           if (!updatedSimCard) {
               return res.status(404).json({
                   success: false,
                   message: 'Sim Card not found',
               });
           }
   
           res.status(200).json({
               success: true,
               message: 'Sim Card updated successfully',
               data: updatedSimCard,
           });
       } catch (error) {
           console.error('Error updating sim card:', error);
           res.status(500).json({
               success: false,
               message: 'Failed to update sim card',
               error: error.message,
           });
       }
   };
      
  


exports.deleteSimCard = async (req, res) => {
    const id = req.params.id;
    try {
        const simCard = await simCard.findByIdAndDelete(id);
        res.send(simCard);
    } catch (error) {
        res.status(400).send(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

