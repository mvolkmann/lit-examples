import {html, LitElement} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';

@customElement('state-changes')
export class StateChanges extends LitElement {
  @property() p = '';
  @state() s = 'initial';

  changeP() {
    this.p = 'changed';
  }

  changeS() {
    this.s = 'changed';
  }

  render() {
    return html`
      <div>
        p: ${this.p}
        <button @click=${this.changeP}>Change</button>
      </div>
      <div>
        s: ${this.s}
        <button @click=${this.changeS}>Change</button>
      </div>
    `;
  }
}
