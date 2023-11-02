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

    @hybrid_property
    def password_hash(self):
        raise Exception('Password hashes may not be viewed.')

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
        if not len(value) > 0:
            raise ValueError(f"{key.capitalize()} must provide at least one character to sign up")
        return value

    def __repr__(self):
        return f"User {self.username}, ID {self.id}"

    # Additional settings for serialization
    serialize_rules = ('-password_hash',)


music_genre_association = db.Table(
    'music_genre_association',
    db.Column('music_id', db.Integer, db.ForeignKey('musics.id')),
    db.Column('genre_id', db.Integer, db.ForeignKey('genres.id')),
)

playlist_music_association = db.Table(
    'playlist_music_association',
    db.Column('playlist_id', db.Integer, db.ForeignKey('playlists.id')),
    db.Column('music_id', db.Integer, db.ForeignKey('musics.id')),
)


# Define Music model
class Music(db.Model, SerializerMixin):
    __tablename__ = 'musics'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    artist = db.Column(db.String(100), nullable=False)

    # Relationships
    genres = db.relationship('Genre', secondary='music_genre_association', back_populates='musics')
    playlists = db.relationship('Playlist', secondary='playlist_music_association', back_populates='musics')

    @validates('title', 'artist')
    def validate_music_fields(self, key, value):
        if not len(value) > 0:
            raise ValueError(f"{key.capitalize()} must provide at least one character")
        return value

    def __repr__(self):
        return f"Music {self.title}, ID {self.id}"

    # Additional settings for serialization
    serialize_rules = ('-genres', "-playlists")

# Define Genre model
class Genre(db.Model, SerializerMixin):
    __tablename__ = 'genres'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)

    # Relationships
    musics = db.relationship('Music', secondary='music_genre_association', back_populates='genres')

    @validates('name')
    def validate_genre_name(self, key, value):
        if not len(value) > 0:
            raise ValueError(f"{key.capitalize()} must provide at least one character")
        return value

    def __repr__(self):
        return f"Genre {self.name}, ID {self.id}"

    # Additional settings for serialization
    serialize_rules = ('-musics',)

    # Additional settings for serialization
    serialize_rules = ('-musics',)


# Define Playlist model
class Playlist(db.Model, SerializerMixin):
    __tablename__ = 'playlists'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

    # Relationships
    musics = db.relationship('Music', secondary='playlist_music_association', back_populates='playlists')

    @validates('name')
    def validate_playlist_name(self, key, value):
        if not len(value) > 0:
            raise ValueError(f"{key.capitalize()} must provide at least one character")
        return value

    def __repr__(self):
        return f"Playlist {self.name}, ID {self.id}"

    # Additional settings for serialization
    serialize_rules = ('-musics',)
