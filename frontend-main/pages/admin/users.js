import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '@/components/admin/AdminLayout';
import { toast } from 'react-toastify';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const USER_API_URL = process.env.NEXT_PUBLIC_USER_API_URL;

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${USER_API_URL}/api/user/`);
            setUsers(response.data.data);
        } catch (error) {
            console.error("Error fetching users", error);
            toast.error("Failed to load users");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this user?")) {
            try {
                await axios.delete(`${USER_API_URL}/api/user/${id}`);
                toast.success("User deleted successfully");
                fetchUsers();
            } catch (error) {
                console.error("Error deleting user", error);
                toast.error("Failed to delete user");
            }
        }
    };

    return (
        <AdminLayout>
            <h2>Users</h2>
            <div className="table-responsive mt-4">
                <table className="table table-striped table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? <span className="badge bg-success">Admin</span> : <span className="badge bg-secondary">User</span>}</td>
                                <td>
                                    {!user.isAdmin && (
                                        <button 
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(user._id)}
                                        >
                                            Delete
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
};

export default AdminUsers;
