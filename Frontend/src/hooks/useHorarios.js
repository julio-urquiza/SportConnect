import { useState } from "react";
import { getHoursRequest } from "../services/reserve.service";
import { useEffect } from "react";

export const useHorarios = (idCancha, fecha) => {
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        if (cancelled) return;

        const response = await getHoursRequest({idCancha, fecha});
        setHorarios(response.horarios);
      } catch (err) {
        if (!cancelled) {
          setError(
            err.response?.data?.message ?? "No se pudieron cargar los datos",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [fecha]);

  return {
    horariosFiltrados:horarios,
    loadingHorarios:loading,
    errorHorarios:error,
  };
};
