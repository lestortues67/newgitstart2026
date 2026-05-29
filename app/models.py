# Defines the User database model

from . import db
from flask_login import UserMixin
import datetime
from flask import current_app

from flask_alembic import Alembic
from sqlalchemy.orm import DeclarativeBase


class Model(DeclarativeBase):
    pass

alembic = Alembic(metadatas=Model.metadata)

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True) # primary keys are required by SQLAlchemy
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    name = db.Column(db.String(100))
    import datetime
    date_creation = db.Column(db.DateTime, default=datetime.datetime.utcnow)