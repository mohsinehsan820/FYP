import { store } from '@/redux/store';
import Layout from '../components/layout/layout';
import { ProductCategoryProvider } from '../components/contexts/ProductCategoryContext';
import { CartProvider } from '../components/contexts/cartContext';
import '../styles/globals.css';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { login, logout, setInitialized } from '@/redux/authSlice';
import axios from 'axios';

const PRIVATE_API_URL = process.env.NEXT_PUBLIC_USER_API_URL;

const AuthInitializer = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    const validateToken = async () => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        
        if (token && user) {
          try {
            // Validate token with backend
            const response = await axios.get(
              `${PRIVATE_API_URL}/api/user/validate`,
              { headers: { 'x-access-token': token } }
            );
            
            if (response.data.success) {
              // Token is valid, restore session
              dispatch(login({ token, user: JSON.parse(user) }));
            }
          } catch (error) {
            // Token is invalid or expired, logout user
            console.log('Token validation failed:', error.response?.data?.msg || error.message);
            dispatch(logout());
          }
        }
        
        dispatch(setInitialized());
      }
    };
    
    validateToken();
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
