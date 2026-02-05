import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff, Lock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useTheme } from "@/hooks/use-theme"
import { Sun, Moon } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


export default function Login() {
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const { theme, toggleTheme } = useTheme()

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            navigate("/dashboard")
        }, 1000)
    }

    // Forgot Password State
    const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false)
    const [forgotPasswordForm, setForgotPasswordForm] = useState({
        username: "",
        email: "",
        phone: "",
        branch: "",
        role: "",
        rememberedPassword: ""
    })
    const [isRequestingReset, setIsRequestingReset] = useState(false)

    const handleRequestReset = () => {
        setIsRequestingReset(true)
        // Simulate API call to send admin request
        setTimeout(() => {
            setIsRequestingReset(false)
            setIsForgotPasswordOpen(false)
            // Ideally show a toast here
            alert("Request sent to Admin successfully!")
            setForgotPasswordForm({
                username: "",
                email: "",
                phone: "",
                branch: "",
                role: "",
                rememberedPassword: ""
            })
        }, 1500)
    }

    return (
        <div className="relative min-h-screen w-full bg-zinc-50 dark:bg-[#050505] flex items-center justify-center overflow-hidden font-sans transition-colors duration-500">
            {/* Theme Toggle - Top Right */}
            <div className="absolute top-4 right-4 z-20">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleTheme}
                    className="rounded-full text-zinc-600 dark:text-white/70 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-white/10 transition-all"
                    title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
                >
                    {theme === "light" ? (
                        <Sun className="h-5 w-5" />
                    ) : (
                        <Moon className="h-5 w-5" />
                    )}
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </div>
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
            <Card className="z-10 w-full max-w-md bg-white/80 dark:bg-[#111111]/90 border-zinc-200 dark:border-zinc-800 backdrop-blur-xl shadow-2xl animate-in fade-in zoom-in-95 duration-500">
                <CardHeader className="space-y-4 text-center pb-2">
                    <div className="mx-auto mb-6 flex justify-center">
                        <img src="/logo.png" alt="Logo" className="h-20 w-auto object-contain drop-shadow-xl dark:drop-shadow-none transition-all duration-300" />
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">Welcome Back</CardTitle>
                    <CardDescription className="text-zinc-500 dark:text-zinc-400">
                        Enter your credentials to access the AATS Management System
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-zinc-500 dark:text-zinc-400 text-xs uppercase tracking-wider font-semibold">Username or Email</Label>
                            <div className="relative group">
                                <User className="absolute left-3 top-3 h-4 w-4 text-zinc-400 dark:text-zinc-500 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-500 transition-colors" />
                                <Input
                                    id="email"
                                    placeholder="name@company.com"
                                    className="pl-10 bg-zinc-100/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-zinc-500 dark:text-zinc-400 text-xs uppercase tracking-wider font-semibold">Password</Label>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-400 dark:text-zinc-500 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-500 transition-colors" />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="pl-10 pr-10 bg-zinc-100/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300"
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
                        Trouble signing in? <button type="button" onClick={() => setIsForgotPasswordOpen(true)} className="text-blue-600 dark:text-blue-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors hover:underline underline-offset-4">Forgot Password</button>
                    </div>
                </CardFooter>
            </Card>

            {/* Forgot Password Dialog */}
            <Dialog open={isForgotPasswordOpen} onOpenChange={setIsForgotPasswordOpen}>
                <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Request Password Reset</DialogTitle>
                        <DialogDescription>
                            Submit a request to the admin to reset your password. Please provide as much detail as possible.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="fp-username">Username</Label>
                                <Input
                                    id="fp-username"
                                    placeholder="johndoe"
                                    value={forgotPasswordForm.username}
                                    onChange={(e) => setForgotPasswordForm({ ...forgotPasswordForm, username: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="fp-role">Role</Label>
                                <Select
                                    value={forgotPasswordForm.role}
                                    onValueChange={(val) => setForgotPasswordForm({ ...forgotPasswordForm, role: val })}
                                >
                                    <SelectTrigger id="fp-role">
                                        <SelectValue placeholder="Select Role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="admin">Admin</SelectItem>
                                        <SelectItem value="manager">Manager</SelectItem>
                                        <SelectItem value="staff">Staff</SelectItem>
                                        <SelectItem value="auditor">Auditor</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="fp-email">Email Address</Label>
                            <Input
                                id="fp-email"
                                type="email"
                                placeholder="name@company.com"
                                value={forgotPasswordForm.email}
                                onChange={(e) => setForgotPasswordForm({ ...forgotPasswordForm, email: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="fp-phone">Phone Number</Label>
                                <Input
                                    id="fp-phone"
                                    type="tel"
                                    placeholder="+94 77 123 4567"
                                    value={forgotPasswordForm.phone}
                                    onChange={(e) => setForgotPasswordForm({ ...forgotPasswordForm, phone: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="fp-branch">Branch</Label>
                                <Select
                                    value={forgotPasswordForm.branch}
                                    onValueChange={(val) => setForgotPasswordForm({ ...forgotPasswordForm, branch: val })}
                                >
                                    <SelectTrigger id="fp-branch">
                                        <SelectValue placeholder="Select Branch" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="central">Central</SelectItem>
                                        <SelectItem value="northeast">North East</SelectItem>
                                        <SelectItem value="west">West</SelectItem>
                                        <SelectItem value="south">South</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="fp-password">Last Remembered Password</Label>
                            <Input
                                id="fp-password"
                                type="password"
                                placeholder="Enter any password you recall"
                                value={forgotPasswordForm.rememberedPassword}
                                onChange={(e) => setForgotPasswordForm({ ...forgotPasswordForm, rememberedPassword: e.target.value })}
                            />
                            <p className="text-[10px] text-muted-foreground">It does not have to be correct. This helps admin verify your identity.</p>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsForgotPasswordOpen(false)} disabled={isRequestingReset}>Cancel</Button>
                        <Button onClick={handleRequestReset} disabled={isRequestingReset} className="bg-blue-600 hover:bg-blue-700 text-white">
                            {isRequestingReset ? "Sending Request..." : "Request Reset"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
