from openai import OpenAI
from app.core.config import settings

class OpenAIEmbedding:
    def __init__(self):
        self.client = OpenAI(api_key=settings.OPENAI_API_KEY)
        self.model = "text-embedding-3-small"

    def embed_document(self, text: str) -> list[float]:
        response = self.client.embeddings.create(
            model=self.model,
            input=text
        )
        return response.data[0].embedding

    def embed_query(self, text: str) -> list[float]:
        # For query, you can treat the same as document
        return self.embed_document(text)