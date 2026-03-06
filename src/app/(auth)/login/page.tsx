import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
	return (
		<div className="grid min-h-screen lg:grid-cols-2">
			{/* Left side - Image with tractor */}
			<div className="relative hidden lg:block">
				<img
					src="./images/agri-bg.jpg"
					alt="Agriculture background with tractor"
					className="absolute inset-0 h-full w-full object-cover"
				/>
				{/* Optional overlay for better image effect */}
				<div className="absolute inset-0 bg-black/10" />
			</div>

			{/* Right side - Login Form */}
			<div className="flex items-center justify-center p-6 bg-white">
				<div className="w-full max-w-md">
					<LoginForm />
				</div>
			</div>
		</div>
	);
}
