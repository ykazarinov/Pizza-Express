export enum LangEnum {
  ENG = 'en',
  FR = 'fr',
}

export interface LangSliceState {
  actualLang: LangEnum;
  isVisibleLangPopup: boolean;
}
