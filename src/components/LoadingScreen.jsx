import React from 'react';

const LoadingScreen = () => {
    return (
        <div className="fixed inset-0 z-[1000] bg-white flex flex-col items-center justify-center overflow-hidden">
            {/* Soft background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px] animate-pulse" />

            <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
                {/* Advanced rotating rings */}
                <svg className="absolute inset-0 w-full h-full animate-spin-smooth" viewBox="0 0 100 100">
                    {/* Background track */}
                    <circle
                        cx="50" cy="50" r="45"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-primary/5"
                    />
                    {/* Primary spinning arc */}
                    <circle
                        cx="50" cy="50" r="45"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeDasharray="283"
                        strokeDashoffset="280"
                        strokeLinecap="round"
                        className="text-primary animate-draw-infinity"
                    />
                </svg>

                {/* Inner accent ring */}
                <div className="absolute inset-4 border-[1px] border-accent/20 rounded-full animate-[ping_2s_infinite]" />
                <div className="absolute inset-4 border-[1px] border-accent/40 rounded-full animate-spin-reverse" />

                {/* Brand Logo Icon */}
                <div className="relative z-10 scale-110">
                    <svg className="w-10 h-10 text-primary animate-float-gentle" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="logoGradient" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="var(--blue)" />
                                <stop offset="100%" stopColor="var(--blue-dark)" />
                            </linearGradient>
                        </defs>
                        <rect width="80" height="80" rx="20" fill="url(#logoGradient)" fillOpacity="0.1" />
                        <polygon points="12,16 27,16 40,56 35,56" fill="currentColor" />
                        <polygon points="68,16 53,16 40,56 45,56" fill="currentColor" />
                    </svg>
                </div>
            </div>

            <div className="flex flex-col items-center gap-3">
                <div className="font-poppins text-2xl font-extrabold text-dark tracking-[-1px] animate-fade-in-delayed">
                    VENDOR<span className="text-accent">A</span>
                </div>

                {/* Smooth staggered dots */}
                <div className="flex gap-2">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className={`w-1.5 h-1.5 rounded-full ${i === 1 ? 'bg-accent' : 'bg-primary/30'} animate-dot-flow`}
                            style={{ animationDelay: `${i * 0.15}s` }}
                        />
                    ))}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes spinSmooth {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes spinReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        @keyframes drawInfinity {
          0% { stroke-dashoffset: 280; }
          50% { stroke-dashoffset: 70; }
          100% { stroke-dashoffset: 280; }
        }
        
        @keyframes floatGentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        
        @keyframes dotFlow {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.4); opacity: 1; }
        }
        
        @keyframes fadeInDelayed {
          0% { opacity: 0; transform: translateY(4px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .animate-spin-smooth {
          animation: spinSmooth 1.4s linear infinite;
        }

        .animate-spin-reverse {
          animation: spinReverse 2.5s linear infinite;
        }

        .animate-draw-infinity {
          animation: drawInfinity 2s ease-in-out infinite;
        }
        
        .animate-float-gentle {
          animation: floatGentle 3s ease-in-out infinite;
        }
        
        .animate-dot-flow {
          animation: dotFlow 1.5s ease-in-out infinite;
        }
        
        .animate-fade-in-delayed {
          animation: fadeInDelayed 1s 0.2s both;
        }
      `}} />
        </div>
    );
};

export default LoadingScreen;
