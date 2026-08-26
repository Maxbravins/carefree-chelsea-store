export default function Loader({
    size = "md",
    text = "",
    className = "",
}) {
    const sizes = {
        sm: "h-4 w-4 border-2",
        md: "h-6 w-6 border-2",
        lg: "h-10 w-10 border-4",
        xl: "h-14 w-14 border-4",
    };

    return (
        <div
            className={`flex items-center justify-center gap-3 ${className}`}
            role="status"
            aria-label={text || "Loading"}
        >
            <span
                className={`animate-spin rounded-full border-blue-600 border-t-transparent ${sizes[size] || sizes.md}`}
            />

            {text && (
                <span className="text-sm font-medium text-gray-600">
                    {text}
                </span>
            )}
        </div>
    );
}
