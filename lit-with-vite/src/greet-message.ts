import {css, html, LitElement, type PropertyValueMap} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';

@customElement('greet-message')
export class GreetMessage extends LitElement {
  @property({
    // This can validate proposed property value changes.
    hasChanged(newVal: string, oldVal: string) {
      console.log('hasChanged for name: changing from', oldVal, 'to', newVal);
      // Only allow the change if the length is more than 1.
      const valid = newVal.length > 1;
      console.log('hasChanged: valid =', valid);
      return valid;
    }
  })
  name = '';

  @property({type: Boolean}) shout = false;

  @query('#nameInput') nameInput!: HTMLInputElement;

  attributeChangedCallback(name: string, old: string, value: string): void {
    super.attributeChangedCallback(name, old, value);
    console.log(
      'attributeChangedCallback:',
      name,
      'changing from',
      old,
      'to',
      value
    );
  }

  render() {
    if (!this.name) throw new Error('name is a required attribute');
    let message = `Hello, ${this.name}!`;
    if (this.shout) message = message.toUpperCase();
    return html`
      <div>${message}</div>
      <input id="nameInput" size="20" type="text" />
      <button @click=${this.handleClick}>Update</button>
    `;
  }

  async handleClick() {
    console.log('handleClick: entered');
    console.log('handleClick: hasUpdated =', this.hasUpdated);
    console.log('handleClick: nameInput =', this.nameInput);
    this.name = this.nameInput.value;

    // These are useful when non-reactive properties are changed
    // and the UI should be updated.
    // this.requestUpdate(); // does an asynchronous update
    // this.performUpdate(); // does a synchronous update

    // This is a Promise used to wait for update to complete.
    // await this.updateComplete;

    // Sometimes it is desirable to dispatch a custom event
    // AFTER an update completes.
    // this.dispatchEvent(new Event(
    //   'my-custom-event',
    //   { bubbles: true, detail: 19 }
    // ));
  }

  // This is called before `willUpdate`.
  override shouldUpdate(changedProperties: PropertyValueMap<any>) {
    // no need to call super
    console.log('shouldUpdate: changedProperties =', changedProperties);
    return true;
  }

  // This is called before `update`.
  override willUpdate(changedProperties: PropertyValueMap<any>) {
    // no need to call super
    console.log('willUpdate : changedProperties =', changedProperties);
  }

  // This is rarely implemented.  The super method calls `render`.
  override update(changedProperties: PropertyValueMap<any>) {
    super.update(changedProperties); // must call this
    console.log('update: changedProperties =', changedProperties);
  }

  // This is called after the first call to `update`.
  override firstUpdated(changedProperties: PropertyValueMap<any>) {
    // no need to call super
    console.log('firstUpdated: changedProperties =', changedProperties);
  }

  override updated(changedProperties: PropertyValueMap<any>) {
    // no need to call super
    console.log('updated: changedProperties =', changedProperties);
  }

  static styles = css`
    :host {
      color: purple;
    }
  `;
}
