import { useContext } from "react"
import Link from "next/link";
import { ProductCategoryContext } from '@/components/contexts/ProductCategoryContext';
import { CartContext } from '@/components/contexts/cartContext';
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/authSlice";
import { useRouter } from "next/router";


export default function Navbar() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { categories } = useContext(ProductCategoryContext);
    const { cartItems } = useContext(CartContext);
    const itemCount = cartItems && cartItems.items ? cartItems.items.length : 0;

    const signoutHandler = () => {
        dispatch(logout());
    }

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    return (
        <>
            <div className="container-fluid">
                <div className="row bg-secondary py-1 px-xl-5">
                    <div className="col-lg-6 text-center text-lg-right">
                        <div className="d-inline-flex align-items-center d-block d-lg-none">
                            {/* <a href="" className="btn px-0 ml-2">
                                <i className="fas fa-heart text-dark"></i>
                                <span className="badge text-dark border border-dark rounded-circle"
                                    style={{ paddingBottom: '2px' }}>0</span>
                            </a> */}
                            <a href="" className="btn px-0 ml-2">
                                <i className="fas fa-shopping-cart text-dark"></i>
                                <span className="badge text-dark border border-dark rounded-circle"
                                    style={{ paddingBottom: '2px' }}>{itemCount}</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="row align-items-center bg-light py-3 px-xl-5 d-none d-lg-flex justify-content-between">
                    <div className="col-lg-4">
                        <a href="/" className="text-decoration-none">
                            <img src="/img/logo.png" style={{ height: 80, width: 'auto' }} />
                        </a>
                    </div>
                    {/* <div className="col-lg-4 col-6 text-left">
                        <form action="">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Search for products" />
                                <div className="input-group-append">
                                    <span className="input-group-text bg-transparent text-primary">
                                        <i className="fa fa-search"></i>
                                    </span>
                                </div>
                            </div>
                        </form>
                    </div> */}
                    <div className="col-lg-4 col-6 text-right d-flex justify-content-end align-items-center">
                        <div>
                            <p className="m-0">Customer Service</p>
                            <h5 className="m-0">+012 345 6789</h5>
                        </div>
                        <div className="btn-group pl-4">
                            <button type="button" className="btn btn-sm btn-light dropdown-toggle"
                                data-toggle="dropdown">My Account
                            </button>
                            <div className="dropdown-menu dropdown-menu-right">

                                {isAuthenticated ? (
                                    <>
                                        <a href="my-orders">
                                            <button className="dropdown-item" type="button">My Orders</button>
                                        </a>
                                        <button className="dropdown-item" type="button" onClick={() => signoutHandler()}>
                                            Sign Out
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <a href="/sign-in"><button className="dropdown-item" type="button">Sign in</button></a>
                                        <a href="/sign-up"><button className="dropdown-item" type="button">Sign up</button></a>
                                    </>
                                )}

                            </div>
                        </div>

                    </div>
                </div>
            </div>



            <div className="container-fluid bg-dark mb-30">
                <div className="row px-xl-5">
                    <div className="col-lg-3 d-none d-lg-block">
                        <a className="btn d-flex align-items-center justify-content-between bg-primary w-100" data-toggle="collapse" href="#navbar-vertical" style={{ height: '65px', padding: '0 30px' }}>
                            <h6 className="text-dark m-0"><i className="fa fa-bars mr-2"></i>Categories</h6>
                            <i className="fa fa-angle-down text-dark"></i>
                        </a>
                        <nav className="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 bg-light" id="navbar-vertical" style={{ width: 'calc(100% - 30px)', zIndex: 999 }}>
                            <div className="navbar-nav w-100">

                                {categories.map((cat) => (
                                    <Link href={`/category/${cat.slug}`} className="nav-item nav-link" key={cat.slug}>
                                        {cat.name}
                                    </Link>
                                ))}


                            </div>
                        </nav>
                    </div>
                    <div className="col-lg-9">
                        <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
                            <a href="" className="text-decoration-none d-block d-lg-none">
                                <img src="/img/logo.png" style={{ height: 80, width: 'auto' }} />
                            </a>
                            <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                                <div className="navbar-nav mr-auto py-0">
                                    <Link href="/" className={`nav-item nav-link ${router.pathname === '/' ? "active" : ""}`}>Home</Link>
                                    <Link href="/shop" className={`nav-item nav-link ${router.pathname === '/shop' ? "active" : ""}`}>Shop</Link>
                                    <Link href="/about" className={`nav-item nav-link ${router.pathname === '/about' ? "active" : ""}`}>About</Link>
                                    <Link href="/contact" className={`nav-item nav-link ${router.pathname === '/contact' ? "active" : ""}`}>Contact</Link>
                                </div>
                                <div className="navbar-nav ml-auto py-0 d-none d-lg-block">
                                    <Link href={`/cart`} className="btn px-0 ml-3">
                                        <i className="fas fa-shopping-cart text-primary"></i>
                                        <span className="badge text-secondary border border-secondary rounded-circle" style={{ paddingBottom: '2px' }}> {itemCount}</span>
                                    </Link>
                                </div>

                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}
