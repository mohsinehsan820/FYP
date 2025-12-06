import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '@/components/admin/AdminLayout';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const AddProduct = () => {
    const router = useRouter();
    const ADMIN_API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL || 'http://localhost:3001';
    const PUBLIC_API_URL = process.env.NEXT_PUBLIC_PUBLIC_API_URL || 'http://localhost:3002';
    
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        brand: '',
        category: '',
        description: '',
        price: '',
        countInStock: '',
        rating: 0,
        numReviews: 0,
        featuredProduct: false
    });
    const [images, setImages] = useState([]);
    const [imagePreview, setImagePreview] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${PUBLIC_API_URL}/api/category`);
            if (response.data && response.data.data) {
                setCategories(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
            toast.error("Failed to load categories");
        }
    };

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
        
        // Create preview URLs
        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreview(previews);
    };

    const removeImage = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        const updatedPreviews = imagePreview.filter((_, i) => i !== index);
        setImages(updatedImages);
        setImagePreview(updatedPreviews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }
        if (images.length > 0) {
            images.forEach((image) => {
                data.append('images', image);
            });
        }

        try {
            await axios.post(`${ADMIN_API_URL}/api/product/create`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success("Product created successfully");
            router.push('/admin/products');
        } catch (error) {
            console.error("Error creating product", error);
            toast.error("Failed to create product");
        }
    };

    return (
        <AdminLayout>
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit} className="mt-4" style={{ maxWidth: '600px' }}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Slug</label>
                    <input type="text" className="form-control" name="slug" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Brand</label>
                    <input type="text" className="form-control" name="brand" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Category</label>
                    <select className="form-control" name="category" value={formData.category} onChange={handleChange} required>
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                            <option key={category._id} value={category.slug}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                <div className="mb-3">
                    <label className="form-label">Product Images (Select multiple)</label>
                    <input 
                        type="file" 
                        className="form-control" 
                        onChange={handleImageChange} 
                        multiple 
                        accept="image/*" 
                        required 
                    />
                    
                    {/* Image Preview */}
                    {imagePreview.length > 0 && (
                        <div className="mt-3">
                            <label className="form-label text-muted small">Preview:</label>
                            <div className="row">
                                {imagePreview.map((preview, index) => (
                                    <div key={index} className="col-md-3 mb-2 position-relative">
                                        <img 
                                            src={preview} 
                                            alt={`Preview ${index + 1}`} 
                                            className="img-thumbnail"
                                            style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm position-absolute"
                                            style={{ top: '5px', right: '20px' }}
                                            onClick={() => removeImage(index)}
                                        >
                                            <i className="fa fa-times"></i>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {images.length > 0 && (
                        <small className="form-text text-muted d-block mt-2">
                            {images.length} image(s) selected
                        </small>
                    )}
                </div>div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Stock</label>
                        <input type="number" className="form-control" name="countInStock" onChange={handleChange} required />
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Images (Select multiple)</label>
                    <input type="file" className="form-control" onChange={handleImageChange} multiple accept="image/*" required />
                    {images.length > 0 && (
                        <small className="form-text text-muted">{images.length} image(s) selected</small>
                    )}
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="featuredProduct" name="featuredProduct" onChange={handleChange} />
                    <label className="form-check-label" htmlFor="featuredProduct">Featured Product</label>
                </div>
                <button type="submit" className="btn btn-primary">Create Product</button>
            </form>
        </AdminLayout>
    );
};

export default AddProduct;
