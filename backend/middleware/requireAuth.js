const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {
    //verify authentication
    const { authorization } = req.headers
    if (!authorization) {
        return res.status(401).send({ error: 'authorization token required' })
    }
    const token = authorization.replace('Bearer ', '')

    try {
        const { _id } = jwt.verify(token, 'randomsecrettext')
        req.user = await User.findOne({ _id }).select('_id')
        next()
    }
    catch (error) {
        console.log(error)
        return res.status(401).send({ error: 'request not authorized' })
    }

}
module.exports = requireAuth