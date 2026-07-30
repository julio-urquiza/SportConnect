import { useCallback, useEffect, useState } from "react";
import {
  getCourtsRequest,
  getCourtByIdRequest,
  createCourtRequest,
  updateCourtRequest,
} from "../services/courtService";

export function useCourts({ id, filters }) {
  const [courts, setCourts] = useState([]);
  const [court, setCourt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const getCourts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getCourtsRequest(filters);
      setCourts(data.courts);
    } catch (err) {
      setError(
        err.response?.data?.message ?? "No se pudieron cargar las canchas",
      );
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const getCourtById = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getCourtByIdRequest(id);
      setCourt(data.court);
      return data.court;
    } catch (err) {
      setError(err.response?.data?.message ?? "No se pudo cargar la cancha");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [id]);

  const createCourt = async (courtData) => {
    try {
      setSubmitting(true);
      setError(null);

      const { data } = await createCourtRequest(courtData);
      await getCourts(); // refresca el listado
      return data.court;
    } catch (err) {
      setError(err.response?.data?.message ?? "No se pudo crear la cancha");
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  const updateCourt = async (courtData) => {
    try {
      setSubmitting(true);
      setError(null);

      const { data } = await updateCourtRequest(id, courtData);
      setCourt(data.court);
      await getCourts(); // refresca el listado
      return data.court;
    } catch (err) {
      setError(
        err.response?.data?.message ?? "No se pudo actualizar la cancha",
      );
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const data = id
          ? await getCourtByIdRequest(id)
          : await getCourtsRequest(filters);

        if (cancelled) return;

        if (id) {
          setCourt(data.court);
        } else {
          setCourts(data.courts);
        }
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
  }, [id,filters]);

  return {
    courts,
    court,
    loading,
    submitting,
    error,
    getCourts,
    getCourtById,
    createCourt,
    updateCourt,
  };
}
