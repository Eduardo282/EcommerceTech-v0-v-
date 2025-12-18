import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { MessageCircle, X, Send, Phone, Trash2 } from 'lucide-react';
import { Button } from './ui/button';

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
              <MessageCircle className="h-4 w-4 text-[#F9B61D]" />
              Chat en vivo
            </h3>
            <div className="flex items-center gap-2">
              {messages.length > 0 && (
                <button
                  onClick={clearChat}
                  className="text-[#ffffff] hover:text-[#980707] transition-colors cursor-pointer"
                  title="Limpiar conversación"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
              <button
                onClick={openWhatsApp}
                className="text-[#ffffff] hover:text-[#09c208] transition-colors cursor-pointer"
                title="Chat on WhatsApp"
              >
                <Phone className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#ffffff] transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
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
                  <Phone className="h-3 w-3" />
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
                          <Trash2 className="h-3 w-3" />
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
            <Button
              type="submit"
              size="icon"
              className="h-9 w-9 bg-[#F9B61D] text-[#111115] rounded-xl cursor-pointer"
              disabled={!message.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}

      {/* Botón de alternar */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 rounded-full bg-[#F9B61D50] hover:bg-[#F9B61D] text-[#111115] shadow-lg hover:shadow-[#F9B61D50] transition-all duration-300 hover:scale-105 cursor-pointer"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>
    </div>
  );
}
