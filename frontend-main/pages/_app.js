import { store } from '@/redux/store';
import Layout from '../components/layout/layout';
import { ProductCategoryProvider } from '../components/contexts/ProductCategoryContext';
import { CartProvider } from '../components/contexts/cartContext';
import '../styles/globals.css';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { login, setInitialized } from '@/redux/authSlice';

const AuthInitializer = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));
      if (token && user) {
        dispatch(login({ token, user }))
      }
      dispatch(setInitialized());
    }
  }, [dispatch])
  return null;
}

function AppWrapper({ Component, pageProps }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <ProductCategoryProvider>
      <CartProvider isAuthenticated={isAuthenticated}>
        <Layout>
          <AuthInitializer />
          <Component {...pageProps} />
          <ToastContainer position="top-right" autoClose={3000} />
        </Layout>
      </CartProvider>
    </ProductCategoryProvider>
  );
}

function MyApp(props) {
  return (
    <Provider store={store}>
      <AppWrapper {...props} />
    </Provider>
  );
}

export default MyApp;
