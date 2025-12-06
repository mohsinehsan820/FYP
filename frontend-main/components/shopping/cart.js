import { useContext } from "react";
import { CartContext } from '@/components/contexts/cartContext';
import Link from "next/link";
import { useSelector } from 'react-redux';

const ADMIN_API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;

export default function Cart() {
    const { cartItems, setCartItems, removeItem, updateQuantity, handleUpdateQuantity } = useContext(CartContext);
    // const [updatedCartItems, setUpdatedCartItems] = useState(cartItems?.items || []);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

    const handleIncrement = async (productId) => {
        const item = cartItems.items?.find(item => item.product._id === productId);
        await handleUpdateQuantity(productId, item.quantity + 1);
    };

    const handleDecrement = async (productId) => {
        const item = cartItems?.items?.find(item => item.product._id === productId);
        if (item.quantity > 1) {
            await handleUpdateQuantity(productId, item.quantity - 1);
        }
    };

    return (
        <div className="container-fluid">
            {!isAuthenticated || cartItems?.items?.product?.length === 0 ? (<h1>No items in cart. Shop Now....</h1>) :
                (<div className="row px-xl-5">
                    <div className="col-lg-12 table-responsive mb-5">
                        <table className="table table-light table-borderless table-hover text-center mb-0">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Product</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody className="align-middle">
                                {cartItems?.items?.map((item) => (
                                    <tr key={item._id}>
                                        <td className="align-middle">
                                            <img src={item?.product?.images?.[0]?.url ? `${ADMIN_API_URL}/${item?.product?.images[0]?.url}` : ''} alt={item?.product?.name || "product image"} style={{ width: "80px" }} />
                                        </td>
                                        <td className="align-middle">
                                            {item.product?.name}
                                        </td>
                                        <td className="align-middle">${item.product?.price}</td>
                                        <td className="align-middle">
                                            <div className="input-group quantity mx-auto" style={{ width: "100px" }}>
                                                <div className="input-group-btn">
                                                    <button className="btn btn-sm btn-primary btn-minus" onClick={() => handleDecrement(item.product._id)}>
                                                        <i className="fa fa-minus"></i>
                                                    </button>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm bg-secondary border-0 text-center"
                                                    value={item.quantity}
                                                    onChange={(e) => handleUpdateQuantity(item.product._id, parseInt(e.target.value))}
                                                />
                                                <div className="input-group-btn">
                                                    <button className="btn btn-sm btn-primary btn-plus" onClick={() => handleIncrement(item.product._id)}>
                                                        <i className="fa fa-plus"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="align-middle">
                                            <button className="btn btn-sm btn-danger" onClick={() => removeItem(item.product._id)}>
                                                <i className="fa fa-times"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {cartItems?.items?.length > 0 ?
                            (
                                <Link href={'/checkout'}>
                                    <button className="btn btn-primary font-weight-bold my-3 py-3 animate__animated animate__fadeInUp">Proceed To Checkout</button>
                                </Link>
                            ) :
                            (
                                <Link href="/shop">
                                    <button className="btn btn-primary font-weight-bold py-2 px-4 mt-3 animate__animated animate__fadeInUp">
                                        Shop Now
                                    </button>
                                </Link>
                            )
                        }

                    </div>
                </div>)
            }
        </div>
    );
}
