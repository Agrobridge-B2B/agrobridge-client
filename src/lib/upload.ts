import { api } from './api';

export interface UploadResponse {
    success: boolean;
    message: string;
    data?: {
        images: string[];
    };
}

export const uploadProductImages = async (files: File[]): Promise<string[]> => {
    const formData = new FormData();
    
    files.forEach((file) => {
        formData.append('images', file);
    });

    const response = await api.post<UploadResponse>('/upload/products', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data.data?.images || [];
};

export const deleteProductImage = async (imagePath: string): Promise<void> => {
    await api.delete('/upload/products', {
        data: { imagePath },
    });
};

export const validateImageFile = (file: File): string | null => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
        return 'Format de fichier invalide. Seuls JPG, JPEG, PNG et WEBP sont acceptés.';
    }

    if (file.size > maxSize) {
        return 'La taille du fichier ne doit pas dépasser 5 MB.';
    }

    return null;
};

export const getImageUrl = (imagePath: string): string => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:8000';
    // Ensure no double slashes - imagePath already includes 'uploads/products/...'
    const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    return `${baseUrl}${cleanPath}`;
};
