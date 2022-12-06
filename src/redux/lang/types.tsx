export enum LangEnum {
  ENG = 'en',
  FR = 'fr',
}

export enum CurrencyEnum {
  EUR = 'eur',
  USD = 'usd',
}

export interface LangSliceState {
  actualLang: LangEnum;
  isVisibleLangPopup: boolean;
  actualCurrency: CurrencyEnum;
  isVisibleCurrencyPopup: boolean;
}
