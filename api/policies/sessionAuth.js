/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller
  console.log('==== session ====');
  console.log(req.body);

  if(typeof req.body != "undefined"){
    if(req.body.user) {
      let {user} = req.body;
      console.log('session user', user);
    }
    if(typeof user != "undefined"){
      UserService.userToSession(user, req);
    }
  }





  if (UserService.getLoginState(req)) {
    return next();
  }

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  return res.view('pages/403');
  // return res.redirect('/rest/auth/facebook')
};
