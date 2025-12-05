import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from './ui/button';

const SOCKET_URL = import.meta.env.VITE_GRAPHQL_URL 
  ? import.meta.env.VITE_GRAPHQL_URL.replace('/graphql', '') 
  : 'http://localhost:4000';

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [myId, setMyId] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    newSocket.on('connect', () => {
      setMyId(newSocket.id);
    });

    newSocket.on('chat:message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && socket) {
      const msgData = {
        text: message,
        senderId: socket.id,
        timestamp: new Date().toISOString(),
      };
      socket.emit('chat:message', msgData);
      setMessage('');
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {isOpen && (
        <div className="w-80 h-96 bg-[#111115] border border-amber-500/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">
          {/* Header */}
          <div className="p-4 bg-[#1a1a20] border-b border-white/5 flex items-center justify-between">
            <h3 className="text-amber-100 font-medium flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-amber-500" />
              Live Chat
            </h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-500 text-sm text-center">
                <p>Welcome to EvoHance Chat!</p>
                <p className="text-xs mt-1">Ask us anything.</p>
              </div>
            ) : (
              messages.map((msg, idx) => {
                const isMe = msg.senderId === myId;
                return (
                  <div key={idx} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                     <div className={`max-w-[85%] px-3 py-2 rounded-xl text-sm ${
                       isMe 
                         ? 'bg-amber-500/20 text-amber-100 border border-amber-500/20 rounded-tr-none' 
                         : 'bg-[#2c2c30] text-gray-200 border border-white/5 rounded-tl-none'
                     }`}>
                       {msg.text}
                     </div>
                     <span className="text-[10px] text-gray-600 mt-1 px-1">
                       {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                     </span>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={sendMessage} className="p-3 bg-[#1a1a20] border-t border-white/5 flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-[#111115] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500/50 transition-colors placeholder:text-gray-600"
            />
            <Button 
              type="submit" 
              size="icon" 
              className="h-9 w-9 bg-amber-500 hover:bg-amber-600 text-black rounded-xl cursor-pointer"
              disabled={!message.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 rounded-full bg-amber-500 hover:bg-amber-400 text-black shadow-lg hover:shadow-amber-500/20 transition-all duration-300 hover:scale-105 cursor-pointer"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>
    </div>
  );
}
