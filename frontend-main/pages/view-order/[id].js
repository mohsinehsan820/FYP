import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from 'axios'

const PRIVATE_API_URL = process.env.NEXT_PUBLIC_USER_API_URL;

const OrderPage = () => {
    const router = useRouter();
    const orderNum = router.query;
    const [order, setOrder] = useState('');

    const readOrder = async () => {
        console.log('orderNum', orderNum);

        try {
            const token = localStorage.getItem('token')
            const response = await axios.get(`${PRIVATE_API_URL}/api/order/read/${orderNum.id}`,
                { headers: { 'x-access-token': token } }
            );
            console.log("response", response);
            setOrder(response.data.data)
        } catch (error) {
            console.log(error.response.data.msg);
        }
    }
    useEffect(() => {
        if (orderNum) readOrder()
    }, [orderNum])

    return (
        <>
            <div class="container my-5">
                <h1>Order #{order._id}</h1>
                <div id="orderDetails" >
                    <div class="row">
                        <div class="col-md-8">
                            {/* <!-- Shipping Card --> */}
                            <div class="card mb-3">
                                <div class="card-body">
                                    <h5 class="card-title">Shipping</h5>
                                    <p><strong>Name:</strong> {order.firstName} {order.lastName}</p>
                                    <p><strong>Address:</strong> {order?.shippingAddress?.addressLine1}</p>
                                    <div id="deliveryStatus" class="alert alert-warning">{order.status}</div>
                                </div>
                            </div>
                            {/* 
                            <!-- Payment Card --> */}
                            <div class="card mb-3">
                                <div class="card-body">
                                    <h5 class="card-title">Payment</h5>
                                    <p><strong>Method:</strong> {order.PaymentMethod}</p>
                                    <div className={`alert ${order.paymentStatus === 'Paid' ? 'alert-success' : order.paymentStatus === 'Refunded' ? 'alert-info' : 'alert-warning'}`}>
                                        {order.paymentStatus || 'Not Paid'}
                                    </div>
                                </div>
                            </div>

                            {/* <!-- Items Card --> */}
                            {/* <div class="card mb-3">
                                <div class="card-body">
                                    <h5 class="card-title">Items</h5>
                                    <ul class="list-group list-group-flush" id="itemsList">
                                    </ul>
                                </div>
                            </div> */}
                        </div>

                        <div class="col-md-4">
                            {/* <!-- Order Summary Card --> */}
                            <div class="card mb-3">
                                <div class="card-body">
                                    <h5 class="card-title">Order Summary</h5>
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item d-flex justify-content-between">
                                            <span>Subtotal</span>
                                            <span>${order.totalAmount -10}</span>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between">
                                            <span>Shipping</span>
                                            <span>$10</span>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between">
                                            <strong>Total</strong>
                                            <strong>${order.totalAmount}</strong>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* <!-- PayPal Button Placeholder --> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default OrderPage;