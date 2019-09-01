var jwt = require('jsonwebtoken');
var config = require('./config/config');
module.exports = async (req, res, next) => {
    const token = req.headers['x-access-token'];
    var api = '\/(api)\/';
  if(req.path.match(api)){
    if (!token){
    return res.status(403).send({ auth: false, message: 'No token provided.' });
    }
    jwt.verify(token, config.secret, function(err, decoded) {
        if (err){
        return res.status(500).send({ auth: false, message: err.message });
      }
      next();
      });
    }else{
        return res.sendFile(__dirname + '/public/index.html');
    }
  };
