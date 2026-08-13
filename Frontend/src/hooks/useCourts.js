import { useCallback, useState } from "react";
import {
    getCourtsRequest,
    getCourtByIdRequest,
    createCourtRequest,
    updateCourtRequest,
    deleteCourtRequest
} from "../services/courtService";
import { uploadImageRequest } from "../services/upload.service.js"


export function useCourts({ id, filters }) {
    const [courts, setCourts] = useState([]);
    const [pagination, setPagination] = useState({
        total: 0,
        page: 1,
        limit: 15,
        totalPages: 0,
        hasPreviousPage: false,
        hasNextPage: false,
    });
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
            setPagination(data.pagination);
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
            if(!data) throw new Error("No se pudo crear la cancha")
            id ? getCourtById() : getCourts()
            return data
        } catch (err) {
            setError(err.response?.data?.message ?? "No se pudo crear la cancha");
            throw err;
        } finally {
            setSubmitting(false);
        }
    };

    const updateCourt = async (courtId,courtData) => {
        try {
            setSubmitting(true);
            setError(null);

            const data = await updateCourtRequest(courtId, courtData);
            if(!data) throw new Error("No se pudo modificar la cancha")
            id ? getCourtById() : getCourts()
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

    const deleteCourt = async (courtId) => {
        try {
            setSubmitting(true);
            setError(null);

            const data = await deleteCourtRequest(courtId);
            if(!data) throw new Error("No se pudo eliminar la cancha")
            id ? getCourtById() : getCourts()
            return data
        } catch (err) {
            setError(
                err.response?.data?.message ?? "No se pudo eliminar la cancha",
            );
            throw err;
        } finally {
            setSubmitting(false);
        }
    };

    return {
        courts,
        pagination,
        court,
        courtsLoading: loading,
        submitting,
        error,
        getCourts,
        getCourtById,
        createCourt,
        updateCourt,
        deleteCourt,
    };
}
