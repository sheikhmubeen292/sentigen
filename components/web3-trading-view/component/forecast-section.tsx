export default function ForecastSection() {
  return (
    <div className="bg-[#151617] rounded-lg p-4">
      <h3 className="text-lg font-medium mb-4">Forecast</h3>

      <div className="mb-6">
        <p className="text-sm mb-4">
          SNTI could rise 3% to 5% if bullish momentum holds, but a dip of 2% to 4% is possible if profit-taking kicks
          in. Stay sharp—things are heating up.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-xs text-[#7a7a7a] mb-1">Current Price</div>
          <div className="text-xl font-bold">$265k</div>
          <div className="text-xs text-[#04feae]">+100% (184.2%)</div>
        </div>
        <div>
          <div className="text-xs text-[#7a7a7a] mb-1">Expected Price Next 24h</div>
          <div className="text-xl font-bold">$313k</div>
          <div className="text-xs text-[#04feae]">+100% (184.2%)</div>
        </div>
      </div>
    </div>
  )
}

