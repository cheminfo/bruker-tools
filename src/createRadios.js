'use strict';

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
