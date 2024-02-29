exports.getAllUsers = async (req, res) => {
    try{
        res.status(200).json({
            message: 'Success',
            data: 'get all Users'
        })
    }catch(err){
        res.status(400).json({
            message: 'failed',
            err: err.message
        })
    }
}

exports.createUser = async (req, res) => {
    try{
        res.status(200).json({
            message: 'Success',
            data: 'User created successfully',
        })
    }catch(err){
        res.status(400).json({
            message: 'failed',
            err: err.message
        })
    }
}

exports.getUserById = async (req, res) => {
    try{
        res.status(200).json({
            message: 'Success',
            data: 'got a User',
        })
    }catch(err){
        res.status(400).json({
            message: 'failed',
            err: err.message
        })
    }
}

exports.updateUser = async (req, res) => {
    try{
        res.status(200).json({
            message: 'Success',
            data: 'User updated successfully',
        })
    }catch(err){
        res.status(400).json({
            message: 'failed',
            err: err.message
        })
    }
}

exports.deleteUser = async (req, res) => {
    try{
        res.status(200).json({
            message: 'Success',
            data: 'User deleted successfully',
        })
    }catch(err){
        res.status(400).json({
            message: 'failed',
            err: err.message
        })
    }
}

