# from openai import OpenAI
# from app.core.config import settings
# from app.services.product_retrieval_service import retrieve_products

# client = OpenAI(api_key=settings.OPENAI_API_KEY)


# def ask_chatbot(db, question: str):

#     products = retrieve_products(db, question)

#     context = "\n".join([
#         f"{p.name} - ${p.price} ({p.category})"
#         for p in products
#     ])

#     prompt = f"""
# You are an ecommerce assistant. Answer the user's question based on the relevant products retrieved from the database. If the question is not related to products, answer it based on your general knowledge. If the question is related to products, recommend the most relevant products from the list below. 

# User question:
# {question}

# Relevant products:
# {context}

# Answer the user and recommend products if relevant.
# """

#     response = client.chat.completions.create(
#         model="gpt-4.1-mini",
#         messages=[{"role": "user", "content": prompt}]
#     )

#     return response.choices[0].message.content


from openai import OpenAI
from app.core.config import settings
from app.services.product_retrieval_service import retrieve_products
from app.services.chat_memory import get_session_history, add_message

client = OpenAI(api_key=settings.OPENAI_API_KEY)


def ask_chatbot(db, session_id: str, question: str):

    # Load session history
    history = get_session_history(session_id)

    # Add current user message to history
    add_message(session_id, "user", question)

    # Reload history so the current user message is included in this request
    history = get_session_history(session_id)

    # Retrieve relevant products
    products = retrieve_products(db, question)

    context = "\n".join([
        f"{p.name} - ${p.price} ({p.category})"
        for p in products
    ])

    system_prompt = {
        "role": "system",
        "content": """
You are an ecommerce assistant.

Answer the user's question based on the relevant products retrieved from the database.

If the question is not related to products, answer it based on your general knowledge.

If the question is related to products, recommend the most relevant products from the retrieved list.
"""
    }

    product_context = {
        "role": "system",
        "content": f"Relevant products:\n{context}"
    }

    # Combine system prompt + history
    messages = [system_prompt, product_context] + history

    response = client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=messages
    )

    answer = response.choices[0].message.content

    # Save assistant response
    add_message(session_id, "assistant", answer)

    return answer