import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSun, FaMoon, FaRobot, FaPaperPlane, FaUser } from 'react-icons/fa';

interface Message {
  id: string;
  content: string;
  isAI: boolean;
}

const ChatBox = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isAI: false,
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: `This is a simulated response to: "${inputMessage}". AI response here...`,
        isAI: true,
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="max-w-2xl mx-auto p-4 h-screen flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 p-4 rounded-lg backdrop-blur-lg bg-opacity-90 
          ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg">
          <div className="flex items-center space-x-3">
            <FaRobot className={`text-2xl ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
            <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              AI Assistant
            </h1>
          </div>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-full transition-all duration-300 hover:scale-110
              ${isDarkMode ? 'text-yellow-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-200'}`}
          >
            {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
        </div>

        {/* Chat Messages */}
        <div className={`flex-1 overflow-y-auto rounded-xl p-4 mb-4 shadow-inner
          ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={`flex ${message.isAI ? 'justify-start' : 'justify-end'} mb-4`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-2xl ${
                    message.isAI
                      ? `${isDarkMode ? 'bg-gray-700' : 'bg-purple-100'} rounded-bl-none`
                      : `${isDarkMode ? 'bg-purple-600' : 'bg-purple-500'} text-white rounded-br-none`
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.isAI ? (
                      <FaRobot className={`mt-1 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                    ) : (
                      <FaUser className={`mt-1 ${isDarkMode ? 'text-gray-300' : 'text-purple-500'}`} />
                    )}
                    <p className={message.isAI ? (isDarkMode ? 'text-gray-100' : 'text-gray-800') : ''}>
                      {message.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center space-x-2 ml-2"
              >
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                </div>
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  AI is typing...
                </span>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className={`p-4 rounded-lg backdrop-blur-lg bg-opacity-90 shadow-lg
          ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className={`flex-1 p-3 rounded-xl focus:outline-none transition-all
                ${isDarkMode 
                  ? 'bg-gray-700 text-white focus:ring-2 focus:ring-purple-500' 
                  : 'bg-gray-100 text-gray-900 focus:ring-2 focus:ring-purple-400'}`}
            />
            <button
              onClick={handleSendMessage}
              className={`p-3 rounded-xl transition-all duration-300 hover:scale-110
                ${isDarkMode
                  ? 'bg-purple-600 text-white hover:bg-purple-500'
                  : 'bg-purple-500 text-white hover:bg-purple-400'}`}
            >
              <FaPaperPlane className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;