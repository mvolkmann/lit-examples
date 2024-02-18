export class GreetMessage extends HTMLElement {
  constructor() {
    super();

    const name = this.getAttribute('name');
    if (!name) throw new Error('name is a required attribute');

    // Approach #1
    // Using shadow DOM is not required.
    /*
    const div = document.createElement('div');
    div.textContent = `Hello, ${name}!`;
    div.style.color = 'purple';
    this.appendChild(div);
    */

    // Approach #2
    /*
    const div = document.createElement('div');
    div.textContent = `Hello, ${name}!`;
    div.style.color = 'purple';

    // The "mode" option is required and the recommended value is "open".
    // When set to "open", `this.shadowRoot` is set.
    // When set to "closed", it is not.
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(div);
    */

    // Approach #3
    this.attachShadow({mode: 'open'});
    this.render();
  }

  static get observedAttributes() {
    return ['name'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'name') this.render();
  }

  override render() {
    const name = this.getAttribute('name');
    this.shadowRoot.innerHTML = `
      <style>
        div { color: var(--greet-message-color, purple); }
      </style>
      <div>Hello, ${name}!</div>
    `;
  }
}
customElements.define('greet-message3', GreetMessage);
