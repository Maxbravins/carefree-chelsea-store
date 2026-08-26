export default function Button({
    children,
    variant = "primary",
    type = "button",
    disabled = false,
    loading = false,
    className = "",
    onClick,
}) {
    const variants = {
        primary:
            "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
        secondary:
            "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-400",
        dark:
            "bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-700",
        danger:
            "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
        outline:
            "border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500",
    };

    return (
        <button
            type={type}
            disabled={disabled || loading}
            onClick={onClick}
            className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                variants[variant] || variants.primary
            } ${className}`}
        >
            {loading && (
                <span
                    className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                    aria-hidden="true"
                />
            )}

            {loading ? "Please wait..." : children}
        </button>
    );
}