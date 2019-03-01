'use strict';

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
