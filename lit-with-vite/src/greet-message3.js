export class GreetMessage3 extends HTMLElement {
  constructor() {
    super();

    const name = this.getAttribute('name');
    if (!name) throw new Error('name is a required attribute');

    const div = document.createElement('div');
    div.textContent = `Hello, ${name}!`;
    div.style.color = 'purple';

    /*
    const shadow = this.attachShadow({mode: 'open'});
    shadow.appendChild(div);
    */
    // Using shadow DOM is not required.  We can replace
    // the previous two lines with the following.
    this.appendChild(div);
  }
}
customElements.define('greet-message3', GreetMessage3);
