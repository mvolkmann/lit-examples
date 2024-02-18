import {css, html, LitElement, type PropertyValueMap} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('greet-message')
export class GreetMessage extends LitElement {
  @property({
    hasChanged(newVal: string, oldVal: string) {
      console.log('hasChanged for name: newVal:', newVal);
      console.log('hasChanged for name: oldVal:', oldVal);
      // Only allow the change if the length is more than 1.
      return newVal.length > 1;
    }
  })
  name = '';

  @property({type: Boolean}) shout = false;

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ): void {
    super.attributeChangedCallback(name, oldValue, newValue);
    console.log('attributeChangedCallback: name =', name);
    console.log('attributeChangedCallback: oldValue =', oldValue);
    console.log('attributeChangedCallback: newValue =', newValue);
  }

  render() {
    if (!this.name) throw new Error('name is a required attribute');
    let message = `Hello, ${this.name}!`;
    if (this.shout) message = message.toUpperCase();
    return html`
      <div>${message}!</div>
      <button @click=${this.handleClick}>Update</button>
    `;
  }

  async handleClick() {
    console.log('handleClick: entered');
    this.name = 'changed';
    // this.requestUpdate();
    // await this.updateComplete; // a Promise
    // this.dispatchEvent(new Event('my-custom-event', {bubbles: true, detail: 19}));
  }

  // getUpdateComplete() {}

  // hasUpdated() {}

  // performUpdate() {}

  // This is called before `willUpdate`.
  shouldUpdate(changedProperties: PropertyValueMap<any>) {
    // no need to call super
    console.log('shouldUpdate: changedProperties =', changedProperties);
    return true;
  }

  // This is called before `update`.
  willUpdate(changedProperties: PropertyValueMap<any>) {
    // no need to call super
    console.log('willUpdate : changedProperties =', changedProperties);
  }

  // This is rarely implemented.  The super method calls `render`.
  update(changedProperties: PropertyValueMap<any>) {
    super.update(changedProperties); // must call this
    console.log('update: changedProperties =', changedProperties);
  }

  // This is called after the first call to `update`.
  firstUpdated(changedProperties: PropertyValueMap<any>) {
    // no need to call super
    console.log('firstUpdated: changedProperties =', changedProperties);
  }

  updated(changedProperties: PropertyValueMap<any>) {
    // no need to call super
    console.log('updated: changedProperties =', changedProperties);
  }

  static styles = css`
    :host {
      color: purple;
    }
  `;
}
