'use strict';

/**
 * @param {array} [requests]
 * @param {object} [options={}]
 * @param {string} [options.eol='\r\n'] end of line delimiter
 * @param {boolean} [options.deleteExistingHolder=false]  flag specifying if existing experiments should be deleted
 * @param {number} [options.plateNumber=1] the position of the plate
 * @param {boolean} [options.autoSubmit=false]
 */

function generateFile(requests, options = {}) {
  const {
    eol = '\r\n',
    plateNumber = 1,
    deleteExistingHolder = false,
    autoSubmit = false
  } = options;

  var textFile = [];

  if (!Array.isArray(requests)) requests = [requests];

  for (var request of requests) {
    var holder = request.holder || getHolder(request.position, plateNumber);
    var experimentNumber =
      request.experimentNumber || request.position
        ? getExperimentNumber(request.position)
        : 1;
    if (deleteExistingHolder) {
      textFile.push(`USER ${request.user}`);
      textFile.push(`HOLDER ${holder}`);
      textFile.push('DELETE'); // this is required to delete already existing entries
    }
    textFile.push(`USER ${request.user}`);
    textFile.push(`HOLDER ${holder}`);
    if (!autoSubmit) textFile.push('NO_SUBMIT');
    textFile.push(`NAME ${request.name}`);
    textFile.push(`TITLE ${request.title || request.name}`);
    for (var experiment of request.experiments) {
      textFile.push(`EXPNO ${experimentNumber++}`);
      textFile.push(`SOLVENT ${experiment.solvent || request.solvent}`);
      textFile.push(`EXPERIMENT ${experiment.experiment}`);
      if (experiment.priority) {
        textFile.push('PRIORITY');
      }
      if (experiment.parameters && experiment.parameters.length > 0) {
        var parameters = [];
        for (var parameter of experiment.parameters) {
          parameters.push(parameter.label, parameter.value);
        }
        textFile.push(`PARAMETERS ${parameters.join(',')}`);
      }
    }
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
  return (
    numberToString(Math.floor(number / width) + 1) + ((number % width) + 1)
  );
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
    string = String.fromCharCode(((number - 1) % 26) + 65) + string;
    number = Math.floor((number - 1) / 26);
  }
  return string;
}

module.exports = generateFile;
