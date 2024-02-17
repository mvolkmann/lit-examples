export class GreetMessage3 extends HTMLElement {
  constructor() {
    super();

    const name = this.getAttribute('name');
    if (!name) throw new Error('name is a required attribute');

    /*
    const div = document.createElement('div');
    div.textContent = `Hello, ${name}!`;
    div.style.color = 'purple';
    */

    /*
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(div);
    */
    // Using shadow DOM is not required.  We can replace
    // the previous two lines with the following.
    // this.appendChild(div);

    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <div style="color: purple;">Hello, ${name}!</div>
    `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log('attributeChangedCallback: name =', name);
    console.log('attributeChangedCallback: oldValue =', oldValue);
    console.log('attributeChangedCallback: newValue =', newValue);
  }
}
customElements.define('greet-message3', GreetMessage3);
