export default function VaultBalance() {
  return (
    <div className="bg-[#151617] rounded-lg p-4">
      <h3 className="text-lg font-medium mb-4">Vault Balance</h3>

      <div className="flex justify-center mb-4">
        <div className="relative w-32 h-32">
          {/* Circle background */}
          <div className="absolute inset-0 rounded-full border-8 border-[#1f2122]"></div>

          {/* Progress segments */}
          <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-[#e942ba] border-r-[#e942ba] border-b-[#e942ba] rotate-[40deg]"></div>
          <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-[#b746f0] rotate-[220deg]"></div>
          <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-[#627eea] border-r-[#627eea] rotate-[280deg]"></div>

          {/* Center text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold">723.5k</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#e942ba]"></div>
          <span className="text-sm">40% Guardian</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#b746f0]"></div>
          <span className="text-sm">30% Staker</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#627eea]"></div>
          <span className="text-sm">30% Airdrop</span>
        </div>
      </div>
    </div>
  )
}

