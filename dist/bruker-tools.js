/**
 * bruker-tools
 * @version v0.0.0
 * @link https://github.com/cheminfo/bruker-tools#readme
 * @license MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["BrukerTools"] = factory();
	else
		root["BrukerTools"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  Icon: __webpack_require__(1)
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const FileSaver = __webpack_require__(2);

const createSelect = __webpack_require__(4);

const createRadios = __webpack_require__(5);

const createCheckboxes = __webpack_require__(6);

const formToJSON = __webpack_require__(7);

const generateFile = __webpack_require__(8);

function Icon(prefs) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  this.instrument = prefs.instrument || 'NMR spectrometer';
  this.solvents = prefs.solvents || [];
  this.experiments = prefs.experiments || [];
  this.composites = prefs.composites || [];
  this.startElement = options.startID ? document.getElementById(options.startID) : undefined;
  this.instrumentElement = options.instrumentID ? document.getElementById(options.instrumentID) : undefined;
  this.formElement = options.formID ? document.getElementById(options.formID) : undefined;
  this.iconTextElement = options.iconTextID ? document.getElementById(options.iconTextID) : undefined;
  this.errosElement = options.errorsID ? document.getElementById(options.errorsID) : undefined;
  this.form = {};
}

Icon.prototype.setInstrument = function () {
  if (this.instrumentElement) {
    this.instrumentElement.innerHTML = this.instrument;
  }
};

Icon.prototype.createSolventSelect = function createSolventSelect(id) {
  createSelect(id, 'solvent', this.solvents);
};

Icon.prototype.createCompositeRadios = function createCompositeRadios(id) {
  createRadios(id, 'composite', this.composites);
};

Icon.prototype.createExperimentCheckboxes = function createExperimentCheckboxes(id) {
  createCheckboxes(id, 'experiments', this.experiments);
};

Icon.prototype.start = function start() {
  this.save();
  console.log('DONE');
};

Icon.prototype.monitorForm = function monitorForm(i) {
  this.formElement.addEventListener('keyup', () => {
    this.createTextFile();
  });
  this.formElement.addEventListener('click', () => {
    this.createTextFile();
  });
  this.createTextFile();
};

Icon.prototype.isPriority = function (arrayOfExperimentIDs) {
  let priority = true;

  for (let experimentID of arrayOfExperimentIDs) {
    for (let experiment of this.experiments) {
      if (experiment.label === experimentID) {
        priority &= experiment.priority;
        break;
      }
    }
  }

  return priority;
};

Icon.prototype.createTextFile = function createTextFile() {
  let form = formToJSON(this.formElement);
  this.form = form;
  let errors = [];

  if (!form.holder) {
    errors.push('Please specify the holder');
  }

  if (!form.user) {
    errors.push('Please specify a username');
  }

  if (!form.solvent) {
    errors.push('Please specify the solvent');
  }

  if (!form.code) {
    errors.push('Please specify a sample code');
  }

  if (!form.experiments && !form.composite) {
    errors.push('Please select at least one experiment');
  }

  if (!form.experiments) form.experiments = [];

  if (!Array.isArray(form.experiments)) {
    form.experiments = [form.experiments];
  }

  if (form.composite) form.experiments.unshift(form.composite);

  if (errors.length > 0) {
    this.errosElement.innerHTML = errors.join('<br>');
    this.startElement.style.display = 'none';
    return;
  } else {
    this.errosElement.innerHTML = '';
    this.startElement.style.display = 'block';
  } // need to convert form to requests
  // we check if all the experiments have the priority flag


  let priority = this.isPriority(form.experiments);
  let request = {
    solvent: form.solvent,
    holder: form.holder,
    user: form.user,
    name: `${form.code} ${form.batch}`,
    title: `user:${form.user}  code:${form.code} batch:${form.batch}`,
    experiments: form.experiments.map(value => {
      return {
        experiment: value,
        priority
      };
    })
  };
  let text = generateFile([request], {
    deleteExistingHolder: true,
    autoSubmit: true
  });
  this.iconTextElement.innerHTML = text;
  this.text = text;
};

Icon.prototype.save = function save() {
  var blob = new Blob([this.text], {
    type: 'text/plain;charset=utf-8'
  });
  FileSaver.saveAs(blob, `${this.form.user}_${this.form.code}_${this.form.batch}.txt`);

  if ($('#confirm').length) {
    var title;

    if ($('#confirm span').length) {
      title = $('#confirm span').text();
    }

    $('#confirm div').dialog({
      title: title,
      modal: true,
      open: () => {
        setTimeout(function () {
          window.location.reload();
        }, 5000);
      }
    });
  }
};

module.exports = Icon;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (a, b) {
  if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (b),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else {}
})(this, function () {
  "use strict";

  function b(a, b) {
    return "undefined" == typeof b ? b = {
      autoBom: !1
    } : "object" != typeof b && (console.warn("Deprecated: Expected third argument to be a object"), b = {
      autoBom: !b
    }), b.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type) ? new Blob(["\uFEFF", a], {
      type: a.type
    }) : a;
  }

  function c(b, c, d) {
    var e = new XMLHttpRequest();
    e.open("GET", b), e.responseType = "blob", e.onload = function () {
      a(e.response, c, d);
    }, e.onerror = function () {
      console.error("could not download file");
    }, e.send();
  }

  function d(a) {
    var b = new XMLHttpRequest();
    return b.open("HEAD", a, !1), b.send(), 200 <= b.status && 299 >= b.status;
  }

  function e(a) {
    try {
      a.dispatchEvent(new MouseEvent("click"));
    } catch (c) {
      var b = document.createEvent("MouseEvents");
      b.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), a.dispatchEvent(b);
    }
  }

  var f = "object" == typeof window && window.window === window ? window : "object" == typeof self && self.self === self ? self : "object" == typeof global && global.global === global ? global : void 0,
      a = f.saveAs || ("object" != typeof window || window !== f ? function () {} : "download" in HTMLAnchorElement.prototype ? function (b, g, h) {
    var i = f.URL || f.webkitURL,
        j = document.createElement("a");
    g = g || b.name || "download", j.download = g, j.rel = "noopener", "string" == typeof b ? (j.href = b, j.origin === location.origin ? e(j) : d(j.href) ? c(b, g, h) : e(j, j.target = "_blank")) : (j.href = i.createObjectURL(b), setTimeout(function () {
      i.revokeObjectURL(j.href);
    }, 4E4), setTimeout(function () {
      e(j);
    }, 0));
  } : "msSaveOrOpenBlob" in navigator ? function (f, g, h) {
    if (g = g || f.name || "download", "string" != typeof f) navigator.msSaveOrOpenBlob(b(f, h), g);else if (d(f)) c(f, g, h);else {
      var i = document.createElement("a");
      i.href = f, i.target = "_blank", setTimeout(function () {
        e(i);
      });
    }
  } : function (a, b, d, e) {
    if (e = e || open("", "_blank"), e && (e.document.title = e.document.body.innerText = "downloading..."), "string" == typeof a) return c(a, b, d);
    var g = "application/octet-stream" === a.type,
        h = /constructor/i.test(f.HTMLElement) || f.safari,
        i = /CriOS\/[\d]+/.test(navigator.userAgent);

    if ((i || g && h) && "object" == typeof FileReader) {
      var j = new FileReader();
      j.onloadend = function () {
        var a = j.result;
        a = i ? a : a.replace(/^data:[^;]*;/, "data:attachment/file;"), e ? e.location.href = a : location = a, e = null;
      }, j.readAsDataURL(a);
    } else {
      var k = f.URL || f.webkitURL,
          l = k.createObjectURL(a);
      e ? e.location = l : location.href = l, e = null, setTimeout(function () {
        k.revokeObjectURL(l);
      }, 4E4);
    }
  });
  f.saveAs = a.saveAs = a,  true && (module.exports = a);
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var g; // This works in non-strict mode

g = function () {
  return this;
}();

try {
  // This works if eval is allowed (see CSP)
  g = g || new Function("return this")();
} catch (e) {
  // This works if the window reference is available
  if (typeof window === "object") g = window;
} // g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}


module.exports = g;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function createSelect(id, name, array) {
  let target = document.getElementById(id);
  if (!target) throw new Error(`Element ${target} not found`);
  let select = document.createElement('select');
  select.name = name;
  select.id = name;

  for (let item of array) {
    let option = document.createElement('option');
    option.value = item.label;
    option.innerHTML = item.description;

    if (item.selected) {
      option.selected = 'selected';
    }

    select.appendChild(option);
  }

  target.innerHTML = '';
  target.appendChild(select);
}

module.exports = createSelect;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function createRadios(id, name, array) {
  let target = document.getElementById(id);
  target.innerHTML = '';
  if (!target) throw new Error(`Element ${target} not found`);

  for (let item of array) {
    let div = document.createElement('div');
    div.className = 'spaced';
    let input = document.createElement('input');
    input.type = 'radio';
    input.name = name;
    input.id = name;
    input.value = item.label;
    div.appendChild(input);
    div.appendChild(document.createTextNode(item.label));
    div.appendChild(document.createElement('br'));
    let explanation = document.createElement('span');
    explanation.className = 'explanation';
    explanation.appendChild(document.createTextNode(item.description));
    div.appendChild(explanation);
    target.appendChild(div);
  }
}

module.exports = createRadios;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function createCheckboxes(id, name, array) {
  let target = document.getElementById(id);
  target.innerHTML = '';
  if (!target) throw new Error(`Element ${target} not found`);

  for (let item of array) {
    let div = document.createElement('div');
    div.className = 'spaced';
    let input = document.createElement('input');
    input.type = 'checkbox';
    input.name = name;
    input.value = item.label;
    div.appendChild(input);
    div.appendChild(document.createTextNode(item.label));
    div.appendChild(document.createElement('br'));
    let explanation = document.createElement('span');
    explanation.className = 'explanation';
    explanation.appendChild(document.createTextNode(item.description));
    div.appendChild(explanation);
    target.appendChild(div);
  }
}

module.exports = createCheckboxes;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function formToJSON(form) {
  if (!form || form.nodeName !== 'FORM') {
    return;
  }

  let result = {};
  var i;
  var j;
  var q = [];

  for (i = form.elements.length - 1; i >= 0; i = i - 1) {
    if (form.elements[i].name === '') {
      continue;
    }

    switch (form.elements[i].nodeName) {
      case 'INPUT':
        switch (form.elements[i].type) {
          case 'text':
          case 'hidden':
          case 'number':
          case 'password':
          case 'button':
          case 'reset':
          case 'submit':
            setJpath(result, form.elements[i].name, form.elements[i].value);
            break;

          case 'checkbox':
            if (form.elements[i].checked) {
              setJpath(result, form.elements[i].name, form.elements[i].value);
            }

            break;

          case 'radio':
            if (form.elements[i].checked) {
              setJpath(result, form.elements[i].name, form.elements[i].value);
            }

            break;

          case 'file':
            break;

          default:
        }

        break;

      case 'TEXTAREA':
        setJpath(result, form.elements[i].name, form.elements[i].value);
        break;

      case 'SELECT':
        switch (form.elements[i].type) {
          case 'select-one':
            setJpath(result, form.elements[i].name, form.elements[i].value);
            break;

          case 'select-multiple':
            let values = [];

            for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
              if (form.elements[i].options[j].selected) {
                values.push(form.elements[i].options[j].value);
              }
            }

            setJpath(result, form.elements[i].name, values);
            break;

          default:
        }

        break;

      case 'BUTTON':
        switch (form.elements[i].type) {
          case 'reset':
          case 'submit':
          case 'button':
            setJpath(result, form.elements[i].name, form.elements[i].value);
            break;

          default:
        }

        break;

      default:
    }
  }

  return result;
}

function setJpath(object, jpath, value) {
  let parts = jpath.split('.');
  let current = object;

  for (let i = 0; i < parts.length; i++) {
    let part = parts[i];
    let nextPart = parts[i + 1];

    if (i === parts.length - 1) {
      if (current[part]) {
        if (!Array.isArray(current[part])) current[part] = [current[part]];
        current[part].push(value);
      } else {
        current[part] = value;
      }
    } else if (isNaN(nextPart)) {
      if (!current[part]) current[part] = {};
      current = current[part];
    } else {
      if (!current[part]) current[part] = [];
      current = current[part];
    }
  }
}

module.exports = formToJSON;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @param {array} [requests]
 * @param {object} [options={}]
 * @param {string} [options.eol='\r\n'] end of line delimiter
 * @param {boolean} [options.deleteExistingHolder=false]  flag specifying if existing experiments should be deleted
 * @param {number} [options.plateNumber=1] the position of the plate
 * @param {boolean} [options.autoSubmit=false]
 */

