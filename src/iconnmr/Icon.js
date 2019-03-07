'use strict';

const FileSaver = require('file-saver');

const createSelect = require('../createSelect.js');
const createRadios = require('../createRadios.js');
const createCheckboxes = require('../createCheckboxes.js');
const formToJSON = require('../formToJSON');

const generateFile = require('./generateFile');

function Icon(prefs, options = {}) {
  this.instrument = prefs.instrument || 'NMR spectrometer';
  this.solvents = prefs.solvents || [];
  this.experiments = prefs.experiments || [];
  this.composites = prefs.composites || [];
  this.startElement = options.startID
    ? document.getElementById(options.startID)
    : undefined;
  this.instrumentElement = options.instrumentID
    ? document.getElementById(options.instrumentID)
    : undefined;
  this.formElement = options.formID
    ? document.getElementById(options.formID)
    : undefined;
  this.iconTextElement = options.iconTextID
    ? document.getElementById(options.iconTextID)
    : undefined;
  this.errosElement = options.errorsID
    ? document.getElementById(options.errorsID)
    : undefined;
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

Icon.prototype.createExperimentCheckboxes = function createExperimentCheckboxes(
  id
) {
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
  }

  // need to convert form to requests
  // we check if all the experiments have the priority flag
  let priority = this.isPriority(form.experiments);
  let request = {
    solvent: form.solvent,
    holder: form.holder,
    user: form.user,
    name: `${form.user} ${form.code} ${form.batch}`,
    experiments: form.experiments.map((value) => {
      return { experiment: value, priority };
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
  FileSaver.saveAs(
    blob,
    `${this.form.user}_${this.form.code}_${this.form.batch}.txt`
  );

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
