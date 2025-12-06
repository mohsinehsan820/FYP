import { createContext, useState, useEffect } from "react";
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const ProductCategoryContext = createContext();

export const ProductCategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    const fetchAllCategories = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/category/`);
            setCategories(response.data.data);
        } catch (error) {
            console.log("Error in fetching categories", error);
        }
    };

    const fetchAllProducts = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/product/`);
            setProducts(response.data.data);
        } catch (error) {
            console.log("Error in fetching categories", error);
        }
    };

    const fetchProductBySlug = async (slug) => {
        try {
            const response = await fetch(`${API_URL}/api/product/read/${slug}`); 
            return await response.json();
        } catch (error) {
            console.error(`Error fetching product with slug ${slug}:`, error);
            return null;
        }
    };

    const fetchCategoryBySlug = async (slug) => {
        try {
            const response = await axios.get(`${API_URL}/api/category/read/${slug}`); 
            return response;
        } catch (error) {
            console.error(`Error fetching category with slug ${slug}:`, error);
            return null;
        }
    };

    useEffect(() => {
        fetchAllProducts();
        fetchAllCategories();
    }, []);

    return (
        <ProductCategoryContext.Provider
            value={{
                products,
                categories,
                fetchProductBySlug,
                fetchCategoryBySlug,
            }}
        >
            {children}
        </ProductCategoryContext.Provider>
    )
}

