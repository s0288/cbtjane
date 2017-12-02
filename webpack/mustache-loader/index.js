'use strict';

var loaderUtils = require('loader-utils');
var util = require('util');
var fs = require('fs');
var mustache = require('mustache');
var async = require('async');
var path = require('path');

function loadFileContent(file, callback) {
  var fullFilePath = file + '.mustache';
  fs.exists(fullFilePath, function (fileExists) {
    if (fileExists) {
      fs.readFile(fullFilePath, function (err, data) {
        if (!err) {
          callback(null, data.toString());
        } else {
          callback(err);
        }
      });
    } else {
      callback(util.format("'%s' not found", file));
    }
  });
}

var render = function render(templateHtml, partials, view) {
  partials = partials || {};
  try {
    var html;
    var replaceMustache = /\{\{[ ]*>[ ]*body[ ]*\}\}/;
    var keyReplace = 'tmpBodyHightTest';
    html = templateHtml.replace(replaceMustache, keyReplace);
    html = mustache.render(html, view, partials);
    html = html.replace(keyReplace, partials.body);
    // TODO
    return html;
  } catch (err) {
    return {
      err: err
    };
  }
};

var loadPartials = function loadPartials(options) {
  return function (strData, partials, callback) {
    /* eslint no-cond-assign: 0 */
    /* eslint no-use-before-define: 0 */
    var tasks = [];
    var partialsRegex = /{{\s*>\s*([\w/\-_$]+)\s*}}/g;
    var r = void 0;
    while ((r = partialsRegex.exec(strData)) != null) {
      tasks.push(collectFileContent(partials, r[1], options));
    }

    tasks.push(function (cb) {
      cb('end');
      callback();
    });

    async.series(tasks);
  };
};

var collectFileContent = function collectFileContent(partials, partialsName, options) {
  return function (cb) {
    var origin = options.origin;

    var pathOfView = path.join(origin, partialsName);
    loadFileContent(pathOfView, function (err, data) {
      /* eslint no-param-reassign: 0 */
      if (err) {
        partials[partialsName] = err;
        cb();
      } else {
        partials[partialsName] = data;

        loadPartials(options)(data, partials, function () {
          cb(null, partialsName);
        });
      }
    });
  };
};

function jsFriendlyJSONStringify(s) {
  return JSON.stringify(s).replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
}

var loadFile = function loadFile(pathview, options, cb) {
  fs.exists(pathview, function () {
    fs.readFile(pathview, function (err, data) {
      var htmlData = data.toString();
      var nested = { body: htmlData };
      loadPartials(options)(htmlData, nested, function () {
        cb(null, '\n          var mustache = require("mustache")\n\n          module.exports = {\n            render: function() {\n              var M = ' + render + '\n              return M.apply(null, [\'' + htmlData.replace(/(\r\n|\n|\r)/gm, '') + '\', ' + jsFriendlyJSONStringify(nested) + ', arguments[0]])\n            }\n          }\n        ');
      });
    });
  });
};

module.exports = function initiateLoader() {
  var callback = this.async();
  var options = loaderUtils.getOptions(this);
  options.origin = path.join(__dirname, '../../', options.origin);
  var pathview = this.resourcePath;

  loadFile(pathview, options, callback);
};
