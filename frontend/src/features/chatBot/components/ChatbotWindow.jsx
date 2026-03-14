import React, { useState, useRef, useEffect } from "react";
import { useChatbot } from "../hooks/useChatbot";
import { Avatar, Button, Card, Empty, Input, Space, Spin, Tooltip, Typography } from "antd";
import { SendOutlined, CloseOutlined, ReloadOutlined } from "@ant-design/icons";

const { Text } = Typography;

export const ChatbotWindow = ({ onClose }) => {
  const { messages, sendMessage, loading, clearChat } = useChatbot();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;

    // Clear immediately so the input doesn't stay filled while bot types response.
    setInput("");
    await sendMessage(text);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Card
      className="!fixed !bottom-44 !right-6 !z-[10000] !w-[22rem] overflow-hidden !rounded-2xl !border !border-slate-200/70 !bg-white/95 shadow-2xl backdrop-blur dark:!border-slate-700 dark:!bg-slate-900/95 sm:!w-[24rem]"
      bodyStyle={{ padding: 0 }}
      title={
        <Space direction="vertical" size={0}>
          <Text strong className="!text-slate-900 dark:!text-slate-100">Support Assistant</Text>
          <Text type="secondary" className="!text-xs dark:!text-slate-400">
            Online • Ask about products & orders
          </Text>
        </Space>
      }
      extra={
        <Space size={2}>
          <Tooltip title="Clear chat">
            <Button
              type="text"
              icon={<ReloadOutlined />}
              onClick={clearChat}
              size="small"
              aria-label="Clear chat"
            />
          </Tooltip>
          <Tooltip title="Close chat">
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={onClose}
              size="small"
              aria-label="Close chat"
            />
          </Tooltip>
        </Space>
      }
    >

      <div className="flex h-[24rem] flex-col gap-3 overflow-y-auto bg-gradient-to-b from-slate-50 to-white p-4 dark:from-slate-900 dark:to-slate-900">
        {messages.length === 0 && (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <Text type="secondary" className="!text-xs dark:!text-slate-300">
                Hi 👋 I can help you find products, compare items, and answer store questions.
              </Text>
            }
          />
        )}

        {messages.map((msg, idx) => (
          <div
            key={msg.id || idx}
            className={`max-w-[88%] ${msg.role === "user" ? "ml-auto" : "mr-auto"}`}
          >
            <Space align="start" size={8} className="w-full" direction="horizontal">
              {msg.role === "bot" && <Avatar size={24}>AI</Avatar>}
              <div
                className={`w-full whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm leading-relaxed shadow-sm ${
                  msg.role === "user"
                    ? "rounded-br-md bg-blue-600 text-white"
                    : "rounded-bl-md border border-slate-200 bg-white text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                }`}
              >
                <Text className={msg.role === "user" ? "!text-white" : "dark:!text-slate-100"}>
                  {msg.content}
                </Text>
              </div>
            </Space>
          </div>
        ))}

        {loading && (
          <div className="mr-auto flex items-center gap-2 rounded-2xl rounded-bl-md border border-slate-200 bg-white px-3 py-2 text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
            <Spin size="small" />
            Thinking...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center gap-2 border-t border-slate-100 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onPressEnter={handleSend}
          placeholder="Ask anything..."
          size="large"
          className="rounded-xl"
        />

        <Button
          type="primary"
          icon={<SendOutlined />}
          onClick={handleSend}
          size="large"
          className="!h-10 !w-10 !shrink-0 !rounded-xl !border-0 !bg-blue-600 hover:!bg-blue-500"
          disabled={loading || !input.trim()}
          aria-label="Send message"
        />
      </div>
    </Card>
  );
};