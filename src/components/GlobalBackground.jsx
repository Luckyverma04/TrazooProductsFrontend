const GlobalBackground = ({ children }) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-50">

      {/* Animated blobs */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div
          className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl opacity-20 animate-blob"
          style={{ backgroundColor: "#e16f30" }}
        />
        <div
          className="absolute top-40 right-10 w-72 h-72 rounded-full blur-3xl opacity-15 animate-blob animation-delay-2000"
          style={{ backgroundColor: "#df4607" }}
        />
        <div
          className="absolute bottom-10 left-1/2 w-72 h-72 rounded-full blur-3xl opacity-20 animate-blob animation-delay-4000"
          style={{ backgroundColor: "#e16f30" }}
        />
      </div>

      {children}

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(30px,-50px) scale(1.1); }
          66% { transform: translate(-20px,20px) scale(0.9); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
};

export default GlobalBackground;
