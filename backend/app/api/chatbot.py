from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.services.chatbot_service import ask_chatbot

router = APIRouter(prefix="/chatbot", tags=["Chatbot"])


@router.post("/ask")
def ask_chatbot_api(
    session_id: str,
    question: str,
    db: Session = Depends(get_db)
):

    answer = ask_chatbot(db, session_id, question)

    return {"answer": answer}