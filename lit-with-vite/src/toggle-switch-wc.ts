export class ToggleSwitchWC extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({mode: 'open'});
    const root = this.shadowRoot!;
    root.innerHTML = `
      <style>${ToggleSwitchWC.styles}</style>
      <label>
        <input class="thumb" type="checkbox" />
        <div class="switch"></div>
        <span class="label"></span>
      </label>
    `;

    const checkbox = root.querySelector('input');
    checkbox?.addEventListener('change', this.handleChange.bind(this));
  }

  static get observedAttributes() {
    return ['checked', 'label'];
  }

  // This is handled automatically for @property values in Lit.
  attributeChangedCallback(
    name: string,
    _: string | null,
    newValue: string | null
  ) {
    const root = this.shadowRoot!;
    if (name === 'checked') {
      const checkbox = root.querySelector('input');
      if (checkbox) {
        if (newValue === null) {
          checkbox.removeAttribute('checked');
        } else {
          checkbox.setAttribute('checked', 'checked');
        }
      }
    } else if (name === 'label') {
      const span = root.querySelector('.label');
      if (span) span.textContent = newValue;
    }
  }

  handleChange(event: Event) {
    /** @type {ShadowRoot} */
    const root = this.shadowRoot!;

    // @ts-ignore
    const {checked} = event.target;
    const newEvent = new CustomEvent('toggle', {detail: {checked}});
    this.dispatchEvent(newEvent);
  }

  static styles = `
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

customElements.define('toggle-switch-wc', ToggleSwitchWC);
