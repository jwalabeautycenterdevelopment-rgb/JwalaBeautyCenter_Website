"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { updateShippingAddress } from "@/app/store/slice/authSlice";

const AddressForm = ({ onClose, loading, shippingAddress }) => {
    const dispatch = useDispatch();

    const [newAddressFields, setNewAddressFields] = useState({
        name: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
    });

    useEffect(() => {
        if (shippingAddress) {
            setNewAddressFields({
                name: shippingAddress.fullName || "",
                phone: shippingAddress.phone || "",
                street: shippingAddress.address || "",
                city: shippingAddress.city || "",
                state: shippingAddress.state || "",
                zipCode: shippingAddress.zipCode || "",
                country: shippingAddress.country || "",
            });
        }
    }, [shippingAddress]);

    const handleAddressFieldChange = (e) => {
        setNewAddressFields({ ...newAddressFields, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        const payload = {
            addressId: shippingAddress?._id || null,
            shippingAddress: {
                fullName: newAddressFields.name,
                phone: newAddressFields.phone,
                address: newAddressFields.street,
                city: newAddressFields.city,
                state: newAddressFields.state,
                zipCode: newAddressFields.zipCode,
                country: newAddressFields.country,
                active: true,
            },
            active: true,
        };

        try {
            await dispatch(updateShippingAddress(payload))
        } catch (err) {
            console.error("Failed to update address:", err);
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1, transition: { duration: 0.3 } }}
                    exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.2 } }}
                    className="bg-white rounded-2xl p-6 w-full max-w-lg relative"
                >
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Add / Edit Address</h2>

                    <div className="space-y-3">
                        <input
                            type="text"
                            name="name"
                            value={newAddressFields.name}
                            onChange={handleAddressFieldChange}
                            placeholder="Full Name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                        />
                        <input
                            type="text"
                            name="phone"
                            value={newAddressFields.phone}
                            onChange={handleAddressFieldChange}
                            placeholder="Phone Number"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                        />
                        <input
                            type="text"
                            name="street"
                            value={newAddressFields.street}
                            onChange={handleAddressFieldChange}
                            placeholder="Street Address"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                        />

                        <div className="flex gap-2">
                            <input
                                type="text"
                                name="city"
                                value={newAddressFields.city}
                                onChange={handleAddressFieldChange}
                                placeholder="City"
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                            />
                            <input
                                type="text"
                                name="state"
                                value={newAddressFields.state}
                                onChange={handleAddressFieldChange}
                                placeholder="State"
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                            />
                        </div>

                        <div className="flex gap-2">
                            <input
                                type="text"
                                name="zipCode"
                                value={newAddressFields.zipCode}
                                onChange={handleAddressFieldChange}
                                placeholder="Postal Code"
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                            />
                            <input
                                type="text"
                                name="country"
                                value={newAddressFields.country}
                                onChange={handleAddressFieldChange}
                                placeholder="Country"
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 rounded-lg font-medium cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="px-4 py-2 bg-primary cursor-pointer text-white rounded-lg font-medium bg_primary"
                            disabled={loading}
                        >
                            {loading ? "Saving..." : "Save"}
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default AddressForm;
