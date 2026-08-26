export default function Card({
    children,
    className = "",
    padding = true,
    hover = false,
    onClick,
}) {
    return (
        <div
            onClick={onClick}
            className={`rounded-2xl border border-gray-200 bg-white shadow-sm ${
                padding ? "p-4" : ""
            } ${
                hover
                    ? "transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                    : ""
            } ${onClick ? "cursor-pointer" : ""} ${className}`}
        >
            {children}
        </div>
    );
}