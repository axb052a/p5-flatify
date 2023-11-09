# Flatify: A Music Full-Stack Application

Flatify is a Full-Stack Music Application designed to provide users with a platform to explore and discover. The application offers a range of features, including user authentication, music browsing, playlist creation, genre categorization, and more.

## Table of Contents

- [Features](#features)
- [Frontend Components](#frontend-components)
  - [1. User Authentication](#1-user-authentication)
  - [2. Music Browser](#2-music-browser)
  - [3. Playlists](#3-playlists)
  - [4. Genres](#4-genres)
- [Backend Relationships](#backend-relationships)
  - [1. User](#1-user)
  - [2. Music](#2-music)
  - [3. Genre](#3-genre)
  - [4. Playlist](#4-playlist)

## Features

- **User Authentication:** Users can sign up, log in, and log out. Passwords are securely hashed and authenticated using bcrypt.

- **Music Browsing:** Explore a diverse collection of music with details such as title, artist, and genre.

- **Playlist Management:** Create, edit, and delete playlists. Add or remove music from playlists.

- **Genre Categorization:** Music is categorized into genres, allowing users to discover music based on their preferences.

## Frontend Components

### 1. User Authentication

- **Signup:** Users can create accounts by providing a username, email, and password.

- **Login:** Existing users can log in by providing their username and password.

- **Logout:** Users can log out, ending their current session.

### 2. Music Browser

- **View All Music:** Users can view a list of all available music with details.

- **View Single Music:** Users can click on a specific music item to view detailed information.

- **Add Music:** Users can add new music entries to the database.

- **Edit Music:** Users can edit existing music entries, updating details such as title, artist, and image.

### 3. Playlists

- **View All Playlists:** Users can see a list of all playlists.

- **View Single Playlist:** Users can click on a specific playlist to view its details and the associated music.

- **Create Playlist:** Users can create a new playlist, adding a name and optional image.

- **Edit Playlist:** Users can edit existing playlists, updating details such as name and image.

- **Delete Playlist:** Users can delete a playlist, removing it from the system.

### 4. Genres

- **View All Genres:** Users can see a list of all genres.

- **View Single Genre:** Users can click on a specific genre to view its details and the associated music.

- **Create Genre:** Users can create a new genre, adding a name and optional image.

- **Edit Genre:** Users can edit existing genres, updating details such as name and image.

- **Delete Genre:** Users can delete a genre, removing it from the system.

## Backend Relationships

### 1. User

- Each user has a unique ID, username, email, and password hash.

- User authentication is handled securely with bcrypt.

### 2. Music

- Each music entry has a unique ID, title, artist, image, and optional genre and playlist associations.

- Music belongs to a genre and a playlist, forming a many-to-one relationship.

- Music can be associated with multiple genres and playlists.

### 3. Genre

- Each genre has a unique ID, name, and optional image.

- Genres have a one-to-many relationship with music, allowing them to categorize multiple songs.

### 4. Playlist

- Each playlist has a unique ID, name, image, and a many-to-many relationship with music.

- Playlists can include multiple music entries, and music can belong to multiple playlists.

For specific endpoints, API documentation, or deployment instructions, please refer to the respective frontend and backend documentation files.
