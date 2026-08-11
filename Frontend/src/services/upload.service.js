import api from "./api";

export const uploadImageRequest = (file) => {
    const formData = new FormData();
    formData.append("image", file);
    return api.post("/api/upload/image", formData);
};