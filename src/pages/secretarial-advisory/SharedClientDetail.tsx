import { useParams, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function SharedClientDetail() {
    const { id } = useParams()
    const navigate = useNavigate()

    return (
        <div className="p-6">
            <Button variant="ghost" className="mb-4 gap-2" onClick={() => navigate(-1)}>
                <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            <h1 className="text-2xl font-bold">Client Details</h1>
            <p className="text-muted-foreground mt-2">Viewing record: {id}</p>
            <div className="mt-8 p-8 border border-dashed rounded-lg text-center text-muted-foreground">
                Detail view implementation pending.
            </div>
        </div>
    )
}
