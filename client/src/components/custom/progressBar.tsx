import React from 'react'
import { Progress } from "@/components/ui/progress"

interface Props {
    completed: number
    total: number
}

function calcProgress(completed: number, total: number) {
    if (total === 0) return 0
    return Math.round((completed / total) * 100)
}

function getProgressColor(percent: number) {
    if (percent < 25) return "bg-red-500"
    if (percent < 50) return "bg-orange-500"
    if (percent < 75) return "bg-yellow-500"
    return "bg-green-500"
}
const ProgressBar = ({ completed, total }: Props) => {
    const percent = calcProgress(completed, total)
    const color = getProgressColor(percent)

    return (
        <div className="w-full space-y-2">
            {/* label */}
            <div className="flex justify-between text-sm">
                <span>Tiến độ</span>
                <span>{percent}%</span>
            </div>

            {/* progress */}
            <Progress
                value={percent}
                indicatorClassName={`${color}  rounded-full`}
            />
        </div>
    )
}

export default ProgressBar