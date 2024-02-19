import {html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {
  configureLocalization,
  localized,
  msg,
  str,
  updateWhenLocaleChanges
} from '@lit/localize';

import {sourceLocale, targetLocales} from './generated/locale-codes.js';

export const {getLocale, setLocale} = configureLocalization({
  sourceLocale,
  targetLocales,
  loadLocale: locale => import(`./generated/locales/${locale}.ts`)
});

//TODO: Should including the next line make the call
//TODO: to `updateWhenLocaleChanges(this)` unnecessary?
// @localized()
@customElement('localize-demo')
export class LocalizeDemo extends LitElement {
  @property() color = 'red';

  constructor() {
    super();
    console.log('localize-demo.ts : targetLocales =', targetLocales);
    updateWhenLocaleChanges(this);
  }

  changeLocale(e: Event) {
    const select = e.target as HTMLSelectElement;
    setLocale(select.value);
  }

  override render() {
    const locale = getLocale();
    const text = msg(str`My favorite color is ${this.color}.`);
    return html`
      <select @change=${this.changeLocale}>
        <option>en</option>
        <option>es-419</option>
        <option>zh-Hans</option>
      </select>
      <div>${text}</div>
    `;
  }
}
