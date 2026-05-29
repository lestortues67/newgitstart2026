from app import db
from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column


from flask_alembic import Alembic
from sqlalchemy.orm import DeclarativeBase


class Model(DeclarativeBase):
    pass

alembic = Alembic(metadatas=Model.metadata)



class User(db.Model):
    __tablename__ = 'users'
    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(unique=True)
    email: Mapped[str]


    