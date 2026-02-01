import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { User, Bell, Shield } from "lucide-react"

export default function SettingsPage() {
    return (
        <div className="flex flex-col space-y-6 p-4 md:p-6 animate-in fade-in duration-500 max-w-4xl mx-auto">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Settings</h1>
                <p className="text-muted-foreground">Manage your account settings and preferences.</p>
            </div>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <User className="h-5 w-5 text-primary" />
                            <CardTitle>Profile Details</CardTitle>
                        </div>
                        <CardDescription>Update your personal information and public profile.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="first-name">First Name</Label>
                                <Input id="first-name" defaultValue="John" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="last-name">Last Name</Label>
                                <Input id="last-name" defaultValue="Doe" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" defaultValue="john.doe@example.com" />
                        </div>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                        <Button>Save Changes</Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Bell className="h-5 w-5 text-primary" />
                            <CardTitle>Notifications</CardTitle>
                        </div>
                        <CardDescription>Choose what notifications you want to receive.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="marketing" defaultChecked />
                            <label htmlFor="marketing" className="text-sm font-medium leading-none">Marketing emails</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="updates" defaultChecked />
                            <label htmlFor="updates" className="text-sm font-medium leading-none">Product updates</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="security" defaultChecked />
                            <label htmlFor="security" className="text-sm font-medium leading-none">Security alerts</label>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Shield className="h-5 w-5 text-rose-500" />
                            <CardTitle>Security</CardTitle>
                        </div>
                        <CardDescription>Secure your account with multi-factor authentication.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <p className="text-sm font-medium">Two-factor Authentication</p>
                                <p className="text-xs text-muted-foreground">Add an extra layer of security to your account.</p>
                            </div>
                            <Button variant="outline" size="sm">Enable</Button>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <p className="text-sm font-medium text-rose-600">Delete Account</p>
                                <p className="text-xs text-muted-foreground">Permanently delete your account and all data.</p>
                            </div>
                            <Button variant="destructive" size="sm">Delete</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
