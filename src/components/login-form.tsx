import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Link from "next/link";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-6">
        {/* Logo */}
        <Link href="/" >
          <img
            src="/logo/agrobridge-01.svg"
            alt="Agrobridge Logo"
            className="w-32 h-auto"
          />
        </Link>

        {/* Title */}
        <h1 className="text-2xl lg:text-3xl font-bold text-[#78C841] uppercase tracking-wide text-center">
          Content de te revoir !
        </h1>

        {/* Form Fields Container */}
        <div className="w-full space-y-5 mt-4">
          {/* Email Input */}
          <div>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              required
              className="h-14 px-4 border-2 border-gray-200 rounded-md focus:border-[#78C841] focus:ring-2 focus:ring-[#78C841]/20 transition-all"
            />
          </div>

          {/* Password Input */}
          <div>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              required
              className="h-14 px-4 border-2 border-gray-200 rounded-md focus:border-[#78C841] focus:ring-2 focus:ring-[#78C841]/20 transition-all"
            />
          </div>

          {/* Divider Lines with Login Button */}
          <div className="flex justify-between items-center py-2">
            <div className="w-full border-t border-[#78C841] border-2 mr-2"></div>

            <div className="relative flex justify-center">
              <Button
                type="submit"
                className="px-16 h-12 bg-[#78C841] hover:bg-[#6AB535] text-white font-medium text-base shadow-sm transition-colors"
              >
                Login
              </Button>
            </div>

            <div className="w-full border-t border-[#78C841] border-2 ml-2"></div>
          </div>

          {/* Sign up link */}
          <div className="text-center pt-4">
            <span className="text-sm text-gray-700">
              Vous N'avez Pas De Compte ?{" "}
              <Link
                href="/register"
                className="text-[#78C841] font-semibold hover:underline transition-all"
              >
                Inscrivez-Vous
              </Link>
            </span>
          </div>
        </div>
      </div>
    </form>
  );
}
