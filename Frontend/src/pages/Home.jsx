import { SlidersHorizontal, Search, MapPin } from "lucide-react";
import CourtCard from "../components/CourtCard";
import { useCourts } from "../hooks/useCourts.js";
import { useEffect, useState } from "react";
import { SPORTS } from "../constants/sports.js";
import Spinner from "../components/Spinner.jsx";
import Pagination from "../components/Pagination.jsx";
import useTitulo from "../hooks/useTitle.js";

const COURTS_PER_PAGE = 15;

const HERO_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1715431900724-6bf15144ae0e?w=1920&h=800&fit=crop&crop=center&auto=format",
    alt: "Cancha de tenis",
  },
  {
    src: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1920&h=800&fit=crop&crop=center&auto=format",
    alt: "Cancha de fútbol",
  },
  {
    src: "https://images.unsplash.com/photo-1518604666860-9ed391f76460?w=1920&h=800&fit=crop&crop=center&auto=format",
    alt: "Cancha de pádel",
  },
];

function Home() {
  const [filters, setFilters] = useState({
    deporte: null,
    sort: "relevancia",
    ubicacion: null,
    page: 1,
    limit: COURTS_PER_PAGE,
  });

  const [searchInput, setSearchInput] = useState("");
  const [localidadInput, setLocalidadInput] = useState("");
  const [heroImageIndex, setHeroImageIndex] = useState(0);

  const {
    courts,
    pagination,
    courtsLoading: loading,
    error,
    getCourts,
  } = useCourts({
    id: null,
    filters,
  });

  useTitulo("Busca tu cancha");

  const handleDeporte = (deporte) => {
    setFilters((prev) => ({
      ...prev,
      deporte: prev.deporte === deporte ? null : deporte,
      page: 1,
    }));
  };

  const handleSort = (sort) => {
    setFilters((prev) => ({
      ...prev,
      sort,
      page: 1,
    }));
  };

  const handlePageChange = (page) => {
    setFilters((prev) => ({
      ...prev,
      page,
    }));
  };

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleLocalidadInput = (e) => {
    setLocalidadInput(e.target.value);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFilters((prev) => ({
        ...prev,
        nombre: searchInput,
        page: 1,
      }));
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [searchInput]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFilters((prev) => ({
        ...prev,
        ubicacion: localidadInput,
        page: 1,
      }));
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [localidadInput]);

  useEffect(() => {
    getCourts();
  }, [getCourts]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setHeroImageIndex(
        (currentIndex) => (currentIndex + 1) % HERO_IMAGES.length
      );
    }, 6000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <main className="min-h-screen bg-[#00001A]">
      <section className="relative overflow-hidden border-b border-[#1A1A3A] px-4 py-16">
        <div className="absolute inset-0">
          {HERO_IMAGES.map((image, index) => (
            <img
              key={image.src}
              src={image.src}
              alt={index === heroImageIndex ? image.alt : ""}
              aria-hidden={index !== heroImageIndex}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                index === heroImageIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

          <div className="theme-hero-overlay absolute inset-0 bg-linear-to-br from-[#00001A]/90 via-[#00001A]/75 to-[#00001A]/90" />

          <div className="absolute bottom-4 right-6 z-10 flex items-center gap-2">
            {HERO_IMAGES.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setHeroImageIndex(index)}
                aria-label={`Mostrar imagen de ${image.alt.toLowerCase()}`}
                aria-current={index === heroImageIndex}
                className={`h-2 rounded-full transition-all ${
                  index === heroImageIndex
                    ? "w-6 bg-orange-500"
                    : "w-2 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="container relative z-10 mx-auto">
          <div className="mb-10 text-center">
            <p className="mb-2 text-gray-400">Bienvenido a</p>

            <h1 className="mb-2 text-4xl font-bold text-gray-100 md:text-6xl">
              SportConnect
            </h1>

            <p className="mx-auto max-w-md text-gray-400">
              Encontrá y reservá canchas de padel, tenis y fútbol en toda
              Buenos Aires.
            </p>
          </div>

          <div className="mx-auto max-w-2xl">
            <div className="flex flex-col gap-3 rounded-2xl border border-white/15 bg-[#00001A]/60 p-4 backdrop-blur-xl md:flex-row md:items-center">
              <div className="flex flex-1 items-center gap-3">
                <Search className="h-5 w-5 shrink-0 text-orange-500" />

                <input
                  type="text"
                  value={searchInput}
                  onChange={handleSearchInput}
                  placeholder="Buscá por nombre..."
                  className="w-full bg-transparent text-white placeholder:text-gray-400 outline-none"
                />
              </div>

              <div className="flex items-center gap-2 text-gray-400">
                <MapPin className="h-4 w-4" />

                <input
                  type="text"
                  value={localidadInput}
                  onChange={handleLocalidadInput}
                  placeholder="Buscá por localidad..."
                  className="bg-transparent text-white placeholder:text-gray-400 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {SPORTS.map((s) => (
              <button
                key={s.id}
                onClick={() => handleDeporte(s.deporte)}
                className={`flex cursor-pointer items-center gap-2 rounded-full border-gray-700 bg-white/5 bg-linear-to-r px-4 py-2 text-sm font-semibold transition hover:scale-105 hover:text-white ${
                  filters.deporte === s.deporte
                    ? "text-gray-400 from-orange-500/80 to-[#00001A]/70"
                    : "text-gray-400 hover:bg-white/10"
                }`}
              >
                <span>{s.logo}</span>
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-gray-400">
            <span className="font-medium text-white">
              {pagination.total}
            </span>{" "}
            canchas encontradas
          </p>

          <div className="flex items-center gap-2 text-sm text-gray-400">
            <SlidersHorizontal className="h-4 w-4" />

            <select
              value={filters.sort}
              onChange={(e) => handleSort(e.target.value)}
              className="cursor-pointer bg-transparent text-gray-300 outline-none"
            >
              <option value="-createdAt">Ordenar por relevancia</option>
              <option value="precioPorHora">
                Precio: menor a mayor
              </option>
              <option value="-precioPorHora">
                Precio: mayor a menor
              </option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {loading && <Spinner />}

          {!loading && error && "error"}

          {!loading && !error && !courts.length && "no hay canchas"}

          {!loading &&
            !error &&
            courts.length > 0 &&
            courts.map((court, index) => (
              <CourtCard key={index} cancha={court} />
            ))}
        </div>

        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      </section>
    </main>
  );
}

export default Home;