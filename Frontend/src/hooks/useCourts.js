import { useCallback, useState } from "react";
import {
    getCourtsRequest,
    getCourtByIdRequest,
    createCourtRequest,
    updateCourtRequest,
} from "../services/courtService";
import { uploadImageRequest } from "../services/upload.service.js"


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

    const createCourt = async (file, courtData) => {
        try {
            setSubmitting(true);
            setError(null);
            let data = null
            const response = await uploadImageRequest(file)
            if(!response)throw new Error("No se pudo subir la imagen")
            courtData.imagenes=[response.url]
            data = await createCourtRequest(courtData)
            if(!data) throw new Error("no se puedo crear la cancha")
            id ? getCourtById() : getCourts()
            return data
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

            const data = await updateCourtRequest(id, courtData);
            setCourt(data.court);
            return data
        } catch (err) {
            setError(
                err.response?.data?.message ?? "No se pudo actualizar la cancha",
            );
            throw err;
        } finally {
            setSubmitting(false);
        }
    };

    return {
        courts,
        court,
        courtsLoading: loading,
        submitting,
        error,
        getCourts,
        getCourtById,
        createCourt,
        updateCourt,
    };
}
