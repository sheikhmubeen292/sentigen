export default function AirdropSection() {
  return (
    <div className="bg-[#151617] rounded-lg p-4">
      <h3 className="text-lg font-medium mb-4">Airdrops</h3>

      <div className="space-y-3">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-[#7a7a7a]">Total Distribution</span>
            <span className="text-lg font-medium">152k</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-[#7a7a7a]">Distributed 10k</span>
            <span className="text-xs text-[#7a7a7a]">Mar 12, 2023</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-[#7a7a7a]">Distributed 5k</span>
            <span className="text-xs text-[#7a7a7a]">Jan 8, 2023</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-[#7a7a7a]">Distributed 25k</span>
            <span className="text-xs text-[#7a7a7a]">Nov 24, 2022</span>
          </div>
        </div>
      </div>
    </div>
  );
}
