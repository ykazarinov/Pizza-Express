import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import NotFoundBlock from '../components/NotFoundBlock';
import { onChooseLang } from '../redux/lang/slice';
import { LangEnum } from '../redux/lang/types';

const NotFound: React.FC = () => {
  const dispatch = useDispatch();
  const { lang } = useParams();
  React.useEffect(() => {
    dispatch(onChooseLang(lang as LangEnum));
  }, []);
  return <NotFoundBlock />;
};

export default NotFound;
