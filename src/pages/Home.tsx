import React from 'react';
import { Categories, Sort, Pizzablock, PizzablockSkeleton, Pagination } from '../components';

import qs from 'qs';
import { useNavigate, useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { setCurrentPage } from '../redux/pagination/slice';

import { setCategoryId } from '../redux/filter/slice';
import { onChooseSort, setOrder } from '../redux/sort/slice';

import { setSearchValue } from '../redux/search/slice';
import { useAppDispatch } from '../redux/store';
import { selectPaginationCurrentPage } from '../redux/pagination/selectors';
import { selectIsDescending, selectSortType } from '../redux/sort/selectors';
import { selectSearchValue } from '../redux/search/selectors';
import { selectFilterCategoryId } from '../redux/filter/selectors';
import { selectPizzaData } from '../redux/pizza/selectors';
import { fetchPizzas } from '../redux/pizza/asyncActions';
import { FetchPizzasArgs } from '../redux/pizza/types';
import { selectActualLang } from '../redux/lang/selectors';
import { onChooseLang } from '../redux/lang/slice';
import { LangEnum } from '../redux/lang/types';
import getLangData from '../utils/getLangData';
import { SortPropertyEnum, SortType } from '../redux/sort/types';

const Home: React.FC = () => {
  // const [pizzas, setPizzas] = React.useState([]);

  const { lang } = useParams();

  const [isLoading, setIsLoading] = React.useState(false);

  const dispatch = useAppDispatch();

  const actualLang = useSelector(selectActualLang);
  const langData = getLangData(actualLang);

  const sortValues: SortType[] = [
    { name: langData?.inscription.sortItems[0], sortProperty: SortPropertyEnum.RATING },
    { name: langData?.inscription.sortItems[1], sortProperty: SortPropertyEnum.PRICE },
    { name: langData?.inscription.sortItems[2], sortProperty: SortPropertyEnum.TITLE },
  ];

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const navigate = useNavigate();

  const currentPage = useSelector(selectPaginationCurrentPage);
  const sortType = useSelector(selectSortType);
  const searchValue = useSelector(selectSearchValue);
  const categoryId = useSelector(selectFilterCategoryId);

  const { items, status } = useSelector(selectPizzaData);

  const isDescending = useSelector(selectIsDescending);

  React.useEffect(() => {
    dispatch(onChooseLang(lang as LangEnum));
  }, []);

  // if we changed parameters and it was first render
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType.sortProperty,
        categoryId,
        currentPage,
        order: isDescending ? 'desc' : 'asc',
        search: searchValue,
      });

      navigate(`?${queryString}`);
    }

    if (!window.location.search) {
      // console.log('1');
      // dispatch(fetchPizzas({} as FetchPizzasArgs));
    }
    isMounted.current = true;
  }, [categoryId, sortType, searchValue, currentPage, isDescending]);

  // if the first render was made then we check URL-parameters and save in Redux
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortValues.find((obj) => obj.sortProperty === params.sortProperty);
      // console.log('sdfsdf');
      const order = params.order === 'desc' ? true : false;

      params.categoryId && dispatch(setCategoryId(Number(params.categoryId)));
      params.currentPage && dispatch(setCurrentPage(Number(params.currentPage)));
      sort && dispatch(onChooseSort(sort));
      params.order && dispatch(setOrder(order));
      params.search && dispatch(setSearchValue(String(params.search)));

      isSearch.current = true;
    }
  }, []);

  const getPizzas = async () => {
    setIsLoading(true);

    const search = searchValue ? searchValue : '';
    const direction = isDescending ? '&order=desc' : '&order=asc';

    dispatch(fetchPizzas({ search, direction, currentPage, categoryId, sortType }));
  };

  // If it was first render, then we ask pizzas from API
  React.useEffect(() => {
    // fetchPizzas();
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      console.log('3');
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage, isDescending]);

  const filteredPizzas = items.map((obj: any) => <Pizzablock key={obj.id} {...obj} />);
  const skeletons = [...new Array(9)].map((_, i) => <PizzablockSkeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort value={sortType} />
      </div>
      <h2 className="content__title">{langData?.inscription.homePage.title}</h2>
      {status === 'error' ? (
        <div className="content__error_info">
          <h2>{langData?.inscription.loadingError.title}</h2>
          <p>{langData?.inscription.loadingError.text}</p>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading' ? skeletons : items && filteredPizzas}
        </div>
      )}

      <Pagination
        onChangePage={(page: number) => {
          dispatch(setCurrentPage(page));
        }}
      />
    </div>
  );
};

export default Home;
