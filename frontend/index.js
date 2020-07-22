const msgraph = require('../api/src/controllers/msgraph')


exports.showFrontPage = () => {
    return async (req, res) => {
     
      const userPhoto = await msgraph.getUserPhoto({
        userId: req.session.userid,
        refreshToken: req.session.refreshToken,
        userUpn: req.session.upn
      })
      
      console.log("\x1b[33m%s\x1b[0m" ,' - showing frontpage')
      res.send(`
        <html>
        <center>
          <h1>Azure AD Autorization Flow Example APP</h1>
          <a>You are now logged in</a>
          <br></br>
          <p><img src=${userPhoto} width="96" height="96" border="1"/></p>
          <p><b>Name:</b> ${req.session.displayName}</p>
          <p><b>Username:</b> ${req.session.upn}</p>

          <br></br>
          <a href="/auth/logout">Logout</a>
          <br><br>
          <a href=/token> Generate Service-to-service accessToken</a><br>
          <a href=/tokenuser> Generate accessToken with users refreshToken</a><br>
          <a href=/tokenbehalf> Generate accessToken with users existing accessToken</a><br>
          <br><br>
          <p> Verify token</p>
          <form action=/tokenverify>
            <input type=text name=token>
            <input type=submit value=Submit>
          </form>

        </center>  
        </html>
      `)
    }
  }

  exports.firstPage = () => {
    return async (req, res) => {
     
    
      console.log("\x1b[33m%s\x1b[0m" ,' - showing firstpage')
      res.send(`
        <html>
        <head>
        <!-- Microsoft Teams JavaScript API (via CDN) -->
        <script src="https://statics.teams.cdn.office.net/sdk/v1.6.0/js/MicrosoftTeams.min.js" integrity="sha384-mhp2E+BLMiZLe7rDIzj19WjgXJeI32NkPvrvvZBrMi5IvWup/1NUfS5xuYN5S3VT" crossorigin="anonymous"></script>
        
        </head>
        <body>
        <script>
        microsoftTeams.initialize();
        microsoftTeams.appInitialization.notifySuccess();
        </script>
        <div class="surface"> 
        <div class="panel">
        <center>
          <h1>Northgrove ID Verify</h1><br>
          <a>Vær vennlig å bekreft identiteten din med BankID</a>
          

          <br></br>

          <br><br>
          <a href="/login" onclick="window.open('/login', 'newwindow', 'width=600,height=500'); return false;">
             <button>Login</button>
          </a>

        </center>
        </div>
        </div>
        </body>  
        </html>
      `)
    }
  }
  
exports.logoutPage = () => {
  return async (req, res) => {
    res.send(`
        <html>
        <center>
          <br><br>
          <p>You are now logged out</p>
          <br><br>
          <a href="/login">Login</a>
        </center>  
        </html>
      `)
  }
}

exports.TeamsfirstPage = () => {
  return async (req, res) => {
    res.send(`
    <!DOCTYPE html>
<html lang="en">

<head>
    <title>Microsoft Teams Hello World Sample App</title>
    <link rel="stylesheet" type="text/css" href="/styles/msteams-16.css">
    <link rel="stylesheet" type="text/css" href="/styles/custom.css">
    <script src="https://unpkg.com/@microsoft/teams-js/dist/MicrosoftTeams.min.js" crossorigin="anonymous"></script>
    <script src="/scripts/teamsapp.js"></script>
</head>

<body class="theme-light">
  <div class="surface">
    <div class="panel">
      <div class="font-semibold font-title">Hello, World
        <p> Welcome to Microsoft Teams Hello World sample app (Node.js)</p>
        <br><br>
        <a href="/login" onclick="window.open('/login', 'newwindow', 'width=600,height=500'); return false;">
           <button>Login</button>
        </a>
      </div>
    </div>
  </div>
  </div>
</body>

</html>
  `)}
}

exports.AuthTab = () => {
  return async (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
      <title>
        Microsoft Teams Hello World Sample App
      </title>
      <link rel="stylesheet" type="text/css" href="/styles/msteams-16.css">
      </link>
      <link rel="stylesheet" type="text/css" href="/styles/custom.css">
      </link>
      <script src="https://unpkg.com/@microsoft/teams-js/dist/MicrosoftTeams.min.js" crossorigin="anonymous"></script>
      <script src="/scripts/teamsapp.js"></script>
    </head>
    
    <body class="theme-light">
      <div class="surface">
        <div class="panel">
          <div class="font-semibold font-title">This is our first tab
            <p> Welcome to Microsoft Teams Hello World sample app (Node.js)</p>
            <br><br>
            <a href="/login" onclick="window.open('/login', 'newwindow', 'width=600,height=500'); return false;">
               <button>Login</button>
            </a>
          </div>
        </div>
      </div>
      </div>
    </body>
    
    </html>
    `)}
}

exports.config = () => {
  return async (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
      <title>
        Microsoft Teams Hello World Sample App
      </title>
      <link rel="stylesheet" type="text/css" href="/styles/msteams-16.css">
      </link>
      <link rel="stylesheet" type="text/css" href="/styles/custom.css">
      </link>
      <script src="https://unpkg.com/@microsoft/teams-js/dist/MicrosoftTeams.min.js" crossorigin="anonymous"></script>
      <script src="/scripts/teamsapp.js"></script>
    </head>
    <body class="theme-light">
  <div class="surface">
    <div class="panel">
      <div class="font-semibold font-title">Configure your app here
        <p>
          <div>
            <label for="tabChoice"></label>Select the tab you would like to see:
            <select id="tabChoice" name="tabChoice">
              <option value="" selected="selected">(Select a tab)</option>
              <option value="first">First</option>
              <option value="second">Second</option>
            </select>
          </div>
        </p>
      </div>
    </div>
  </div>
  </div>
</body>

</html>
    `)
  }
}