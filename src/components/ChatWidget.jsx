import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = '/';

const WHATSAPP_NUMBER = '2222222222'; // Reemplaza con número de WhatsApp

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);
  const [myId, setMyId] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    socketRef.current = newSocket;

    newSocket.on('connect', () => {
      setMyId(newSocket.id);
    });

    newSocket.on('chat:message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    newSocket.on('chat:delete', (id) => {
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    });

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && socketRef.current) {
      const msgData = {
        id: crypto.randomUUID(),
        text: message,
        senderId: socketRef.current.id,
        timestamp: new Date().toISOString(),
      };
      socketRef.current.emit('chat:message', msgData);
      setMessage('');
    }
  };

  const openWhatsApp = () => {
    const textToSend = message.trim() || 'Hola! Necesito ayuda con mi pedido.';
    const encodedMessage = encodeURIComponent(textToSend);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  const clearChat = () => {
    setMessages([]);
  };

  const deleteMessage = (id) => {
    if (socketRef.current && id) {
      socketRef.current.emit('chat:delete', id);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {isOpen && (
        <div className="w-80 h-96 bg-[#000000] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">
          {/* Header */}
          <div className="p-4 bg-[#2c2c30] flex items-center justify-between">
            <h3 className="text-[#E4D9AF] font-medium flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-[#F9B61D]"
              >
                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
              </svg>
              Chat en vivo
            </h3>
            <div className="flex items-center gap-2">
              {messages.length > 0 && (
                <button
                  onClick={clearChat}
                  className="text-[#ffffff] hover:text-[#980707] transition-colors cursor-pointer"
                  title="Limpiar conversación"
                >
              <TrashIcon />
                </button>
              )}
              <button
                onClick={openWhatsApp}
                className="text-[#25D366] hover:text-[#1ebe5d] transition-colors cursor-pointer"
                title="Chat on WhatsApp"
              >
                <WhatsAppIcon />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#ffffff] transition-colors cursor-pointer"
              >
                  <CloseIcon />
              </button>
            </div>
          </div>

          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-[#ffffff] text-sm text-center gap-3">
                <div className="space-y-1">
                  <p>Bienvenido al chat en vivo</p>
                  <p className="text-xs text-[#898989]">Puedes preguntarnos cualquier cosa.</p>
                </div>
                <button
                  onClick={openWhatsApp}
                  className="flex h-8 scale-100 cursor-pointer items-center gap-2 text-xs text-[#25D366] transition-all hover:scale-110 hover:text-[#1ebe5d]"
                >
                  <WhatsAppIcon />
                  Chat en WhatsApp
                </button>
              </div>
            ) : (
              messages.map((msg, idx) => {
                const isMe = msg.senderId === myId;
                return (
                  <div
                    key={msg.id || idx}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} group hover:z-10`}
                  >
                    <div className="flex items-center gap-2 max-w-full">
                      <div
                        className={`p-2 rounded-xl text-sm ${
                          isMe
                            ? 'bg-[#F9B61D50] text-[#E4D9AF] rounded-tr-none'
                            : 'bg-[#2c2c30] text-[#E4D9AF] rounded-tl-none'
                        }`}
                      >
                        {msg.text}
                      </div>

                      {isMe && (
                        <button
                          onClick={() => deleteMessage(msg.id)}
                          className="opacity-0 group-hover:opacity-100 text-[#898989] hover:text-[#980707] transition-all p-1 cursor-pointer"
                          title="Eliminar mensaje"
                        >
                  <TrashIcon />
                        </button>
                      )}
                    </div>
                    <span className="text-[10px] text-[#898989] mt-1 px-1">
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={sendMessage} className="p-3 bg-[#2c2c30] flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribe tu mensaje..."
              className="flex-1 bg-[#000000] rounded-xl px-3 py-2 text-sm text-white outline-none transition-colors placeholder:text-[#2c2c30]"
            />
            <button
              type="submit"
              className="flex items-center justify-center h-9 w-9 bg-[#F9B61D] text-[#111115] rounded-xl cursor-pointer disabled:opacity-50"
              disabled={!message.trim()}
            >
                            <SendIcon />
            </button>
          </form>
        </div>
      )}

      {/* Botón de alternar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center h-14 w-14 rounded-full bg-[#F9B61D50] hover:bg-[#F9B61D] text-[#111115] shadow-lg hover:shadow-[#F9B61D50] transition-all duration-300 hover:scale-105 cursor-pointer"
      >
        {isOpen ? <CloseIcon /> : <ChatBubbleIcon />}
      </button>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M19 6 18 20H6L5 6" />
      <path d="M10 11v5" />
      <path d="M14 11v5" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 32 32">
      <path d="M16.04 3C8.86 3 3.02 8.8 3.02 15.94c0 2.28.6 4.5 1.74 6.47L3 29l6.78-1.77a13.1 13.1 0 0 0 6.26 1.59c7.18 0 13.02-5.8 13.02-12.94S23.22 3 16.04 3Zm0 23.6c-1.94 0-3.84-.52-5.5-1.5l-.4-.23-4.02 1.05 1.07-3.9-.26-.4a10.62 10.62 0 0 1-1.7-5.73c0-5.92 4.85-10.74 10.81-10.74s10.81 4.82 10.81 10.74S22 26.6 16.04 26.6Z" />
      <path d="M22.02 18.74c-.33-.16-1.94-.95-2.24-1.06-.3-.11-.52-.16-.74.16-.22.33-.85 1.06-1.04 1.27-.19.22-.38.24-.7.08-.33-.16-1.38-.5-2.62-1.6a9.8 9.8 0 0 1-1.82-2.25c-.2-.33-.02-.5.15-.66.15-.15.33-.38.49-.57.16-.19.22-.33.33-.55.11-.22.05-.41-.03-.57-.08-.16-.74-1.77-1.02-2.42-.27-.63-.54-.54-.74-.55h-.63c-.22 0-.57.08-.87.41-.3.33-1.15 1.11-1.15 2.72 0 1.6 1.18 3.15 1.34 3.37.16.22 2.32 3.52 5.63 4.94.79.34 1.4.54 1.88.69.79.25 1.5.22 2.07.13.63-.1 1.94-.79 2.21-1.55.27-.76.27-1.41.19-1.55-.08-.14-.3-.22-.63-.38Z" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

function ChatBubbleIcon() {
  return (
    <svg aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" />
    </svg>
  );
}

