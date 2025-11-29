"use client";
export const ProductSkeleton = ({ count = 8 }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="animate-pulse">
                    <div className="relative h-64 bg-gray-200 rounded-md"></div>

                    <div className="px-4 mt-3 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>

                        <div className="h-6 bg-gray-200 rounded w-1/3 mt-3"></div>

                        <div className="h-3 bg-gray-200 rounded w-1/4"></div>

                        <div className="flex justify-between items-center mt-3">
                            <div className="h-4 bg-gray-200 rounded w-16"></div>
                            <div className="h-4 bg-gray-200 rounded w-20"></div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

