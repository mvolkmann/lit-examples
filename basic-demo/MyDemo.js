import {html, LitElement} from './lit-core.min.js';

export class MyDemo extends LitElement {
  render() {
    return html`<h1>Hello World</h1>`;
  }
}

customElements.define('my-demo', MyDemo);
