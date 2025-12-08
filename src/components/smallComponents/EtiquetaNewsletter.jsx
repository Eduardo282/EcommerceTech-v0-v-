import { Mail } from "lucide-react";

export function EtiquetaNewsletter() {
    return (
         <div
            className="inline-flex items-center gap-2 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
            style={{
              background: "#F9B61D10",
            }}>
            <Mail
              className="h-4 w-4 text-white"
            />
            <span className="text-sm text-[#F9B61D] font-display">
              Únete a nuestro boletín
            </span>
          </div>
            )   
        }