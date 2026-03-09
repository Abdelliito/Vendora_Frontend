import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { productService } from '../api/productService';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { SlidersHorizontal, Search, X } from 'lucide-react';

const ProductsListPage = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        category: '',
        minPrice: '',
        maxPrice: '',
        sortBy: 'newest',
    });
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    const categories = [
        'Electronics',
        'Jewellery & Accessories',
        'Handmade & Crafts',
        'Clothing & Fashion',
        'Health & Beauty',
    ];

    useEffect(() => {
        fetchProducts();
    }, [filters, searchQuery]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const params = {
                keyword: searchQuery,
                category: filters.category,
                minPrice: filters.minPrice,
                maxPrice: filters.maxPrice,
                sort: filters.sortBy,
                limit: 50,
            };
            
            // Remove empty params
            Object.keys(params).forEach(key => {
                if (!params[key]) delete params[key];
            });

            const data = await productService.getAllProducts(params);
            setProducts(data.products || data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const clearFilters = () => {
        setFilters({
            category: '',
            minPrice: '',
            maxPrice: '',
            sortBy: 'newest',
        });
        setSearchQuery('');
    };

    const FilterPanel = () => (
        <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-poppins text-lg font-bold text-dark flex items-center gap-2">
                    <SlidersHorizontal size={20} className="text-primary" />
                    Filters
                </h3>
                <button
                    onClick={clearFilters}
                    className="text-xs text-primary hover:underline font-semibold"
                >
                    Clear All
                </button>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
                <label className="block text-sm font-bold text-dark mb-3">Category</label>
                <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="category"
                            checked={filters.category === ''}
                            onChange={() => handleFilterChange('category', '')}
                            className="w-4 h-4 text-primary"
                        />
                        <span className="text-sm text-mid">All Categories</span>
                    </label>
                    {categories.map((cat) => (
                        <label key={cat} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="category"
                                checked={filters.category === cat}
                                onChange={() => handleFilterChange('category', cat)}
                                className="w-4 h-4 text-primary"
                            />
                            <span className="text-sm text-mid">{cat}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
                <label className="block text-sm font-bold text-dark mb-3">Price Range (PKR)</label>
                <div className="space-y-3">
                    <input
                        type="number"
                        placeholder="Min Price"
                        value={filters.minPrice}
                        onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                        className="w-full border-2 border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-primary outline-none"
                    />
                    <input
                        type="number"
                        placeholder="Max Price"
                        value={filters.maxPrice}
                        onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                        className="w-full border-2 border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-primary outline-none"
                    />
                </div>
            </div>

            {/* Sort By */}
            <div className="mb-6">
                <label className="block text-sm font-bold text-dark mb-3">Sort By</label>
                <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                    className="w-full border-2 border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-primary outline-none"
                >
                    <option value="newest">Newest First</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                </select>
            </div>

            {/* Active Filters Count */}
            {(filters.category || filters.minPrice || filters.maxPrice || searchQuery) && (
                <div className="bg-primary-light text-primary px-3 py-2 rounded-lg text-xs font-semibold text-center">
                    {[filters.category, filters.minPrice, filters.maxPrice, searchQuery].filter(Boolean).length} filter(s) active
                </div>
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-light">
            <Navbar onNavigate={(path) => navigate(path)} />
            
            <div className="pt-[88px] px-[5%] py-12">
                <div className="max-w-[1400px] mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="font-poppins text-3xl font-extrabold text-dark mb-2">
                            All Products
                        </h1>
                        <p className="text-mid">Discover amazing products from verified vendors</p>
                    </div>

                    {/* Search Bar */}
                    <div className="mb-8">
                        <div className="relative max-w-xl">
                            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-mid" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full border-2 border-slate-200 rounded-xl pl-12 pr-12 py-3 focus:border-primary outline-none"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-mid hover:text-dark"
                                >
                                    <X size={20} />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Mobile Filter Toggle */}
                    <button
                        onClick={() => setShowMobileFilters(!showMobileFilters)}
                        className="lg:hidden mb-6 bg-primary text-white font-poppins font-bold px-6 py-3 rounded-xl flex items-center gap-2"
                    >
                        <SlidersHorizontal size={20} />
                        Filters
                    </button>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Filters Sidebar */}
                        <div className={`lg:col-span-1 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
                            <FilterPanel />
                        </div>

                        {/* Products Grid */}
                        <div className="lg:col-span-3">
                            {loading ? (
                                <div className="text-center py-20">
                                    <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                                    <p className="text-mid">Loading products...</p>
                                </div>
                            ) : products.length === 0 ? (
                                <div className="text-center py-20">
                                    <div className="text-6xl mb-4">🔍</div>
                                    <h3 className="font-poppins text-xl font-bold text-dark mb-2">No products found</h3>
                                    <p className="text-mid mb-6">Try adjusting your filters or search query</p>
                                    <button
                                        onClick={clearFilters}
                                        className="bg-primary text-white font-poppins font-bold px-6 py-3 rounded-xl hover:bg-primary-dark transition-all"
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="flex justify-between items-center mb-6">
                                        <p className="text-sm text-mid">
                                            Showing <span className="font-bold text-dark">{products.length}</span> products
                                        </p>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {products.map((product) => (
                                            <ProductCard key={product._id} product={product} />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ProductsListPage;
