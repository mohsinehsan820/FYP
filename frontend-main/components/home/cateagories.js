import { useContext } from "react"
import Link from "next/link";
import { ProductCategoryContext } from '@/components/contexts/ProductCategoryContext';
import ProductCard from '@/components/shared/ProductCard';

export default function Categories() {
    const { categories, products } = useContext(ProductCategoryContext);

    // Group products by category
    const productsByCategory = products.reduce((acc, product) => {
        if (!acc[product.category]) {
            acc[product.category] = [];
        }
        acc[product.category].push(product);
        return acc;
    }, {});

    return (
        <>
            {categories.map((cat) => {
                const categoryProducts = productsByCategory[cat.slug] || [];
                if (categoryProducts.length === 0) return null;

                return (
                    <div key={cat._id} className="container-fluid pt-5 pb-3">
                        <div className="row px-xl-5 pb-3">
                            <div className="col-12 d-flex justify-content-between align-items-center mb-4">
                                <h2 className="section-title position-relative text-uppercase mb-0">
                                    <span className="bg-secondary pr-3">{cat.name}</span>
                                </h2>
                                <Link href={`/category/${cat.slug}`} className="btn btn-primary">
                                    See More <i className="fa fa-arrow-right ml-2"></i>
                                </Link>
                            </div>
                        </div>
                        <div className="row px-xl-5">
                            {categoryProducts.slice(0, 4).map((product) => (
                                <div key={product._id} className="col-lg-3 col-md-4 col-sm-6 pb-4">
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </>
    )
}