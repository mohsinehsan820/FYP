import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
    const ADMIN_API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL || 'http://localhost:3001';
    const USER_API_URL = process.env.NEXT_PUBLIC_USER_API_URL || 'http://localhost:3003';
    
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalOrders: 0,
        totalUsers: 0,
        totalRevenue: 0,
        pendingOrders: 0,
        lowStockProducts: 0
    });
    const [recentOrders, setRecentOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            // Fetch products
            const productsRes = await axios.get(`${ADMIN_API_URL}/api/product/`);
            const products = productsRes.data.data || [];
            
            // Fetch orders
            const ordersRes = await axios.get(`${USER_API_URL}/api/order/admin/all`);
            const orders = ordersRes.data.data || [];
            
            // Fetch users
            const usersRes = await axios.get(`${USER_API_URL}/api/user/`);
            const users = usersRes.data.data || [];

            // Calculate stats
            const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
            const pendingOrders = orders.filter(order => order.status === 'Pending' || order.status === 'Processing').length;
            const lowStockProducts = products.filter(product => product.countInStock < 10).length;

            setStats({
                totalProducts: products.length,
                totalOrders: orders.length,
                totalUsers: users.length,
                totalRevenue: totalRevenue.toFixed(2),
                pendingOrders,
                lowStockProducts
            });

            // Get recent 5 orders
            const sortedOrders = orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setRecentOrders(sortedOrders.slice(0, 5));
            
            setLoading(false);
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
            toast.error("Failed to load dashboard data");
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Admin Dashboard</h1>
                <button className="btn btn-primary" onClick={fetchDashboardData}>
                    <i className="fas fa-sync-alt mr-2"></i>Refresh
                </button>
            </div>
            
            {/* Stats Cards */}
            <div className="row mb-4">
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                        Total Products
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{stats.totalProducts}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-box fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-success shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                        Total Orders
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{stats.totalOrders}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-shopping-cart fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-info shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                                        Total Revenue
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">${stats.totalRevenue}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-warning shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                        Total Users
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{stats.totalUsers}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-users fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Alert Cards */}
            <div className="row mb-4">
                <div className="col-md-6 mb-3">
                    <div className="card border-left-danger shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-danger text-uppercase mb-1">
                                        Pending Orders
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{stats.pendingOrders}</div>
                                    <small className="text-muted">Orders requiring attention</small>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-clock fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 mb-3">
                    <div className="card border-left-warning shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                        Low Stock Products
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{stats.lowStockProducts}</div>
                                    <small className="text-muted">Products with less than 10 items</small>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-exclamation-triangle fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Orders Table */}
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Recent Orders</h6>
                </div>
                <div className="card-body">
                    {recentOrders.length > 0 ? (
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Customer</th>
                                        <th>Total</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentOrders.map((order) => (
                                        <tr key={order._id}>
                                            <td>{order._id.substring(0, 8)}...</td>
                                            <td>{order.user?.email || 'N/A'}</td>
                                            <td>${order.totalAmount?.toFixed(2)}</td>
                                            <td>
                                                <span className={`badge badge-${
                                                    order.status === 'delivered' ? 'success' :
                                                    order.status === 'processing' ? 'warning' :
                                                    order.status === 'pending' ? 'info' : 'secondary'
                                                }`}>
                                                    {order.status || 'pending'}
                                                </span>
                                            </td>
                                            <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-center text-muted">No orders yet</p>
                    )}
                </div>
            </div>

            <style jsx>{`
                .border-left-primary {
                    border-left: 0.25rem solid #4e73df !important;
                }
                .border-left-success {
                    border-left: 0.25rem solid #1cc88a !important;
                }
                .border-left-info {
                    border-left: 0.25rem solid #36b9cc !important;
                }
                .border-left-warning {
                    border-left: 0.25rem solid #f6c23e !important;
                }
                .border-left-danger {
                    border-left: 0.25rem solid #e74a3b !important;
                }
                .text-gray-300 {
                    color: #dddfeb !important;
                }
                .text-gray-800 {
                    color: #5a5c69 !important;
                }
            `}</style>
        </AdminLayout>
    );
};

export default AdminDashboard;
