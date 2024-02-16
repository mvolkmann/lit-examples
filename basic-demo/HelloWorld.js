import {html, LitElement} from './lit-core.min.js';

export class HelloWorld extends LitElement {
  render() {
    return html`<h1>Hello, World!</h1>`;
  }
}

customElements.define('hello-world', HelloWorld);
