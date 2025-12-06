import AdminLayout from '@/components/admin/AdminLayout';

const AdminDashboard = () => {
    return (
        <AdminLayout>
            <h1>Admin Dashboard</h1>
            <p>Welcome to the admin panel. Use the sidebar to manage products, users, and orders.</p>
            
            <div className="row mt-4">
                <div className="col-md-4">
                    <div className="card text-white bg-primary mb-3">
                        <div className="card-header">Products</div>
                        <div className="card-body">
                            <h5 className="card-title">Manage Products</h5>
                            <p className="card-text">Add, edit, or delete products from the store.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-white bg-success mb-3">
                        <div className="card-header">Orders</div>
                        <div className="card-body">
                            <h5 className="card-title">Manage Orders</h5>
                            <p className="card-text">View and update order statuses.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-white bg-warning mb-3">
                        <div className="card-header">Users</div>
                        <div className="card-body">
                            <h5 className="card-title">Manage Users</h5>
                            <p className="card-text">View registered users.</p>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
