const Loader = () => {
    return (
        <div className="min-h-75 w-full flex items-center justify-center gap-3">
            {[0, 1, 2].map((dot) => (
                <span
                    key={dot}
                    className="size-5 rounded-full bg-[#313131]"
                    style={{
                        animation: `loadingPulse 1s ease-in-out ${dot * 0.2}s infinite`,
                    }}
                />
            ))}

            <style>
                {`
          @keyframes loadingPulse {
            0%, 100% {
              opacity: 0.3;
              transform: scale(0.9);
            }
            50% {
              opacity: 1;
              transform: scale(1.2);
            }
          }
        `}
            </style>
        </div>
    );
};

export default Loader;