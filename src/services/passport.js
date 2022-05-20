import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv';

import User from '../models/user_model';

// loads in .env file if needed
dotenv.config({ silent: true });

// options for local strategy, we'll use email AS the username
// not have separate ones
const localOptions = { usernameField: 'email' };

// options for jwt strategy
// we'll pass in the jwt in an `authorization` header
// so passport can find it there
const jwtOptions = {
  secretOrKey: process.env.AUTH_SECRET,
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
};
// NOTE: we are not calling this a bearer token (although it technically is), if you see people use Bearer in front of token on the internet you could either ignore it, use it but then you have to parse it out here as well as prepend it on the frontend.

// username/email + password authentication strategy
const localLogin = new LocalStrategy(localOptions, async (email, password, done) => {
  let user;
  let isMatch;

  try {
    // goes through the database and tries to find a user with that specific email
    user = await User.findOne({ email });
    // if there is no user, then return callback function done with false showing that
    // there is no user with that email
    if (!user) {
      return done(null, false);
    }
    // if we do find a user, then we check the password submitted with the stored
    // user's password
    isMatch = await user.comparePassword(password);
    // if the password is not a match, return callback function done with false
    // showing that the user does not have that password
    if (!isMatch) {
      return done(null, false);
    } else {
      // if nothing goes wrong (email and password match), return the user object
      // showing that the user has been authenticated
      return done(null, user);
    }
  } catch (error) {
    // upon any error, just return the error to the callback function
    return done(error);
  }
});

const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  // See if the user ID in the payload exists in our database
  // If it does, call 'done' with that other
  // otherwise, call done without a user object
  let user;
  try {
    user = await User.findById(payload.sub);
  } catch (error) {
    done(error, false);
  }
  if (user) {
    done(null, user);
  } else {
    done(null, false);
  }
});

// Tell passport to use this strategy
passport.use(jwtLogin); // for 'jwt'
passport.use(localLogin); // for 'local'

// middleware functions to use in routes
export const requireAuth = passport.authenticate('jwt', { session: false });
export const requireSignin = passport.authenticate('local', { session: false });
