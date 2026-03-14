from pydantic import BaseModel, Field
from beanie import Document, PydanticObjectId
from datetime import datetime

class Message(Document):
    sender_id: PydanticObjectId  
    receiver_id: PydanticObjectId  # Kinsa ang padalhan sa message
    content: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    is_toxic: bool = False

    class Settings:
        collection_name = "messages"

class MessageCreate(BaseModel):
    receiver_id: str # Gikan sa frontend, kinsa iyang gi-click nga e-message
    content: str