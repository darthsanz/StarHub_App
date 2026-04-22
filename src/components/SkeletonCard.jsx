export const SkeletonCard = () => {
    return (
        <div className="flex flex-col gap-3 rounded-xl bg-gray-900/50 p-3 shadow-lg w-full h-full animate-pulse border border-gray-800">
            {/* Espacio de la imagen del poster */}
            <div className="w-full h-72 md:h-80 bg-gray-800 rounded-lg"></div>

            {/* Textos simulados */}
            <div className="flex flex-col gap-2 mt-2">
                <div className="h-5 bg-gray-800 rounded w-3/4"></div>
                <div className="h-4 bg-gray-800 rounded w-1/2"></div>
            </div>
        </div>
    )
}