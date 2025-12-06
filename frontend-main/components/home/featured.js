import { useContext } from "react"
import { ProductCategoryContext } from '@/components/contexts/ProductCategoryContext';
import ProductCard from '@/components/shared/ProductCard';

export default function Featured() {
    const { products } = useContext(ProductCategoryContext);
    
    return (
        <>
            <div className="container-fluid pt-5 pb-3">
                <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4"><span
                    className="bg-secondary pr-3">Featured Products</span></h2>
                <div className="row px-xl-5">
                    {products.filter((pro) => pro.featuredProduct).map((pro) => (
                        <div key={pro._id} className="col-lg-3 col-md-4 col-sm-6 pb-4">
                            <ProductCard product={pro} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}