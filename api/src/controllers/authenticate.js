const passport = require('passport')
const { logoutURL } = require('../config/passportConfig')
const token = require('./token')
//const { OidcClient } = require('oidc-client')
const request = require('request');


// AZURE AUTHENTICATE

exports.authenticateAzure = () => {
  return (req, res, next) => {
    /*const concatUrl = params => {
      let string = ''
      Object.keys(params).forEach(e => {
        if (params[e]) string = `${string}/${params[e]}`
      })
      return string.toString()
    }
    req.session.redirectUrl = concatUrl(req.params)*/
    req.session.userguid = req.query.userguid
    console.log("params:", req.query.userguid)
    console.log("session:", req.session.userguid)
    try {
      console.log("\x1b[33m%s\x1b[0m" ,' - redirecting to Azure AD for authentication')
      passport.authenticate('azuread-openidconnect', {
        response: res,
        // resourceURL: 'b36e92f3-d48b-473d-8f69-e7887457bd3f', // ## Use if need accesstoken during login
        successRedirect: '/',
        failureRedirect: '/error',
        tenantIdOrName: 'msgroveb2c.onmicrosoft.com'
      })(req, res, next)
    } catch (err) {
      throw `ERROR during authentication: ${err}`
    }
  }
}


// AZURE CALLBACK

exports.authenticateAzureCallback = () => {
  return (req, res, next) => {
    console.log("\x1b[33m%s\x1b[0m" ,' - got callback from Azure AD')
    console.log("\x1b[33m%s\x1b[0m" ,' - Response: ', req.body)
    try {
      passport.authenticate('azuread-openidconnect', {
        response: res,
        successRedirect: '/authtab',
        failureRedirect: '/error'
      })(req, res, next)
    } catch (err) {
      throw `ERROR during authentication: ${err}`
    }
  }
}


// AUTHENTICATION CHECK

exports.ensureAuthenticated = () => {
  return async (req, res, next) => {
    console.log("\x1b[33m%s\x1b[0m" ,' - is user authenticated?: ', req.isAuthenticated())
    if (req.isAuthenticated()) {
      /*
      resource = process.env['AZURECONFIG_CLIENTID']
      const bastaToken = await token.validateRefreshAndGetToken( // # Only placed here as an example. In real world do this in the request to backend services insted
        req.session.userid,
        req.session.refreshToken,
        resource
      )
      */
      //console.log(bastaToken)
      return next()
    }
    res.redirect('/login')
  }
}


// LOGOUT

exports.logout = (req, res) => {
 return (req, res) => {
    try {
      console.log("\x1b[33m%s\x1b[0m" ,' - logging out')
      req.logout()
      req.session = null
      res.redirect(logoutURL)
    } catch (err) {
      res.status(500).send(err)
      return `ERROR during logout: ${err}`
    }
  }
}


exports.authidporten = (req, res) => {
  return (req, res) => {
    console.log("jau")
    res.redirect("https://oidc-ver2.difi.no/idporten-oidc-provider/authorize?client_id=3091c96a-b34d-4bc4-87c5-009717af7b6d&redirect_uri=http://localhost:8081/idcallback&response_type=code&scope=openid&response_mode=form_post&nonce=tull&state=jau")
    }
 
}

exports.idportencallback = (req, res) => {
  return (req, res) => {
    console.log("req:", req)
    console.log("res:", res)
    if(req.body.code) {
      res.send(`
      <!DOCTYPE html>
      <html lang="en">
      
      <head>
        <title>
          Microsoft Teams Hello World Sample App
        </title>
        <link rel="stylesheet" type="text/css" href="/scripts/msteams-16.css">
        </link>
        <link rel="stylesheet" type="text/css" href="/scripts/custom.css">
        </link>
        <script src="https://statics.teams.cdn.office.net/sdk/v1.6.0/js/MicrosoftTeams.min.js" crossorigin="anonymous"></script>
        <script src="/scripts/teamsapp.js"></script>
      </head>
      
      <body class="theme-light">
      <script>
      microsoftTeams.initialize();
      </script>
        <div class="surface">
          <div class="panel">
            <div class="font-semibold font-title">Authenticated
              <p> You are authenticated</p>

            </div>
          </div>
        </div>
        </div>
        <script>
        microsoftTeams.appInitialization.notifySuccess();
        </script>
      </body>
      
      </html>
      `)}
      else {
        res.send(200)
      }
  }
}