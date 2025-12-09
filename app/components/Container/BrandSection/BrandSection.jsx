"use client";
import { NoProductFound } from "@/app/common/Animation";
import CustomImage from "@/app/common/Image";
import { ProductCard } from "@/app/common/ProducrCart";
import { getAllBrands, getBrandBySlug } from "@/app/store/slice/brandsSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

export default function BrandPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [viewMode, setViewMode] = useState('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBrandSlug, setSelectedBrandSlug] = useState(null);
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    const { brands, loadingAll, loadingSlug, brandDetail } = useSelector(
        (state) => state.brands
    );

    useEffect(() => {
        dispatch(getAllBrands());
    }, [dispatch]);

    useEffect(() => {
        if (isInitialLoad && brands?.length > 0 && !selectedBrandSlug && !brandDetail) {
            const firstBrand = brands[0];
            setSelectedBrandSlug(firstBrand.slug);
            dispatch(getBrandBySlug(firstBrand.slug));
            setIsInitialLoad(false);
        }
    }, [brands, selectedBrandSlug, brandDetail, dispatch, isInitialLoad]);

    const handleBrandClick = (slug) => {
        setSelectedBrandSlug(slug);
        dispatch(getBrandBySlug(slug));
        setIsInitialLoad(false);
    };

    const filteredProducts =
        brandDetail?.products?.filter((product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase())
        ) || [];

    const formatPrice = (price) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        }).format(price);
    };

    const getProductImage = (product) => {
        if (product.isVariant && product.variants?.[0]?.variantImages?.[0]) {
            return product.variants[0].variantImages[0];
        }
        return product.productImages?.[0] || "https://via.placeholder.com/400";
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
            <div className="hidden md:flex flex-col w-72 border-r border-gray-300 shadow">
                <div className="p-4 border-b border-gray-300">
                    <h2 className="text-lg font-bold">Brands</h2>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                    {loadingAll && <p className="text-gray-500">Loading...</p>}
                    <ul className="space-y-2">
                        {brands?.map((brand) => (
                            <li
                                key={brand._id}
                                onClick={() => handleBrandClick(brand.slug)}
                                className={`p-3 border rounded-lg text-sm cursor-pointer transition ${selectedBrandSlug === brand.slug
                                    ? 'bg-red-600 text-white border-red-600 shadow-sm'
                                    : 'border-gray-300 hover:bg-gray-100'
                                    }`}
                            >
                                {brand?.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="md:hidden w-full p-4 border-b border-gray-300 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-bold">All Lipsticks</h2>
                    <div className="flex items-center bg-gray-100 rounded-full p-1">
                        <button
                            onClick={() => setViewMode("grid")}
                            className={`w-8 h-8 flex items-center justify-center rounded-full transition-all ${viewMode === "grid" ? "bg-white shadow-sm" : "hover:bg-gray-200"}`}
                            title="Grid View"
                        >
                            <span className="text-sm">☰</span>
                        </button>
                        <button
                            onClick={() => setViewMode("list")}
                            className={`w-8 h-8 flex items-center justify-center rounded-full transition-all ${viewMode === "list" ? "bg-white shadow-sm" : "hover:bg-gray-200"}`}
                            title="List View"
                        >
                            <span className="text-sm">≡</span>
                        </button>
                    </div>
                </div>

                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 outline-none text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <FiSearch className="text-base" />
                    </span>
                </div>
            </div>
            <div className="md:hidden w-full overflow-x-auto bg-white border-b border-gray-200 shadow-sm scrollbar-hide">
                <div className="flex px-4 py-3 space-x-3 min-w-max">
                    {loadingAll ? (
                        <div className="flex space-x-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-20 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                            ))}
                        </div>
                    ) : (
                        brands?.map((brand) => (
                            <button
                                key={brand._id}
                                onClick={() => handleBrandClick(brand.slug)}
                                className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-all  ${selectedBrandSlug === brand.slug
                                    ? 'bg-red-600 text-white shadow-md'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {brand?.name}
                            </button>
                        ))
                    )}
                </div>
            </div>
            <div className="flex-1 flex flex-col overflow-hidden">
                <div className="hidden md:flex px-6 py-4 border-b border-gray-200 items-center justify-between gap-4 sticky top-0 z-10 bg-white">
                    <div className="flex-1 relative max-w-xl">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 outline-none text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <FiSearch className="text-xl" />
                        </span>
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center bg-gray-100 rounded-full p-1">
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`w-9 h-9 flex items-center justify-center rounded-full transition-all ${viewMode === "grid" ? "bg-white shadow-sm" : "hover:bg-gray-200"}`}
                                title="Grid View"
                            >
                                <span className="text-lg">☰</span>
                            </button>
                            <button
                                onClick={() => setViewMode("list")}
                                className={`w-9 h-9 flex items-center justify-center rounded-full transition-all ${viewMode === "list" ? "bg-white shadow-sm" : "hover:bg-gray-200"}`}
                                title="List View"
                            >
                                <span className="text-lg">≡</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto scrollbar-hide p-4 md:p-6">
                    {loadingSlug && (
                        <div className="flex flex-col items-center justify-center h-full p-4">
                            <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                            <p className="text-gray-500">Loading products...</p>
                        </div>
                    )}
                    {brandDetail ? (
                        <div className="space-y-6">
                            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-gray-200 shadow-sm">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                    {brandDetail.brand?.logo && (
                                        <CustomImage
                                            src={brandDetail.brand?.logo}
                                            alt={brandDetail.brand?.name}
                                            className="w-16 h-16 sm:w-20 sm:h-20 object-contain border border-gray-200 rounded-lg p-2 bg-white"
                                        />
                                    )}
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-gray-900">
                                            {brandDetail.brand?.name}
                                        </h3>
                                        {brandDetail.brand?.description && (
                                            <p className="text-gray-600 text-sm mt-1">
                                                {brandDetail.brand?.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                                    <h2 className="text-lg font-bold text-gray-900">
                                        Products ({filteredProducts.length})
                                    </h2>

                                    {searchQuery && (
                                        <span className="text-sm text-gray-500">
                                            Found {filteredProducts.length} products
                                        </span>
                                    )}
                                </div>
                                {filteredProducts.length === 0 ? (
                                    <NoProductFound />
                                ) : viewMode === "grid" ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                                        {filteredProducts?.map((product) => (
                                            <div
                                                key={product._id}
                                                onClick={() => handleNavigate(product)}
                                                className="cursor-pointer"
                                            >
                                                <ProductCard
                                                    isHover={false}
                                                    product={product}
                                                    onAddToCart={() => { }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="space-y-3 md:space-y-4">
                                        {filteredProducts?.map((product) => {
                                            const priceData = getProductPrice(product);
                                            const hasDiscount =
                                                priceData.offerPrice && priceData.offerPrice < priceData.price;

                                            return (
                                                <div
                                                    key={product._id}
                                                    onClick={() => handleNavigate(product)}
                                                    className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-[0.995]"
                                                >
                                                    <div className="flex flex-col sm:flex-row">
                                                        <div className="sm:w-40 h-48 bg-gray-100 overflow-hidden">
                                                            <CustomImage
                                                                src={getProductImage(product)}
                                                                className="w-full h-full object-cover"
                                                                alt={product.name}
                                                                loading="lazy"
                                                            />
                                                        </div>

                                                        <div className="flex-1 p-4">
                                                            <h3 className="font-semibold text-gray-900 text-base mb-2">
                                                                {product?.name}
                                                            </h3>
                                                            <p className="text-gray-600 mb-3 text-sm line-clamp-2">
                                                                {product?.description}
                                                            </p>

                                                            <div className="flex items-center gap-2 flex-wrap">
                                                                {hasDiscount ? (
                                                                    <>
                                                                        <span className="font-bold text-gray-900 text-lg">
                                                                            {formatPrice(priceData.offerPrice)}
                                                                        </span>
                                                                        <span className="text-gray-400 line-through text-sm">
                                                                            {formatPrice(priceData.price)}
                                                                        </span>
                                                                        <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                                                                            {Math.round(
                                                                                (1 -
                                                                                    priceData.offerPrice /
                                                                                    priceData.price) *
                                                                                100
                                                                            )}
                                                                            % off
                                                                        </span>
                                                                    </>
                                                                ) : (
                                                                    <span className="font-bold text-gray-900 text-lg">
                                                                        {formatPrice(priceData.price)}
                                                                    </span>
                                                                )}
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
                    ) : !loadingSlug && !isInitialLoad ? (
                        <div className="flex flex-col items-center justify-center h-full p-4">
                            <div className="text-gray-400 mb-4">
                                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <p className="text-gray-500 text-lg mb-2">No brand selected</p>
                            <p className="text-gray-400 text-sm">Select a brand from the sidebar to view products</p>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}