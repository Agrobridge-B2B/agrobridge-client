'use client';

import { useState, useRef, ChangeEvent } from 'react';
import Image from 'next/image';
import { X, Upload, Loader2 } from 'lucide-react';
import { uploadProductImages, deleteProductImage, validateImageFile, getImageUrl } from '@/lib/upload';

interface ImageUploadProps {
    images: string[];
    onImagesChange: (images: string[]) => void;
    maxImages?: number;
}

export default function ImageUpload({ images, onImagesChange, maxImages = 10 }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        
        if (files.length === 0) return;

        if (images.length + files.length > maxImages) {
            setError(`Vous ne pouvez télécharger que ${maxImages} images maximum.`);
            return;
        }

        for (const file of files) {
            const validationError = validateImageFile(file);
            if (validationError) {
                setError(validationError);
                return;
            }
        }

        setError(null);
        setUploading(true);

        try {
            const uploadedPaths = await uploadProductImages(files);
            onImagesChange([...images, ...uploadedPaths]);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Erreur lors du téléchargement des images');
        } finally {
            setUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleRemoveImage = async (imagePath: string, index: number) => {
        try {
            await deleteProductImage(imagePath);
            const newImages = images.filter((_, i) => i !== index);
            onImagesChange(newImages);
        } catch (err) {
            console.error('Error deleting image:', err);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                    Images du produit ({images.length}/{maxImages})
                </label>
                {images.length < maxImages && (
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#78C841] rounded-md hover:bg-[#6AB535] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {uploading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Téléchargement...
                            </>
                        ) : (
                            <>
                                <Upload className="w-4 h-4" />
                                Ajouter des images
                            </>
                        )}
                    </button>
                )}
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                multiple
                onChange={handleFileSelect}
                className="hidden"
            />

            {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
                    {error}
                </div>
            )}

            {images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {images.map((imagePath, index) => (
                        <div key={index} className="relative group aspect-square">
                            <Image
                                src={getImageUrl(imagePath)}
                                alt={`Product image ${index + 1}`}
                                fill
                                className="object-cover rounded-lg"
                                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                                unoptimized
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveImage(imagePath, index)}
                                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                aria-label="Supprimer l'image"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {images.length === 0 && (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                    <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-sm text-gray-600">
                        Aucune image téléchargée. Cliquez sur "Ajouter des images" pour commencer.
                    </p>
                </div>
            )}
        </div>
    );
}
