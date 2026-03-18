chat_sessions = {}

MAX_HISTORY = 10


def get_session_history(session_id: str):

    if session_id not in chat_sessions:
        chat_sessions[session_id] = []

    return chat_sessions[session_id]


def add_message(session_id: str, role: str, content: str):

    history = get_session_history(session_id)

    history.append({
        "role": role,
        "content": content
    })

    # keep only last messages
    chat_sessions[session_id] = history[-MAX_HISTORY:]