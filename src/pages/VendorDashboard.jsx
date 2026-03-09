import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { productService } from '../api/productService';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Plus, Edit2, Trash2, Package } from 'lucide-react';

const VendorDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        images: [''],
        tags: '',
    });

    useEffect(() => {
        if (!user || user.role !== 'Vendor') {
            navigate('/login');
            return;
        }
        fetchMyProducts();
    }, [user, navigate]);

    const fetchMyProducts = async () => {
        try {
            const data = await productService.getMyProducts();
            setProducts(data.products || data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const productData = {
                ...formData,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),
                tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
            };

            if (editingProduct) {
                await productService.updateProduct(editingProduct._id, productData);
            } else {
                await productService.createProduct(productData);
            }

            setShowForm(false);
            setEditingProduct(null);
            resetForm();
            fetchMyProducts();
        } catch (error) {
            console.error('Failed to save product:', error);
            alert(error.response?.data?.message || 'Failed to save product');
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price.toString(),
            category: product.category,
            stock: product.stock.toString(),
            images: product.images.length > 0 ? product.images : [''],
            tags: product.tags?.join(', ') || '',
        });
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        try {
            await productService.deleteProduct(id);
            fetchMyProducts();
        } catch (error) {
            console.error('Failed to delete product:', error);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            price: '',
            category: '',
            stock: '',
            images: [''],
            tags: '',
        });
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingProduct(null);
        resetForm();
    };

    return (
        <div className="min-h-screen bg-light">
            <Navbar onNavigate={(path) => navigate(path)} />
            <div className="pt-[88px] px-[5%] py-12">
                <div className="max-w-[1200px] mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="font-poppins text-3xl font-extrabold text-dark">Vendor Dashboard</h1>
                            <p className="text-mid mt-2">Welcome, {user?.name}</p>
                        </div>
                        <button
                            onClick={() => setShowForm(true)}
                            className="bg-primary text-white font-poppins font-bold px-6 py-3 rounded-xl hover:bg-primary-dark transition-all flex items-center gap-2"
                        >
                            <Plus size={20} />
                            Add Product
                        </button>
                    </div>

                    {/* Product Form */}
                    {showForm && (
                        <div className="bg-white rounded-[24px] p-8 shadow-sm mb-8">
                            <h2 className="font-poppins text-xl font-bold mb-6">
                                {editingProduct ? 'Edit Product' : 'Add New Product'}
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-bold text-dark mb-2">Product Name *</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-primary outline-none"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-dark mb-2">Category *</label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-primary outline-none"
                                            required
                                        >
                                            <option value="">Select Category</option>
                                            <option value="Electronics">Electronics</option>
                                            <option value="Jewellery & Accessories">Jewellery & Accessories</option>
                                            <option value="Handmade & Crafts">Handmade & Crafts</option>
                                            <option value="Clothing & Fashion">Clothing & Fashion</option>
                                            <option value="Health & Beauty">Health & Beauty</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-dark mb-2">Description *</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-primary outline-none"
                                        rows="4"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-bold text-dark mb-2">Price (PKR) *</label>
                                        <input
                                            type="number"
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                            className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-primary outline-none"
                                            min="0"
                                            step="0.01"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-dark mb-2">Stock *</label>
                                        <input
                                            type="number"
                                            value={formData.stock}
                                            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                            className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-primary outline-none"
                                            min="0"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-dark mb-2">Image URL</label>
                                    <input
                                        type="url"
                                        value={formData.images[0]}
                                        onChange={(e) => setFormData({ ...formData, images: [e.target.value] })}
                                        className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-primary outline-none"
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-dark mb-2">Tags (comma separated)</label>
                                    <input
                                        type="text"
                                        value={formData.tags}
                                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                        className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-primary outline-none"
                                        placeholder="electronics, gadget, phone"
                                    />
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        type="submit"
                                        className="bg-primary text-white font-poppins font-bold px-8 py-3 rounded-xl hover:bg-primary-dark transition-all"
                                    >
                                        {editingProduct ? 'Update Product' : 'Create Product'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="bg-slate-200 text-dark font-poppins font-bold px-8 py-3 rounded-xl hover:bg-slate-300 transition-all"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Products List */}
                    <div className="bg-white rounded-[24px] p-8 shadow-sm">
                        <h2 className="font-poppins text-xl font-bold mb-6">My Products</h2>
                        {loading ? (
                            <div className="text-center py-12 text-mid">Loading products...</div>
                        ) : products.length === 0 ? (
                            <div className="text-center py-12 text-mid">
                                <Package size={48} className="mx-auto mb-4 text-slate-300" />
                                <p>No products yet. Add your first product!</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {products.map((product) => (
                                    <div
                                        key={product._id}
                                        className="flex items-center gap-6 p-4 border-2 border-slate-200 rounded-xl hover:border-primary transition-all"
                                    >
                                        <div className="w-20 h-20 bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                                            {product.images?.[0] ? (
                                                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-2xl">🛍️</span>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-poppins font-bold text-dark mb-1">{product.name}</h3>
                                            <div className="flex items-center gap-4 text-sm text-mid">
                                                <span>Rs. {product.price?.toLocaleString()}</span>
                                                <span>•</span>
                                                <span>Stock: {product.stock}</span>
                                                <span>•</span>
                                                <span>{product.category}</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEdit(product)}
                                                className="p-3 bg-primary-light text-primary rounded-lg hover:bg-primary hover:text-white transition-all"
                                            >
                                                <Edit2 size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product._id)}
                                                className="p-3 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default VendorDashboard;
