import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '@/components/admin/AdminLayout';
import { toast } from 'react-toastify';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const USER_API_URL = process.env.NEXT_PUBLIC_USER_API_URL;

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`${USER_API_URL}/api/order/admin/all`);
            setOrders(response.data.data);
        } catch (error) {
            console.error("Error fetching orders", error);
            // toast.error("Failed to load orders");
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        try {
            await axios.put(`${USER_API_URL}/api/order/status/${id}`, { status: newStatus });
            toast.success("Order status updated");
            fetchOrders();
        } catch (error) {
            console.error("Error updating order", error);
            toast.error("Failed to update order");
        }
    };

    const handlePaymentStatusChange = async (id, newPaymentStatus) => {
        try {
            await axios.put(`${USER_API_URL}/api/order/payment-status/${id}`, { paymentStatus: newPaymentStatus });
            toast.success("Payment status updated");
            fetchOrders();
        } catch (error) {
            console.error("Error updating payment status", error);
            toast.error("Failed to update payment status");
        }
    };

    return (
        <AdminLayout>
            <h2>Orders</h2>
            <div className="table-responsive mt-4">
                <table className="table table-striped table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th>Order ID</th>
                            <th>User</th>
                            <th>Total Price</th>
                            <th>Status</th>
                            <th>Payment Status</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user?.email || 'Unknown'}</td>
                                <td>${order.totalAmount}</td>
                                <td>
                                    <span className={`badge ${order.status === 'Delivered' ? 'bg-success' : order.status === 'Cancelled' ? 'bg-danger' : 'bg-warning'}`}>
                                        {order.status || 'Pending'}
                                    </span>
                                </td>
                                <td>
                                    <span className={`badge ${order.paymentStatus === 'Paid' ? 'bg-success' : order.paymentStatus === 'Refunded' ? 'bg-info' : 'bg-danger'}`}>
                                        {order.paymentStatus || 'Not Paid'}
                                    </span>
                                </td>
                                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <select 
                                        className="form-select form-select-sm mb-2"
                                        value={order.status || 'Pending'}
                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                    <select 
                                        className="form-select form-select-sm"
                                        value={order.paymentStatus || 'Not Paid'}
                                        onChange={(e) => handlePaymentStatusChange(order._id, e.target.value)}
                                    >
                                        <option value="Not Paid">Not Paid</option>
                                        <option value="Paid">Paid</option>
                                        <option value="Refunded">Refunded</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
};

export default AdminOrders;
