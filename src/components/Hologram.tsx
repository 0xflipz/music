const handlePlay = async () => {
  if (!audioRef.current) return;

  try {
    await audioRef.current.play();
    setIsPlaying(true);
  } catch (error) {
    console.log("Play error:", error);
  }
};

// Add a button to trigger play
<button onClick={handlePlay}>Play</button> 

<Image
  src="/solanalogo.png"
  alt="Solana Logo"
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  priority
/> 

<Image
  src="/logo.png"
  alt="FLIPZ"
  width={180}
  height={45}
  className="object-contain"
  priority
/> 

<div className="flex items-center h-[45px]">
  <div className="flex-shrink-0 w-[180px]">
    <Image
      src="/logo.png"
      alt="FLIPZ"
      width={180}
      height={45}
      className="object-contain"
      priority
    />
  </div>
  <div className="flex gap-3 ml-4">
    {tabs.map((tab) => (
      <motion.button
        key={tab.id}
        onClick={() => handleTabClick(tab)}
        onMouseEnter={() => setHoveredTab(tab.id)}
        onMouseLeave={() => setHoveredTab(null)}
        className={cn(
          "relative px-6 py-2.5",
          "font-mono text-sm tracking-wider",
          "border border-[#9945FF]/40 backdrop-blur-sm",
          "transition-all duration-300 ease-out",
          "hover:border-[#00F0FF]/80",
          "shadow-[0_0_10px_rgba(255,255,255,0.1)]",
          "hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]",
          activeTab === tab.id ? "bg-black/40" : "bg-black/20"
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className={cn(
          "relative z-20",
          "transition-all duration-300",
          activeTab === tab.id ? "text-[#00F0FF]" : "text-white/90"
        )}>
          {tab.label}
        </span>
        
        {/* Base gradient */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#9945FF]/10 via-[#00F0FF]/5 to-[#9945FF]/10" />
        
        {/* Hover gradient */}
        <div className={cn(
          "absolute inset-0 z-[2] transition-all duration-300",
          "bg-gradient-to-r from-[#9945FF]/20 via-[#00F0FF]/10 to-[#9945FF]/20",
          hoveredTab === tab.id ? "opacity-100" : "opacity-0"
        )} />
      </motion.button>
    ))}
  </div>
  {/* Move Social Media Icons here */}
  <div className="flex gap-3 ml-4">
    <a 
      href="https://www.X.com/0xflipz"
      target="_blank"
      rel="noopener noreferrer"
      className="text-white hover:text-[#00F0FF] transition-colors cursor-pointer"
    >
      <FaTwitter />
    </a>
    <a 
      href="https://open.spotify.com/artist/04ESo9EXPMu2EDv9CVkbUL?si=qJkJ7ZTOSpK-7iau2tz1jA"
      target="_blank"
      rel="noopener noreferrer"
      className="text-white hover:text-[#00F0FF] transition-colors cursor-pointer"
    >
      <FaSpotify />
    </a>
    <a 
      href="https://www.youtube.com/@0xflipz"
      target="_blank"
      rel="noopener noreferrer"
      className="text-white hover:text-[#00F0FF] transition-colors cursor-pointer"
    >
      <FaYoutube />
    </a>
    <a 
      href="https://www.instagram.com/0xflipz"
      target="_blank"
      rel="noopener noreferrer"
      className="text-white hover:text-[#00F0FF] transition-colors cursor-pointer"
    >
      <FaInstagram />
    </a>
    <a 
      href="https://www.soundcloud.com/0xflipz"
      target="_blank"
      rel="noopener noreferrer"
      className="text-white hover:text-[#00F0FF] transition-colors cursor-pointer"
    >
      <SiPhoton />
    </a>
  </div>
</div> 

<motion.span 
  className="text-lg text-white font-mono"
  animate={{ opacity: [0.8, 1, 0.8] }}
  transition={{ duration: 1, repeat: Infinity }}
>
  {`${timeLeft.days}:${String(timeLeft.hours).padStart(2, '0')}:${String(timeLeft.minutes).padStart(2, '0')}:${String(timeLeft.seconds).padStart(2, '0')}.${String(timeLeft.milliseconds).padStart(3, '0')}`}
</motion.span> 