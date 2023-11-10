from sqlalchemy_serializer import SerializerMixin
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, bcrypt

# Define User model
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    _password_hash = db.Column(db.String)
    email = db.Column(db.String(120), unique=True, nullable=False)
    
    # Relationship
    favorites = db.relationship('Favorite', back_populates='user')
    
    # Serialization
    serialize_rules = ('-password_hash', '-user')
    
    @hybrid_property
    def password_hash(self):
        raise ValueError('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    @validates('username', 'email')
    def validate_signup(self, key, value):
        if not (len(value) >= 3): 
            raise ValueError("User or Email must provide at least three characters to sign up.")

        # Check if the username or email already exists
        existing_user = User.query.filter(db.or_(User.username == value, User.email == value)).first()
        if existing_user:
            raise ValueError(" User already exists.")

        return value    
    
    def __repr__(self):
        return f"User {self.username}, ID {self.id}"

# Define Music model
class Music(db.Model, SerializerMixin):
    __tablename__ = 'musics'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    artist = db.Column(db.String(100), nullable=False)
    image = db.Column(db.String(255))

   # Relationships
    genre_id = db.Column(db.Integer, db.ForeignKey('genres.id'))
    genre = db.relationship('Genre', back_populates='musics')

    playlist_id = db.Column(db.Integer, db.ForeignKey('playlists.id'))
    playlist = db.relationship('Playlist', back_populates='musics')
    
    favorites = db.relationship('Favorite', back_populates='music')
  
    # Serialization
    serialize_rules = ('-genres', '-playlists', '-favorites')
    
    # Validation 
    @validates('title', 'artist')
    def validate_music_fields(self, key, value):
        if not (len(value) >= 3):
            raise ValueError("Title or Artist must provide at least five characters")
        return value

    def __repr__(self):
        return f"Music {self.title}, ID {self.id}"

# Define Genre model
class Genre(db.Model, SerializerMixin):
    __tablename__ = 'genres'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    image = db.Column(db.String(255))
    
    # Relationship
    musics = db.relationship('Music', back_populates='genre')
    
    # serialization
    serialize_rules = ('-musics',)
    
    @validates('name')
    def validate_genre_name(self, key, name):
        if not len(name) >= 3:
            raise ValueError("Name must provide at least five characters")
        return name

    def __repr__(self):
        return f"Genre {self.name}, ID {self.id}"

# Define Playlist model
class Playlist(db.Model, SerializerMixin):
    __tablename__ = 'playlists'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    image = db.Column(db.String(255))
    
    # Relationship
    musics = db.relationship('Music', back_populates='playlist')
    
     # Serialization
    serialize_rules = ('-musics',)
    
    @validates('name')
    def validate_playlist_name(self, key, value):
        if not (len(value) >= 3):
            raise ValueError("Name must provide at least five characters")
        return value

    def __repr__(self):
        return f"Playlist {self.name}, ID {self.id}"
    
# Define the Favorite Model
class Favorite(db.Model, SerializerMixin):
    __tablename__ = 'favorites'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    music_id = db.Column(db.Integer, db.ForeignKey('musics.id'), nullable=False)

    # Relationships
    user = db.relationship('User', back_populates='favorites')
    music = db.relationship('Music', back_populates='favorites')
    
     # Additional settings for serialization
    serialize_rules = ('-user', '-music')

    def __repr__(self):
        return f"Favorite ID {self.id}"

    