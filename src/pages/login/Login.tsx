import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff, Lock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Login() {
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            navigate("/audit-assurance")
        }, 1000)
    }

    return (
        <div className="relative min-h-screen w-full bg-[#050505] flex items-center justify-center overflow-hidden font-sans">
            {/* --- Techy Background Grid & Circuit Lines --- */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Subtle Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />

                {/* Circuit Lines SVGs - Four Corners */}
                <svg className="absolute top-10 left-0 w-64 h-64 text-blue-500/20 opacity-50" viewBox="0 0 100 100" fill="none">
                    <path d="M0 20 H 20 L 40 40 V 100" stroke="currentColor" strokeWidth="0.5" />
                    <path d="M0 30 H 15 L 35 50 V 100" stroke="currentColor" strokeWidth="0.5" />
                    <circle cx="40" cy="40" r="1" fill="currentColor" className="animate-pulse" />
                </svg>

                <svg className="absolute top-10 right-0 w-64 h-64 text-blue-500/20 opacity-50 transform scale-x-[-1]" viewBox="0 0 100 100" fill="none">
                    <path d="M0 20 H 20 L 40 40 V 100" stroke="currentColor" strokeWidth="0.5" />
                    <path d="M0 30 H 15 L 35 50 V 100" stroke="currentColor" strokeWidth="0.5" />
                    <circle cx="40" cy="40" r="1" fill="currentColor" className="animate-pulse" />
                </svg>

                <svg className="absolute bottom-0 left-0 w-96 h-96 text-blue-500/10 opacity-30 transform scale-y-[-1]" viewBox="0 0 100 100" fill="none">
                    <path d="M0 20 H 30 L 50 40 V 100" stroke="currentColor" strokeWidth="0.5" />
                    <path d="M0 40 H 20 L 45 65 V 100" stroke="currentColor" strokeWidth="0.5" />
                </svg>

                <svg className="absolute bottom-0 right-0 w-96 h-96 text-blue-500/10 opacity-30 transform scale-x-[-1] scale-y-[-1]" viewBox="0 0 100 100" fill="none">
                    <path d="M0 20 H 30 L 50 40 V 100" stroke="currentColor" strokeWidth="0.5" />
                    <path d="M0 40 H 20 L 45 65 V 100" stroke="currentColor" strokeWidth="0.5" />
                </svg>
            </div>

            {/* --- Main Login Card --- */}
            <Card className="z-10 w-full max-w-md bg-[#111111]/90 border-zinc-800 backdrop-blur-xl shadow-2xl animate-in fade-in zoom-in-95 duration-500">
                <CardHeader className="space-y-4 text-center pb-2">
                    <div className="mx-auto mb-6 flex justify-center">
                        <img src="/logo.png" alt="Logo" className="h-20 w-auto object-contain" />
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight text-white">Welcome Back</CardTitle>
                    <CardDescription className="text-zinc-400">
                        Enter your credentials to access the audit system
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-zinc-400 text-xs uppercase tracking-wider font-semibold">Username or Email</Label>
                            <div className="relative group">
                                <User className="absolute left-3 top-3 h-4 w-4 text-zinc-500 group-focus-within:text-blue-500 transition-colors" />
                                <Input
                                    id="email"
                                    placeholder="name@company.com"
                                    className="pl-10 bg-zinc-900/50 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-zinc-400 text-xs uppercase tracking-wider font-semibold">Password</Label>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-500 group-focus-within:text-blue-500 transition-colors" />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="pl-10 pr-10 bg-zinc-900/50 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-zinc-500 hover:text-zinc-300 focus:outline-none transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </div>
                        <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_-5px_rgba(37,99,235,0.5)] transition-all duration-300 h-11 font-medium mt-4" disabled={isLoading}>
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                                    Accessing Secure Server...
                                </div>
                            ) : (
                                "Log In"
                            )}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col gap-4 text-center pt-2">
                    <div className="text-sm text-zinc-500 mb-2">
                        Trouble signing in? <a href="#" className="text-blue-500 hover:text-blue-400 transition-colors hover:underline underline-offset-4">Forgot Password</a>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
