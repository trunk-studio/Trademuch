 /**
  * Route Mappings
  * (sails.config.routes)
  *
  * Your routes map URLs to views and controllers.
  *
  * If Sails receives a URL that doesn't match any of the routes below,
  * it will check for matching files (images, scripts, stylesheets, etc.)
  * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
  * might match an image file: `/assets/images/foo.jpg`
  *
  * Finally, if those don't match either, the default 404 handler is triggered.
  * See `api/responses/notFound.js` to adjust your app's 404 logic.
  *
  * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
  * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
  * CoffeeScript for the front-end.
  *
  * For more information on configuring custom routes, check out:
  * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
  */

 module.exports.routes = {

   /***************************************************************************
    *                                                                          *
    * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
    * etc. depending on your default view engine) your home page.              *
    *                                                                          *
    * (Alternatively, remove this and add an `index.html` file in your         *
    * `assets` directory)                                                      *
    *                                                                          *
    ***************************************************************************/
   '/public': {
     view: 'landing/index'
   },

   '/map': {
     view: 'map'
   },

   '/termService': {
     view: 'landing/termService'
   },

   '/privacyPolicy': {
     view: 'landing/privacyPolicy'
   },

   '/specification': {
     view: 'landing/specification'
   },

   '/learnMore': {
     view: 'landing/learnMore'
   },

   // image
   'get /testUpload': 'ImageController.index',
   'post /api/uploadImage': 'ImageController.upload',
   'post /api/uploadImageBase64': 'ImageController.upload',


   // default app view
   'get /': 'MainController.pcOrMobile',
   'get /app': 'MainController.index',
   'get /app/*': 'MainController.index',

   // search view
   'get /search': {
     view: 'app'
   },
   'get /search/:keyword': 'MainController.indexBySearchKeyword',

   'get /user/hobby': 'FrontUserController.hobby',
   'get /user/favorites': 'FrontUserController.favorites',
   'get /user/profile': 'FrontUserController.profile',

   'get /post/create/Category': 'FrontPostController.createCategory',
   'get /post/create': 'FrontPostController.createByCategoryId',
   'get /post/:id': 'FrontPostController.show',

   //  api
   //  'get  /rest/auth/login': 'AuthController.login',
   //  'get  /rest/auth/logout': 'AuthController.logout',
   //  'get  /rest/auth/register': 'AuthController.register',
   //  'get  /rest/auth/status': 'AuthController.status',
   'post /rest/auth/local': 'AuthController.callback',
   'post /rest/auth/local/:action': 'AuthController.callback',
   'get  /rest/auth/:provider': 'AuthController.provider',
   'get  /rest/auth/:provider/callback': 'AuthController.callback',
   'get  /rest/auth/:provider/:action': 'AuthController.callback',
   'post /rest/auth/token': 'AuthController.token',

   'put  /rest/user': 'UserController.update',
   // 待捕齊
   // get /rest/user/:id': 'UserController.find',

   'get  /rest/favorites': 'FavoriteController.get',
   'post /rest/favorite/:id': 'FavoriteController.create',
   'delete /rest/favorite/:id': 'FavoriteController.delete',

   'post /rest/post/create': 'PostController.create',
   'get  /rest/post': 'PostController.getAll',
   'get  /rest/post/:id': 'PostController.getPostById',
  //  'get  /rest/post/search/sql/:keyword': 'PostController.sqlSearch',
  //  'get  /rest/post/search/:keyword': 'PostController.elasticSearch',
    'get  /rest/post/search/:keyword': 'PostController.sqlSearch',
   'delete  /rest/post/:postId': 'PostController.delete',
   // 待捕齊
   // get /rest/post/:id': 'PostController.find',

   'post /rest/image/upload': 'ImageController.upload',

   //===================================================================
   // chatroom view
  //  'get /chat/:postId': 'ChatController.chatView',
   'get /post/:postId/chat': 'ChatController.chatView',
   // chatroom - RoomController
   'get /rest/room/:postId/users': 'RoomController.list',
   'post /rest/room/:postId/users': 'RoomController.join',
   'put /rest/room/:postId/limit': 'RoomController.setLimit',
   'get /rest/room/:postId/limit': 'RoomController.getLimit',
   'delete /rest/room/:postId/users': 'RoomController.leave',
   // chatroom - ChatController
   'get /rest/chat/me': 'ChatController.getId',
   'post /rest/chat/:postId/public': 'ChatController.public',
   'post /rest/chat/:userId/private': 'ChatController.private',
   'post /rest/chat/:postId/announce': 'ChatController.announce',
   'get /rest/chat/:postId/history': 'ChatController.history',
   'post /rest/chat/announce': 'ChatController.announce'
     //==================================================================



   /***************************************************************************
    *                                                                          *
    * Custom routes here...                                                    *
    *                                                                          *
    * If a request to a URL doesn't match any of the custom routes above, it   *
    * is matched against Sails route blueprints. See `config/blueprints.js`    *
    * for configuration options and examples.                                  *
    *                                                                          *
    ***************************************************************************/

 };
