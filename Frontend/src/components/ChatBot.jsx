import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaPaperPlane, FaTimes } from 'react-icons/fa';
import '../styles/components/ChatBot.css';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Predefined responses based on website content
  const responses = {
    greeting: [
      "Hello! Welcome to Illusio Design. How can I assist you today?",
      "Hi there! I'm your AI assistant at Illusio Design. What can I help you with?",
      "Welcome! I'm here to help you learn more about our services and offerings."
    ],
    services: {
      design: "We offer comprehensive design services including UI/UX design, graphic design, and brand identity development. Our design team creates stunning visuals that align with your brand's vision. Would you like to know more about any specific design service?",
      development: "Our development services include web development, mobile app development, and custom software solutions. We use cutting-edge technologies to build robust and scalable applications. Is there a particular development service you're interested in?",
      marketing: "Our marketing services cover digital marketing, SEO, social media management, and content marketing. We help businesses grow their online presence and reach their target audience effectively. Would you like to explore any specific marketing service?"
    },
    contact: "You can reach us through our contact form on the website, email us at info@illusiodesign.com, or call us at +91 7600046146. We're here to help! Feel free to reach out anytime.",
    pricing: "Our pricing varies based on project requirements and scope. We offer customized solutions tailored to your needs. Would you like to schedule a consultation to discuss your project and get a detailed quote?",
    portfolio: "You can view our latest work in our case studies section. We've successfully delivered projects for various industries including e-commerce, healthcare, and education. Would you like me to highlight some specific projects?",
    thankYou: [
      "You're welcome! If you have any more questions, feel free to ask. I'm here to help!",
      "It's my pleasure! Don't hesitate to reach out if you need any other information about our services.",
      "Happy to help! If you need more details about our services or want to discuss your project, just let me know.",
      "Anytime! Remember, you can also contact our team directly for more personalized assistance.",
      "Glad I could help! If you're interested in working with us, I'd be happy to provide more specific information about our services."
    ],
    default: "I'm not sure about that specific question, but I can tell you about our services in design, development, and marketing. What would you like to know?"
  };

  const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();

    // Thank you detection
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return responses.thankYou[Math.floor(Math.random() * responses.thankYou.length)];
    }

    // Greeting detection
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return responses.greeting[Math.floor(Math.random() * responses.greeting.length)];
    }

    // Services related questions
    if (lowerMessage.includes('design') || lowerMessage.includes('ui') || lowerMessage.includes('ux')) {
      return responses.services.design;
    }
    if (lowerMessage.includes('development') || lowerMessage.includes('web') || lowerMessage.includes('app')) {
      return responses.services.development;
    }
    if (lowerMessage.includes('marketing') || lowerMessage.includes('seo') || lowerMessage.includes('social media')) {
      return responses.services.marketing;
    }

    // Contact information
    if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone') || lowerMessage.includes('call')) {
      return responses.contact;
    }

    // Pricing related
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing')) {
      return responses.pricing;
    }

    // Portfolio/Case Studies
    if (lowerMessage.includes('portfolio') || lowerMessage.includes('work') || lowerMessage.includes('case study')) {
      return responses.portfolio;
    }

    // Default response for unrecognized queries
    return responses.default;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Get and send bot response
    setTimeout(() => {
      const botResponse = getBotResponse(inputMessage);
      const aiMessage = {
        text: botResponse,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div className="chatbot-container">
      <button 
        className="chatbot-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaRobot />
      </button>
      
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>AI Assistant</h3>
            <button 
              className="close-button"
              onClick={() => setIsOpen(false)}
            >
              <FaTimes />
            </button>
          </div>
          
          <div className="messages-container">
            {messages.length === 0 && (
              <div className="message bot-message">
                <div className="message-content">
                  Hello! I'm your AI assistant at Illusio Design. I can help you with information about our services, pricing, portfolio, and more. How can I assist you today?
                </div>
                <div className="message-timestamp">
                  {new Date().toLocaleTimeString()}
                </div>
              </div>
            )}
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
              >
                <div className="message-content">
                  {message.text}
                </div>
                <div className="message-timestamp">
                  {message.timestamp}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="input-container">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about our services..."
              className="message-input"
            />
            <button type="submit" className="send-button">
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot; 