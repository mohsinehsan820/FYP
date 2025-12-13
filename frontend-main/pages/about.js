import Header from "@/components/home/header";

const About = () => {
    const features = [
        {
            icon: "fa-shopping-bag",
            title: "Wide Product Range",
            description: "Browse through thousands of products across multiple categories including fashion, electronics, and daily essentials.",
            color: "#667eea"
        },
        {
            icon: "fa-shield-alt",
            title: "Secure Payments",
            description: "Shop with confidence using our secure payment gateway with SSL encryption and multiple payment options.",
            color: "#f5576c"
        },
        {
            icon: "fa-truck-fast",
            title: "Fast Delivery",
            description: "Get your orders delivered quickly with our reliable shipping partners and real-time tracking.",
            color: "#28a745"
        },
        {
            icon: "fa-headset",
            title: "24/7 Support",
            description: "Our dedicated customer support team is always ready to help you with any questions or concerns.",
            color: "#ffc107"
        }
    ];

    const stats = [
        { number: "50K+", label: "Happy Customers", icon: "fa-users" },
        { number: "10K+", label: "Products", icon: "fa-box" },
        { number: "500+", label: "Brands", icon: "fa-store" },
        { number: "99%", label: "Satisfaction", icon: "fa-smile" }
    ];

    const team = [
        {
            name: "Mohsin Ehsan",
            role: "Founder & CEO",
            description: "Leading the vision with passion for innovation"
        },
        {
            name: "Muhammad Ayyan",
            role: "Operations Manager",
            description: "Ensuring smooth operations and customer satisfaction"
        },
        {
            name: "Hamza Kamran",
            role: "Customer Success",
            description: "Dedicated to making every customer happy"
        }
    ];

    const values = [
        {
            icon: "fa-heart",
            title: "Customer First",
            description: "Your satisfaction is our top priority. We go the extra mile to ensure you have the best shopping experience."
        },
        {
            icon: "fa-star",
            title: "Quality Assured",
            description: "Every product is carefully selected and verified to meet our high quality standards."
        },
        {
            icon: "fa-handshake",
            title: "Trust & Transparency",
            description: "We believe in honest communication and building long-term relationships with our customers."
        },
        {
            icon: "fa-leaf",
            title: "Sustainability",
            description: "Committed to eco-friendly practices and supporting sustainable brands whenever possible."
        }
    ];

    return (
        <>
            <Header />
            
            {/* Hero Section */}
            <div className="container-fluid bg-light py-5">
                <div className="container">
                    <div className="row px-xl-5">
                        <div className="col-lg-12 text-center">
                            <h1 className="display-4 mb-3">About BAZARISTAN</h1>
                            <p className="lead text-muted mb-4">
                                Your ultimate destination for fashion, electronics, and everyday essentials
                            </p>
                            <p className="text-muted mx-auto" style={{ maxWidth: "800px" }}>
                                Welcome to BAZARISTAN, where convenience meets style. We are passionate about bringing you the finest 
                                selection of products at competitive prices. Our mission is to make online shopping easy, secure, 
                                and enjoyable for everyone.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="container-fluid py-5">
                <div className="row px-xl-5">
                    {stats.map((stat, index) => (
                        <div key={index} className="col-lg-3 col-md-6 mb-4">
                            <div className="bg-light text-center rounded p-4 shadow-sm hover-card" style={{ transition: "all 0.3s ease" }}>
                                <i className={`fa ${stat.icon} fa-3x text-primary mb-3`}></i>
                                <h2 className="display-4 font-weight-bold text-primary mb-0">{stat.number}</h2>
                                <p className="text-muted mb-0">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Our Story */}
            <div className="container-fluid bg-light py-5">
                <div className="container">
                    <div className="row px-xl-5">
                        <div className="col-lg-6 mb-4">
                            <h2 className="section-title position-relative text-uppercase mb-4">
                                <span className="bg-secondary pr-3">Our Story</span>
                            </h2>
                            <p className="mb-3">
                                Founded in 2020, BAZARISTAN started with a simple vision: to create a one-stop online marketplace 
                                that brings quality products to customers across the country. What began as a small startup has 
                                grown into a trusted platform serving thousands of happy customers.
                            </p>
                            <p className="mb-3">
                                We understand that shopping online should be convenient, reliable, and secure. That's why we've 
                                invested in building a robust platform with intuitive navigation, secure payment options, and 
                                exceptional customer service.
                            </p>
                            <p className="mb-0">
                                Today, we partner with hundreds of trusted brands and sellers to bring you an extensive collection 
                                of products ranging from fashion and beauty to electronics and home essentials.
                            </p>
                        </div>
                        <div className="col-lg-6 mb-4">
                            <h2 className="section-title position-relative text-uppercase mb-4">
                                <span className="bg-secondary pr-3">Why Choose Us</span>
                            </h2>
                            <div className="mb-3">
                                <div className="d-flex align-items-start mb-3">
                                    <i className="fa fa-check-circle fa-2x text-success mr-3 mt-1"></i>
                                    <div>
                                        <h5 className="mb-1">Authentic Products</h5>
                                        <p className="mb-0 text-muted">100% genuine products from verified sellers and brands</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-start mb-3">
                                    <i className="fa fa-check-circle fa-2x text-success mr-3 mt-1"></i>
                                    <div>
                                        <h5 className="mb-1">Best Prices</h5>
                                        <p className="mb-0 text-muted">Competitive pricing with regular discounts and offers</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-start mb-3">
                                    <i className="fa fa-check-circle fa-2x text-success mr-3 mt-1"></i>
                                    <div>
                                        <h5 className="mb-1">Easy Returns</h5>
                                        <p className="mb-0 text-muted">Hassle-free 14-day return policy for your peace of mind</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-start">
                                    <i className="fa fa-check-circle fa-2x text-success mr-3 mt-1"></i>
                                    <div>
                                        <h5 className="mb-1">Secure Shopping</h5>
                                        <p className="mb-0 text-muted">Your data is protected with industry-standard encryption</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="container-fluid py-5">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="section-title position-relative text-uppercase mx-xl-5">
                            <span className="bg-secondary pr-3">What We Offer</span>
                        </h2>
                    </div>
                    <div className="row px-xl-5">
                        {features.map((feature, index) => (
                            <div key={index} className="col-lg-6 mb-4">
                                <div className="bg-light rounded p-4 h-100 shadow-sm hover-card" style={{ transition: "all 0.3s ease" }}>
                                    <div className="d-flex align-items-start">
                                        <div 
                                            className="rounded-circle d-flex align-items-center justify-content-center mr-3" 
                                            style={{ 
                                                width: "60px", 
                                                height: "60px", 
                                                backgroundColor: feature.color + "20",
                                                minWidth: "60px"
                                            }}
                                        >
                                            <i className={`fa ${feature.icon} fa-2x`} style={{ color: feature.color }}></i>
                                        </div>
                                        <div>
                                            <h5 className="mb-2">{feature.title}</h5>
                                            <p className="mb-0 text-muted">{feature.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Our Values */}
            <div className="container-fluid bg-light py-5">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="section-title position-relative text-uppercase mx-xl-5">
                            <span className="bg-secondary pr-3">Our Core Values</span>
                        </h2>
                        <p className="text-muted mt-3">The principles that guide everything we do</p>
                    </div>
                    <div className="row px-xl-5">
                        {values.map((value, index) => (
                            <div key={index} className="col-lg-3 col-md-6 mb-4">
                                <div className="text-center bg-white rounded p-4 h-100 shadow-sm">
                                    <div 
                                        className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" 
                                        style={{ 
                                            width: "80px", 
                                            height: "80px", 
                                            backgroundColor: "#667eea20"
                                        }}
                                    >
                                        <i className={`fa ${value.icon} fa-2x text-primary`}></i>
                                    </div>
                                    <h5 className="mb-3">{value.title}</h5>
                                    <p className="mb-0 text-muted small">{value.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="container-fluid py-5">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="section-title position-relative text-uppercase mx-xl-5">
                            <span className="bg-secondary pr-3">Meet Our Team</span>
                        </h2>
                        <p className="text-muted mt-3">The passionate people behind BAZARISTAN</p>
                    </div>
                    <div className="row px-xl-5 justify-content-center">
                        {team.map((member, index) => (
                            <div key={index} className="col-lg-4 col-md-6 mb-4">
                                <div className="bg-light rounded text-center p-4 shadow-sm hover-card" style={{ transition: "all 0.3s ease" }}>
                                    <div 
                                        className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" 
                                        style={{ 
                                            width: "120px", 
                                            height: "120px", 
                                            backgroundColor: "#667eea",
                                            fontSize: "48px",
                                            color: "white",
                                            fontWeight: "bold"
                                        }}
                                    >
                                        {member.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <h5 className="mb-1">{member.name}</h5>
                                    <p className="text-primary mb-2">{member.role}</p>
                                    <p className="text-muted small mb-3">{member.description}</p>
                                    <div className="d-flex justify-content-center">
                                        <a className="btn btn-sm btn-outline-primary rounded-circle mx-1" href="#" style={{ width: "35px", height: "35px", padding: "8px" }}>
                                            <i className="fab fa-facebook-f"></i>
                                        </a>
                                        <a className="btn btn-sm btn-outline-primary rounded-circle mx-1" href="#" style={{ width: "35px", height: "35px", padding: "8px" }}>
                                            <i className="fab fa-twitter"></i>
                                        </a>
                                        <a className="btn btn-sm btn-outline-primary rounded-circle mx-1" href="#" style={{ width: "35px", height: "35px", padding: "8px" }}>
                                            <i className="fab fa-linkedin-in"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="container-fluid py-5" style={{ backgroundColor: "#667eea" }}>
                <div className="container">
                    <div className="row px-xl-5">
                        <div className="col-lg-12 text-center text-white">
                            <h2 className="mb-4">Ready to Start Shopping?</h2>
                            <p className="mb-4 lead">
                                Join thousands of satisfied customers and discover amazing products at unbeatable prices
                            </p>
                            <a href="/shop" className="btn btn-light btn-lg px-5 py-3 font-weight-bold">
                                Browse Products
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .hover-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.15) !important;
                }
            `}</style>
        </>
    );
};

export default About;

