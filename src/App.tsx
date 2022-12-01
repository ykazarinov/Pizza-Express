import Loadable from 'react-loadable';
import './scss/app.scss';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

import MainLayout from './layouts/MainLayout';
import FullPizzaSkeleton from './pages/FullPizza/Skeleton';

import { Oval } from 'react-loader-spinner';

const loaderEl = (
  <div className="loading-container">
    <Oval
      height={80}
      width={80}
      color="#fe5f1e"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#ffdf8c"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  </div>
);

const Cart = Loadable({
  loader: () => import(/* webpackChunkName: "Cart" */ './pages/Cart'),
  loading: () => loaderEl,
});

const FullPizza = Loadable({
  loader: () => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza/index'),
  loading: () => <FullPizzaSkeleton />,
});

const NotFound = Loadable({
  loader: () => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'),
  loading: () => loaderEl,
});

// const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'));
// const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza'));
// const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'));
// export const SearchContext = React.createContext();

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="cart"
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <Cart />
            </React.Suspense>
          }
        />
        <Route
          path="pizza/:id"
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <FullPizza />
            </React.Suspense>
          }
        />
        <Route
          path="*"
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <NotFound />
            </React.Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
