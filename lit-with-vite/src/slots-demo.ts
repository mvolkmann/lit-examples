import {html, LitElement} from 'lit';
import {customElement, queryAssignedElements} from 'lit/decorators.js';

@customElement('slots-demo')
export class SlotsDemo extends LitElement {
  @queryAssignedElements({
    // selector: 'li'
    slot: 'lunch'
  })
  lunchSlot!: HTMLElement[];
  @queryAssignedElements()
  defaultSlot!: HTMLElement[];

  override connectedCallback(): void {
    super.connectedCallback();
    console.log('slots-demo.ts : this.defaultSlot =', this.lunchSlot);
    console.log('slots-demo.ts : this.lunchSlot =', this.lunchSlot);
    for (const option of this.lunchSlot) {
      option.style.color = 'red';
    }
  }

  render() {
    return html`
      <div>
        <h2><slot></slot></h2>
        <h3>Breakfast</h3>
        <slot name="breakfast">No breakfast options</slot>
        <h3>Lunch</h3>
        <slot name="lunch">No lunch options</slot>
        <h3>Dinner</h3>
        <slot name="dinner">No dinner options</slot>
      </div>
    `;
  }
}
