import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const InputField = ({
    type = "text",
    name,
    placeholder,
    value,
    onChange,
    required = false,
    showLabel = true,
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";

    return (
        <div className="relative">
            {showLabel && name && (
                <label className="block md:mb-1 text-gray-700 capitalize">
                    {name.replace(/([A-Z])/g, " $1")}
                </label>
            )}
            <input
                type={isPassword && showPassword ? "text" : type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full border border-gray-300 bg-white p-2 rounded-md focus:outline-none pr-10"
            />
            {isPassword && (
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-10 transform  text-gray-600"
                >
                    {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
            )}
        </div>
    );
};

export default InputField;
