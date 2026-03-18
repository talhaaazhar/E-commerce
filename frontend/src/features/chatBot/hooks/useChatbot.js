import { useState } from "react";
import { askChatbot } from "../services/chatbotService";

export const useChatbot = () => {
  const [messages, setMessages] = useState([]); // { role: 'user' | 'bot', content: string }
  const [loading, setLoading] = useState(false);

  const BOT_TYPING_DELAY_MS = 28;

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const typeBotMessage = async (fullText) => {
    const text = typeof fullText === "string" ? fullText : String(fullText ?? "");
    const botMessageId = `bot-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

    // Insert an empty assistant message first
    setMessages((prev) => [...prev, { id: botMessageId, role: "bot", content: "" }]);

    // Type by words/spaces to mimic token flow
    const tokens = text.match(/\S+|\s+/g) ?? [text];

    for (const token of tokens) {
      await sleep(BOT_TYPING_DELAY_MS);
      setMessages((prev) =>
        prev.map((message) =>
          message.id === botMessageId
            ? { ...message, content: `${message.content}${token}` }
            : message
        )
      );
    }
  };

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: text }]);

    setLoading(true);
    try {
      const response = await askChatbot(text);
      const botMessage = response?.answer ?? "Sorry, I could not generate a response.";

      await typeBotMessage(botMessage);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Oops! Something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => setMessages([]);

  return { messages, sendMessage, loading, clearChat };
};