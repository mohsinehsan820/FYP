import { useContext, useState, useEffect } from "react";
import Header from "@/components/home/header";
import Sidebar from "@/components/shop/sidebar";
import Products from "@/components/shop/product";
import Breadcrumb from "@/components/shop/breadcrumb";
import { ProductCategoryContext } from '@/components/contexts/ProductCategoryContext';

const Shop = () => {
    const { products } = useContext(ProductCategoryContext);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filters, setFilters] = useState({
        categories: [],
        priceRange: { min: 0, max: Infinity }
    });
    const [sortBy, setSortBy] = useState('latest');

    useEffect(() => {
        if (!products) return;

        let result = [...products];

        // Filter by Category
        if (filters.categories.length > 0) {
            result = result.filter(p => p.category && filters.categories.includes(p.category));
        }

        // Filter by Price
        result = result.filter(p => p.price >= filters.priceRange.min && p.price <= filters.priceRange.max);

        // Sort
        if (sortBy === 'price-asc') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-desc') {
            result.sort((a, b) => b.price - a.price);
        } else {
            // Latest - assuming newly added products are at the end or have a date. 
            // If no date, we can just reverse the array if the API returns oldest first.
            // Or just keep as is.
        }

        setFilteredProducts(result);

    }, [products, filters, sortBy]);

    return (
        <>
            <Header />
            <Breadcrumb />
            <div className="container-fluid">
                <div className="row px-xl-5">
                    <Sidebar filters={filters} setFilters={setFilters} />
                    <Products products={filteredProducts} setSortBy={setSortBy} />
                </div>
            </div>
        </>
    );
}

export default Shop;