function generateFile(requests) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const _options$eol = options.eol,
        eol = _options$eol === void 0 ? '\r\n' : _options$eol,
        _options$plateNumber = options.plateNumber,
        plateNumber = _options$plateNumber === void 0 ? 1 : _options$plateNumber,
        _options$deleteExisti = options.deleteExistingHolder,
        deleteExistingHolder = _options$deleteExisti === void 0 ? false : _options$deleteExisti,
        _options$autoSubmit = options.autoSubmit,
        autoSubmit = _options$autoSubmit === void 0 ? false : _options$autoSubmit;
  var textFile = [];
  if (!Array.isArray(requests)) requests = [requests];

  for (var request of requests) {
    var holder = request.holder || getHolder(request.position, plateNumber);
    var experimentNumber = request.experimentNumber || request.position ? getExperimentNumber(request.position) : 1;

    if (deleteExistingHolder) {
      textFile.push(`USER ${request.user}`);
      textFile.push(`HOLDER ${holder}`);
      textFile.push('DELETE'); // this is required to delete already existing entries
    }

    textFile.push(`USER ${request.user}`);
    textFile.push(`HOLDER ${holder}`);
    if (!autoSubmit) textFile.push('NO_SUBMIT');
    textFile.push(`NAME ${request.name.replace(/ /g, '_')}`);

    for (var experiment of request.experiments) {
      textFile.push(`EXPNO ${experimentNumber++}`);

      if (experiment.priority) {
        textFile.push('PRIORITY');
      }

      textFile.push(`SOLVENT ${experiment.solvent || request.solvent}`);
      textFile.push(`EXPERIMENT ${experiment.experiment}`);
      textFile.push(`TITLE ${request.title || request.name}`);

      if (experiment.parameters && experiment.parameters.length > 0) {
        var parameters = [];

        for (var parameter of experiment.parameters) {
          parameters.push(parameter.label, parameter.value);
        }

        textFile.push(`PARAMETERS ${parameters.join(',')}`);
      }
    }

    textFile.push('END');
    textFile.push('');
  }

  return textFile.join(eol);
}

