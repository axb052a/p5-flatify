#!/usr/bin/env python3

# Remote library imports
from flask import request, make_response, session, jsonify
from flask_restful import Resource
from werkzeug.exceptions import Unauthorized
import re

# Local imports
from config import app, db, api

# Add your model imports
from models import *

class Signup(Resource):
    def post(self):
        data = request.get_json()

        username = data.get("username")
        email = data.get("email")
        password = data.get("password")
        password_confirmation = data.get("password_confirmation")

        # Check if all required data are present
        if not (username and email and password and password_confirmation):
            return {"error": "All data are required"}, 400

        # Check if password and confirmation match
        if password != password_confirmation:
            return {"error": "Password and confirmation do not match"}, 400

        new_user = User(username=username, email=email)

        new_user.password_hash = password

        db.session.add(new_user)
        db.session.commit()

        session["user_id"] = new_user.id

        return new_user.to_dict()

class Login(Resource):
    def post(self):
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")

        # Check if username and password are present
        if not (username and password):
            return {"error": "Username and password are required"}, 400

        user = User.query.filter(User.username == username).first()

        # Check if user exists
        if user:
            # Check if the password is correct
            if user.authenticate(password):
                session["user_id"] = user.id
                print(f"Debug: User ID set in session: {session['user_id']}")
                return user.to_dict(rules=("_password_hash",))
            else:
                return {"error": "Invalid username or password"}, 401
        else:
            return {"error": "User not found"}, 401

class CheckSession(Resource):
    def get(self):
        user_id = session.get("user_id")
        print(f"Debug: User ID from session: {user_id}")

        if not user_id:
            print("Debug: No user in session")
            return {"message": "No user in session"}, 401

        user = User.query.get(user_id)

        if user:
            print(f"Debug: User found in the database - {user}")
            return user.to_dict(rules=("_password_hash",))
        else:
            print("Debug: User not found in the database")
            return {"message": "User not found in the database"}, 401

class Logout(Resource):
    def delete(self):
        session["user_id"] = None
        return {"message": "200: No Content"}, 200
    
class MusicResource(Resource):
    def get(self, music_id=None):
        if music_id:
            # If music_id is provided, retrieve a specific music entry
            music = Music.query.get(music_id)
            if music:
                return make_response(music.to_dict(), 200)
            else:
                return make_response({"error": "Music not found"}, 404)
        else:
            # If no music_id is provided, retrieve all music entries
            musics = Music.query.all()
            return make_response([music.to_dict() for music in musics], 200)

    def post(self):
        data = request.get_json()

        title = data.get("title")
        artist = data.get("artist")
        genres = data.get("genres", [])
        image = data.get('image')

        if not (title and artist):
            return make_response({"error": "Title and artist are required"}, 400)

        new_music = Music(title=title, artist=artist, image=image)

        # Add genres to the new music
        for genre_name in genres:
            genre = Genre.query.filter_by(name=genre_name).first()
            if genre:
                new_music.genres.append(genre)

        db.session.add(new_music)
        db.session.commit()

        return make_response(jsonify(new_music.to_dict()), 201)

    def put(self, music_id):
        music = Music.query.get(music_id)
        if not music:
            return make_response({"error": "Music not found"}, 404)

        data = request.get_json()

        # Update music fields
        music.title = data.get("title", music.title)
        music.artist = data.get("artist", music.artist)
        music.image = data.get('image', music.image)

        # Update genre and playlist
        music.genre = Genre.query.get(data.get("genre_id"))
        music.playlist = Playlist.query.get(data.get("playlist_id"))

        db.session.commit()

        return make_response(jsonify(music.to_dict()), 200)   

