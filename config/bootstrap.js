/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

let init = require('./init');
import moment from "moment";

module.exports.bootstrap = async(cb) => {
  try {
    sails.moment = moment;
    sails.services.passport.loadStrategies();
    await ElasticsearchService.init();
    await init.basicData();
    cb();
  } catch (e) {
    cb(e);
  }
};
