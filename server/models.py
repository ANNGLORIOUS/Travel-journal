from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime , timezone

db = SQLAlchemy()

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))

    entries = db.relationship('Entry', backref='user', lazy=True)

class Entry(db.Model, SerializerMixin):
    __tablename__ = 'entries'

    id = db.Column(db.Integer, primary_key=True)
    location = db.Column(db.String(100), nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    description = db.Column(db.Text, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))

    photos = db.relationship('Photo', backref='entry', lazy=True)
    tags = db.relationship('Tag', secondary='entry_tags', backref='entries', lazy='dynamic')

class Photo(db.Model, SerializerMixin):
    __tablename__ = 'photos'

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(200), nullable=False)
    entry_id = db.Column(db.Integer, db.ForeignKey('entries.id'), nullable=False)
    uploaded_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))

    entry = db.relationship('Entry', backref='photos', lazy=True)  

class Tag(db.Model, SerializerMixin):
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))

    entries = db.relationship('Entry', secondary='entry_tags', backref='tags', lazy='dynamic')  

class EntryTag(db.Model):
    __tablename__ = 'entry_tags'

    entry_id = db.Column(db.Integer, db.ForeignKey('entries.id'), primary_key=True)
    tag_id = db.Column(db.Integer, db.ForeignKey('tags.id'), primary_key=True)
