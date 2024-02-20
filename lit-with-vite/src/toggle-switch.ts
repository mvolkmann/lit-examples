import {css, html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('toggle-switch')
export class ToggleSwitch extends LitElement {
  @property({type: Boolean}) checked = false;

  render() {
    this.shadowRoot.innerHTML = `
      <label>
        <input class="thumb" type="checkbox" />
        <div class="switch"></div>
        <span class="label">Bluetooth</span>
      </label>
    `;
  }

  static styles = css`
    label {
      --off-bg: gray;
      --on-bg: green;
      --padding: 0.25rem;
      --switch-height: 2rem;
      --switch-width: calc(var(--switch-height) * 1.8);
      --thumb-bg: lightgray;
      --thumb-size: calc(var(--switch-height) - var(--padding) * 2);
      --transition-duration: 0.3s;

      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
    }

    .switch {
      background-color: var(--off-bg);
      border-radius: calc(var(--switch-height) / 2);
      height: var(--switch-height);
      position: relative;
      transition: background var(--transition-duration);
      width: var(--switch-width);

      /* This render the thumb.
        It is absolutely positioned inside the switch. */
      &:before {
        content: '';
        background-color: var(--thumb-bg);
        border-radius: 50%;
        transition: left var(--transition-duration);

        position: absolute;
        top: var(--padding);
        left: var(--padding); /* unchecked position */

        width: var(--thumb-size);
        height: var(--thumb-size);
      }

      /* The thumb is a preceding sibling of the switch. */
      .thumb:checked + & {
        background-color: var(--on-bg);
        &:before {
          /* checked position */
          left: calc(
            var(--switch-width) - var(--switch-height) + var(--padding)
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
