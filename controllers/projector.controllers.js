const Projector = require("../models/projector.model.js");

const getAllProjectors = async (req, res) => {
    try {
        const projectors = await Projector.find();
        res.status(200).json({
            success: true,
            data: projectors
        });
    } catch (error) {
        console.error('Error fetching projectors:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
};


const addProjector = async (req, res) => {
    try {
        const { projectorId, model, serialNumber, location, division, status, description, handledBy } = req.body;

        if (!projectorId || !model || !serialNumber || !location || !division || !status || !description || !handledBy) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        const newProjector = new Projector(req.body);
        await newProjector.save();

        res.status(201).json({
            success: true,
            message: 'Projector added successfully',
            data: newProjector
        });
    } catch (error) {
        console.error('Error adding projector:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to add projector',
            error: error.message
        });
    }
};


const updateProjector = async (req, res) => {
    try {
        const projectorId = req.params.id;
        console.log('Attempting to update projector with ID:', projectorId);

        const updatedProjector = await Projector.findByIdAndUpdate(
            projectorId,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedProjector) {
            return res.status(404).json({
                success: false,
                message: 'Projector not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Projector updated successfully',
            data: updatedProjector,
        });
    } catch (error) {
        console.error('Error updating projector:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update projector',
            error: error.message,
        });
    }
};
   


const deleteProjector = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Projector ID is required'
            });
        }

        const deletedProjector = await Projector.findByIdAndDelete(id);

        if (!deletedProjector) {
            return res.status(404).json({
                success: false,
                message: 'Projector not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Projector deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting projector:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete projector',
            error: error.message
        });
    }
};

module.exports = { getAllProjectors, addProjector, updateProjector, deleteProjector };
