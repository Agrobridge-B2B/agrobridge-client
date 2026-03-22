import { BuyerNavbar } from "@/components/buyer/BuyerNavbar";
import { BuyerFooter } from "@/components/buyer/BuyerFooter";

export default function BuyerProductsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col min-h-screen bg-white">
			<BuyerNavbar />
			<main className="flex-1">{children}</main>
			<BuyerFooter />
		</div>
	);
}
