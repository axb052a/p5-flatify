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

            
            password = user_data["password"].encode("utf-8")
            password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

            user._password_hash = password_hash
            db.session.add(user)

       
        db.session.commit()
        print("Users seeded successfully.")
    
        # Seed for Musics

        music_list = [
            {"title": "About You", "artist": "The 1975", "image": "https://i.scdn.co/image/ab67616d0000b2731f44db452a68e229650a302c"},
            {"title": "Days", "artist": "The Drums", "image": "https://i.scdn.co/image/ab67616d0000b2734c27d14a19e67dac23661031"},
            {"title": "Anti-Hero", "artist": "Taylor Swift", "image": "https://i.scdn.co/image/ab67616d0000b273bb54dde68cd23e2a268ae0f5"},
            {"title": "Dreaming", "artist": "Smallpools", "image": "https://i.scdn.co/image/ab67616d0000b27324c80190d731ccaa74415049"},
            {"title": "Electric Feel", "artist": "MGMT", "image": "https://i.scdn.co/image/ab67616d0000b27360c4c3d695931aeb83bce500"},
            {"title": "Heartbeat", "artist": "Childish Gambino", "image": "https://i.scdn.co/image/ab67616d0000b273ddd59d8bd5982e6d250d9a22"},
            {"title": "Under the Bridge", "artist": "Red Hot Chili Peppers", "image": "https://i.scdn.co/image/ab67616d0000b273153d79816d853f2694b2cc70"},
            {"title": "Midnight City", "artist": "M83", "image": "https://i.scdn.co/image/ab67616d0000b273fff2cb485c36a6d8f639bdba"},
            {"title": "Dog Days Are Over", "artist": "Florence + The Machine", "image": "https://i.scdn.co/image/ab67616d0000b2730672b0f8756ae2af86e8a5ce"},
            {"title": "Sweater Weather", "artist": "The Neighbourhood", "image": "https://i.scdn.co/image/ab67616d0000b2738265a736a1eb838ad5a0b921"},
            {"title": "Take a Walk", "artist": "Passion Pit", "image": "https://i.scdn.co/image/ab67616d0000b273f860547bc8ba0c59df4fe2c3"},
            {"title": "Shut Up and Dance", "artist": "WALK THE MOON", "image": "https://i.scdn.co/image/ab67616d0000b27343294cfa2688055c9d821bf3"},
            {"title": "Ho Hey", "artist": "The Lumineers", "image": "https://i.scdn.co/image/ab67616d0000b273b23ded2daf5be916f9759077"},
            {"title": "Walking on a Dream", "artist": "Empire of the Sun", "image": "https://i.scdn.co/image/ab67616d0000b273cba2ced72e7bca015df64dcc"},
            {"title": "I Will Wait", "artist": "Mumford & Sons", "image": "https://i.scdn.co/image/ab67616d0000b27383f859512262378f2aa50a22"},
            {"title": "Ocean Eyes", "artist": "Billie Eilish", "image": "https://i.scdn.co/image/ab67616d0000b273a9f6c04ba168640b48aa5795"},
            {"title": "Some Nights", "artist": "fun.", "image": "https://i.scdn.co/image/ab67616d0000b273e89e0d90d786d37fb6d5d84f"},
            {"title": "Stressed Out", "artist": "Twenty One Pilots", "image": "https://i.scdn.co/image/ab67616d0000b273de03bfc2991fd5bcfde65ba3"},
            {"title": "To Me", "artist": "Alina Baraz", "image": "https://i.scdn.co/image/ab67616d0000b273853d572fe2eb13f70bad74dd"},
            {"title": "Still Dreaming", "artist": "Raveena", "image": "https://i.scdn.co/image/ab67616d0000b273825d2628545eaea03bf9672f"},
            {"title": "Jupiter", "artist": "The Marias", "image": "https://i.scdn.co/image/ab67616d0000b273e3e6a00e091d1a83ef701d82"},
            {"title": "Should Have Known Better", "artist": "Sufjan Stevens", "image": "https://i.scdn.co/image/ab67616d0000b273bae3f4c197b1aa2fa828402a"},
            {"title": "MONACO", "artist": "Bad Bunny", "image": "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/13/21/22/132122a1-2ef2-381b-94b6-7b9449dcaa4a/197190137897.jpg/1200x1200bf-60.jpg"},
            {"title": "Radio", "artist": "Lana Del Rey", "image": "https://i.scdn.co/image/ab67616d0000b273f894be72a77b1488292672c7"}, 
            {"title": "Baby Blue", "artist": "King Krule", "image": "https://f4.bcbits.com/img/a2247132523_65"},
            {'title': 'One Of Your Girls', 'artist': 'Troye Sivan', "image":'https://i.scdn.co/image/ab67616d0000b27367103283a4eb57578a428252'},
            {'title': 'Mystery', 'artist': 'Turnstile', "image":'https://i.scdn.co/image/ab67616d0000b273a4499cf37a6fe4ff043dc9f2'},
            {'title': 'Charcoal Baby', 'artist': 'Blood Orange', "image":'https://i.scdn.co/image/ab67616d0000b27347dd2ca47ec9bf14559e17c6'},
            {'title': 'Best to You', 'artist': 'Blood Orange', "image":'https://i.scdn.co/image/ab67616d0000b273706a733634175d413dedfe54'},
            {'title': 'Thinkin Bout You', 'artist': 'Frank Ocean', "image":'https://i.scdn.co/image/ab67616d0000b2737aede4855f6d0d738012e2e5'},
            {'title': 'Save Your Tears', 'artist': 'The Weeknd ft Ariana Grande', "image":'https://i.scdn.co/image/ab67706c0000da84f834855248f03733216361e6'},
            {'title': 'Melting', 'artist': 'Kali Uchis', "image":'https://i.scdn.co/image/ab67616d0000b273dbc47f8bae404ce15ffd055e'},
            {'title': 'Innerbloom', 'artist': 'Rüfüs Du Sol', 'image': 'https://i.scdn.co/image/ab67616d0000b273d7d354b5ee37f62c88e392d9'},
            {'title': 'Shelter', 'artist': 'Porter Robinson ft Madeon', "image":'https://i.scdn.co/image/ab67616d0000b2730b4df34612f851b639959f9a'},
            {'title': 'Jungle', 'artist': 'fred again', "image":'https://i.scdn.co/image/ab67616d0000b273e88a1b90870837f8f376457a'},
            {'title': 'Snooze', 'artist': 'SZA', "image":'https://bhsrounduponline.org/wp-content/uploads/2023/04/image.jpg'},
            {'title': 'Frozen', 'artist': 'Sabrina Claudio', "image":'https://i.scdn.co/image/ab67616d0000b27376165991d7aeecce3634f554'},
            {'title': 'Can I Kick It?', 'artist': 'A Tribe Called Quest', "image":'https://i.scdn.co/image/ab67616d0000b2734ba1fe238a517021ebcc2ace'},
            {'title': 'Super Bass', 'artist': 'Nicki Minaj', "image":'https://i.scdn.co/image/ab67616d0000b27370b8b4f85ef33b4d81bcaea6'},
            {'title': 'Golden Hour', 'artist': 'Kacey Musgraves', "image":'https://i.scdn.co/image/ab67616d0000b2732e35d25eb7288830d5540484'},
            {'title': 'I Remember Everything', 'artist': 'Zach Bryan ft Kacey Musgraves', "image":'https://i.scdn.co/image/ab67616d0000b273e5a25ed08d1e7e0fbb440cef'},
            {'title': 'Bruises Off The Peach', 'artist': 'Ryan Beatty', "image":'https://i.scdn.co/image/ab67616d0000b27389bcf0e9d8e14d33dea77acf'},
            {'title': 'Real Love Baby', 'artist': 'Father John Misty', "image":'https://i.scdn.co/image/ab67616d0000b273c6ad8b49ea263f4bd2ad57eb'},
            {'title': 'MOTOMAMI', 'artist': 'Rosalía', "image":'https://i.scdn.co/image/ab67616d0000b2730c179967a265de0fc76382fe'},
            {'title': 'LA CANCIÓN', 'artist': 'J Balvin ft Bad Bunny', "image":'https://i.scdn.co/image/ab67616d0000b2734891d9b25d8919448388f3bb'},
        ]
        
        musics = [Music(
            title=music["title"],
            artist=music["artist"],
            image=music["image"])
          for music in music_list]
        db.session.add_all(musics)
        db.session.commit()
        print("Musics seeded successfully.")

        # Seed for Genres

        genre_list = [
            {"name": "R&B", "musics": ["To Me", "Save Your Tears", "Thinkin Bout You", 'Snooze', 'Frozen'], "image": "https://i.pinimg.com/originals/b7/54/6b/b7546bca6cbf4fe7f474d213bb9c6a28.jpg"},
            {"name": "Indie", "musics": ['Days', 'Charcoal Baby', 'Melting', 'Best to You', 'Dreaming', "Radio", "Baby Blue", "Still Dreaming", 'Under the Bridge', 'Ho Hey', 'Walking on a Dream', "Jupiter", 'I Will Wait', 'Some Nights'], "image": "https://i.pinimg.com/564x/70/bf/ec/70bfec9fc7ccc14d2412b0f99dbbbd53.jpg"},
            {"name": "Pop", "musics": ['About You', 'One Of Your Girls', 'Anti-Hero', 'Take a Walk', 'Shut Up and Dance', 'Ocean Eyes'], "image": "https://i.pinimg.com/736x/5b/e7/3d/5be73dafdf15eb39a98eabb12eaf6c79.jpg"},
            {"name": "Electronic", "musics": ['Electric Feel', 'Midnight City', "Shelter", 'Jungle', 'Innerbloom'], "image": "https://edm.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTUzMTcwODc2NzA2MDcxNTU5/festival-image.jpg"},
            {"name": "Hip Hop", "musics": ["Heartbeat", "Can I Kick It?", "Super Bass"], "image": "https://img.freepik.com/premium-vector/hip-hop-tag-graffiti-style-label-lettering_204219-49.jpg?w=2000"},
            {"name": "Alternative", "musics": ['Dog Days Are Over', 'Mystery', 'Sweater Weather', 'Stressed Out'], "image": "https://media.istockphoto.com/id/1134954427/vector/music-design-drawn-electric-guitar-and-amplifier.jpg?s=612x612&w=0&k=20&c=1mbAlyyr_SrEAa4jmbksHAiAadDG7XYd8ExreAxTeOg="},
            {"name": "Country", "musics": ['I Will Wait', "Golden Hour", "I Remember Everything"], "image": "https://i.pinimg.com/736x/3a/52/42/3a524276efcbd286f289ec2f8034b355.jpg"},
            {"name": "Folk", "musics": ['Should Have Known Better', 'Bruises Off The Peach', 'Real Love Baby'], "image": "https://maxkomusic.com/wp-content/uploads/2017/05/Folk_Acoustic2.jpg"},
            {"name": "Reggaeton", "musics": ['MONACO', 'MOTOMAMI', 'LA CANCIÓN' ], "image": "https://cdn.dribbble.com/users/1290912/screenshots/20298308/media/eced1dfc1f9cc79827c5cad4a5a9c32e.png?resize=400x0"},
        ]
        
        for genre_data in genre_list:
            genre = Genre(
                name=genre_data["name"],
                image=genre_data["image"],
            )

            # Associate musics with genres
            for music_title in genre_data["musics"]:
                music = Music.query.filter_by(title=music_title).first()
                if music:
                    genre.musics.append(music)

            db.session.add(genre)
            db.session.commit()
            print("Genres seeded successfully.")        
            
        # Seed for Playlists

        playlist_list = [
            {"name": "Nostalgia", "musics": ['About You', 'Days', 'Anti-Hero', 'Golden Hour', 'Save Your Tears', 'Frozen', 'Should Have Known Better'], "image": "https://i.pinimg.com/originals/6b/77/6d/6b776d376dcf508ac7249c8309c02999.jpg"}, 
            {"name": "In My Feels", "musics": ['Dreaming', 'Electric Feel', 'I Remember Everything', 'One Of Your Girls', 'LA CANCIÓN', 'Thinkin Bout You', "To Me", 'Melting', 'Shelter', "Jupiter", 'Snooze', 'Baby Blue', 'Heartbeat'], "image": "https://pm1.aminoapps.com/6696/592909d0be489390a30e8e2544ca86d53dbc7753_hq.jpg"},
            {"name": "Road Trip", "musics": ['Under the Bridge', 'Midnight City', 'Super Bass', 'Real Love Baby', 'Radio', 'Charcoal Baby', 'Dog Days Are Over'], "image": "https://i.ytimg.com/vi/O4N4MMIfnW0/maxresdefault.jpg"},
            {"name": "Chill Vibes", "musics": ['Sweater Weather', 'Take a Walk', 'Best to You', 'Can I Kick It?', 'Shut Up and Dance'], "image": "https://i.pinimg.com/564x/f5/31/be/f531be33d92a1431d5b274e65eae3a52.jpg"},
            {"name": "Workout Beats", "musics": ['Ho Hey', 'Walking on a Dream', 'MOTOMAMI', 'Jungle', 'Mystery', "MONACO", 'I Will Wait'], "image": "https://i.pinimg.com/originals/e4/a7/20/e4a7206b019cc7b43b1522f39afded6a.png"},
            {"name": "Study Session", "musics": ['Ocean Eyes', 'Some Nights', 'Innerbloom', 'Bruises Off The Peach', 'Still Dreaming', 'Stressed Out'], "image": "https://i.pinimg.com/564x/c9/83/7a/c9837afb7fed53871e45422d4266492e.jpg"},  
        ]

        for playlist_data in playlist_list:
            playlist = Playlist(
                name=playlist_data["name"],
                image=playlist_data["image"],
            )

            # Associate musics with playlists
            for music_title in playlist_data["musics"]:
                music = Music.query.filter_by(title=music_title).first()
                if music:
                    playlist.musics.append(music)

            db.session.add(playlist)
            db.session.commit()
            print("Playlists seeded successfully.")
            


        # Seeded Favorite data
        favorite_list = [
            {"user": "Jane", "musics": ["About You", "Days", "Anti-Hero", "Dreaming", "Electric Feel", "Heartbeat", "Under the Bridge", "Midnight City"]},
            {"user": "Joe", "musics": ["Sweater Weather", "Take a Walk", "Shut Up and Dance", "Ho Hey", "Baby Blue"]},
            {"user": "Alice", "musics": ["About You", "Under the Bridge", "Midnight City", "Dog Days Are Over", "Radio"]},
            {"user": "Bob", "musics": ["Ocean Eyes", "Some Nights", "Stressed Out", "Should Have Known Better"]},
            {"user": "Charlie", "musics": ["Electric Feel", "Heartbeat", "Under the Bridge", "Midnight City", "Dog Days Are Over", "Sweater Weather"]},
            {"user": "David", "musics": ["About You", "Days", "Anti-Hero", "To Me", "Jupiter", "MONACO"]},
            {"user": "Eva", "musics": ["About You", "Midnight City", 'Still Dreaming', "Dog Days Are Over", "Sweater Weather", "Take a Walk"]}
        ]

        for favorite_data in favorite_list:
            # Find the user by username
            user = User.query.filter_by(username=favorite_data["user"]).first()
            if user:
                # Find the musics by title
                musics = Music.query.filter(Music.title.in_(favorite_data["musics"])).all()

                # Create Favorite instances and associate them with the user and musics
                for music in musics:
                    favorite = Favorite(user=user, music=music)
                    db.session.add(favorite)

        # Commit the changes after the loops
        db.session.commit()
        print("Favorites seeded successfully.")
