import Link from "next/link";
import Header from "@/components/home/header";

const About = () => {
    return (
        <>
            <Header />
            <div className="container-fluid pt-5">
                <div className="container">
                    <div className="row px-xl-5">
                        <div className="col-lg-12 mb-5">
                            <h2 className="section-title position-relative text-uppercase mb-4">
                                <span className="bg-secondary pr-3">About This Project</span>
                            </h2>
                            <div className="bg-light p-30">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h3 className="mb-4">E-Commerce Platform - Full Stack Application</h3>
                                        <p className="mb-4 lead">
                                            A modern, full-featured e-commerce platform built with cutting-edge technologies, 
                                            featuring microservices architecture, real-time reviews, cart management, and comprehensive admin controls.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Technology Stack */}
                    <div className="row px-xl-5 mb-5">
                        <div className="col-lg-12">
                            <h3 className="section-title position-relative text-uppercase mb-4">
                                <span className="bg-secondary pr-3">Technology Stack</span>
                            </h3>
                            <div className="row">
                                <div className="col-md-6 mb-4">
                                    <div className="bg-white border rounded p-4 h-100 shadow-sm">
                                        <div className="d-flex align-items-center mb-3">
                                            <i className="fab fa-react fa-3x text-primary mr-3"></i>
                                            <h4 className="mb-0">Frontend</h4>
                                        </div>
                                        <ul className="list-unstyled">
                                            <li className="mb-2"><i className="fa fa-check text-success mr-2"></i><strong>Next.js 13</strong> - React framework with SSR</li>
                                            <li className="mb-2"><i className="fa fa-check text-success mr-2"></i><strong>React 18</strong> - UI library with hooks</li>
                                            <li className="mb-2"><i className="fa fa-check text-success mr-2"></i><strong>Redux Toolkit</strong> - State management</li>
                                            <li className="mb-2"><i className="fa fa-check text-success mr-2"></i><strong>Bootstrap 5</strong> - Responsive UI framework</li>
                                            <li className="mb-2"><i className="fa fa-check text-success mr-2"></i><strong>Font Awesome</strong> - Icons library</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <div className="bg-white border rounded p-4 h-100 shadow-sm">
                                        <div className="d-flex align-items-center mb-3">
                                            <i className="fab fa-node fa-3x text-success mr-3"></i>
                                            <h4 className="mb-0">Backend</h4>
                                        </div>
                                        <ul className="list-unstyled">
                                            <li className="mb-2"><i className="fa fa-check text-success mr-2"></i><strong>Node.js</strong> - JavaScript runtime</li>
                                            <li className="mb-2"><i className="fa fa-check text-success mr-2"></i><strong>Express.js</strong> - Web framework</li>
                                            <li className="mb-2"><i className="fa fa-check text-success mr-2"></i><strong>MongoDB</strong> - NoSQL database</li>
                                            <li className="mb-2"><i className="fa fa-check text-success mr-2"></i><strong>Mongoose</strong> - ODM for MongoDB</li>
                                            <li className="mb-2"><i className="fa fa-check text-success mr-2"></i><strong>Multer & Sharp</strong> - Image upload & processing</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Architecture */}
                    <div className="row px-xl-5 mb-5">
                        <div className="col-lg-12">
                            <h3 className="section-title position-relative text-uppercase mb-4">
                                <span className="bg-secondary pr-3">Microservices Architecture</span>
                            </h3>
                            <div className="bg-white border rounded p-4 shadow-sm">
                                <p className="mb-4">The application follows a microservices architecture with four independent services:</p>
                                <div className="row">
                                    <div className="col-md-3 mb-3">
                                        <div className="border rounded p-3 h-100 bg-light">
                                            <i className="fa fa-cog fa-2x text-primary mb-3"></i>
                                            <h5>Admin Backend</h5>
                                            <p className="small mb-0">Manages products, categories, and reviews with full CRUD operations</p>
                                        </div>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <div className="border rounded p-3 h-100 bg-light">
                                            <i className="fa fa-globe fa-2x text-info mb-3"></i>
                                            <h5>Public Backend</h5>
                                            <p className="small mb-0">Serves product and category data to frontend without authentication</p>
                                        </div>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <div className="border rounded p-3 h-100 bg-light">
                                            <i className="fa fa-users fa-2x text-success mb-3"></i>
                                            <h5>Users Service</h5>
                                            <p className="small mb-0">Handles user authentication, cart management, and order processing</p>
                                        </div>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <div className="border rounded p-3 h-100 bg-light">
                                            <i className="fa fa-desktop fa-2x text-warning mb-3"></i>
                                            <h5>Frontend</h5>
                                            <p className="small mb-0">Next.js application with SSR, dynamic routing, and responsive design</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Key Features */}
                    <div className="row px-xl-5 mb-5">
                        <div className="col-lg-12">
                            <h3 className="section-title position-relative text-uppercase mb-4">
                                <span className="bg-secondary pr-3">Key Features</span>
                            </h3>
                            <div className="row">
                                <div className="col-md-4 mb-4">
                                    <div className="bg-primary text-white border rounded p-4 h-100">
                                        <i className="fa fa-shopping-cart fa-3x mb-3"></i>
                                        <h5>Shopping Cart</h5>
                                        <ul className="mb-0 pl-3">
                                            <li>Add/remove products</li>
                                            <li>Quantity management</li>
                                            <li>Real-time price calculation</li>
                                            <li>Persistent cart data</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-4">
                                    <div className="bg-success text-white border rounded p-4 h-100">
                                        <i className="fa fa-star fa-3x mb-3"></i>
                                        <h5>Review System</h5>
                                        <ul className="mb-0 pl-3">
                                            <li>Submit product reviews</li>
                                            <li>5-star rating system</li>
                                            <li>Dynamic rating calculation</li>
                                            <li>Rating breakdown charts</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-4">
                                    <div className="bg-info text-white border rounded p-4 h-100">
                                        <i className="fa fa-user-shield fa-3x mb-3"></i>
                                        <h5>User Authentication</h5>
                                        <ul className="mb-0 pl-3">
                                            <li>Secure sign up/sign in</li>
                                            <li>JWT token authentication</li>
                                            <li>Protected routes</li>
                                            <li>User profile management</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-4">
                                    <div className="bg-warning text-dark border rounded p-4 h-100">
                                        <i className="fa fa-boxes fa-3x mb-3"></i>
                                        <h5>Product Management</h5>
                                        <ul className="mb-0 pl-3">
                                            <li>Multiple image upload</li>
                                            <li>Category organization</li>
                                            <li>Stock tracking</li>
                                            <li>Featured products</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-4">
                                    <div className="bg-danger text-white border rounded p-4 h-100">
                                        <i className="fa fa-receipt fa-3x mb-3"></i>
                                        <h5>Order Processing</h5>
                                        <ul className="mb-0 pl-3">
                                            <li>Checkout system</li>
                                            <li>Order history</li>
                                            <li>Payment status tracking</li>
                                            <li>Order status updates</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-4">
                                    <div className="bg-secondary text-black border rounded p-4 h-100">
                                        <i className="fa fa-filter fa-3x mb-3"></i>
                                        <h5>Search & Filter</h5>
                                        <ul className="mb-0 pl-3">
                                            <li>Category filtering</li>
                                            <li>Price range filter</li>
                                            <li>Product search</li>
                                            <li>Sort by price/rating</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Project Structure */}
                    <div className="row px-xl-5 mb-5">
                        <div className="col-lg-12">
                            <h3 className="section-title position-relative text-uppercase mb-4">
                                <span className="bg-secondary pr-3">Project Structure</span>
                            </h3>
                            <div className="row">
                                <div className="col-md-6 mb-4">
                                    <div className="bg-white border rounded p-4 h-100">
                                        <h5 className="mb-3"><i className="fa fa-folder-open text-primary mr-2"></i>Backend Services</h5>
                                        <pre className="bg-light p-3 rounded small">
{`backend-main/
├── controllers/     # Business logic
├── models/          # Database schemas
├── routes/          # API endpoints
├── middlewares/     # Auth & validation
├── utils/           # Helper functions
└── config/          # Database config

users-main/
├── controllers/     # User, cart, orders
├── models/          # User & order models
├── routes/          # User routes
└── middleware/      # JWT authentication`}
                                        </pre>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <div className="bg-white border rounded p-4 h-100">
                                        <h5 className="mb-3"><i className="fa fa-folder-open text-success mr-2"></i>Frontend Application</h5>
                                        <pre className="bg-light p-3 rounded small">
{`frontend-main/
├── pages/           # Next.js pages
│   ├── products/    # Product pages
│   ├── category/    # Category pages
│   └── _app.js      # App wrapper
├── components/
│   ├── home/        # Home components
│   ├── shop/        # Shop components
│   ├── shared/      # Reusable components
│   └── contexts/    # Context providers
├── redux/           # State management
└── public/          # Static assets`}
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Database Models */}
                    <div className="row px-xl-5 mb-5">
                        <div className="col-lg-12">
                            <h3 className="section-title position-relative text-uppercase mb-4">
                                <span className="bg-secondary pr-3">Database Models</span>
                            </h3>
                            <div className="bg-white border rounded p-4">
                                <div className="row">
                                    <div className="col-md-3 mb-3">
                                        <div className="text-center p-3 border rounded bg-light">
                                            <i className="fa fa-box fa-2x text-primary mb-2"></i>
                                            <h6>Product</h6>
                                            <small className="text-muted">Name, slug, images, price, stock, rating, category, brand</small>
                                        </div>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <div className="text-center p-3 border rounded bg-light">
                                            <i className="fa fa-list fa-2x text-info mb-2"></i>
                                            <h6>Category</h6>
                                            <small className="text-muted">Name, slug, icon, description</small>
                                        </div>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <div className="text-center p-3 border rounded bg-light">
                                            <i className="fa fa-user fa-2x text-success mb-2"></i>
                                            <h6>User</h6>
                                            <small className="text-muted">Name, email, password, address, phone</small>
                                        </div>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <div className="text-center p-3 border rounded bg-light">
                                            <i className="fa fa-shopping-bag fa-2x text-warning mb-2"></i>
                                            <h6>Order</h6>
                                            <small className="text-muted">User, items, total, status, payment status</small>
                                        </div>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <div className="text-center p-3 border rounded bg-light">
                                            <i className="fa fa-shopping-cart fa-2x text-danger mb-2"></i>
                                            <h6>Cart</h6>
                                            <small className="text-muted">User, products, quantities</small>
                                        </div>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <div className="text-center p-3 border rounded bg-light">
                                            <i className="fa fa-comment fa-2x text-primary mb-2"></i>
                                            <h6>Review</h6>
                                            <small className="text-muted">Product, user, rating, comment, date</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Development Features */}
                    <div className="row px-xl-5 mb-5">
                        <div className="col-lg-12">
                            <h3 className="section-title position-relative text-uppercase mb-4">
                                <span className="bg-secondary pr-3">Development Highlights</span>
                            </h3>
                            <div className="row">
                                <div className="col-md-4 mb-3">
                                    <div className="bg-light border-left border-primary border-4 p-4 h-100">
                                        <i className="fa fa-code fa-2x text-primary mb-3"></i>
                                        <h5>Modern JavaScript</h5>
                                        <p className="mb-0">ES6+ features, async/await, arrow functions, destructuring</p>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <div className="bg-light border-left border-success border-4 p-4 h-100">
                                        <i className="fa fa-mobile-alt fa-2x text-success mb-3"></i>
                                        <h5>Responsive Design</h5>
                                        <p className="mb-0">Mobile-first approach with Bootstrap grid system</p>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <div className="bg-light border-left border-info border-4 p-4 h-100">
                                        <i className="fa fa-shield-alt fa-2x text-info mb-3"></i>
                                        <h5>Security</h5>
                                        <p className="mb-0">JWT authentication, password hashing, protected routes</p>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <div className="bg-light border-left border-warning border-4 p-4 h-100">
                                        <i className="fa fa-tachometer-alt fa-2x text-warning mb-3"></i>
                                        <h5>Performance</h5>
                                        <p className="mb-0">Server-side rendering, image optimization, lazy loading</p>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <div className="bg-light border-left border-danger border-4 p-4 h-100">
                                        <i className="fa fa-plug fa-2x text-danger mb-3"></i>
                                        <h5>RESTful API</h5>
                                        <p className="mb-0">Clean API design with proper HTTP methods and status codes</p>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <div className="bg-light border-left border-secondary border-4 p-4 h-100">
                                        <i className="fa fa-sync fa-2x text-secondary mb-3"></i>
                                        <h5>Real-time Updates</h5>
                                        <p className="mb-0">Dynamic cart updates, live rating calculations</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="row px-xl-5">
                        <div className="col-lg-12">
                            <div className="bg-primary text-white rounded p-5 text-center">
                                <h3 className="mb-3">Full Stack E-Commerce Solution</h3>
                                <p className="mb-4">Built with modern technologies and best practices for scalability, security, and performance.</p>
                                <div className="d-flex justify-content-center">
                                    <div className="mx-3">
                                        <i className="fab fa-github fa-2x mb-2"></i>
                                        <p className="mb-0">Open Source</p>
                                    </div>
                                    <div className="mx-3">
                                        <i className="fa fa-server fa-2x mb-2"></i>
                                        <p className="mb-0">Microservices</p>
                                    </div>
                                    <div className="mx-3">
                                        <i className="fa fa-mobile-alt fa-2x mb-2"></i>
                                        <p className="mb-0">Responsive</p>
                                    </div>
                                    <div className="mx-3">
                                        <i className="fa fa-rocket fa-2x mb-2"></i>
                                        <p className="mb-0">Production Ready</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default About;
