import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('lifecycle-demo')
export class LifecycleDemo extends LitElement {
  @property() text = '';

  changeText() {
    this.text = 'changed';
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
        p: ${this.text}
        <button @click=${this.changeText}>Change</button>
      </div>
    `;
  }
}
