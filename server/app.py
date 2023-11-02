#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, session, jsonify
from flask_restful import Resource
from werkzeug.exceptions import Unauthorized
import re

# Local imports
from config import app, db, api

# Add your model imports
from models import *

class ClearSession(Resource):
    def delete(self):
        session['page_views'] = None
        session['user_id'] = None
        return {}, 204

class Signup(Resource):
    def post(self):
        # Get data from the request JSON
        data = request.get_json()

        # Extract data from the request JSON
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

        # Create a new User instance
        new_user = User(username=username, email=email)

        # Set the password hash for the user
        new_user.password_hash = password

        # Add the new user to the database
        db.session.add(new_user)
        db.session.commit()

        # Set the user_id in the session
        session["user_id"] = new_user.id

        # Return the new user's data
        return new_user.to_dict()

class Login(Resource):
    def post(self):
        username = request.get_json()["username"]
        user = User.query.filter(User.username == username).first()

        password = request.get_json()["password"]
        if user.authenticate(password):
            session["user_id"] = user.id
            print(f"Debug: User ID set in session: {session['user_id']}")
            return user.to_dict(rules=("_password_hash",))

        return {"error": "Invalid username or password"}, 401

class CheckSession(Resource):
    def get(self):
        user = User.query.filter(User.id == session.get("user_id")).first()
        if user:
            return user.to_dict(rules=("_password_hash",))
        else:
            return {"message": "401: Not Authorized"}, 401

class Logout(Resource):
    def delete(self):
        session["user_id"] = None
        return {"message": "204: No Content"}, 204

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

        if not (title and artist):
            return make_response({"error": "Title and artist are required"}, 400)

        new_music = Music(title=title, artist=artist)

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

        # Update genres
        new_genres = data.get("genres", [])
        music.genres.clear()
        for genre_name in new_genres:
            genre = Genre.query.filter_by(name=genre_name).first()
            if genre:
                music.genres.append(genre)

        db.session.commit()

        return make_response(jsonify(music.to_dict()), 200)

    def delete(self, music_id):
        music = Music.query.get(music_id)
        if not music:
            return make_response({"error": "Music not found"}, 404)

        db.session.delete(music)
        db.session.commit()

        return make_response({"message": "Music deleted successfully"}, 204)

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

        if not name:
            return make_response({"error": "Name is required"}, 400)

        new_genre = Genre(name=name)

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

        if not name:
            return make_response({"error": "Name is required"}, 400)

        new_playlist = Playlist(name=name)

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

        # Update musics
        new_musics = data.get("musics", [])
        playlist.musics.clear()
        for music_id in new_musics:
            music = Music.query.get(music_id)
            if music:
                playlist.musics.append(music)

        db.session.commit()

        return make_response(playlist.to_dict(), 200)

    def delete(self, playlist_id):
        playlist = Playlist.query.get(playlist_id)
        if not playlist:
            return make_response({"error": "Playlist not found"}, 404)

        db.session.delete(playlist)
        db.session.commit()

        return make_response({"message": "Playlist deleted successfully"}, 204)

# Add routes to the API
api.add_resource(Signup, "/signup")
api.add_resource(Login, "/login")
api.add_resource(CheckSession, "/check_session")
api.add_resource(Logout, "/logout")
api.add_resource(MusicResource, "/music", "/music/<int:music_id>")
api.add_resource(GenreResource, "/genre", "/genre/<int:genre_id>")
api.add_resource(PlaylistResource, "/playlist", "/playlist/<int:playlist_id>")

if __name__ == '__main__':
    app.run(port=5555, debug=True)
