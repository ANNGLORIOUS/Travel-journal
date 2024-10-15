#!/usr/bin/env python3

from flask import Flask, jsonify, request
from flask_migrate import Migrate
from models import db, User, Entry, Photo  
import os
from datetime import datetime
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

# Creating Flask app instance
app = Flask(__name__)

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://my_database_g8r7_user:CI7mNEPSed8JM64H4fsXUTzJmpr24ZQ1@dpg-cs73djjtq21c73cmjno0-a.oregon-postgres.render.com/travel_journal_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'my_jwt_secret_key'  
app.json.compact = False  

# Initializing Flask-Migrate and JWT Manager
migrate = Migrate(app, db)
jwt = JWTManager(app)

# Initializing the database with the app context
db.init_app(app)

# User registration
@app.route('/api/users/register', methods=['POST'])
def user_register():
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
@app.route('/api/users/login', methods=['POST'])
def user_login():
    data = request.get_json()
    user = User.query.filter_by(email=data.get('email')).first()
    
    if user and user.verify_password(data.get('password')): 
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token), 200
    
    return jsonify({"error": "Invalid credentials"}), 401

# Password reset request (placeholder)
@app.route('/api/users/reset-password', methods=['POST'])
def user_reset_password():
    data = request.get_json()
    # Handling password reset 
    return jsonify({"message": "Password reset request received"}), 200

# User profile
@app.route('/api/users/profile', methods=['GET'])
@jwt_required()
def user_profile():
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
@app.route('/api/entries', methods=['GET', 'POST'])
@jwt_required(optional=True)
def entry_list():
    if request.method == 'GET':
        entries = Entry.query.all()
        entries_list = [
            {
                "id": entry.id,
                "location": str(entry.location), 
                "date": entry.date.strftime('%Y-%m-%d %H:%M:%S') if entry.date else None,
                "description": str(entry.description), 
                "user_id": entry.user_id
            } for entry in entries
        ]
        return jsonify(entries_list), 200

    if request.method == 'POST':
        data = request.get_json()
        new_entry = Entry(
            location=data.get('location'),
            date=datetime.strptime(data.get('date'), '%Y-%m-%d %H:%M:%S'),
            description=data.get('description'),
            user_id=get_jwt_identity()
        )
        db.session.add(new_entry)
        db.session.commit()
        return jsonify({"id": new_entry.id}), 201

# Retrieve a specific entry
@app.route('/api/entries/<int:id>', methods=['GET', 'PUT', 'DELETE'])
@jwt_required(optional=True)
def entry_resource(id):
    entry = Entry.query.get(id)
    if request.method == 'GET':
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

    if request.method == 'PUT':
        if entry is None:
            return jsonify({"error": "Entry not found"}), 404
        
        data = request.get_json()
        entry.location = data.get('location', entry.location)
        entry.date = datetime.strptime(data.get('date', entry.date.strftime('%Y-%m-%d %H:%M:%S')), '%Y-%m-%d %H:%M:%S')
        entry.description = data.get('description', entry.description)

        db.session.commit()
        return jsonify({"message": "Entry updated successfully"}), 200

    if request.method == 'DELETE':
        if entry is None:
            return jsonify({"error": "Entry not found"}), 404
        
        db.session.delete(entry)
        db.session.commit()
        return jsonify({"message": "Entry deleted successfully"}), 200

# Retrieve all photos for an entry
@app.route('/api/entries/<int:id>/photos', methods=['GET', 'POST'])
@jwt_required()
def entry_photos(id):
    entry = Entry.query.get(id)
    if request.method == 'GET':
        if entry is None:
            return jsonify({"error": "Entry not found"}), 404
        
        photos = Photo.query.filter_by(entry_id=id).all()
        photos_list = [{"id": photo.id, "url": photo.url} for photo in photos]
        return jsonify(photos_list), 200

    if request.method == 'POST':
        data = request.get_json()
        new_photo = Photo(url=data.get('url'), entry_id=id)
        db.session.add(new_photo)
        db.session.commit()
        return jsonify({"id": new_photo.id, "url": new_photo.url}), 201

# Running the application
if __name__ == '__main__':
    app.run(port=5555, debug=True)
