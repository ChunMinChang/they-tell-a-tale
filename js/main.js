'use strict';

(function(aExports) {
  const DEBUG = true;

  function debug(aMsg) {
    DEBUG && console.log('[main.js] ' + aMsg);
  }

  // Polyfill for Safari
  if (!navigator.languages) {
    var language = navigator.language.split('-', 2);
    if (language[1].length == 2) {
      language = language[0].toLowerCase() + '-' + language[1].toUpperCase();
    } else {
      language = language[0].toLowerCase() + '-' +
        language[1].charAt(0).toUpperCase() +
        language[1].substring(1).toLowerCase();
    }
    navigator.languages = [language];
  }
  debug('language: ' + navigator.languages);

  aExports.ready = function(aHandler) {
    var handled = false;
    function wrapper() {
      if (!handled) {
        handled = true;
        document.removeEventListener('DOMContentLoaded', wrapper);
        document.removeEventListener('load', wrapper);
        debug('page is ready.');
        aHandler();
      }
    }
    document.addEventListener('DOMContentLoaded', wrapper);
    document.addEventListener('load', wrapper);
  };

}(window));
