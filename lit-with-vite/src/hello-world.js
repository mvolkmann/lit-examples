class HelloWorld extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.textContent = 'Hello, World!';
  }
}
customElements.define('hello-world', HelloWorld);
