
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send } from "lucide-react";
import { AirQualityData } from "@/types/airQuality";
import { ChatMessage, generateChatbotResponse } from "@/services/chatbotService";
import { v4 as uuidv4 } from "uuid";

interface ChatbotProps {
  airQualityData: AirQualityData;
}

const Chatbot = ({ airQualityData }: ChatbotProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: uuidv4(),
      role: "assistant",
      content: `Hello! I'm your VayuMeter assistant. Ask me anything about the air quality and climate conditions in ${airQualityData.location}.`,
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (message.trim() === "") return;
    
    const userMessage: ChatMessage = {
      id: uuidv4(),
      role: "user",
      content: message,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setIsLoading(true);
    
    try {
      const response = await generateChatbotResponse(message, airQualityData);
      
      const assistantMessage: ChatMessage = {
        id: uuidv4(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      
      const errorMessage: ChatMessage = {
        id: uuidv4(),
        role: "assistant",
        content: "I'm sorry, I couldn't process your request at the moment. Please try again later.",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card className="h-[500px] flex flex-col animate-fade-in">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center">
          <MessageCircle className="h-5 w-5 mr-2" />
          Air Quality Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`rounded-lg px-4 py-2 max-w-[80%] ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-lg px-4 py-2 max-w-[80%] bg-muted">
                  <div className="flex space-x-2">
                    <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse"></div>
                    <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse delay-150"></div>
                    <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse delay-300"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className="p-4 border-t">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about air quality..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading || message.trim() === ""}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default Chatbot;
