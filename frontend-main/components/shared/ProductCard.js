import { useContext } from "react";
import Link from 'next/link';
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { CartContext } from '@/components/contexts/cartContext';

const ADMIN_API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;

export default function ProductCard({ product }) {
    const router = useRouter();
    const { addItems } = useContext(CartContext);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const handleAddToCart = (e) => {
        e.preventDefault();
        isAuthenticated ? addItems(product._id) : router.push('/sign-in');
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<i key={i} className="fa fa-star text-warning"></i>);
            } else if (i === fullStars && hasHalfStar) {
                stars.push(<i key={i} className="fa fa-star-half-alt text-warning"></i>);
            } else {
                stars.push(<i key={i} className="far fa-star text-warning"></i>);
            }
        }
        return stars;
    };

    return (
        <div className="product-card bg-white shadow-sm rounded overflow-hidden h-100">
            <Link href={`/products/${product.slug}`} className="text-decoration-none">
                <div className="product-card-img position-relative overflow-hidden">
                    <img 
                        className="img-fluid w-100" 
                        src={`${ADMIN_API_URL}${product.images[0]?.url}`} 
                        alt={product.name}
                        style={{ height: '250px', objectFit: 'cover' }}
                    />
                    {product.countInStock === 0 && (
                        <div className="position-absolute top-0 left-0 bg-danger text-white px-2 py-1 m-2 rounded">
                            Out of Stock
                        </div>
                    )}
                    {product.featuredProduct && (
                        <div className="position-absolute top-0 right-0 bg-warning text-dark px-2 py-1 m-2 rounded">
                            <i className="fa fa-star mr-1"></i>Featured
                        </div>
                    )}
                </div>
            </Link>
            
            <div className="product-card-body p-3">
                <Link href={`/products/${product.slug}`} className="text-decoration-none">
                    <h6 className="product-title text-dark mb-2 text-truncate" style={{ minHeight: '1.5rem' }}>
                        {product.name}
                    </h6>
                </Link>
                
                <div className="d-flex align-items-center mb-2">
                    <span className="text-muted small text-capitalize">
                        <i className="fa fa-tag mr-1"></i>{product.category}
                    </span>
                    <span className="text-muted small ml-auto">
                        <i className="fa fa-box mr-1"></i>{product.countInStock} left
                    </span>
                </div>

                <div className="d-flex align-items-center justify-content-between mb-2">
                    <div>
                        <h5 className="text-primary mb-0">${product.price}</h5>
                    </div>
                </div>

                <div className="d-flex align-items-center mb-3">
                    <div className="mr-2" style={{ fontSize: '0.85rem' }}>
                        {renderStars(product.rating || 0)}
                    </div>
                    <small className="text-muted">
                        {product.rating?.toFixed(1) || '0.0'} ({product.numReviews || 0})
                    </small>
                </div>

                <button 
                    className="btn btn-primary btn-block btn-sm"
                    onClick={handleAddToCart}
                    disabled={product.countInStock === 0}
                >
                    <i className="fa fa-shopping-cart mr-2"></i>
                    {product.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
            </div>
        </div>
    );
}
