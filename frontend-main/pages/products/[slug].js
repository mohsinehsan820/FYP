import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Link from "next/link";
import { ProductCategoryContext } from "@/components/contexts/ProductCategoryContext";
import { CartContext } from "@/components/contexts/cartContext";
import ProductCard from "@/components/shared/ProductCard";

const ADMIN_API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;

export default function Product() {
  const router = useRouter();
  const { slug } = router.query;
  const [productData, setProductData] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({
    name: "",
    email: "",
    rating: 5,
    comment: "",
  });
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });
  const { fetchProductBySlug, products } = useContext(ProductCategoryContext);

  const { addItems } = useContext(CartContext);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (slug) {
      const fetchData = async () => {
        const response = await fetchProductBySlug(slug);
        setProductData(response.data);
      };
      fetchData();
    }
  }, [fetchProductBySlug, slug]);

  useEffect(() => {
    if (productData && products.length > 0) {
      // Get related products from the same category
      const related = products
        .filter(
          (p) =>
            p.category === productData.category && p._id !== productData._id
        )
        .slice(0, 4);
      setRelatedProducts(related);
    }
  }, [productData, products]);

  // Fetch reviews when product data is available
  useEffect(() => {
    if (productData?._id) {
      fetchReviews();
    }
  }, [productData?._id]);

  const fetchReviews = async () => {
    if (!productData?._id) return;

    try {
      console.log("Fetching reviews for product:", productData._id);
      const response = await fetch(
        `${ADMIN_API_URL}/api/review/product/${productData._id}`
      );
      const data = await response.json();
      console.log("Reviews response:", data);
      if (data.success) {
        setReviews(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleReviewInputChange = (e) => {
    const { name, value } = e.target;
    setReviewForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      setSubmitStatus({
        type: "error",
        message: "Please sign in to submit a review",
      });
      setTimeout(() => router.push("/sign-in"), 2000);
      return;
    }

    try {
      const response = await fetch(`${ADMIN_API_URL}/api/review/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: productData._id,
          userId: user?._id || "guest",
          name: reviewForm.name,
          email: reviewForm.email,
          rating: Number(reviewForm.rating),
          comment: reviewForm.comment,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus({
          type: "success",
          message: "Review submitted successfully!",
        });
        setReviewForm({ name: "", email: "", rating: 5, comment: "" });
        // Refresh reviews and product data
        fetchReviews();
        const productResponse = await fetchProductBySlug(slug);
        setProductData(productResponse.data);
      } else {
        setSubmitStatus({
          type: "error",
          message: data.message || "Failed to submit review",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Error submitting review. Please try again.",
      });
    }

    setTimeout(() => setSubmitStatus({ type: "", message: "" }), 5000);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<small key={i} className="fas fa-star"></small>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<small key={i} className="fas fa-star-half-alt"></small>);
      } else {
        stars.push(<small key={i} className="far fa-star"></small>);
      }
    }
    return stars;
  };

  const handleRedirect = (id) => {
    {
      isAuthenticated ? addItems(id, quantity) : router.push("/sign-in");
    }
  };

  const increaseQuantity = () => {
    if (quantity < productData?.countInStock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <>
      <div className="container-fluid pb-5">
        <div className="row px-xl-5">
          <div className="col-lg-5 mb-30">
            <div
              id="product-carousel"
              className="carousel slide border rounded shadow-sm"
              data-ride="carousel"
            >
              <div className="carousel-inner bg-white">
                {productData?.images?.map((img, i) => (
                  <div key={i} className={`carousel-item ${i === 0 ? "active" : ""}`}>
                    <img
                      className="w-100"
                      src={`${ADMIN_API_URL}/${img.url}`}
                      alt="product image"
                      style={{ height: '500px', objectFit: 'contain', padding: '20px' }}
                    />
                  </div>
                ))}
              </div>
              <a
                className="carousel-control-prev"
                href="#product-carousel"
                data-slide="prev"
              >
                <span className="bg-dark rounded-circle p-2">
                  <i className="fa fa-angle-left text-white"></i>
                </span>
              </a>
              <a
                className="carousel-control-next"
                href="#product-carousel"
                data-slide="next"
              >
                <span className="bg-dark rounded-circle p-2">
                  <i className="fa fa-angle-right text-white"></i>
                </span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="row mt-3">
              <div className="col-4">
                <div className="bg-light text-center p-3 rounded">
                  <i className="fa fa-shield-alt fa-2x text-primary mb-2"></i>
                  <p className="mb-0 small"><strong>Secure</strong><br/>Payment</p>
                </div>
              </div>
              <div className="col-4">
                <div className="bg-light text-center p-3 rounded">
                  <i className="fa fa-truck fa-2x text-success mb-2"></i>
                  <p className="mb-0 small"><strong>Fast</strong><br/>Shipping</p>
                </div>
              </div>
              <div className="col-4">
                <div className="bg-light text-center p-3 rounded">
                  <i className="fa fa-undo fa-2x text-info mb-2"></i>
                  <p className="mb-0 small"><strong>Easy</strong><br/>Returns</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-7 h-auto mb-30">
            <div className="h-100 bg-white border rounded shadow-sm p-4">
              {/* Breadcrumb */}
              <div className="mb-3">
                <Link href="/" className="text-muted">Home</Link>
                <span className="text-muted mx-2">/</span>
                <Link href={`/category/${productData?.category}`} className="text-muted text-capitalize">
                  {productData?.category}
                </Link>
                <span className="text-muted mx-2">/</span>
                <span className="text-dark">{productData?.name}</span>
              </div>

              <h2 className="mb-3">{productData?.name}</h2>
              
              <div className="d-flex align-items-center mb-3 pb-3 border-bottom">
                <div className="text-warning mr-2" style={{ fontSize: '1.2rem' }}>
                  {renderStars(productData?.rating || 0)}
                </div>
                <span className="font-weight-bold mr-2">{productData?.rating?.toFixed(1) || '0.0'}</span>
                <span className="text-muted">
                  ({productData?.numReviews || 0} Reviews)
                </span>
                {productData?.numReviews > 10 && (
                  <span className="badge badge-success ml-2">Bestseller</span>
                )}
              </div>

              <div className="mb-4">
                <h3 className="font-weight-bold text-primary mb-2">
                  ${productData?.price}
                </h3>
                {productData?.price > 1000 && (
                  <small className="text-success">
                    <i className="fa fa-tag mr-1"></i>
                    Save ${(productData?.price * 0.1).toFixed(2)} with our seasonal offer!
                  </small>
                )}
              </div>

              <p className="mb-4 text-muted" style={{ lineHeight: '1.8' }}>
                {productData?.description}
              </p>

              {/* Product Info Grid */}
              <div className="row mb-4">
                <div className="col-6 mb-3">
                  <div className="d-flex align-items-center">
                    <i className="fa fa-barcode text-primary mr-2"></i>
                    <div>
                      <small className="text-muted d-block">SKU</small>
                      <strong>{productData?._id?.substring(0, 8).toUpperCase()}</strong>
                    </div>
                  </div>
                </div>
                <div className="col-6 mb-3">
                  <div className="d-flex align-items-center">
                    <i className="fa fa-copyright text-primary mr-2"></i>
                    <div>
                      <small className="text-muted d-block">Brand</small>
                      <strong>{productData?.brand}</strong>
                    </div>
                  </div>
                </div>
                <div className="col-6 mb-3">
                  <div className="d-flex align-items-center">
                    <i className="fa fa-tag text-primary mr-2"></i>
                    <div>
                      <small className="text-muted d-block">Category</small>
                      <Link href={`/category/${productData?.category}`}>
                        <strong className="text-primary text-capitalize" style={{ cursor: "pointer" }}>
                          {productData?.category}
                        </strong>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-6 mb-3">
                  <div className="d-flex align-items-center">
                    <i className={`fa fa-${productData?.countInStock > 0 ? 'check-circle text-success' : 'times-circle text-danger'} mr-2`}></i>
                    <div>
                      <small className="text-muted d-block">Availability</small>
                      <strong className={productData?.countInStock > 0 ? "text-success" : "text-danger"}>
                        {productData?.countInStock > 0
                          ? `${productData?.countInStock} In Stock`
                          : "Out of Stock"}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div className="mb-4">
                {productData?.featuredProduct && (
                  <span className="badge badge-warning p-2 mr-2">
                    <i className="fa fa-star mr-1"></i>Featured
                  </span>
                )}
                {productData?.countInStock < 10 && productData?.countInStock > 0 && (
                  <span className="badge badge-danger p-2 mr-2">
                    <i className="fa fa-fire mr-1"></i>Low Stock
                  </span>
                )}
                {productData?.numReviews > 5 && productData?.rating >= 4 && (
                  <span className="badge badge-success p-2">
                    <i className="fa fa-thumbs-up mr-1"></i>Highly Rated
                  </span>
                )}
              </div>

              {/* Quantity & Add to Cart */}
              <div className="bg-light p-3 rounded mb-4">
                <div className="d-flex align-items-center">
                  <label className="mb-0 mr-3 font-weight-bold">Quantity:</label>
                  <div className="input-group" style={{ width: "140px" }}>
                    <div className="input-group-prepend">
                      <button
                        className="btn btn-outline-primary"
                        onClick={decreaseQuantity}
                      >
                        <i className="fa fa-minus"></i>
                      </button>
                    </div>
                    <input
                      type="text"
                      className="form-control text-center border-primary"
                      value={quantity}
                      readOnly
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-outline-primary"
                        onClick={increaseQuantity}
                      >
                        <i className="fa fa-plus"></i>
                      </button>
                    </div>
                  </div>
                  <button
                    className="btn btn-primary btn-lg ml-3 flex-grow-1"
                    onClick={() => handleRedirect(productData._id)}
                    disabled={productData?.countInStock === 0}
                  >
                    <i className="fa fa-shopping-cart mr-2"></i>
                    {productData?.countInStock === 0 ? 'Out of Stock' : 'Add To Cart'}
                  </button>
                </div>
              </div>

              {/* Delivery & Return Info */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <div className="border rounded p-3 h-100">
                    <div className="d-flex align-items-center">
                      <i className="fa fa-shipping-fast fa-2x text-primary mr-3"></i>
                      <div>
                        <h6 className="mb-1">Free Delivery</h6>
                        <small className="text-muted">On orders over $500</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="border rounded p-3 h-100">
                    <div className="d-flex align-items-center">
                      <i className="fa fa-sync fa-2x text-success mr-3"></i>
                      <div>
                        <h6 className="mb-1">30-Day Returns</h6>
                        <small className="text-muted">Hassle-free returns</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Share Section */}
              <div className="border-top pt-3">
                <div className="d-flex align-items-center">
                  <strong className="text-dark mr-3">Share:</strong>
                  <div className="d-inline-flex">
                    <a className="btn btn-sm btn-outline-primary rounded-circle mr-2" href="#" style={{ width: '36px', height: '36px', padding: '8px' }}>
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a className="btn btn-sm btn-outline-info rounded-circle mr-2" href="#" style={{ width: '36px', height: '36px', padding: '8px' }}>
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a className="btn btn-sm btn-outline-primary rounded-circle mr-2" href="#" style={{ width: '36px', height: '36px', padding: '8px' }}>
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a className="btn btn-sm btn-outline-danger rounded-circle" href="#" style={{ width: '36px', height: '36px', padding: '8px' }}>
                      <i className="fab fa-pinterest"></i>
                    </a>
                  </div>
                  <button className="btn btn-outline-secondary btn-sm ml-auto">
                    <i className="fa fa-heart mr-1"></i>Add to Wishlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row px-xl-5">
        <div className="col">
          <div className="bg-light p-30">
            <div className="nav nav-tabs mb-4">
              <a
                className="nav-item nav-link text-dark active"
                data-toggle="tab"
                href="#tab-pane-1"
              >
                Description
              </a>
              <a
                className="nav-item nav-link text-dark"
                data-toggle="tab"
                href="#tab-pane-2"
              >
                Specifications
              </a>
              <a
                className="nav-item nav-link text-dark"
                data-toggle="tab"
                href="#tab-pane-3"
              >
                Reviews ({productData?.numReviews || 0})
              </a>
            </div>
            <div className="tab-content">
              <div className="tab-pane fade show active" id="tab-pane-1">
                <h4 className="mb-3">Product Description</h4>
                <p>{productData?.description}</p>
                <h5 className="mb-3 mt-4">Key Features:</h5>
                <ul className="pl-4">
                  <li className="mb-2">
                    High-quality {productData?.brand} product
                  </li>
                  <li className="mb-2">Authentic and original product</li>
                  <li className="mb-2">
                    Available in {productData?.category} category
                  </li>
                  <li className="mb-2">Fast and reliable shipping</li>
                  <li className="mb-2">Easy return and exchange policy</li>
                </ul>
              </div>

              <div className="tab-pane fade" id="tab-pane-2">
                <h4 className="mb-4">Product Specifications</h4>
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <th className="bg-secondary" style={{ width: "30%" }}>
                        Product Name
                      </th>
                      <td>{productData?.name}</td>
                    </tr>
                    <tr>
                      <th className="bg-secondary">Brand</th>
                      <td>{productData?.brand}</td>
                    </tr>
                    <tr>
                      <th className="bg-secondary">Category</th>
                      <td className="text-capitalize">
                        {productData?.category}
                      </td>
                    </tr>
                    <tr>
                      <th className="bg-secondary">Price</th>
                      <td className="font-weight-bold text-primary">
                        ${productData?.price}
                      </td>
                    </tr>
                    <tr>
                      <th className="bg-secondary">Stock Status</th>
                      <td
                        className={
                          productData?.countInStock > 0
                            ? "text-success"
                            : "text-danger"
                        }
                      >
                        {productData?.countInStock > 0
                          ? `In Stock (${productData?.countInStock} units)`
                          : "Out of Stock"}
                      </td>
                    </tr>
                    <tr>
                      <th className="bg-secondary">SKU</th>
                      <td>{productData?._id?.substring(0, 8).toUpperCase()}</td>
                    </tr>
                    <tr>
                      <th className="bg-secondary">Rating</th>
                      <td>
                        <div className="text-primary">
                          {renderStars(productData?.rating || 0)}
                          <span className="text-dark ml-2">
                            {productData?.rating?.toFixed(1) || "0.0"} (
                            {productData?.numReviews || 0} reviews)
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="tab-pane fade" id="tab-pane-3">
                <div className="row">
                  <div className="col-md-12 mb-4">
                    <div className="bg-white border rounded p-4 mb-4">
                      <div className="row">
                        <div className="col-md-4 text-center border-right">
                          <h2 className="text-primary mb-2">
                            {productData?.rating?.toFixed(1) || "0.0"}
                          </h2>
                          <div
                            className="text-warning mb-2"
                            style={{ fontSize: "1.5rem" }}
                          >
                            {renderStars(productData?.rating || 0)}
                          </div>
                          <p className="text-muted mb-0">Average Rating</p>
                          <small className="text-muted">
                            {productData?.numReviews || 0} reviews
                          </small>
                        </div>
                        <div className="col-md-8">
                          <h5 className="mb-3">Rating Breakdown</h5>
                          {[5, 4, 3, 2, 1].map((star) => {
                            const count = reviews.filter(
                              (r) => r.rating === star
                            ).length;
                            const percentage =
                              reviews.length > 0
                                ? (count / reviews.length) * 100
                                : 0;
                            return (
                              <div
                                key={star}
                                className="d-flex align-items-center mb-2"
                              >
                                <span
                                  className="mr-2"
                                  style={{ width: "60px" }}
                                >
                                  {star}{" "}
                                  <i className="fas fa-star text-warning"></i>
                                </span>
                                <div
                                  className="progress flex-grow-1 mr-2"
                                  style={{ height: "10px" }}
                                >
                                  <div
                                    className="progress-bar bg-warning"
                                    role="progressbar"
                                    style={{ width: `${percentage}%` }}
                                    aria-valuenow={percentage}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                  ></div>
                                </div>
                                <span
                                  className="text-muted"
                                  style={{ width: "40px" }}
                                >
                                  {count}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <h4 className="mb-3">
                      Customer Reviews ({reviews.length})
                    </h4>

                    {!reviews || reviews.length === 0 ? (
                      <div className="bg-light border rounded p-5 text-center">
                        <i className="fa fa-star-o fa-4x text-muted mb-4"></i>
                        <h5 className="mb-3">No Customer Reviews Yet</h5>
                        <p className="text-muted mb-4">
                          Be the first to share your experience with this
                          product!
                        </p>
                        <div className="row mt-4">
                          <div className="col-md-4">
                            <div className="p-3">
                              <i className="fa fa-shield-alt fa-2x text-primary mb-2"></i>
                              <h6>Verified Reviews</h6>
                              <small className="text-muted">
                                Only from verified purchases
                              </small>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="p-3">
                              <i className="fa fa-check-circle fa-2x text-success mb-2"></i>
                              <h6>Authentic Feedback</h6>
                              <small className="text-muted">
                                Real customer experiences
                              </small>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="p-3">
                              <i className="fa fa-users fa-2x text-info mb-2"></i>
                              <h6>Community Driven</h6>
                              <small className="text-muted">
                                Help others make decisions
                              </small>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="review-list">
                        {reviews.map((review) => (
                          <div
                            key={review._id}
                            className="bg-white border rounded p-4 mb-3 shadow-sm"
                          >
                            <div className="d-flex justify-content-between align-items-start mb-3">
                              <div className="d-flex align-items-center">
                                <div
                                  className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mr-3"
                                  style={{
                                    width: "50px",
                                    height: "50px",
                                    fontSize: "1.5rem",
                                  }}
                                >
                                  {review.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <h6 className="mb-1 font-weight-bold">
                                    {review.name}
                                  </h6>
                                  <div
                                    className="text-primary"
                                    style={{ fontSize: "0.9rem" }}
                                  >
                                    {renderStars(review.rating)}
                                    <span className="text-dark ml-2 font-weight-bold">
                                      {review.rating}.0
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <small className="text-muted">
                                <i className="fa fa-clock mr-1"></i>
                                {new Date(review.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  }
                                )}
                              </small>
                            </div>
                            <p className="mb-0 text-muted">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="col-md-12">
                    <div className="bg-gradient-light border rounded p-4 shadow-sm">
                      <div className="d-flex align-items-center justify-content-between mb-4">
                        <h4 className="mb-0">
                          <i className="fa fa-edit mr-2 text-primary"></i>Write
                          a Review
                        </h4>
                        <div className="text-muted">
                          <i className="fa fa-lock mr-1"></i>
                          <small>Secure & Private</small>
                        </div>
                      </div>

                      <div className="alert alert-info mb-4">
                        <i className="fa fa-info-circle mr-2"></i>
                        <strong>Share your experience!</strong> Your review
                        helps other customers make informed decisions.
                      </div>

                      {submitStatus.message && (
                        <div
                          className={`alert alert-${
                            submitStatus.type === "success"
                              ? "success"
                              : "danger"
                          } alert-dismissible fade show`}
                        >
                          <i
                            className={`fa fa-${
                              submitStatus.type === "success"
                                ? "check-circle"
                                : "exclamation-circle"
                            } mr-2`}
                          ></i>
                          {submitStatus.message}
                        </div>
                      )}
                      <form onSubmit={handleReviewSubmit}>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="review-name">Your Name *</label>
                              <input
                                type="text"
                                className="form-control"
                                id="review-name"
                                name="name"
                                value={reviewForm.name}
                                onChange={handleReviewInputChange}
                                placeholder="Enter your name"
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="review-email">Your Email *</label>
                              <input
                                type="email"
                                className="form-control"
                                id="review-email"
                                name="email"
                                value={reviewForm.email}
                                onChange={handleReviewInputChange}
                                placeholder="Enter your email"
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Your Rating *</label>
                          <div className="d-flex">
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <div
                                key={rating}
                                className="form-check form-check-inline"
                              >
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="rating"
                                  id={`rating-${rating}`}
                                  value={rating}
                                  checked={reviewForm.rating === rating}
                                  onChange={handleReviewInputChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`rating-${rating}`}
                                >
                                  {rating}{" "}
                                  <i className="fas fa-star text-warning"></i>
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="form-group">
                          <label htmlFor="review-message">Your Review *</label>
                          <textarea
                            id="review-message"
                            className="form-control"
                            rows="5"
                            name="comment"
                            value={reviewForm.comment}
                            onChange={handleReviewInputChange}
                            placeholder="Write your review here"
                            required
                          ></textarea>
                        </div>
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg px-5"
                        >
                          <i className="fa fa-paper-plane mr-2"></i>Submit
                          Review
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="container-fluid py-5">
          <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
            <span className="bg-secondary pr-3">You May Also Like</span>
          </h2>
          <div className="row px-xl-5">
            {relatedProducts.map((product) => (
              <div
                key={product._id}
                className="col-lg-3 col-md-4 col-sm-6 pb-4"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
