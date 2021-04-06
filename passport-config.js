const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')


function initialize(passport, getUserByMobile, getUserById){
  const authenticateUser = async (mobile,password,done)=>{
  const user =  getUserByMobile(mobile)
  if (user == null){
    return done(null, false, {message: 'No user with that Mobile Number'})
  }
  try{
    if( await bcrypt.compare(password, user.password)){

    }else{
      return done(null, false, {message : 'Password Incorrect'})
    }
  } catch(e){
    return done(e)
  }
}

  passport.use(new LocalStrategy({usernameField: 'mobile'},authenticateUser))
  passport.serializeUser((user,done)=>done(null,user.id))
  passport.deserializeUser((id,done)=>{
    return done(null,getUserById(id))

  })

}

modules.exports = initialize
