import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '@/components/admin/AdminLayout';
import Link from 'next/link';
import { toast } from 'react-toastify';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const ADMIN_API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${ADMIN_API_URL}/api/product/`);
            setProducts(response.data.data);
        } catch (error) {
            console.error("Error fetching products", error);
            toast.error("Failed to load products");
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this product?")) {
            try {
                await axios.delete(`${ADMIN_API_URL}/api/product/destroy/${id}`);
                toast.success("Product deleted successfully");
                fetchProducts();
            } catch (error) {
                console.error("Error deleting product", error);
                toast.error("Failed to delete product");
            }
        }
    };

    return (
        <AdminLayout>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Products</h2>
                <Link href="/admin/add-product" className="btn btn-primary">
                    Add New Product
                </Link>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>
                                    <img 
                                        src={`${ADMIN_API_URL}/${product.images[0]?.url}`} 
                                        alt={product.name} 
                                        style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
                                    />
                                </td>
                                <td>{product.name}</td>
                                <td>{product.category}</td>
                                <td>${product.price}</td>
                                <td>{product.countInStock}</td>
                                <td>
                                    <Link href={`/admin/edit-product/${product._id}`} className="btn btn-warning btn-sm me-2">
                                        Edit
                                    </Link>
                                    <button 
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(product._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
};

export default AdminProducts;
