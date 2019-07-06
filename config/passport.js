const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt,
      mongoose = require('mongoose'),
      User = require('../models/User'),
      jwt_secret = require('./keys').secretOrKey;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = jwt_secret;

module.exports = (passport) =>{
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        User.findById(jwt_payload.id)
            .then(user=>{
                if(user){
                    return done(null, user);
                }
                return done(null,false)
            })
            .catch(err => console.log(err))

    }));
};

