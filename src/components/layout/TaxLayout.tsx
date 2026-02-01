import React from 'react';
import { ChevronLeft, ChevronRight, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from '@/components/ui/separator';

interface TaxLayoutProps {
    children: React.ReactNode;
    breadcrumbs?: { label: string; href?: string }[];
    title?: string;
}

const TaxLayout: React.FC<TaxLayoutProps> = ({ children, breadcrumbs = [], title }) => {
    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col font-sans text-neutral-900">
            {/* Top Navbar */}
            <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
                <div className="container flex h-14 items-center justify-between px-4 sm:px-8">
                    <div className="flex items-center gap-4">
                        {/* Navigation Controls */}
                        <div className="flex items-center gap-1 text-neutral-500">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>

                        <Separator orientation="vertical" className="h-6" />

                        {/* Breadcrumbs */}
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/tax-filing">Tax Filing</BreadcrumbLink>
                                </BreadcrumbItem>
                                {breadcrumbs.map((crumb, index) => (
                                    <React.Fragment key={index}>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            {crumb.href ? (
                                                <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
                                            ) : (
                                                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                                            )}
                                        </BreadcrumbItem>
                                    </React.Fragment>
                                ))}
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="relative text-neutral-500 hover:text-neutral-900">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-neutral-500 hover:text-neutral-900">
                            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors">
                                <User className="h-4 w-4" />
                            </div>
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content Body */}
            <main className="flex-1 container py-6 px-4 sm:px-8">
                {title && (
                    <div className="mb-6">
                        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
                    </div>
                )}
                {children}
            </main>


        </div>
    );
};

export default TaxLayout;
