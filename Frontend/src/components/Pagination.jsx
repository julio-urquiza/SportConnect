import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 4,
}) {
  // Si existe una sola página (o ninguna), no hay nada que navegar.
  if (totalPages <= 1) return null;

  const visiblePages = Math.min(maxVisiblePages, totalPages);

  // Mantenemos como máximo 4 números visibles.
  // Ejemplo:
  // 1 2 3 4
  // 2 3 4 5
  // 3 4 5 6
  let startPage = Math.max(1, currentPage - 2);
  let endPage = startPage + visiblePages - 1;

  // Cuando nos acercamos al final, evitamos mostrar páginas inexistentes.
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - visiblePages + 1);
  }

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <nav
      className="mt-10 flex items-center justify-center gap-2"
      aria-label="Paginación de canchas"
    >
      <button
        type="button"
        onClick={handlePrevious}
        disabled={currentPage === 1}
        aria-label="Ir a la página anterior"
        className="flex h-10 w-10 items-center justify-center rounded-full text-gray-300 transition-colors hover:text-orange-400 disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {pages.map((page) => {
        const isActive = page === currentPage;

        return (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            aria-label={`Ir a la página ${page}`}
            aria-current={isActive ? "page" : undefined}
            className={`h-10 min-w-10 px-2 text-sm font-semibold transition-colors ${
              isActive
                ? "text-orange-500"
                : "text-white hover:text-orange-400"
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        type="button"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        aria-label="Ir a la página siguiente"
        className="flex h-10 w-10 items-center justify-center rounded-full text-gray-300 transition-colors hover:text-orange-400 disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </nav>
  );
}

export default Pagination;
