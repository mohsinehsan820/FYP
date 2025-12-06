import { useContext } from "react";
import { ProductCategoryContext } from '@/components/contexts/ProductCategoryContext';

export default function Sidebar({ filters, setFilters }) {
    const { categories } = useContext(ProductCategoryContext);

    const handleCategoryChange = (slug) => {
        setFilters(prev => {
            const newCategories = prev.categories.includes(slug)
                ? prev.categories.filter(c => c !== slug)
                : [...prev.categories, slug];
            return { ...prev, categories: newCategories };
        });
    };

    const handlePriceChange = (min, max) => {
        setFilters(prev => ({ ...prev, priceRange: { min, max } }));
    };

    return (
        <div className="col-lg-3 col-md-4">
            {/* Category Filter */}
            <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Filter by Category</span></h5>
            <div className="bg-light p-4 mb-30">
                <form>
                    <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                        <input 
                            type="checkbox" 
                            className="custom-control-input" 
                            id="cat-all"
                            checked={filters.categories.length === 0}
                            onChange={() => setFilters(prev => ({ ...prev, categories: [] }))}
                        />
                        <label className="custom-control-label" htmlFor="cat-all">All Categories</label>
                    </div>
                    {categories.map((cat) => (
                        <div key={cat._id} className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input 
                                type="checkbox" 
                                className="custom-control-input" 
                                id={`cat-${cat.slug}`}
                                checked={filters.categories.includes(cat.slug)}
                                onChange={() => handleCategoryChange(cat.slug)}
                            />
                            <label className="custom-control-label" htmlFor={`cat-${cat.slug}`}>{cat.name}</label>
                            <span className="badge border font-weight-normal">{cat.products.length}</span>
                        </div>
                    ))}
                </form>
            </div>

            {/* Price Filter */}
            <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Filter by Price</span></h5>
            <div className="bg-light p-4 mb-30">
                <form>
                    <div className="custom-control custom-radio d-flex align-items-center justify-content-between mb-3">
                        <input 
                            type="radio" 
                            className="custom-control-input" 
                            id="price-all" 
                            name="price"
                            checked={filters.priceRange.min === 0 && filters.priceRange.max === Infinity}
                            onChange={() => handlePriceChange(0, Infinity)}
                        />
                        <label className="custom-control-label" htmlFor="price-all">All Price</label>
                    </div>
                    <div className="custom-control custom-radio d-flex align-items-center justify-content-between mb-3">
                        <input 
                            type="radio" 
                            className="custom-control-input" 
                            id="price-1" 
                            name="price"
                            checked={filters.priceRange.min === 0 && filters.priceRange.max === 100}
                            onChange={() => handlePriceChange(0, 100)}
                        />
                        <label className="custom-control-label" htmlFor="price-1">$0 - $100</label>
                    </div>
                    <div className="custom-control custom-radio d-flex align-items-center justify-content-between mb-3">
                        <input 
                            type="radio" 
                            className="custom-control-input" 
                            id="price-2" 
                            name="price"
                            checked={filters.priceRange.min === 100 && filters.priceRange.max === 200}
                            onChange={() => handlePriceChange(100, 200)}
                        />
                        <label className="custom-control-label" htmlFor="price-2">$100 - $200</label>
                    </div>
                    <div className="custom-control custom-radio d-flex align-items-center justify-content-between mb-3">
                        <input 
                            type="radio" 
                            className="custom-control-input" 
                            id="price-3" 
                            name="price"
                            checked={filters.priceRange.min === 200 && filters.priceRange.max === 500}
                            onChange={() => handlePriceChange(200, 500)}
                        />
                        <label className="custom-control-label" htmlFor="price-3">$200 - $500</label>
                    </div>
                    <div className="custom-control custom-radio d-flex align-items-center justify-content-between mb-3">
                        <input 
                            type="radio" 
                            className="custom-control-input" 
                            id="price-4" 
                            name="price"
                            checked={filters.priceRange.min === 500 && filters.priceRange.max === Infinity}
                            onChange={() => handlePriceChange(500, Infinity)}
                        />
                        <label className="custom-control-label" htmlFor="price-4">$500+</label>
                    </div>
                </form>
            </div>
        </div>
    );
}
