"use client";

import React, { useState, useRef, useEffect, memo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, Bot, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ChatProjectCard, { ProjectCardData } from "./ChatProjectCard";
import TypingAnimation from "./TypingAnimation";
import "./chatbot-styles.css";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  projectCards?: ProjectCardData[];
}

interface QuickResponse {
  question: string;
  category: string;
}

// Memoized message component for performance
const MessageBubble = memo(({ message, isTyping }: { message: Message; isTyping: boolean }) => {
  return (
    <div
      className={`flex ${
        message.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ 
          duration: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-lg ${
          message.role === "user"
            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
            : "bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-gray-100 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
        }`}
      >
        <div className="flex items-start gap-3">
          {message.role === "assistant" && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
              className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mt-0.5"
            >
              <Bot size={14} className="text-white" />
            </motion.div>
          )}
          {message.role === "user" && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
              className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mt-0.5"
            >
              <User size={14} className="text-white" />
            </motion.div>
          )}
          <div className="flex-1 leading-relaxed">
            {message.role === "assistant" && isTyping ? (
              <TypingAnimation text={message.content} speed={30} />
            ) : (
              message.content
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
});

MessageBubble.displayName = "MessageBubble";

// Memoized project cards container
const ProjectCardsContainer = memo(({ projectCards, messageId }: { projectCards: ProjectCardData[]; messageId: string }) => {
  if (!projectCards || projectCards.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="mt-4"
    >
      {projectCards.length === 1 ? (
        // Single project card
        <ChatProjectCard
          key={`${messageId}-project-0`}
          project={projectCards[0]}
          index={0}
        />
      ) : (
        // Multiple project cards with horizontal scroll
        <div className="space-y-2">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2"
          >
            <Sparkles size={12} />
            <span>Found {projectCards.length} relevant projects</span>
          </motion.div>
          
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
            {projectCards.map((project, index) => (
              <div key={`${messageId}-project-${index}`} className="flex-shrink-0 w-72 snap-start">
                <ChatProjectCard
                  project={project}
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
});

ProjectCardsContainer.displayName = "ProjectCardsContainer";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [quickResponses, setQuickResponses] = useState<QuickResponse[]>([]);
  const [typingMessageId, setTypingMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Optimized scroll to bottom function
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ 
      behavior: "smooth",
      block: "end"
    });
  }, []);

  // Load quick responses when component mounts
  useEffect(() => {
    const loadQuickResponses = async () => {
      try {
        const response = await fetch("/api/chatbot");
        if (response.ok) {
          const data = await response.json();
          setQuickResponses(data.quickResponses || []);
        }
      } catch (error) {
        console.error("Failed to load quick responses:", error);
      }
    };

    loadQuickResponses();
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    const timer = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timer);
  }, [messages, scrollToBottom]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Initial greeting message
  useEffect(() => {
    if (messages.length === 0) {
      const greetingMessage: Message = {
        id: "greeting",
        role: "assistant",
        content: "Hi! I'm here to help recruiters learn about Mohamed Khairi Bouzid's background, projects, and skills. What would you like to know?",
        timestamp: new Date(),
      };
      
      setMessages([greetingMessage]);
      setTypingMessageId("greeting");
      
      // Stop typing animation after content is "typed"
      setTimeout(() => {
        setTypingMessageId(null);
      }, greetingMessage.content.length * 30 + 1000);
    }
  }, [messages.length]);

  const sendMessage = useCallback(async (messageText?: string) => {
    const textToSend = messageText || inputValue.trim();
    if (!textToSend || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: textToSend,
          conversationHistory: messages.slice(-10).map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
        projectCards: data.projectCards || [],
      };

      setMessages((prev) => [...prev, assistantMessage]);
      
      // Start typing animation for assistant message
      setTypingMessageId(assistantMessage.id);
      
      // Stop typing animation after content is "typed"
      setTimeout(() => {
        setTypingMessageId(null);
      }, assistantMessage.content.length * 30 + 500);
      
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "I apologize, but I'm experiencing technical difficulties. Please try again or contact Mohamed directly at khairibouzid95@gmail.com",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, isLoading, messages]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }, [sendMessage]);

  const handleQuickResponse = useCallback((question: string) => {
    sendMessage(question);
  }, [sendMessage]);

  return (
    <>
      {/* Chat Toggle Button with enhanced animations */}
      <motion.div
        className="fixed bottom-6 right-6 z-[9998]"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          delay: 0.5, 
          type: "spring", 
          stiffness: 300,
          damping: 20
        }}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative"
        >
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-lg opacity-30"
            animate={{
              scale: isOpen ? 1.2 : 1,
              opacity: isOpen ? 0.5 : 0.3,
            }}
            transition={{ duration: 0.3 }}
          />
          
          <Button
            onClick={() => setIsOpen(!isOpen)}
            size="lg"
            className="relative h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl border-0 overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative"
                >
                  <MessageCircle size={24} />
                  {/* Notification dot */}
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-28 right-6 z-40 w-80 md:w-96"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Card className="h-[500px] flex flex-col shadow-2xl border-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-2xl overflow-hidden">
              {/* Enhanced Header */}
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white relative overflow-hidden">
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 8,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                  style={{ backgroundSize: "200% 200%" }}
                />
                
                <div className="flex items-center gap-3 relative z-10">
                  <motion.div
                    className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                  >
                    <Bot size={20} />
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-base">Career Assistant</h3>
                    <p className="text-xs opacity-90">
                      Ask about Mohamed's expertise
                    </p>
                  </div>
                </div>
                
                <motion.div
                  className="w-3 h-3 bg-green-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>

              {/* Enhanced Messages Container */}
              <div className="flex-1 p-4 overflow-y-auto scrollbar-hide bg-gradient-to-b from-gray-50/50 via-white to-gray-50/50 dark:from-gray-900/50 dark:via-gray-900 dark:to-gray-900/50">
                <div className="space-y-6">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.5,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }}
                      className="space-y-4"
                    >
                      {/* Conditional rendering based on whether project cards exist */}
                      {message.projectCards && message.projectCards.length > 0 ? (
                        <>
                          {/* Project Cards first for better visual hierarchy */}
                          <ProjectCardsContainer
                            projectCards={message.projectCards}
                            messageId={message.id}
                          />
                          
                          {/* Text explanation below cards */}
                          <MessageBubble 
                            message={message} 
                            isTyping={typingMessageId === message.id}
                          />
                        </>
                      ) : (
                        /* Regular message without project cards */
                        <MessageBubble 
                          message={message} 
                          isTyping={typingMessageId === message.id}
                        />
                      )}
                    </motion.div>
                  ))}

                  {/* Enhanced Loading indicator */}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl px-4 py-3 flex items-center gap-3 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                        <motion.div
                          className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, ease: "linear", repeat: Infinity }}
                        >
                          <Bot size={14} className="text-white" />
                        </motion.div>
                        <div className="flex items-center gap-2">
                          <motion.div
                            className="flex gap-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            {[0, 1, 2].map((i) => (
                              <motion.div
                                key={i}
                                className="w-2 h-2 bg-blue-500 rounded-full"
                                animate={{ y: [0, -8, 0] }}
                                transition={{
                                  duration: 0.6,
                                  repeat: Infinity,
                                  delay: i * 0.2,
                                }}
                              />
                            ))}
                          </motion.div>
                          <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                            Thinking...
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Enhanced Quick responses */}
                  {messages.length <= 1 && quickResponses.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 2 }}
                      className="space-y-3"
                    >
                      <motion.p 
                        className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.2 }}
                      >
                        <Sparkles size={12} />
                        Quick questions to get started:
                      </motion.p>
                      <div className="flex flex-wrap gap-2">
                        {quickResponses.slice(0, 3).map((item, index) => (
                          <motion.button
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ 
                              delay: 2.4 + index * 0.1,
                              type: "spring",
                              stiffness: 300,
                              damping: 25
                            }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleQuickResponse(item.question)}
                            className="text-xs bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 text-blue-600 dark:text-blue-400 px-3 py-2 rounded-full hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-900/40 dark:hover:to-indigo-900/40 transition-all duration-200 border border-blue-200/50 dark:border-blue-800/50 font-medium shadow-sm hover:shadow-md"
                          >
                            {item.question}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Enhanced Input Section */}
              <motion.div 
                className="p-4 border-t border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <motion.input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask about Mohamed's projects, skills, experience..."
                      className="w-full px-4 py-3 text-sm border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 dark:bg-gray-800/50 bg-white/70 backdrop-blur-sm transition-all duration-200 pr-12"
                      disabled={isLoading}
                      whileFocus={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                    <motion.div
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      animate={{ 
                        opacity: inputValue.trim() ? 1 : 0.5,
                        scale: inputValue.trim() ? 1 : 0.8 
                      }}
                    >
                      <Sparkles size={16} className="text-gray-400" />
                    </motion.div>
                  </div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={() => sendMessage()}
                      size="sm"
                      disabled={!inputValue.trim() || isLoading}
                      className="h-12 w-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <motion.div
                        animate={{ 
                          rotate: isLoading ? 360 : 0,
                          scale: isLoading ? 0.8 : 1
                        }}
                        transition={{ 
                          duration: isLoading ? 1 : 0.2,
                          repeat: isLoading ? Infinity : 0,
                          ease: "linear"
                        }}
                      >
                        {isLoading ? (
                          <Loader2 size={18} />
                        ) : (
                          <Send size={18} />
                        )}
                      </motion.div>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
