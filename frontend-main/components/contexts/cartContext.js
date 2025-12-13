import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const CartContext = createContext();

const PRIVATE_API_URL = process.env.NEXT_PUBLIC_USER_API_URL;

export const CartProvider = ({ children, isAuthenticated }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    const fetchAllCartItems = async (showError = true) => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.get(
                `${PRIVATE_API_URL}/api/cart/`,
                { headers: { 'x-access-token': token } }
            );
            setCartItems(response.data.data)
        } catch (error) {
            console.log("Error in fetching cart", error);
            // Only show error toast if it's not an authentication error on initial load
            const isAuthError = error.response?.status === 401 || error.response?.status === 403;
            if (showError && !(isInitialLoad && isAuthError)) {
                toast.error(error.response?.data?.msg || "Failed to read cart.");
            }
        } finally {
            if (isInitialLoad) {
                setIsInitialLoad(false);
            }
        }
    };
   

    const updateQuantity = async (productId, quantity) => {
        try {
            const token = localStorage.getItem("token");

            await axios.post(
                `${PRIVATE_API_URL}/api/cart/updateQuantity`,
                { productId, quantity },
                { headers: { "x-access-token": token } }
            );

            setCartItems(prevCart => ({
                ...prevCart,
                items: prevCart.items.map(item =>
                    item.product._id === productId
                        ? { ...item, quantity }
                        : item
                ),
            }));

            toast.success("Product updated from cart.");
        } catch (error) {
            console.log("Error in adding to cart", error);

            toast.error(error.response?.data?.msg || "Failed to add to cart.");
        }
    };

    const handleUpdateQuantity = async (productId, quantity) => {
        if (quantity < 1) return; // Prevent negative quantities

        try {
            // setCartItems(cartItems?.items?.map(item =>
            //     item.product._id === productId ? { ...item, quantity } : item
            // ));
            // console.log('CartItems 1', cartItems);


            setCartItems(prevCart => ({
                ...prevCart,
                items: prevCart.items.map(item =>
                    item.product._id === productId ? { ...item, quantity } : item
                )
            }));

            await updateQuantity(productId, quantity)

        } catch (err) {
            console.log('err', err);

            toast.error("Failed to update quantity.");
        }

    };

    const addItems = async (productId) => {
        try {
            const token = localStorage.getItem("token");

            let response;

            const item = cartItems?.items?.find(item => item.product._id.toString() === productId);

            if (item) {
                await handleUpdateQuantity(productId, item.quantity + 1);

            } else {

                response = await axios.get(
                    `${PRIVATE_API_URL}/api/cart/addItem/${productId}`,
                    { headers: { "x-access-token": token } }
                );
                setCartItems(response.data.data)
            }

            await fetchAllCartItems();

            toast.success("Product added to cart.");
        } catch (error) {
            console.log("Error in adding to cart", error);

            toast.error(error.response?.data?.msg || "Failed to add to cart.");
        }
    };

    const removeItem = async (itemId) => {
        try {
            const token = localStorage.getItem("token");

            await axios.get(
                `${PRIVATE_API_URL}/api/cart/removeItem/${itemId}`,
                { headers: { "x-access-token": token } }
            );

            const removeIt = cartItems.items.filter(it => it.product._id.toString() !== itemId)

            setCartItems(prevState => ({ ...prevState, items: removeIt }));

            toast.success("Product removed from cart.");
        } catch (error) {
            console.log("Error in removing item from cart", error);

            toast.error(error.response?.data?.msg || "Failed to removing item from cart.");
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchAllCartItems(false); // Don't show error on initial auth
        }
    }, [isAuthenticated]);

    return (
        <CartContext.Provider value={{ addItems, cartItems, removeItem, updateQuantity, setCartItems, handleUpdateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};
