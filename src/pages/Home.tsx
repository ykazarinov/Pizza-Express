import React from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Pizzablock from '../components/Pizzablock';
import Skeleton from '../components/Pizzablock/Skeleton';
import Pagination from '../components/Pagination';

import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { selectPaginationCurrentPage, setCurrentPage } from '../redux/slices/paginationSlice';

import { selectFilterCategoryId, setCategoryId } from '../redux/slices/filterSlice';
import { onChooseSort, selectIsDescending, selectSortType } from '../redux/slices/sortSlice';

import { sortValues } from '../components/Sort';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice';
import { selectSearchValue } from '../redux/slices/searchSlice';

const Home: React.FC = () => {
  // const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const dispatch = useDispatch();

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
        sortProperty: sortType.sort,
        categoryId,
        currentPage,
      });
      // console.log(queryString);
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, searchValue, currentPage, isDescending]);

  // if the first render was made then we check URL-parameters and save in Redux
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortValues.find((obj) => obj.sort === params.sortProperty);

      dispatch(setCategoryId(params.categoryId));
      dispatch(setCurrentPage(params.currentPage));
      dispatch(onChooseSort(sort));

      isSearch.current = true;
    }
  }, []);

  const getPizzas = async () => {
    setIsLoading(true);
    const search = searchValue ? `&search=${searchValue}` : '';
    const direction = isDescending ? '&order=desc' : '&order=asc';

    dispatch(
      //@ts-ignore
      fetchPizzas({ search, direction, currentPage, categoryId, sortType }),
    );
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

  const filteredPizzas = items
    // .filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
    .map((obj: any) => <Pizzablock key={obj.id} {...obj} />);
  const skeletons = [...new Array(9)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
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

      <Pagination onChangePage={(page: number) => dispatch(setCurrentPage(page))} />
    </div>
  );
};

export default Home;
