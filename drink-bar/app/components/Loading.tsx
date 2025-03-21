export default function Loading() {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center">
      <div className="relative w-32 h-32"> {/* Reduzi o tamanho do container */}
        {/* Efeito de brilho */}
        <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse" />

        {/* Taça com animação de balanço */}
        <div className="relative z-10 animate-shake">
          <div className="relative w-24 h-36 mx-auto"> {/* Reduzi o tamanho da taça */}
            {/* SVG da taça de vinho */}
            <svg viewBox="0 0 100 150" className="absolute inset-0">
              {/* Contorno da taça */}
              <path
                d="M 30 10 Q 50 0 70 10 Q 80 40 60 80 Q 55 90 50 100 Q 45 90 40 80 Q 20 40 30 10 Z"
                fill="none"
                stroke="rgba(255,255,255,0.8)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              
              {/* Haste da taça */}
              <path
                d="M 50 100 L 50 130"
                stroke="rgba(255,255,255,0.8)"
                strokeWidth="2"
              />
              
              {/* Base da taça */}
              <ellipse
                cx="50"
                cy="135"
                rx="15"
                ry="5"
                fill="rgba(255,255,255,0.3)"
              />
              
              {/* Água dentro da taça (quase transbordando) */}
              <path
                d="M 32 20 Q 50 15 68 20 Q 70 40 60 70 Q 55 80 50 85 Q 45 80 40 70 Q 30 40 32 20 Z"
                fill="url(#waterGradient)"
                fillOpacity="0.8"
              />
              
              {/* Gradiente RGB para a água */}
              <defs>
                <linearGradient id="waterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#40C4FF" />
                  <stop offset="50%" stopColor="#FF4081" />
                  <stop offset="100%" stopColor="#FFEB3B" />
                </linearGradient>
              </defs>
              
              {/* Superfície da água com animação de onda */}
              <path
                d="M 32 20 Q 50 15 68 20"
                fill="none"
                stroke="#80D8FF"
                strokeWidth="2"
                className="animate-wave"
              />
              
              {/* Bolhas subindo */}
              <circle cx="38" cy="30" r="2" fill="#80D8FF" className="animate-bubble" />
              <circle cx="55" cy="25" r="3" fill="#80D8FF" className="animate-bubble-delay" />
              <circle cx="62" cy="40" r="2" fill="#80D8FF" className="animate-bubble" />
              <circle cx="45" cy="35" r="2" fill="#80D8FF" className="animate-bubble-delay-2" />
              <circle cx="50" cy="50" r="2" fill="#80D8FF" className="animate-bubble" />
              <circle cx="58" cy="60" r="2" fill="#80D8FF" className="animate-bubble-delay" />
              <circle cx="42" cy="55" r="2" fill="#80D8FF" className="animate-bubble-delay-2" />
              <circle cx="65" cy="45" r="2" fill="#80D8FF" className="animate-bubble" />
              <circle cx="48" cy="65" r="2" fill="#80D8FF" className="animate-bubble-delay" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Texto abaixo da taça */}
      <p className="absolute mt-48 text-white/80 font-medium animate-pulse"> {/* Ajustei o margin-top */}
        Loading...
      </p>
    </div>
  );
}