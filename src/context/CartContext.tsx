"use client";

import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";
import type { Product } from "@/lib/products";

const CART_STORAGE_KEY = "agrobridge_cart";

export interface CartItem {
	productId: string;
	name: string;
	image: string | null;
	pricePerUnit: number;
	unit: Product["unit"];
	country: string;
	minOrderQuantity: number;
	quantity: number;
	sellerId: string;
	sellerName: string;
}

interface CartContextType {
	items: CartItem[];
	isReady: boolean;
	itemCount: number;
	totalQuantity: number;
	subtotal: number;
	addItem: (product: Product, quantity?: number) => void;
	setItemQuantity: (product: Product, quantity: number) => void;
	updateQuantity: (productId: string, quantity: number) => void;
	removeItem: (productId: string) => void;
	clearCart: () => void;
	isInCart: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function getMinQuantity(productOrItem: Pick<Product, "minOrderQuantity"> | Pick<CartItem, "minOrderQuantity">) {
	return Math.max(1, productOrItem.minOrderQuantity || 1);
}

function normalizeQuantity(quantity: number, minQuantity: number) {
	const parsedQuantity = Number.isFinite(quantity) ? Math.floor(quantity) : minQuantity;
	return Math.max(minQuantity, parsedQuantity);
}

function getSellerSnapshot(product: Product) {
	if (typeof product.seller === "object" && product.seller !== null) {
		return {
			sellerId: product.seller._id,
			sellerName: product.seller.fullName,
		};
	}

	return {
		sellerId: String(product.seller),
		sellerName: "Vendeur Agrobridge",
	};
}

function createCartItem(product: Product, quantity: number): CartItem {
	const { sellerId, sellerName } = getSellerSnapshot(product);
	const minQuantity = getMinQuantity(product);

	return {
		productId: product._id,
		name: product.name,
		image: product.images?.[0] ?? null,
		pricePerUnit: product.pricePerUnit,
		unit: product.unit,
		country: product.country,
		minOrderQuantity: minQuantity,
		quantity: normalizeQuantity(quantity, minQuantity),
		sellerId,
		sellerName,
	};
}

export function CartProvider({ children }: { children: ReactNode }) {
	const [items, setItems] = useState<CartItem[]>([]);
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		try {
			const storedItems = window.localStorage.getItem(CART_STORAGE_KEY);
			if (storedItems) {
				setItems(JSON.parse(storedItems) as CartItem[]);
			}
		} catch (error) {
			console.error("Failed to restore cart:", error);
		} finally {
			setIsReady(true);
		}
	}, []);

	useEffect(() => {
		if (!isReady) {
			return;
		}

		try {
			window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
		} catch (error) {
			console.error("Failed to persist cart:", error);
		}
	}, [items, isReady]);

	function addItem(product: Product, quantity = getMinQuantity(product)) {
		const minQuantity = getMinQuantity(product);

		setItems((currentItems) => {
			const existingItem = currentItems.find((item) => item.productId === product._id);

			if (!existingItem) {
				return [...currentItems, createCartItem(product, quantity)];
			}

			return currentItems.map((item) =>
				item.productId === product._id
					? {
							...item,
							quantity: normalizeQuantity(item.quantity + quantity, minQuantity),
					  }
					: item,
			);
		});
	}

	function setItemQuantity(product: Product, quantity: number) {
		const nextItem = createCartItem(product, quantity);

		setItems((currentItems) => {
			const existingIndex = currentItems.findIndex((item) => item.productId === product._id);

			if (existingIndex === -1) {
				return [...currentItems, nextItem];
			}

			return currentItems.map((item) =>
				item.productId === product._id ? { ...item, ...nextItem } : item,
			);
		});
	}

	function updateQuantity(productId: string, quantity: number) {
		setItems((currentItems) =>
			currentItems.map((item) =>
				item.productId === productId
					? {
							...item,
							quantity: normalizeQuantity(quantity, getMinQuantity(item)),
					  }
					: item,
			),
		);
	}

	function removeItem(productId: string) {
		setItems((currentItems) => currentItems.filter((item) => item.productId !== productId));
	}

	function clearCart() {
		setItems([]);
	}

	function isInCart(productId: string) {
		return items.some((item) => item.productId === productId);
	}

	const itemCount = items.length;
	const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
	const subtotal = items.reduce((sum, item) => sum + item.quantity * item.pricePerUnit, 0);

	const value: CartContextType = {
		items,
		isReady,
		itemCount,
		totalQuantity,
		subtotal,
		addItem,
		setItemQuantity,
		updateQuantity,
		removeItem,
		clearCart,
		isInCart,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
	const context = useContext(CartContext);

	if (!context) {
		throw new Error("useCart must be used within a CartProvider");
	}

	return context;
}
