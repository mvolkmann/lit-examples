function toggleSwitch(targetId, label, checked, callback) {
  const template = document.getElementById('toggle-switch-template');
  const clone = template.content.cloneNode(true); // deep
  const labelSpan = clone.querySelector('.label');
  labelSpan.textContent = label;
  const input = clone.querySelector('[type=checkbox]');
  input.checked = checked;
  input.addEventListener('change', callback);

  const target = document.getElementById(targetId);
  target.appendChild(clone);
}

window.onload = () => {
  toggleSwitch('target1', 'Bluetooth', true, e => {
    console.log('Bluetooth:', e.target.checked);
  });
  toggleSwitch('target2', 'Wifi', false, e => {
    console.log('Wifi:', e.target.checked);
  });
};
