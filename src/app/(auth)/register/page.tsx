import { SignupForm } from "@/components/auth/signup-form";

export default function RegisterPage() {
	return (
		<div className="grid min-h-screen lg:grid-cols-2">
			{/* Left side - Image with agriculture background */}
			<div className="relative hidden lg:block">
				<img
					src="./images/agri-bg.jpg"
					alt="Agriculture background"
					className="absolute inset-0 h-full w-full object-cover"
				/>
			
			</div>

			{/* Right side - Signup Form */}
			<div className="flex items-center justify-center p-6 lg:p-8 bg-white">
				<div className="w-full max-w-md">
					<SignupForm />
				</div>
			</div>
		</div>
	);
}
