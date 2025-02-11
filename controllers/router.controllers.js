const mongoose = require('mongoose');
const Router = require('../models/router.model.js');

exports.addRouter = async (req, res) => {
    const { routerId, brand, serialNumber, coverage, speed, storage, location, division, status, description } = req.body;
    try {
        
        if (!routerId || !brand || !serialNumber || !coverage || !speed || !storage || !location || !division || !status || !description) {
            return res.status(400).send('All fields are required');
        }
        const router = new Router(req.body);
        await router.save();

        console.log ('Router added successfully:', router);
        res.send(router);
    } catch (error) {
        console.error('Error adding router:', error);
        res.status(400).send(error.message);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });

    }
}


exports.getAllRouters = async (req, res) => {
    try {
        const routers = await Router.find();
        res.send(routers);
    } catch (error) {
        res.status(400).send(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });

    }
}


exports.updateRouters  = async (req, res) => {
    try {
           const routerId = req.params.id;
           console.log('Attempting to update Router with ID:', routerId);
   
           const updatedRouter = await Router.findByIdAndUpdate(
               routerId,
               req.body,
               { new: true }
           );
   
           if (!updatedRouter) {
               return res.status(404).json({
                   success: false,
                   message: 'Router not found',
               });
           }
   
           res.status(200).json({
               success: true,
               message: 'Router updated successfully',
               data: updatedRouter,
           });
       } catch (error) {
           console.error('Error updating router:', error);
           res.status(500).json({
               success: false,
               message: 'Failed to update phone',
               error: error.message,
           });
       }
   };
      
  


exports.deleteRouter = async (req, res) => {
    const id = req.params.id;
    try {
        const router = await Router.findByIdAndDelete(id);
        res.send(router);
    } catch (error) {
        res.status(400).send(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

