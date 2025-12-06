export default function OfferBanners() {
    return (
        <div className="container-fluid pt-5 pb-3">
            <div className="row px-xl-5">
                {/* Left Banner - Big Discount */}
                <div className="col-md-6 pb-4">
                    <div className="position-relative rounded overflow-hidden shadow-lg" style={{ height: "300px", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
                        <div className="position-absolute w-100 h-100 d-flex flex-column justify-content-center p-5">
                            <span className="badge badge-warning mb-3" style={{ width: "fit-content", fontSize: "1rem" }}>
                                <i className="fa fa-fire mr-2"></i>HOT DEAL
                            </span>
                            <h2 className="text-white font-weight-bold mb-3">Summer Sale</h2>
                            <h3 className="text-white mb-3">Up to 50% OFF</h3>
                            <p className="text-white mb-4" style={{ opacity: 0.9 }}>
                                Don't miss out on our biggest sale of the season!
                            </p>
                            <a href="/shop" className="btn btn-warning btn-lg" style={{ width: "fit-content" }}>
                                <i className="fa fa-shopping-bag mr-2"></i>Shop Now
                            </a>
                        </div>
                        <div className="position-absolute" style={{ right: "-50px", bottom: "-50px", opacity: 0.2 }}>
                            <i className="fa fa-tags" style={{ fontSize: "300px", color: "white" }}></i>
                        </div>
                    </div>
                </div>

                {/* Right Banner - New Arrivals */}
                <div className="col-md-6 pb-4">
                    <div className="position-relative rounded overflow-hidden shadow-lg" style={{ height: "300px", background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" }}>
                        <div className="position-absolute w-100 h-100 d-flex flex-column justify-content-center p-5">
                            <span className="badge badge-light mb-3" style={{ width: "fit-content", fontSize: "1rem" }}>
                                <i className="fa fa-star mr-2"></i>NEW COLLECTION
                            </span>
                            <h2 className="text-white font-weight-bold mb-3">New Arrivals</h2>
                            <h3 className="text-white mb-3">Latest Trends 2024</h3>
                            <p className="text-white mb-4" style={{ opacity: 0.9 }}>
                                Discover the newest styles and fashion trends
                            </p>
                            <a href="/shop" className="btn btn-light btn-lg" style={{ width: "fit-content" }}>
                                <i className="fa fa-arrow-right mr-2"></i>Explore Now
                            </a>
                        </div>
                        <div className="position-absolute" style={{ right: "-50px", bottom: "-50px", opacity: 0.2 }}>
                            <i className="fa fa-gift" style={{ fontSize: "300px", color: "white" }}></i>
                        </div>
                    </div>
                </div>
            </div>

            {/* Three Small Banners
            <div className="row px-xl-5">
                <div className="col-md-4 pb-4">
                    <div className="bg-light rounded p-4 shadow-sm text-center" style={{ borderTop: "4px solid #28a745" }}>
                        <i className="fa fa-gift fa-3x text-success mb-3"></i>
                        <h5 className="font-weight-bold mb-2">Free Gift Wrapping</h5>
                        <p className="text-muted mb-0">On orders over $100</p>
                    </div>
                </div>
                <div className="col-md-4 pb-4">
                    <div className="bg-light rounded p-4 shadow-sm text-center" style={{ borderTop: "4px solid #ffc107" }}>
                        <i className="fa fa-trophy fa-3x text-warning mb-3"></i>
                        <h5 className="font-weight-bold mb-2">Premium Quality</h5>
                        <p className="text-muted mb-0">100% Authentic Products</p>
                    </div>
                </div>
                <div className="col-md-4 pb-4">
                    <div className="bg-light rounded p-4 shadow-sm text-center" style={{ borderTop: "4px solid #17a2b8" }}>
                        <i className="fa fa-headset fa-3x text-info mb-3"></i>
                        <h5 className="font-weight-bold mb-2">24/7 Customer Care</h5>
                        <p className="text-muted mb-0">We're here to help you</p>
                    </div>
                </div>
            </div> */}
        </div>
    );
}
