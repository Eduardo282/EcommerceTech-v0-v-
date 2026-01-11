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
                    className="h-4 w-4"
                  >
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    <line x1="10" x2="10" y1="11" y2="17" />
                    <line x1="14" x2="14" y1="11" y2="17" />
                  </svg>
                </button>
              )}
              <button
                onClick={openWhatsApp}
                className="text-[#ffffff] hover:text-[#09c208] transition-colors cursor-pointer"
                title="Chat on WhatsApp"
              >
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
                  className="h-4 w-4"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#ffffff] transition-colors cursor-pointer"
              >
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
                  className="h-4 w-4"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
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
                  className="text-white flex items-center gap-2 text-xs h-8 cursor-pointer scale-100 hover:scale-125 transition-all"
                >
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
                    className="h-3 w-3"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
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
                            className="h-3 w-3"
                          >
                            <path d="M3 6h18" />
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                            <line x1="10" x2="10" y1="11" y2="17" />
                            <line x1="14" x2="14" y1="11" y2="17" />
                          </svg>
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
                className="h-4 w-4"
              >
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
            </button>
          </form>
        </div>
      )}

      {/* Botón de alternar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center h-14 w-14 rounded-full bg-[#F9B61D50] hover:bg-[#F9B61D] text-[#111115] shadow-lg hover:shadow-[#F9B61D50] transition-all duration-300 hover:scale-105 cursor-pointer"
      >
        {isOpen ? (
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
            className="h-6 w-6"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        ) : (
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
            className="h-6 w-6"
          >
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
          </svg>
        )}
      </button>
    </div>
  );
}
