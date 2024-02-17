import {css, html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('greet-message')
export class GreetMessage extends LitElement {
  @property() name = '';
  @property({type: Boolean}) shout = false;

  render() {
    if (!this.name) throw new Error('name is a required attribute');
    let message = `Hello, ${this.name}!`;
    if (this.shout) message = message.toUpperCase();
    return html`<div>${message}!</div>`;
  }

  static styles = css`
    :host {
      color: purple;
    }
  `;
}
