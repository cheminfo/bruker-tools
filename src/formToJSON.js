'use strict';

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
