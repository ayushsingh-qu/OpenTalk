import { PenLine } from "lucide-react"

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center">
            <PenLine size={16} className="text-stone-950" />
          </div>

          <h1 className="text-xl font-bold text-stone-100">
            Open<span className="text-amber-400">Talk</span>
          </h1>
        </div>
  )
}

export default Logo
