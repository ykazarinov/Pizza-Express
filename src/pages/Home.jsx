import React from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Pizzablock from '../components/Pizzablock';
import Skeleton from '../components/Pizzablock/Skeleton';
import Pagination from '../components/Pagination';

import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage } from '../redux/slices/paginationSlice';

import { setCategoryId } from '../redux/slices/filterSlice';
import { onChooseSort } from '../redux/slices/sortSlice';

import { sortValues } from '../components/Sort';

export default function Home() {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const dispatch = useDispatch();

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const navigate = useNavigate();

  const currentPage = useSelector((state) => state.pagination.currentPage);
  const sortType = useSelector((state) => state.sort.sortType);
  const searchValue = useSelector((state) => state.search.searchValue);
  const categoryId = useSelector((state) => state.filter.categoryId);

  const isDescending = useSelector((state) => state.sort.isDescending);

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

      console.log(sort);
      dispatch(setCategoryId(params.categoryId));
      dispatch(setCurrentPage(params.currentPage));
      dispatch(onChooseSort(sort));

      isSearch.current = true;
    }
  }, []);

  const fetchPizzas = () => {
    setIsLoading(true);
    const search = searchValue ? `&search=${searchValue}` : '';
    const direction = isDescending ? '&order=desc' : '&order=asc';

    axios
      .get(
        `https://63692f3815219b849611dc7a.mockapi.io/items?page=${currentPage}&limit=4&${
          categoryId > 0 ? `category=${categoryId}` : ''
        }&sortBy=${sortType.sort}${direction}${search}`,
      )
      .then((res) => {
        setPizzas(res.data);
        setIsLoading(false);
      });
  };

  // If it was first render, then we ask pizzas from API
  React.useEffect(() => {
    // fetchPizzas();
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage, isDescending]);

  const filteredPizzas = pizzas
    // .filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
    .map((obj) => <Pizzablock key={obj.id} {...obj} />);
  const skeletons = [...new Array(9)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas && filteredPizzas}</div>
      <Pagination onChangePage={(number) => dispatch(setCurrentPage(number))} />
    </div>
  );
}
