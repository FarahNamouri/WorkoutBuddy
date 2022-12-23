const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const requireAuth = async (req, res, next) => {
    // verify authentication b(grab the auth prop from the request headers, which contains only web token)
    const { authorization } = req.headers

    // make sure that authorization has a value : 
    if (!authorization) {
        return res.status(401).json({error: 'Authorization token required'})
    }

    // get the token from authorization
    const token = authorization.split(' ')[1]
    // verify the web token :
    try {
        // grab the id from the token
       const {_id} =  jwt.verify(token, "ninjadojoshifuyoshimraooluigipeachbowser" )
       req.user = await User.findOne({_id}).select('_id')
       next() // go to the next function
    } catch (error) {
        console.log(error)
        res.status(401).json({error: 'Request is not authorized'})
    }
}
module.exports = requireAuth
