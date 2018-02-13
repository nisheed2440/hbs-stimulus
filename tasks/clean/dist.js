const del = require('del');

module.exports = {
  fn: function () {
    return del(['dist']);
  }
};