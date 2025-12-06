export default function FeatureCards() {
    const features = [
        {
            icon: "fa-shield-alt",
            title: "Secure Shopping",
            description: "100% secure payment methods with SSL encryption",
            color: "#667eea",
            bgColor: "#f0f3ff"
        },
        {
            icon: "fa-truck",
            title: "Fast Delivery",
            description: "Express shipping available to your doorstep",
            color: "#f5576c",
            bgColor: "#fff0f3"
        },
        {
            icon: "fa-undo",
            title: "Easy Returns",
            description: "Hassle-free 30-day return policy for peace of mind",
            color: "#28a745",
            bgColor: "#f0fff4"
        },
        {
            icon: "fa-tags",
            title: "Best Prices",
            description: "Competitive prices with regular discounts & offers",
            color: "#ffc107",
            bgColor: "#fffbf0"
        },
        {
            icon: "fa-star",
            title: "Top Rated",
            description: "Highly rated by thousands of satisfied customers",
            color: "#ff6b6b",
            bgColor: "#fff5f5"
        },
        {
            icon: "fa-heart",
            title: "Customer Love",
            description: "Join our community of happy shoppers worldwide",
            color: "#e91e63",
            bgColor: "#fff0f6"
        }
    ];

    return (
        <div className="container-fluid py-5">
            <div className="text-center mb-5">
                <h2 className="section-title position-relative text-uppercase mx-xl-5">
                    <span className="bg-secondary pr-3">Why Shop With Us</span>
                </h2>
                <p className="text-muted mt-3">Discover the benefits of choosing our store for all your shopping needs</p>
            </div>
            <div className="row px-xl-5">
                {features.map((feature, index) => (
                    <div key={index} className="col-lg-4 col-md-6 pb-4">
                        <div className="h-100 bg-white rounded shadow-sm p-4 hover-card" style={{ transition: "all 0.3s ease", cursor: "pointer" }}>
                            <div className="d-flex align-items-start">
                                <div 
                                    className="rounded-circle d-flex align-items-center justify-content-center mr-3 flex-shrink-0" 
                                    style={{ 
                                        width: "70px", 
                                        height: "70px", 
                                        backgroundColor: feature.bgColor 
                                    }}
                                >
                                    <i className={`fa ${feature.icon} fa-2x`} style={{ color: feature.color }}></i>
                                </div>
                                <div>
                                    <h5 className="font-weight-bold mb-2">{feature.title}</h5>
                                    <p className="text-muted mb-0" style={{ fontSize: "0.95rem" }}>
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <style jsx>{`
                .hover-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 25px rgba(0,0,0,0.15) !important;
                }
            `}</style>
        </div>
    );
}
