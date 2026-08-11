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
            setError(err.response?.data?.error || "No se pudo crear la reserva");
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
            setError(err.response?.data?.error || "No se pudo cargar los datos");
        } finally {
            setLoading(false);
        }
    };

    const cancelReserve = async (id) => {
        setError(null);
        try {
            const response = await cancelReserveRequest(id);
            return response;
        } catch (err) {
            setError(err.response?.data?.error || "No se pudo cancelar la reserva");
        }
    }

    return {
        reserves,
        loading, error, success,
        createReserve, loadReserves, cancelReserve
    };
};