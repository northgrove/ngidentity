const {
  identityMetadata,
  clientID,
  clientSecret,
  responseType,
  responseMode,
  redirectUrl,
  passReqToCallback,
  scope,
  allowHttpForRedirectUrl,
  validateIssuer,
  loggingLevel,
  cookieEncryptionKeys,
  useCookieInsteadOfSession,
  nonceLifetime,
  isB2C,
  tenantIdOrName,
  cookieSameSite,
  customstate
} = require('./passportConfig')
const finduser = require('./findUser')
const { cookie } = require('request')
const OIDCStrategy = require('passport-azure-ad').OIDCStrategy


module.exports = passport => {
  // (DE)SERIALIZE USER
  passport.serializeUser((user, done) => {
    done(null, user.oid)
  })

  passport.deserializeUser((oid, done) => {
    finduser.findByOid(oid, function(err, user) {
      done(err, user)
    })
  })

  // AZURE AD LOGIN STRATEGY
  passport.use(
    'azuread-openidconnect',
    new OIDCStrategy(
      {
        identityMetadata: identityMetadata,
        clientID: clientID,
        clientSecret: clientSecret,
        responseType: responseType,
        responseMode: responseMode,
        redirectUrl: redirectUrl,
        passReqToCallback: passReqToCallback,
        scope: scope,
        allowHttpForRedirectUrl: allowHttpForRedirectUrl,
        validateIssuer: validateIssuer,
        loggingLevel: loggingLevel,
        cookieEncryptionKeys: cookieEncryptionKeys,
        useCookieInsteadOfSession: useCookieInsteadOfSession,
        nonceLifetime: nonceLifetime
      },
      (req, iss, sub, profile, accessToken, refreshToken, done) => {
        console.log("authenticating")
        if (!profile.oid) {
          return done(new Error('No oid found'), null)
        }
        process.nextTick(() => {
          console.log("\x1b[33m%s\x1b[0m" ,' - doing authentication rutine in application')
          console.log(profile)
          console.log("session:", req.session.userguid)
          finduser.findByOid(req.session.userguid, function(err, user) {
            if (err) {
              return done(err)
            }
            if (!user) {
              console.log("\x1b[33m%s\x1b[0m" ,' - user does not exist. writing new user info to state and session')
              let newUser = {}
              newUser.oid = profile.oid
              newUser.upn = profile.upn
              newUser.displayName = profile.displayName
              newUser.firstName = profile.name.givenName
              newUser.lastName = profile.name.familyName
              newUser.refreshToken = refreshToken
              newUser.userguid = req.session.userguid
              finduser.users.push(newUser)

              req.session.userid = profile.oid
              req.session.upn = profile.upn
              req.session.firstName = profile.name.givenName
              req.session.lastName = profile.name.familyName
              req.session.displayName = profile.displayName
              req.session.refreshToken = refreshToken
              return done(null, newUser)
            }
            console.log("\x1b[33m%s\x1b[0m" ,' - user did exist in state but not in session, writing new session info')
            req.session.userid = user.oid
            req.session.upn = user.upn
            req.session.firstName = user.firstName
            req.session.lastName = user.lastName
            req.session.displayName = user.displayName
            req.session.refreshToken = refreshToken
            return done(null, user)
          })
        })
      }
    )
  )
}
