import {html, LitElement} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';

@customElement('state-changes')
export class StateChanges extends LitElement {
  @property() p = '';
  @state() s = 'initial';
  v = 'non-reactive';

  changeP() {
    this.p = 'changed';
  }

  changeS() {
    this.s = 'changed';
  }

  changeV() {
    this.v = 'changed';
    console.log('state-changes.ts changeV: v =', this.v);
    // v is not a reactive property,
    // so the change won't trigger a call to render.
    this.requestUpdate();
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
      <div>
        v: ${this.v}
        <button @click=${this.changeV}>Change</button>
      </div>
    `;
  }
}
