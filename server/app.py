#!/usr/bin/env python3

from flask import Flask, jsonify, request
from flask_migrate import Migrate
from flask_restful import Api, Resource
from models import db, User, Entry, Photo  
import os
from datetime import datetime
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

# Creating Flask app instance
app = Flask(__name__)

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL') 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'my_jwt_secret_key'  
app.json.compact = False  

# Initializing Flask-Migrate and Flask-RESTful
migrate = Migrate(app, db)
api = Api(app)
jwt = JWTManager(app)

# Initializing the database with the app context
db.init_app(app)

# User registration
class UserRegister(Resource):
    def post(self):
        data = request.get_json()
        new_user = User(
            username=data.get('username'),
            email=data.get('email'),
            password_hash=data.get('password_hash') 
        )
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User registered successfully"}), 201

# User login
class UserLogin(Resource):
    def post(self):
        data = request.get_json()
        user = User.query.filter_by(email=data.get('email')).first()
        
        if user and user.verify_password(data.get('password')): 
            access_token = create_access_token(identity=user.id)
            return jsonify(access_token=access_token), 200
        
        return jsonify({"error": "Invalid credentials"}), 401

# User profile
class UserProfile(Resource):
    @jwt_required()
    def get(self):
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if user is None:
            return jsonify({"error": "User not found"}), 404
        
        user_data = {
            "id": user.id,
            "username": user.username,
            "email": user.email
        }
        
        return jsonify(user_data), 200

# Retrieve all entries
class EntryList(Resource):
    def get(self):
        entries = Entry.query.all()
        entries_list = [
            {
                "id": entry.id,
                "location": entry.location,
                "date": entry.date.strftime('%Y-%m-%d %H:%M:%S'),
                "description": entry.description,
                "user_id": entry.user_id
            } for entry in entries
        ]
        return jsonify(entries_list), 200

# Retrieve a specific entry
class EntryResource(Resource):
    def get(self, id):
        entry = Entry.query.get(id)
        if entry is None:
            return jsonify({"error": "Entry not found"}), 404

        entry_data = {
            "id": entry.id,
            "location": entry.location,
            "date": entry.date.strftime('%Y-%m-%d %H:%M:%S'),
            "description": entry.description,
            "user_id": entry.user_id
        }
        return jsonify(entry_data), 200

    @jwt_required()
    def put(self, id):
        entry = Entry.query.get(id)
        if entry is None:
            return jsonify({"error": "Entry not found"}), 404
        
        data = request.get_json()
        entry.location = data.get('location', entry.location)
        entry.date = datetime.strptime(data.get('date', entry.date.strftime('%Y-%m-%d %H:%M:%S')), '%Y-%m-%d %H:%M:%S')
        entry.description = data.get('description', entry.description)

        db.session.commit()
        return jsonify({"message": "Entry updated successfully"}), 200

    @jwt_required()
    def delete(self, id):
        entry = Entry.query.get(id)
        if entry is None:
            return jsonify({"error": "Entry not found"}), 404
        
        db.session.delete(entry)
        db.session.commit()
        return jsonify({"message": "Entry deleted successfully"}), 200

# Retrieve all photos for an entry
class EntryPhotos(Resource):
    @jwt_required()
    def get(self, id):
        entry = Entry.query.get(id)
        if entry is None:
            return jsonify({"error": "Entry not found"}), 404
        
        photos = Photo.query.filter_by(entry_id=id).all()
        photos_list = [{"id": photo.id, "url": photo.url} for photo in photos]
        return jsonify(photos_list), 200

    @jwt_required()
    def post(self, id):
        data = request.get_json()
        new_photo = Photo(url=data.get('url'), entry_id=id)
        db.session.add(new_photo)
        db.session.commit()
        return jsonify({"id": new_photo.id, "url": new_photo.url}), 201

# Adding resources to the API
api.add_resource(UserRegister, '/api/users/register')
api.add_resource(UserLogin, '/api/users/login')
api.add_resource(UserProfile, '/api/users/profile')
api.add_resource(EntryList, '/api/entries')
api.add_resource(EntryResource, '/api/entries/<int:id>')
api.add_resource(EntryPhotos, '/api/entries/<int:id>/photos')

# Running the application
if __name__ == '__main__':
    app.run(port=5555, debug=True)
