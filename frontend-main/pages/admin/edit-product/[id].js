import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '@/components/admin/AdminLayout';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const EditProduct = () => {
    const router = useRouter();
    const { id } = router.query;
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
    const [existingImages, setExistingImages] = useState([]);
    const [imagePreview, setImagePreview] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCategories();
        if (id) {
            fetchProduct();
        }
    }, [id]);

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${PUBLIC_API_URL}/api/category`);
            if (response.data && response.data.data) {
                setCategories(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching categories", error);
        }
    };

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`${ADMIN_API_URL}/api/product/read/${id}`);
            const product = response.data.data;
            setFormData({
                name: product.name,
                slug: product.slug,
                brand: product.brand,
                category: product.category,
                description: product.description,
                price: product.price,
                countInStock: product.countInStock,
                rating: product.rating,
                numReviews: product.numReviews,
                featuredProduct: product.featuredProduct || false
            });
            setExistingImages(product.images || []);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching product", error);
            toast.error("Failed to load product details");
            setLoading(false);
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

    const removeExistingImage = (index) => {
        const updatedImages = existingImages.filter((_, i) => i !== index);
        setExistingImages(updatedImages);
    };

    const removeNewImage = (index) => {
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
        
        // Add existing images that weren't removed
        if (existingImages.length > 0) {
            data.append('existingImages', JSON.stringify(existingImages));
        }
        
        // Add new images
        if (images.length > 0) {
            images.forEach((image) => {
                data.append('images', image);
            });
        }

        try {
            await axios.post(`${ADMIN_API_URL}/api/product/update/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success("Product updated successfully");
            router.push('/admin/products');
        } catch (error) {
            console.error("Error updating product", error);
            toast.error("Failed to update product");
        }
    };

    if (loading) {
        return (
            <AdminLayout>
                <div>Loading...</div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <h2>Edit Product</h2>
            <form onSubmit={handleSubmit} className="mt-4" style={{ maxWidth: '600px' }}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Slug</label>
                    <input type="text" className="form-control" name="slug" value={formData.slug} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Brand</label>
                    <input type="text" className="form-control" name="brand" value={formData.brand} onChange={handleChange} required />
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
                    <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} required />
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Price</label>
                        <input type="number" className="form-control" name="price" value={formData.price} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Count In Stock</label>
                        <input type="number" className="form-control" name="countInStock" value={formData.countInStock} onChange={handleChange} required />
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Product Images</label>
                    
                    {/* Existing Images */}
                    {existingImages.length > 0 && (
                        <div className="mb-3">
                            <label className="form-label text-muted small">Current Images:</label>
                            <div className="row">
                                {existingImages.map((img, index) => (
                                    <div key={index} className="col-md-3 mb-2 position-relative">
                                        <img 
                                            src={`${ADMIN_API_URL}/${img.url}`} 
                                            alt={`Product ${index + 1}`} 
                                            className="img-thumbnail"
                                            style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm position-absolute"
                                            style={{ top: '5px', right: '20px' }}
                                            onClick={() => removeExistingImage(index)}
                                        >
                                            <i className="fa fa-times"></i>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {/* New Image Upload */}
                    <input 
                        type="file" 
                        className="form-control" 
                        onChange={handleImageChange} 
                        multiple 
                        accept="image/*" 
                    />
                    
                    {/* New Images Preview */}
                    {imagePreview.length > 0 && (
                        <div className="mt-3">
                            <label className="form-label text-muted small">New Images to Upload:</label>
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
                                            onClick={() => removeNewImage(index)}
                                        >
                                            <i className="fa fa-times"></i>
                                        </button>
                                        <div className="badge badge-success position-absolute" style={{ bottom: '5px', left: '15px' }}>
                                            New
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {images.length > 0 && (
                        <small className="form-text text-muted d-block mt-2">
                            {images.length} new image(s) selected
                        </small>
                    )}
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="featuredProduct" name="featuredProduct" checked={formData.featuredProduct} onChange={handleChange} />
                    <label className="form-check-label" htmlFor="featuredProduct">Featured Product</label>
                </div>
                <button type="submit" className="btn btn-primary">Update Product</button>
            </form>
        </AdminLayout>
    );
};

export default EditProduct;
