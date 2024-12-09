export default function ProgressIndicator({ current, total, timeEstimate }: Props) {
  return (
    <div className="relative">
      <Progress value={(current / total) * 100} />
      <div className="absolute top-full mt-2 text-sm text-gray-500">
        预计还需 {timeEstimate} 分钟完成
      </div>
      <div className="flex justify-between text-xs text-gray-400 mt-1">
        <span>开始</span>
        <span>完成</span>
      </div>
    </div>
  )
} 