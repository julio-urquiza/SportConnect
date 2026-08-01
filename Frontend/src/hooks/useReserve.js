import { useState } from "react";
import { createCourtRequest } from "../services/reserve.service";

export const useReserve = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const createReserve = async (data) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await createCourtRequest(data);
      setSuccess(true);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || "No se pudo crear la reserva");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createReserve,
    loading,
    error,
    success,
  };
};
