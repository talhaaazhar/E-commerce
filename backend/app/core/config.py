from pydantic_settings import BaseSettings
from pydantic import Extra

class Settings(BaseSettings):
    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    class Config:
        env_file = ".env"
        extra = Extra.ignore  # <-- ignore unknown env vars
    def validate(self):
        if not self.SECRET_KEY:
            raise ValueError("SECRET_KEY must be set in .env")
        if not self.DATABASE_URL:
            raise ValueError("DATABASE_URL must be set in .env")

settings = Settings()
settings.validate()