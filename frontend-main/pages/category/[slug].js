import { useEffect, useState, useContext } from "react";
import { useRouter } from 'next/router';
import Products from "@/components/shop/product";

import { ProductCategoryContext } from '@/components/contexts/ProductCategoryContext';

export default function Product() {
    const { fetchCategoryBySlug } = useContext(ProductCategoryContext);
    const router = useRouter();
    const { slug } = router.query;
    const [categoryData, setCategoryData] = useState(null);

    useEffect(() => {
        if (slug) {
            const fetchData = async () => {
                const response = await fetchCategoryBySlug(slug);
                setCategoryData(response.data.data.products)
            };
            fetchData();
        }

    }, [fetchCategoryBySlug, slug]);

    return (
        <>
            <div className="container-fluid">
                <div className="row px-xl-5">
                    <Products products={categoryData} setSortBy={() => {}} />
                </div>
            </div>
        </>
    );
}