function getHolder(position, plateNumber) {
  return plateNumber * 100 + positionToNumber(position, 12);
}

function getExperimentNumber(position) {
  return positionToNumber(position, 12) * 10;
}
/*
 Convert 'A5' to
 */


function positionToNumber(position, width) {
  if (width === undefined) {
    throw Error('need to specify width for numberToPosition');
  }

  position = position.toUpperCase().replace(/[^0-9A-Z]/g, '');
  var string = position.replace(/[0-9]+/, '');
  var number = position.replace(/[A-Z]+/, '');
  return (stringToNumber(string) - 1) * width + number * 1;
}

function numberToPosition(number, width) {
  if (width === undefined) {
    throw Error('need to specify width for numberToPosition');
  }

  number--;
  return numberToString(Math.floor(number / width) + 1) + (number % width + 1);
}

function stringToNumber(string) {
  var number = 0;

  for (var i = 0; i < string.length; i++) {
    number *= 26;
    number += string.charCodeAt(i) - 64;
  }

  return number;
}

function numberToString(number) {
  var string = '';

  while (number != 0) {
    string = String.fromCharCode((number - 1) % 26 + 65) + string;
    number = Math.floor((number - 1) / 26);
  }

  return string;
}

module.exports = generateFile;

/***/ })
/******/ ]);
});
//# sourceMappingURL=bruker-tools.js.map