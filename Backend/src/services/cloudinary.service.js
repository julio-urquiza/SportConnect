import cloudinary from "../config/cloudinary.js";

export const uploadImage = (file) => {
    return new Promise((resolve, reject) => {

        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "sportconnect"
            },
            (error, result) => {

                if (error) {
                    reject(error);
                    return;
                }

                resolve(result);
            }
        );

        uploadStream.end(file.buffer);
    });
};