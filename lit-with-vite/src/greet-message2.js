import {css, html, LitElement} from 'lit';

export class GreetMessage2 extends LitElement {
  static properties = {
    name: {type: String}
  };

  override render() {
    if (!this.name) throw new Error('name is a required attribute');
    return html`<div>Hello, ${this.name}!</div>`;
  }

  static styles = css`
    :host {
      color: purple;
    }
  `;
}
customElements.define('greet-message2', GreetMessage2);
