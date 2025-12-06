import { useState } from "react";
import ProductCard from '@/components/shared/ProductCard';

export default function Products({ products, setSortBy }) {

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 20;

    if (!products) {
        return <div>Loading...</div>;
    }

    // Pagination calculations
    const totalPages = Math.ceil(products.length / productsPerPage);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const renderPagination = () => {
        const pages = [];
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(i)}>{i}</button>
                </li>
            );
        }

        return pages;
    };

    return (
        <>
            <div className="col-lg-9 col-md-8">
                <div className="row pb-3">
                    <div className="col-12 pb-1">
                        <div className="d-flex align-items-center justify-content-between mb-4">
                           
                            <div className="ml-2">
                                <div className="btn-group">
                                    <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">Sorting</button>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        <button className="dropdown-item" onClick={() => setSortBy('latest')}>Latest</button>
                                        <button className="dropdown-item" onClick={() => setSortBy('price-asc')}>Price: Low to High</button>
                                        <button className="dropdown-item" onClick={() => setSortBy('price-desc')}>Price: High to Low</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {currentProducts.length > 0 ? (
                        currentProducts.map((product) => (
                            <div key={product._id} className="col-lg-4 col-md-6 col-sm-6 pb-4">
                                <ProductCard product={product} />
                            </div>
                        ))
                    ) : (
                        <div className="col-12">
                            <p>No products found.</p>
                        </div>
                    )}
                    {totalPages > 1 && (
                        <div className="col-12">
                            <nav>
                                <ul className="pagination justify-content-center">
                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                        <button className="page-link" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                                            Previous
                                        </button>
                                    </li>
                                    {renderPagination()}
                                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                        <button className="page-link" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                                            Next
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
