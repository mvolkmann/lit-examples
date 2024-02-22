const css = `
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

export class ToggleSwitch extends HTMLElement {
  constructor() {
    super();

    const label = this.getAttribute('label');
    const checked = this.getAttribute('checked');

    this.attachShadow({mode: 'open'});

    /** @type {ShadowRoot} */
    const root = this.shadowRoot!;

    root.innerHTML = `
      <style>${css}</style>
      <label>
        <input
          class="thumb"
          type="checkbox"
          checked=${checked}
          @change=${this.handleChange}
        />
        <div class="switch"></div>
        <span class="label" part="label">${label}</span>
      </label>
    `;

    const checkbox = root.querySelector('input');
    checkbox?.addEventListener('change', this.handleChange.bind(this));
  }

  handleChange(event: Event) {
    /** @type {ShadowRoot} */
    const root = this.shadowRoot!;

    // @ts-ignore
    const {checked} = event.target;
    const newEvent = new CustomEvent('toggle', {
      composed: true,
      detail: {checked}
    });
    root.dispatchEvent(newEvent);
  }
}
customElements.define('toggle-switch-wc', ToggleSwitch);