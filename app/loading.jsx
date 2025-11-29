"use client";
export default function Loading() {
    return (
        <div className="text-center py-12 h-screen flex items-center flex-col justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-500 mt-4">Loading...</p>
        </div>
    );
}
