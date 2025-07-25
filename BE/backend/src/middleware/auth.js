const jwt = require('jsonwebtoken');

//get the token and verify
module.exports = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ','');
    console.log('Incoming header:', req.header('Authorization'));
    //.replace - removes the 'Bearer ' prefix leaving only the token part

    if(!token) {
        return res.status(401).json({message : 'No token, auth denied'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
         console.log('Decoded:', decoded);
        req.user = decoded.user;
        next();
    }
    catch(err){
        console.error('JWT verify error:', err);
        res.status(401).json({message : 'Invalid token'});
    }
};

