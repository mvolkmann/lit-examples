/**
 * To customize the styling, set these CSS variables:
 *
 * --label-color: purple;
 * --off-bg: red;
 * --on-bg: blue;
 * --padding: 1rem;
 * --switch-height: 4rem;
 * --thumb-bg: yellow;
 * --transition-duration: 1s;
 */
import {css, html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('toggle-switch-lit')
export class ToggleSwitch extends LitElement {
  @property() label = '';
  @property({type: Boolean}) checked = false;

  render() {
    return html`
      <label>
        <input
          class="thumb"
          type="checkbox"
          ?checked=${this.checked}
          @change=${this.handleChange}
        />
        <div class="switch"></div>
        <span class="label" part="label">${this.label}</span>
      </label>
    `;
  }

  handleChange(event: Event) {
    // @ts-ignore
    const {checked} = event.target;
    const newEvent = new CustomEvent('toggle', {detail: {checked}});
    this.dispatchEvent(newEvent);
  }

  static styles = css`
    label {
      --use-padding: var(--padding, 0.25rem);
      --use-switch-height: var(--switch-height, 2rem);
      --switch-width: calc(var(--use-switch-height) * 1.8);
      --thumb-size: calc(var(--use-switch-height) - var(--use-padding) * 2);
      --use-transition-duration: var(--transition-duration, 0.3s);

      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--label-color, black);
      cursor: pointer;
    }

    .switch {
      background-color: var(--off-bg, gray);
      border-radius: calc(var(--use-switch-height) / 2);
      height: var(--use-switch-height);
      position: relative;
      transition: background var(--use-transition-duration);
      width: var(--switch-width);

      /* This renders the thumb.
        It is absolutely positioned inside the switch. */
      &:before {
        content: '';
        background-color: var(--thumb-bg, lightgray);
        border-radius: 50%;
        transition: left var(--use-transition-duration);

        position: absolute;
        top: var(--use-padding);
        left: var(--use-padding); /* unchecked position */

        width: var(--thumb-size);
        height: var(--thumb-size);
      }

      /* The thumb is a preceding sibling of the switch. */
      .thumb:checked + & {
        background-color: var(--on-bg, green);
        &:before {
          /* checked position */
          left: calc(
            var(--switch-width) - var(--use-switch-height) + var(--use-padding)
          );
        }
      }
    }

    /* The thumb input is only used to hold the checked state.
        It is not rendered. Instead, the before content of the switch
        is used for the thumb. */
    .thumb {
      position: absolute;
      visibility: hidden;
    }
  `;
}
