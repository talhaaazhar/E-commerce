import React, { useState } from "react";
import { ChatbotWindow } from "./ChatbotWindow";
import { FloatButton } from "antd";
import { CommentOutlined, CloseOutlined } from "@ant-design/icons";

export const ChatbotButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <ChatbotWindow onClose={() => setOpen(false)} />}
      <FloatButton
        type="primary"
        icon={open ? <CloseOutlined /> : <CommentOutlined />}
        onClick={() => setOpen((prev) => !prev)}
        style={{
          right: 24,
          bottom: 112,
          width: 56,
          height: 56,
          background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
          boxShadow: "0 14px 30px rgba(59,130,246,0.4)",
          zIndex: 10010,
        }}
        aria-label={open ? "Close support chat" : "Open support chat"}
      />
    </>
  );
};