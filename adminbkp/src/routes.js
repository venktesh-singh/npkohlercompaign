import React, { Suspense, Fragment, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './ProtectedRoute'; // Import the ProtectedRoute component

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<Loader />}>
    <Routes>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Element = route.element;

        return (
          <Route
            key={i}
            path={route.path}
            element={
              <Guard>
                <Layout>{route.routes ? renderRoutes(route.routes) : <Element />}</Layout>
              </Guard>
            }
          />
        );
      })}
    </Routes>
  </Suspense>
);

const routes = [
  {
    path: '/login',
    element: lazy(() => import('./views/auth/signin/SignIn1'))
  },
  {
    path: '/auth/signin-1',
    element: lazy(() => import('./views/auth/signin/SignIn1'))
  },
  {
    path: '/auth/signup-1',
    element: lazy(() => import('./views/auth/signup/SignUp1'))
  },
  {
    path: '/auth/reset-password-1',
    element: lazy(() => import('./views/auth/reset-password/ResetPassword1'))
  },
  {
    path: '*',
    guard: ProtectedRoute, // Use ProtectedRoute as the guard for protected routes
    layout: AdminLayout,
    routes: [
      {
        path: '/app/dashboard/default',
        element: lazy(() => import('./views/dashboard'))
      },
      {
        path: '/product/product-list',
        element: lazy(() => import('./views/Product/list'))
      },
      {
        path: '/product/detail',
        element: lazy(() => import('./views/Product/detail'))
      },
      {
        path: '/product/add',
        element: lazy(() => import('./views/Product/add'))
      },
      {
        path: '/product/edit/:id',
        element: lazy(() => import('./views/Product/edit'))
      },
      {
        path: '/category/list',
        element: lazy(() => import('./views/Category/list'))
      },
      {
        path: '/category/detail',
        element: lazy(() => import('./views/Category/detail'))
      },
      {
        path: '/category/add',
        element: lazy(() => import('./views/Category/add'))
      },
      {
        path: '/category/edit/:id',
        element: lazy(() => import('./views/Category/edit'))
      },
      {
        path: '/subcategory/list',
        element: lazy(() => import('./views/Subcategory/list'))
      },
      {
        path: '/subcategory/detail',
        element: lazy(() => import('./views/Subcategory/detail'))
      },
      {
        path: '/subcategory/add',
        element: lazy(() => import('./views/Subcategory/add'))
      },
      {
        path: '/subcategory/edit/:id',
        element: lazy(() => import('./views/Subcategory/edit'))
      },
      {
        path: '/user/list',
        element: lazy(() => import('./views/User/list'))
      },
      {
        path: '/user/detail',
        element: lazy(() => import('./views/User/detail'))
      },
      {
        path: '/user/add',
        element: lazy(() => import('./views/User/add'))
      },
      {
        path: '/user/edit/:id',
        element: lazy(() => import('./views/User/edit'))
      },
      {
        path: '/appointment/list',
        element: lazy(() => import('./views/Appointment/list'))
      },
      {
        path: '/appointment/detail',
        element: lazy(() => import('./views/Appointment/detail'))
      },
      {
        path: '/popform/list',
        element: lazy(() => import('./views/PopForm/list'))
      },
      {
        path: '/popform/detail',
        element: lazy(() => import('./views/PopForm/detail'))
      },
      {
        path: '/contact/list',
        element: lazy(() => import('./views/Contact/list'))
      },
      {
        path: '/contact/detail',
        element: lazy(() => import('./views/Contact/detail'))
      },
    ]
  }
];

export default routes;
