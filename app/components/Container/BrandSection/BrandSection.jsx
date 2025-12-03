"use client";
import CustomImage from "@/app/common/Image";
import { ProductCard } from "@/app/common/ProducrCart";
import { getAllBrands, getBrandBySlug } from "@/app/store/slice/brandsSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function BrandPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [mobileMenu, setMobileMenu] = useState(false);
    const [viewMode, setViewMode] = useState('grid');
    const [searchQuery, setSearchQuery] = useState('');

    const { brands, loadingAll, loadingSlug, brandDetail } = useSelector(
        (state) => state.brands
    );

    useEffect(() => {
        dispatch(getAllBrands());
    }, [dispatch]);

    const handleBrandClick = (slug) => {
        dispatch(getBrandBySlug(slug));
        setMobileMenu(false);
    };

    const filteredProducts = brandDetail?.products?.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        }).format(price);
    };

    const getProductImage = (product) => {
        if (product.isVariant && product.variants?.[0]?.variantImages?.[0]) {
            return product.variants[0].variantImages[0];
        }
        return product.productImages?.[0] || 'https://via.placeholder.com/400';
    };

    const getProductPrice = (product) => {
        if (product.isVariant && product.variants?.[0]) {
            return product.variants[0];
        }
        return product;
    };

    const handleNavigate = (item) => {
        router.push(`/product/${item.slug}`);
    };

    return (
        <div className="flex flex-col md:flex-row h-screen bg-linear-to-r from-[#fff5e6] to-[#fff5e6] overflow-hidden">
            <div className="hidden md:block w-72 border-r border-gray-300 shadow p-4">
                <h2 className="text-lg font-bold mb-4">Brands</h2>
                {loadingAll && <p className="text-gray-500">Loading...</p>}
                <ul className="space-y-2 overflow-y-auto h-[calc(100vh-90px)] pr-1">
                    {brands?.map((brand) => (
                        <li
                            key={brand._id}
                            onClick={() => handleBrandClick(brand.slug)}
                            className="p-3 border border-gray-300 rounded-lg text-sm cursor-pointer hover:bg-gray-200 transition active:scale-[0.98]"
                        >
                            {brand?.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="md:hidden w-full p-4 border-b border-gray-300 flex justify-between items-center shadow-sm">
                <h2 className="text-lg font-bold">Brands</h2>
                <button
                    className="px-4 py-2.5 text-white rounded-lg bg_primary active:scale-95 transition-all"
                    onClick={() => setMobileMenu(true)}
                >
                    Browse Brands
                </button>
            </div>
            <div
                className={`fixed top-0 left-0 w-full h-full bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden 
                ${mobileMenu ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="pt-safe-top">
                    <div className="p-4 border-b border-gray-200 flex items-center justify-between shadow-sm">
                        <h2 className="text-xl font-bold">All Brands</h2>
                        <button
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 active:bg-gray-200"
                            onClick={() => setMobileMenu(false)}
                        >
                            <span className="text-2xl">×</span>
                        </button>
                    </div>
                </div>
                <div className="h-[calc(100vh-80px)] overflow-y-auto pb-safe-bottom">
                    {loadingAll ? (
                        <div className="flex justify-center items-center h-40">
                            <p className="text-gray-500">Loading brands...</p>
                        </div>
                    ) : (
                        <ul className="p-4 space-y-3">
                            {brands?.map((brand) => (
                                <li
                                    key={brand._id}
                                    onClick={() => handleBrandClick(brand.slug)}
                                    className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm cursor-pointer hover:bg-gray-50 active:bg-gray-100 active:scale-[0.995] transition-all"
                                >
                                    <span className="text-base font-medium">{brand?.name}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            {mobileMenu && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                    onClick={() => setMobileMenu(false)}
                />
            )}
            <div className="flex-1 flex flex-col overflow-hidden w-full">
                <div className="bg-white px-4 py-3 md:px-6 md:py-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-3 sticky top-0 z-10">
                    <div className="w-full relative">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-gray-100 border-0 outline-none text-base focus:ring-2 focus:ring-blue-500 focus:bg-white"
                        />
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                        <button className="px-4 py-2.5 rounded-full bg-gray-100 border-0 text-sm whitespace-nowrap active:bg-gray-200 active:scale-95 transition-all">
                            Filter
                        </button>
                        <button className="px-4 py-2.5 rounded-full bg-gray-100 border-0 text-sm whitespace-nowrap active:bg-gray-200 active:scale-95 transition-all">
                            New to Old
                        </button>
                        <div className="flex items-center bg-gray-100 rounded-full p-1">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`w-9 h-9 flex items-center justify-center rounded-full transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                                title="Grid View"
                            >
                                <span className="text-lg">☰</span>
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`w-9 h-9 flex items-center justify-center rounded-full transition-all ${viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                                title="List View"
                            >
                                <span className="text-lg">≡</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto scrollbar-hide p-4 md:p-6">
                    {!loadingSlug && !brandDetail && (
                        <div className="h-full flex flex-col items-center justify-center text-center p-4">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <span className="text-3xl">🏷️</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Brand Selected</h3>
                            <p className="text-gray-500 mb-6">Select a brand to view products</p>
                            <button
                                onClick={() => setMobileMenu(true)}
                                className="px-6 py-3 bg_primary text-white rounded-lg font-medium active:opacity-90 active:scale-95 transition-all md:hidden"
                            >
                                Browse Brands
                            </button>
                        </div>
                    )}
                    {loadingSlug && (
                        <div className="flex flex-col items-center justify-center h-full p-4">
                            <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                            <p className="text-gray-500">Loading brand details...</p>
                        </div>
                    )}
                    {brandDetail && (
                        <div className="space-y-6">
                            <div className="bg-white/30 backdrop-blur-lg p-3 rounded-2xl border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                                    <CustomImage
                                        src={brandDetail.brand?.logo}
                                        alt={brandDetail.brand?.name}
                                        className="w-24 h-24 sm:w-32 sm:h-32 object-contain border border-white/40 rounded-xl p-3 bg-white/20"
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                            {brandDetail.brand?.name}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {brandDetail.brand?.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                                    <h2 className="text-xl font-bold text-gray-900">
                                        Products ({filteredProducts.length || brandDetail.productCount || 0})
                                    </h2>

                                    {searchQuery && (
                                        <span className="text-sm text-gray-500">
                                            Found {filteredProducts.length} products
                                        </span>
                                    )}
                                </div>

                                {filteredProducts?.length === 0 ? (
                                    <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                                        <p className="text-gray-500">No products found matching your search.</p>
                                    </div>
                                ) : viewMode === 'grid' ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                        {filteredProducts?.map((product) => (
                                            <div key={product._id} onClick={() => handleNavigate(product)}>
                                                <ProductCard
                                                    isHover={false}
                                                    product={product}
                                                    onAddToCart={() => handleAddToCart(product)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {filteredProducts?.map((product) => {
                                            const priceData = getProductPrice(product);
                                            const hasDiscount = priceData.offerPrice && priceData.offerPrice < priceData.price;

                                            return (
                                                <div
                                                    key={product._id}
                                                    onClick={() => handleNavigate(product)}
                                                    className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md active:shadow-sm transition-all cursor-pointer"
                                                >
                                                    <div className="flex flex-col sm:flex-row">
                                                        <div className="sm:w-48 h-58 bg-gray-100 overflow-hidden relative">
                                                            <CustomImage
                                                                src={getProductImage(product)}
                                                                className="w-full h-full object-cover"
                                                                alt={product.name}
                                                                loading="lazy"
                                                            />
                                                            <div className="absolute top-2 left-2 flex flex-col gap-1">
                                                                {product.isNewArrival && (
                                                                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                                                                        New
                                                                    </span>
                                                                )}
                                                                {product.isBestSeller && (
                                                                    <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">
                                                                        Best Seller
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="flex-1 p-4">
                                                            <h3 className="font-semibold text-gray-900 text-md mb-2">
                                                                {product?.name}
                                                            </h3>
                                                            <p className="text-gray-600 mb-3 text-sm line-clamp-3">
                                                                {product?.description}
                                                            </p>
                                                            <div className="flex flex-wrap gap-2 mb-3">
                                                                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                                                    {product.category?.name}
                                                                </span>
                                                                {product.isVariant && (
                                                                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                                                                        Variants Available
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                                                <div className="flex items-center gap-2">
                                                                    {hasDiscount ? (
                                                                        <>
                                                                            <span className="font-bold text-gray-900 text-xl">
                                                                                {formatPrice(priceData.offerPrice)}
                                                                            </span>
                                                                            <span className="text-gray-400 line-through">
                                                                                {formatPrice(priceData.price)}
                                                                            </span>
                                                                            <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded">
                                                                                {Math.round((1 - priceData.offerPrice / priceData.price) * 100)}% off
                                                                            </span>
                                                                        </>
                                                                    ) : (
                                                                        <span className="font-bold text-gray-900 text-xl">
                                                                            {formatPrice(priceData.price)}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <span className="text-sm text-gray-500">
                                                                        Stock: {product.stock}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
