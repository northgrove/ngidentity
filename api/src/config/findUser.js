exports.users = []

// SEARCH FOR USER IN STORE
exports.findByOid = function(oid, fn) {
  for (let i = 0, len = exports.users.length; i < len; i++) {
    var user = exports.users[i]
    if (user.oid === oid) {
      return fn(null, user)
    }
  }
  return fn(null, null)
}

exports.isuserloggedin = (userguid) => {
      console.log("sjekker bruker")
     for (let i = 0, len = exports.users.length; i < len; i++) {
      var user = exports.users[i]
      console.log("user:", user)
      console.log("userguid:", userguid)
      if (user.userguid == userguid) {
        return('OK')
      } 
    
    }
  }


exports.isuserloggedin2 = () => {
  return async (req, res) => {

    res.status(200).send(user)
  }
}