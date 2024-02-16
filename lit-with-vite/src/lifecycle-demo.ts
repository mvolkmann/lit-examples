import {LitElement, html} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';

@customElement('lifecycle-demo')
export class LifecycleDemo extends LitElement {
  @property() p = '';
  @state() s = 'initial';

  changeP() {
    this.p = 'changed';
  }

  changeS() {
    this.s = 'changed';
  }

  constructor() {
    super();
    console.log('constructor entered');
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null
  ): void {
    console.log(`${name} changed from ${oldValue} to ${newValue}`);
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  connectedCallback(): void {
    super.connectedCallback();
    console.log('connectedCallback entered');
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    console.log('disconnectedCallback entered');
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
