import {html, LitElement} from 'lit';
import {customElement, property, queryAll, state} from 'lit/decorators.js';

@customElement('state-changes')
export class StateChanges extends LitElement {
  @property() p = '';
  @state() s = 'initial';
  v = 'non-reactive';
  @queryAll('button') buttons!: NodeList;

  changeP() {
    this.p = this.p === 'go' ? 'stop' : 'go';
    for (const node of this.buttons) {
      const button = node as HTMLButtonElement;
      button.style.color = this.p === 'go' ? 'green' : 'red';
    }
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
      <div id="p">
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
