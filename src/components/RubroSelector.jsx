import { useState, useEffect, useCallback } from "react";
import { useRubro, RUBROS } from "../context/RubroContext";
import { Cpu, Gamepad2 } from "lucide-react";

export function RubroSelector({ compact = true }) {
  const { rubro, setRubro, isSeller } = useRubro();
  const [open, setOpen] = useState(false);
  const [authed, setAuthed] = useState(
    () => !!localStorage.getItem("auth.token")
  );

  // Listen for auth changes so selector reacts immediately
  useEffect(() => {
    function handler() {
      setAuthed(!!localStorage.getItem("auth.token"));
    }
    window.addEventListener("auth:changed", handler);
    return () => window.removeEventListener("auth:changed", handler);
  }, []);

  // According to requirements: selector must be disabled for everyone (guest, client, seller).
  const locked = true;

  // Enforce TECHNOLOGY for guests and for authenticated non-sellers
  useEffect(() => {
    if (!authed && rubro !== RUBROS.TECHNOLOGY) {
      setRubro(RUBROS.TECHNOLOGY);
    } else if (authed && !isSeller && rubro !== RUBROS.TECHNOLOGY) {
      setRubro(RUBROS.TECHNOLOGY);
    }
  }, [authed, isSeller, rubro, setRubro]);

  const toggle = useCallback(() => {
    if (locked) return;
    setOpen((o) => !o);
  }, [locked]);

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 px-3 sm:px-4 h-9 rounded-xl text-sm text-white disabled:opacity-60 disabled:cursor-not-allowed outline-none"
        onClick={toggle}
        aria-haspopup="menu"
        aria-expanded={open}
        disabled={locked}
        title={
          isSeller
            ? "Rubro bloqueado para cuentas vendedoras"
            : authed
            ? "Rubro fijo para cuentas de cliente"
            : "Rubro fijo para invitados"
        }>
        {rubro === RUBROS.GAMING ? (
          <Gamepad2 className="h-4 w-4" style={{ color: "#67e8f9" }} />
        ) : (
          <Cpu className="h-4 w-4" style={{ color: "#67e8f9" }} />
        )}
        <span className="sm:block">
          {rubro === RUBROS.GAMING ? "Gaming" : "Technology"}
        </span>
      </button>

      {open && !locked && (
        <div
          role="menu"
          className="absolute right-0 mt-2 min-w-[220px] rounded-xl border-2 p-2 z-50"
          style={{
            background: "rgba(6,10,18,0.95)",
            borderColor: "rgba(56,189,248,0.45)",
            boxShadow:
              "0 12px 28px rgba(0,0,0,.55), 0 0 18px rgba(56,189,248,0.25)",
            backdropFilter: "blur(10px)",
          }}>
          <p className="px-3 py-2 text-xs text-cyan-200/80">
            Selecciona tu rubro
          </p>
          <button
            className="w-full text-left px-3 py-2 rounded-lg border transition-colors"
            style={{
              borderColor: "rgba(56,189,248,0.25)",
              background:
                rubro === RUBROS.TECHNOLOGY
                  ? "rgba(56,189,248,0.06)"
                  : "transparent",
            }}
            onClick={() => {
              setRubro(RUBROS.TECHNOLOGY);
              setOpen(false);
            }}>
            Technology
          </button>
          <button
            className="w-full mt-1 text-left px-3 py-2 rounded-lg border transition-colors"
            style={{
              borderColor: "rgba(56,189,248,0.25)",
              background:
                rubro === RUBROS.GAMING
                  ? "rgba(56,189,248,0.06)"
                  : "transparent",
            }}
            onClick={() => {
              setRubro(RUBROS.GAMING);
              setOpen(false);
            }}>
            Gaming
          </button>
        </div>
      )}
    </div>
  );
}
