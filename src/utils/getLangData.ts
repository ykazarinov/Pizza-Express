import { LangEnum } from '../redux/lang/types';
import translate from '../assets/data/interface.json';

const getLangData = (actualLang: LangEnum) => {
  return translate.find((el) => el.lang === actualLang);
};

export default getLangData;
