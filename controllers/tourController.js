exports.getAllTours = async (req, res) => {
    try{
        res.status(200).json({
            message: 'Success',
            data: 'get all tours'
        })
    }catch(err){
        res.status(400).json({
            message: 'failed',
            err: err.message
        })
    }
}

exports.createTour = async (req, res) => {
    try{
        res.status(200).json({
            message: 'Success',
            data: 'tour created successfully',
        })
    }catch(err){
        res.status(400).json({
            message: 'failed',
            err: err.message
        })
    }
}

exports.getTourById = async (req, res) => {
    try{
        res.status(200).json({
            message: 'Success',
            data: 'got a tour',
        })
    }catch(err){
        res.status(400).json({
            message: 'failed',
            err: err.message
        })
    }
}

exports.updateTour = async (req, res) => {
    try{
        res.status(200).json({
            message: 'Success',
            data: 'tour updated successfully',
        })
    }catch(err){
        res.status(400).json({
            message: 'failed',
            err: err.message
        })
    }
}

exports.deleteTour = async (req, res) => {
    try{
        res.status(200).json({
            message: 'Success',
            data: 'tour deleted successfully',
        })
    }catch(err){
        res.status(400).json({
            message: 'failed',
            err: err.message
        })
    }
}

