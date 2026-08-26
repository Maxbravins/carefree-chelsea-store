export default function Badge({
    children,
    variant = "default",
    className = "",
}) {
    const variants = {
        default:
            "bg-gray-100 text-gray-800 border border-gray-200",
        primary:
            "bg-blue-100 text-blue-800 border border-blue-200",
        success:
            "bg-green-100 text-green-800 border border-green-200",
        danger:
            "bg-red-100 text-red-800 border border-red-200",
        warning:
            "bg-yellow-100 text-yellow-800 border border-yellow-200",
        dark:
            "bg-gray-900 text-white border border-gray-900",
    };

    return (
        <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${variants[variant] || variants.default} ${className}`}
        >
            {children}
        </span>
    );
}