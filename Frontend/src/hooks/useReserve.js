import { useState } from "react";
import { createCourtRequest, getAllReservesRequest, cancelReserveRequest } from "../services/reserve.service";

export const useReserve = () => {
    const [reserves, setReserves] = useState([])
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
        } finally {
            setLoading(false);
        }
    };

    const loadReserves = async (data) => {
        setLoading(true);
        setError(null);
        try {
            const response = await getAllReservesRequest(data);
            setReserves(response.reservas);
        } catch (err) {
            setError(err.response?.data?.message || "No se pudo cargar los datos");
        } finally {
            setLoading(false);
        }
    };

    const cancelReserve = async(id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await cancelReserveRequest(id);
            setSuccess(true);
            return response;
        } catch (err) {
            setError(err.response?.data?.message || "No se pudo cancelar la reserva");
        } finally {
            setLoading(false);
        }
    }

    return {
        reserves,
        loading, error, success,
        createReserve, loadReserves, cancelReserve
    };
};
