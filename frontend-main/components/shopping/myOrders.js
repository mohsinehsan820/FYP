import { toast } from "react-toastify";
import axios from 'axios';
import { useEffect, useState } from "react"
import Link from "next/link";

const PRIVATE_API_URL = process.env.NEXT_PUBLIC_USER_API_URL;

export default function History() {
    const [orders, setOrders] = useState([])
    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.get(
                `${PRIVATE_API_URL}/api/order/`,
                { headers: { 'x-access-token': token } }
            );
            setOrders(response.data.data)

        } catch (error) {
            console.log("Error in adding to cart", error);
            toast.error(error.response?.data?.msg || "Failed to read cart.");
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <>
            <div class="container mt-5">
                <h1>My Order History</h1>

                {/* <div id="loadingBox"className="spinner-border text-primary" role="status">
                </div>

                <div id="messageBox" className="alert alert-danger" role="alert">
                    Error loading order history
                </div> */}

                <table class="table table-bordered mt-3" id="orderTable">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Total Amount</th>
                            <th>Payment Method</th>
                            <th>Delivered</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="orderBody">
                        {
                            orders?.map((order) => {
                                return (
                                    <tr key={order._id}>
                                        <th>{new Date(order.createdAt).toDateString()}</th>
                                        <th>{new Date(order.createdAt).toLocaleTimeString()}</th>
                                        <th>Rs {order.totalAmount}</th>
                                        <th>{order.PaymentMethod}</th>
                                        <th>{order.status}</th>
                                        <Link href={`/view-order/${order._id}`}>
                                        <th>View</th>
                                        </Link>
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>
            </div>
        </>
    )
}