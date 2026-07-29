import { useCallback, useEffect, useRef, useState } from "react";
import {
  getCourtsRequest,
  getCourtByIdRequest,
  createCourtRequest,
  updateCourtRequest,
} from "../services/courtService";

export function useCourts({ id, filters = {} } = {}) {
  const [courts, setCourts] = useState([]);
  const [court, setCourt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const cancelled = useRef(false);

  const getCourts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await getCourtsRequest(filters);
      if (cancelled.current) return;
      setCourts(data.courts);
    } catch (err) {
      setError(
        err.response?.data?.message ?? "No se pudieron cargar las canchas",
      );
    } finally {
      setLoading(false);
    }
  },[filters])

  const getCourtById = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await getCourtByIdRequest(id);
      if (cancelled.current) return;
      setCourt(data.court);
      return data.court;
    } catch (err) {
      setError(err.response?.data?.message ?? "No se pudo cargar la cancha");
      throw err;
    } finally {
      setLoading(false);
    }
  },[id])

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
    if (id) {
      getCourtById();
    } else {
      getCourts();
    }
    return () => {
      cancelled.current = true;
    };
  }, [getCourtById,getCourts]);

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
