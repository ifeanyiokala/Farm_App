const LocalStategy = require("passport-local").Stategy
const bcrypt = require("bcryptjs")


function initialize(passport){
    // function to authenticate users
    const authenticateUsers = async (email, password, done) => {
        // Get users by email
        const user = getUserByEmail(email)
        if (user == null){
            return done(null, false, {messsage:"No user found with that email"})
        }
        try {
            if (await bcrypt.compare(password, user.password)){
                return done(null, user )
            }
        } catch (e) {
            console.log(e);
            return done(e)
        }

    }

    passport.use(new LocalStategy({usernameField: 'email'}))
    passport.serializeUser((user, done) => ())

}


module.exports = initialize