class GenreResource(Resource):
    def get(self, genre_id=None):
        if genre_id is not None:
            genre = Genre.query.get(genre_id)
            if genre:
                return make_response(genre.to_dict(), 200)
            else:
                return make_response({"error": "Genre not found"}, 404)
        else:
            genres = Genre.query.all()
            return make_response([genre.to_dict() for genre in genres], 200)

    def post(self):
        data = request.get_json()

        name = data.get("name")
        image = data.get('image')  

        if not name:
            return make_response({"error": "Name is required"}, 400)

        new_genre = Genre(name=name, image=image)

        db.session.add(new_genre)
        db.session.commit()

        return make_response(new_genre.to_dict(), 201)

    def put(self, genre_id):
        genre = Genre.query.get(genre_id)
        if not genre:
            return make_response({"error": "Genre not found"}, 404)

        data = request.get_json()

        # Update genre fields
        genre.name = data.get("name", genre.name)
        genre.image = data.get('image', genre.image) 

        db.session.commit()

        # Update associated music entries
        for music in genre.musics:
            music.title = data.get("music_title", music.title)  
            music.artist = data.get("music_artist", music.artist)  
            music.image = data.get("music_image", music.image) 

        db.session.commit()

        return make_response(genre.to_dict(), 200)
    def delete(self, genre_id):
        genre = Genre.query.get(genre_id)
        if not genre:
            return make_response({"error": "Genre not found"}, 404)

        db.session.delete(genre)
        db.session.commit()

        return make_response({"message": "Genre deleted successfully"}, 204)

class PlaylistResource(Resource):
    def get(self, playlist_id=None):
        if playlist_id is not None:
            playlist = Playlist.query.get(playlist_id)
            if playlist:
                return make_response(playlist.to_dict(), 200)
            else:
                return make_response({"error": "Playlist not found"}, 404)
        else:
            playlists = Playlist.query.all()
            return make_response([playlist.to_dict() for playlist in playlists], 200)

    def post(self):
        data = request.get_json()

        name = data.get("name")
        musics = data.get("musics", [])
        image = data.get('image')  

        if not name:
            return make_response({"error": "Name is required"}, 400)

        new_playlist = Playlist(name=name, image=image)

        # Add musics to the new playlist
        for music_id in musics:
            music = Music.query.get(music_id)
            if music:
                new_playlist.musics.append(music)

        db.session.add(new_playlist)
        db.session.commit()

        return make_response(new_playlist.to_dict(), 201)

    def put(self, playlist_id):
        playlist = Playlist.query.get(playlist_id)
        if not playlist:
            return make_response({"error": "Playlist not found"}, 404)

        data = request.get_json()

        # Update playlist fields
        playlist.name = data.get("name", playlist.name)
        playlist.image = data.get('image', playlist.image)  

        db.session.commit()

        # Update associated music entries
        for music in playlist.musics:
            music.title = data.get("music_title", music.title)  
            music.artist = data.get("music_artist", music.artist)  
            music.image = data.get("music_image", music.image)  

        db.session.commit()
        
        return make_response(playlist.to_dict(), 200)

    def delete(self, playlist_id):
        playlist = Playlist.query.get(playlist_id)
        if not playlist:
            return make_response({"error": "Playlist not found"}, 404)

        db.session.delete(playlist)
        db.session.commit()

        return make_response({"message": "Playlist deleted successfully"}, 204)

class FavoriteResource(Resource):
    def get(self, user_id=None):
        if user_id is None:
            user_id = session.get("user_id")

        if not user_id:
            return make_response({"error": "User ID is required"}, 400)

        user = User.query.get(user_id)
        if not user:
            return make_response({"error": "User not found"}, 404)

        favorites = Favorite.query.filter_by(user_id=user_id).all()
        return make_response([favorite.music.to_dict() for favorite in favorites], 200)
    
    def post(self, user_id):
        data = request.get_json()

        music_id = data.get("music_id")
        if not music_id:
            return make_response({"error": "Music ID is required"}, 400)

        user = User.query.get(user_id)
        music = Music.query.get(music_id)

        if not (user and music):
            return make_response({"error": "User or music not found"}, 404)

        # Check if the music is already a favorite
        existing_favorite = Favorite.query.filter_by(user_id=user_id, music_id=music_id).first()

        if not existing_favorite:
            # Add the music to the user's favorites
            new_favorite = Favorite(user_id=user_id, music_id=music_id)
            db.session.add(new_favorite)
            db.session.commit()

        return make_response({"message": "Favorite added successfully"}, 201)
                    
# Add routes to the API
api.add_resource(Signup, "/signup")
api.add_resource(Login, "/login")
api.add_resource(CheckSession, "/check_session")
api.add_resource(Logout, "/logout")
api.add_resource(MusicResource, '/music', "/music/<int:music_id>")
api.add_resource(GenreResource, "/genre", "/genre/<int:genre_id>")
api.add_resource(PlaylistResource, "/playlist", "/playlist/<int:playlist_id>")
api.add_resource(FavoriteResource, "/favorite", "/favorite/<int:user_id>")

if __name__ == '__main__':
    app.run(port=5555, debug=True)