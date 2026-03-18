import { apiClient } from "./client";
import { v4 as uuidv4 } from "uuid";


export const askChatbotApi = (question, sessionId) => {
  const id = sessionId || localStorage.getItem("chat_session_id") || uuidv4();

  if (!localStorage.getItem("chat_session_id")) {
    localStorage.setItem("chat_session_id", id);
  }

  return apiClient
    .post("/chatbot/ask", null, {
      params: {
        session_id: id,
        question,
      },
    })
    .then((res) => res.data); // { answer: "..." }
};