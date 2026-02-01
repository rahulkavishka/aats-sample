import { ChevronLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

interface SubModuleHeaderProps {
    title: string
    showNavigation?: boolean
    backUrl?: string
    action?: React.ReactNode
}

export default function SubModuleHeader({ title, showNavigation = true, backUrl, action }: SubModuleHeaderProps) {
    const navigate = useNavigate()

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                {showNavigation && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => backUrl ? navigate(backUrl) : navigate(-1)}
                        className="h-8 w-8 rounded-full"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                )}
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 uppercase font-mono">
                    {title}
                </h1>
            </div>
            {action && <div>{action}</div>}
        </div>
    )
}
