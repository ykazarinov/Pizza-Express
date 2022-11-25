import React from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Pizzablock from '../components/Pizzablock';
import Skeleton from '../components/Pizzablock/Skeleton';
import Pagination from '../components/Pagination';

import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectPaginationCurrentPage, setCurrentPage } from '../redux/slices/paginationSlice';

import { selectFilterCategoryId, setCategoryId } from '../redux/slices/filterSlice';
import {
  onChooseSort,
  selectIsDescending,
  selectSortType,
  setOrder,
} from '../redux/slices/sortSlice';

import { sortValues } from '../components/Sort';
import { fetchPizzas, FetchPizzasArgs, selectPizzaData } from '../redux/slices/pizzaSlice';
import { selectSearchValue, setSearchValue } from '../redux/slices/searchSlice';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  // const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const dispatch = useAppDispatch();

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const navigate = useNavigate();

  const currentPage = useSelector(selectPaginationCurrentPage);
  const sortType = useSelector(selectSortType);
  const searchValue = useSelector(selectSearchValue);
  const categoryId = useSelector(selectFilterCategoryId);

  const { items, status } = useSelector(selectPizzaData);

  const isDescending = useSelector(selectIsDescending);

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
      dispatch(fetchPizzas({} as FetchPizzasArgs));
    }
    isMounted.current = true;
  }, [categoryId, sortType, searchValue, currentPage, isDescending]);

  // if the first render was made then we check URL-parameters and save in Redux
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortValues.find((obj) => obj.sortProperty === params.sortProperty);
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
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage, isDescending]);

  const filteredPizzas = items.map((obj: any) => <Pizzablock key={obj.id} {...obj} />);
  const skeletons = [...new Array(9)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort value={sortType} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error_info">
          <h2>Pizza loading error</h2>
          <p>Failed to load pizzas. Please try again later</p>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading' ? skeletons : items && filteredPizzas}
        </div>
      )}

      <Pagination
        onChangePage={(page: number) => {
          // dispatch({ type: '111', payload: 3243 });
          dispatch(setCurrentPage(page));
        }}
      />
    </div>
  );
};

export default Home;
