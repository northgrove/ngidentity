const oidc = require('oidc-client')

const manager = new oidc.UserManager({
    authority: "https://oidc-ver2.difi.no/idporten-oidc-provider",
    client_id: "713848d2-288c-45a3-ae33-3d8e1cd00de2",
    redirect_uri: "http://localhost:3000",
    silent_redirect_uri: "http://localhost:3000",
    post_logout_redirect_uri: "http://localhost:3000",
    response_type: "code",
    scope: "openid idporten:user.log.read",
    loadUserInfo: false
})

