import {html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {
  configureLocalization,
  localized,
  msg,
  str,
  updateWhenLocaleChanges
} from '@lit/localize';

import {
  allLocales,
  sourceLocale,
  targetLocales
} from './generated/locale-codes.js';

export const {getLocale, setLocale} = configureLocalization({
  sourceLocale,
  targetLocales,
  loadLocale: locale => import(`./generated/locales/${locale}.ts`)
});

const languageMap = {
  en: 'English',
  es: 'Spanish',
  zh: 'Chinese'
};

const colorToLanguageMap = {
  red: {es: 'roja', zh: '红色'},
  blue: {es: 'azul', zh: '蓝色'},
  green: {es: 'verde', zh: '绿色'}
};

@customElement('localize-demo')
@localized()
export class LocalizeDemo extends LitElement {
  @property() color = 'red';
  options: string[] = [];

  constructor() {
    super();

    // The following line can be used in place of `@localized()` above.
    //updateWhenLocaleChanges(this);

    for (const locale of allLocales) {
      const prefix = locale.split('-')[0];
      const display = languageMap[prefix] || locale;
      this.options.push(html`<option value=${locale}>${display}</option>`);
    }
  }

  changeLocale(e: Event) {
    const select = e.target as HTMLSelectElement;
    setLocale(select.value);
  }

  override render() {
    const text = msg('My favorite color is');

    const localePrefix = getLocale().split('-')[0];
    const languageMap = colorToLanguageMap[this.color];
    const color = (languageMap && languageMap[localePrefix]) || this.color;

    return html`
      <select @change=${this.changeLocale}>
        ${this.options}
      </select>
      <div>${text} ${color}.</div>
    `;
  }
}
