import { z } from "zod/v4";

export const PRODUCT_CATEGORIES = [
    "Café",
    "Cacao",
    "Fruits",
    "Légumes",
    "Céréales",
    "Épices",
    "Huiles",
    "Noix",
    "Autre",
] as const;

export const PRODUCT_UNITS = [
    { value: "KG" as const, label: "Kilogramme (KG)" },
    { value: "QUINTAL" as const, label: "Quintal (100 KG)" },
    { value: "TONNE" as const, label: "Tonne (1000 KG)" },
];

export const createProductSchema = z.object({
    name: z
        .string()
        .min(2, "Le nom doit contenir au moins 2 caractères")
        .max(150, "Le nom ne peut pas dépasser 150 caractères"),
    description: z
        .string()
        .max(2000, "La description ne peut pas dépasser 2000 caractères")
        .optional()
        .default(""),
    category: z.enum(PRODUCT_CATEGORIES, {
        error: "Veuillez sélectionner une catégorie",
    }),
    country: z
        .string()
        .min(2, "Le pays doit contenir au moins 2 caractères")
        .max(100, "Le pays ne peut pas dépasser 100 caractères"),
    pricePerUnit: z
        .number({ error: "Le prix est requis" })
        .positive("Le prix doit être supérieur à 0")
        .max(999999, "Le prix ne peut pas dépasser 999 999"),
    unit: z.enum(["KG", "QUINTAL", "TONNE"], {
        error: "Veuillez sélectionner une unité",
    }),
    minOrderQuantity: z
        .number()
        .int("La quantité doit être un nombre entier")
        .min(1, "La quantité minimale doit être au moins 1")
        .max(999999, "La quantité maximale est 999 999")
        .optional(),
});

export type CreateProductFormData = z.infer<typeof createProductSchema>;
