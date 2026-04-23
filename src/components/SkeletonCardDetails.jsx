export const SkeletonCardDetails = () => {
  return (
    <div className="animate-pulse flex flex-col md:flex-row gap-8 p-6 max-w-7xl mx-auto mt-10 relative z-10">
      {/* Poster falso izq */}
      <div className="w-full md:w-1/3 lg:w-1/4h-[450px] md:h-125 bg-gray-800/80 rounded-xl shadow-2xl border border-gray-700"></div>

      {/* Informacion falsa derecha */}
      <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col gap-5 mt-4 md:mt-0">
        {/* Titulo */}
        <div className="h-10 md:h-14 bg-gray-800/80 rounded-lgw-3/4 md:w-1/2"></div>
        {/* Calificacion y fecha */}
        <div className="flex gap-4 mb-4">
          <div className="h-8 bg-gray-800/80 rounded-full w-16"></div>
          <div className="h-8 bg-gray-800/80 rounded-full w-24"></div>
              </div>
              {/* Generos */}
        <div className="flex gap-3 mb-6">
          <div className="h-8 bg-gray-800/80 rounded-full w-20"></div>
          <div className="h-8 bg-gray-800/80 rounded-full w-24"></div>
          <div className="h-8 bg-gray-800/80 rounded-full w-16"></div>
              </div>
              {/* Sipnosis */}
        <div className="flex flex-col gap-3">
          <div className="h-4 bg-gray-800/80 rounded w-full"></div>
          <div className="h-4 bg-gray-800/80 rounded w-full"></div>
          <div className="h-4 bg-gray-800/80 rounded w-5/6"></div>
          <div className="h-4 bg-gray-800/80 rounded w-4/6"></div>
        </div>
      </div>
    </div>
  );
};
