import { askChatbotApi } from "../../../api/chatbot";

export const askChatbot = async (question) => {
  try {
    const sessionId = localStorage.getItem("chat_session_id");
    const data = await askChatbotApi(question, sessionId);
    return data; // { answer: "..." }
  } catch (err) {
    console.error("Chatbot service error:", err);
    throw err;
  }
};