type StatsCardProps = {
  title: string
  value: string
  change: string
  changeType: "positive" | "negative" | "neutral"
  description: string
}

export default function StatsCard({ title, value, change, changeType, description }: StatsCardProps) {
  return (
    <div className="bg-[#151617] rounded-lg p-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm text-[#7a7a7a]">{title}</h3>
        <div className="h-10 w-24 bg-[#1f2122] rounded-md"></div>
      </div>

      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-2xl font-bold">{value}</span>
        <span
          className={`text-xs ${
            changeType === "positive"
              ? "text-[#04feae]"
              : changeType === "negative"
                ? "text-[#cc434b]"
                : "text-[#7a7a7a]"
          }`}
        >
          {change}
        </span>
      </div>

      <p className="text-xs text-[#7a7a7a]">{description}</p>
    </div>
  )
}

