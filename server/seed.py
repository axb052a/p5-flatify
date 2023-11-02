#!/usr/bin/env python3
import bcrypt
from models import User
# Standard library imports
from random import choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import *

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
    
        db.drop_all()
        db.create_all()
        
     # Seed for Users
        
        user_list = [
            {"username": "Jane", "email": "janedoe@example.com", "password": "password1"},
            {"username": "Joe", "email": "joecena@example.com", "password": "password2"},
            {"username": "Alice", "email": "alice@example.com", "password": "password3"},
            {"username": "Bob", "email": "bobsmith@example.com", "password": "password4"},
            {"username": "Charlie", "email": "charliebrown@example.com", "password": "password5"},
            {"username": "David", "email": "davidmiller@example.com", "password": "password6"},
            {"username": "Eva", "email": "evaanderson@example.com", "password": "password7"},
        ]

        for user_data in user_list:
            user = User(username=user_data["username"], email=user_data["email"])

            # Hash the password using bcrypt
            password = user_data["password"].encode("utf-8")
            password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

            user._password_hash = password_hash
            db.session.add(user)

        # Commit the changes
        db.session.commit()
        print("Users seeded successfully.")
    
        # Seed for Musics

        music_list = [
            {"title": "About You", "artist": "The 1975"},
            {"title": "Days", "artist": "The Drums"},
            {"title": "Anti-Hero", "artist": "Taylor Swift"},
            {"title": "Dreaming", "artist": "Smallpools"},
            {"title": "Electric Feel", "artist": "MGMT"},
            {"title": "Heartbeat", "artist": "Childish Gambino"},
            {"title": "Under the Bridge", "artist": "Red Hot Chili Peppers"},
            {"title": "Midnight City", "artist": "M83"},
            {"title": "Dog Days Are Over", "artist": "Florence + The Machine"},
            {"title": "Sweater Weather", "artist": "The Neighbourhood"},
            {"title": "Take a Walk", "artist": "Passion Pit"},
            {"title": "Shut Up and Dance", "artist": "WALK THE MOON"},
            {"title": "Ho Hey", "artist": "The Lumineers"},
            {"title": "Walking on a Dream", "artist": "Empire of the Sun"},
            {"title": "I Will Wait", "artist": "Mumford & Sons"},
            {"title": "Ocean Eyes", "artist": "Billie Eilish"},
            {"title": "Some Nights", "artist": "fun."},
            {"title": "Stressed Out", "artist": "Twenty One Pilots"},
        ]

        musics = [Music(
            title=music["title"], 
            artist=music["artist"]) 
                  for music in music_list]
        db.session.add_all(musics)
        db.session.commit()
        print("Musics seeded successfully.")

        # Seed for Genres

        genre_list = [
            {"name": "R&B"},
            {"name": "Indie Rock"},
            {"name": "Mainstream Pop"},
            {"name": "Electronic"},
            {"name": "Hip Hop"},
            {"name": "Alternative"},
            {"name": "Country"},
            {"name": "Jazz"},
        ]

        genres = [Genre(
            name=genre["name"]) 
                  for genre in genre_list]
        db.session.add_all(genres)
        db.session.commit()
        print("Genres seeded successfully.")

        # Seed for Playlists

        playlist_list = [
            {"name": "Nostalgia", "musics": [1, 2, 3]}, 
            {"name": "In My Feels", "musics": [4, 5, 6]},
            {"name": "Road Trip", "musics": [7, 8, 9]},
            {"name": "Chill Vibes", "musics": [10, 11, 12]},
            {"name": "Workout Beats", "musics": [13, 14, 15]},
            {"name": "Study Session", "musics": [16, 17, 18]},  
        ]

        playlists = []
        for playlist_data in playlist_list:
            playlist = Playlist(
                name=playlist_data["name"])
            
            # Add musics to the playlist
            music_ids = playlist_data.get("musics", [])
            playlist_musics = Music.query.filter(Music.id.in_(music_ids)).all()
            
            playlist.musics = playlist_musics
            
            db.session.add(playlist)  # Add the playlist to the session

        # Commit the changes
        db.session.commit()
        print("Playlists seeded successfully.")




