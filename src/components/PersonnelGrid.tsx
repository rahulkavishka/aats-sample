import { Card, CardContent } from "@/components/ui/card"

interface Personnel {
    name: string
    position: string
}

interface PersonnelGridProps {
    directors?: Personnel[]
    secretary?: Personnel[]
    directors2?: Personnel[]
    other?: Personnel[]
}

export default function PersonnelGrid({ directors, secretary, directors2, other }: PersonnelGridProps) {
    return (
        <Card className="shadow-sm border-slate-200 dark:border-slate-800 border-t-0 rounded-t-none">
            <CardContent className="p-6">
                <div className="space-y-4">
                    {directors && directors.length > 0 && (
                        <div>
                            <h4 className="font-semibold text-sm mb-2 text-slate-900 dark:text-slate-100">Directors</h4>
                            <ul className="list-disc pl-5 text-sm text-slate-600 dark:text-slate-400">
                                {directors.map((d, i) => <li key={i}>{d.name} {d.position && <span className="text-slate-400">({d.position})</span>}</li>)}
                            </ul>
                        </div>
                    )}
                    {secretary && secretary.length > 0 && (
                        <div>
                            <h4 className="font-semibold text-sm mb-2 text-slate-900 dark:text-slate-100">Secretaries</h4>
                            <ul className="list-disc pl-5 text-sm text-slate-600 dark:text-slate-400">
                                {secretary.map((d, i) => <li key={i}>{d.name} {d.position && <span className="text-slate-400">({d.position})</span>}</li>)}
                            </ul>
                        </div>
                    )}
                    {directors2 && directors2.length > 0 && (
                        <div>
                            <h4 className="font-semibold text-sm mb-2 text-slate-900 dark:text-slate-100">Additional Directors</h4>
                            <ul className="list-disc pl-5 text-sm text-slate-600 dark:text-slate-400">
                                {directors2.map((d, i) => <li key={i}>{d.name} {d.position && <span className="text-slate-400">({d.position})</span>}</li>)}
                            </ul>
                        </div>
                    )}
                    {other && other.length > 0 && (
                        <div>
                            <h4 className="font-semibold text-sm mb-2 text-slate-900 dark:text-slate-100">Other</h4>
                            <ul className="list-disc pl-5 text-sm text-slate-600 dark:text-slate-400">
                                {other.map((d, i) => <li key={i}>{d.name} {d.position && <span className="text-slate-400">({d.position})</span>}</li>)}
                            </ul>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

