// Update the status metrics styling
<div className="grid grid-cols-2 gap-4 mb-4">
  {/* Price and Market Cap */}
  <div className="bg-black/30 p-3 rounded border border-[#9945FF]/20">
    <div className="flex justify-between items-center mb-1">
      {/* Changed text color to white */}
      <span className="text-white text-sm">FLIPZ_PRICE</span>
      <span className={`text-sm ${priceChange >= 0 ? 'text-[#00F0FF]' : 'text-red-500'}`}>
        {priceChange >= 0 ? '+' : ''}{priceChange}%
      </span>
    </div>
    <div className="text-[#00F0FF] text-2xl font-bold">{price}</div>
  </div>

  <div className="bg-black/30 p-3 rounded border border-[#9945FF]/20">
    <div className="flex justify-between items-center mb-1">
      {/* Changed text color to white */}
      <span className="text-white text-sm">MARKET_CAP</span>
      <span className={`text-sm ${marketCapChange >= 0 ? 'text-[#00F0FF]' : 'text-red-500'}`}>
        {marketCapChange >= 0 ? '+' : ''}{marketCapChange}%
      </span>
    </div>
    <div className="text-[#00F0FF] text-2xl font-bold">${marketCap}M</div>
  </div>

  {/* Holders and Volume */}
  <div className="bg-black/30 p-3 rounded border border-[#9945FF]/20">
    <div className="flex justify-between items-center mb-1">
      {/* Changed text color to white */}
      <span className="text-white text-sm">HOLDERS</span>
      <span className="text-[#00F0FF] text-sm">+{holdersChange}%</span>
    </div>
    <div className="text-[#00F0FF] text-2xl font-bold">{holders}</div>
  </div>

  <div className="bg-black/30 p-3 rounded border border-[#9945FF]/20">
    <div className="flex justify-between items-center mb-1">
      {/* Changed text color to white */}
      <span className="text-white text-sm">24H_VOLUME</span>
      <span className="text-[#00F0FF] text-sm">+{volumeChange}%</span>
    </div>
    <div className="text-[#00F0FF] text-2xl font-bold">${volume}K</div>
  </div>
</div> 