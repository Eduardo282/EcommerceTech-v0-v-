export function Logo() {

    return <>
        <div className="relative">
              {/* 3D Isometric Box Effect */}
              <div className="relative w-12 h-12 perspective-1000">
                <div
                  className="absolute inset-0 rounded-lg shadow-lg transform group-hover:scale-110 transition-all duration-300"
                  style={{
                    background:
                      "linear-gradient(135deg, #F9B61D 0%, #F9B61D 100%)",
                    boxShadow: "0 0 20px #F9B61D",
                  }}>
                  {/* Grid overlay */}
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage:
                        "linear-gradient(transparent 1px, transparent 1px), linear-gradient(90deg, transparent 1px, transparent 1px)",
                      backgroundSize: "8px 8px",
                    }}
                  />
                  {/* Glow center */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full animate-pulse" style={{ backgroundColor: "#E4D9AF" }} />
                </div>
              </div>
              {/* Top face */}
              <div
                className="absolute -top-2 left-1 right-1 h-2 transform opacity-60 rounded-t"
                style={{
                  background:
                    "linear-gradient(to right, #E4D9AF 0%, #E4D9AF 100%)",
                }}
              />
              {/* Side left face */}
              <div
                className="absolute top-1 -left-2 bottom-1 w-2 transform opacity-40 rounded-r"
                style={{
                  background:
                    "linear-gradient(to bottom, #E4D9AF 0%, #E4D9AF 100%)",
                }}
              />
            </div>
        </>
}