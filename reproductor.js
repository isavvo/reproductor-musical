const searchInput = document.getElementById("search");
const searchButton = document.getElementById("buscar");
const songList = document.getElementById("flex-container");


// Array to store all song data
const songs = [];

// Function to create a song object
function createSong(name, artist, genre, duration, year, cover, favorite = false) {
  return {
    name,
    artist,
    genre,
    duration,
    year,
    cover,
    favorite,
  };
}

songs.push(createSong("Bohemian Rhapsody", "Queen", "Rock", "5:55", 1975, "bohemian-rhapsody.jpg"));
songs.push(
  createSong("Imagine", "John Lennon", "Pop", "3:37", 1971, "imagine.jpg", true)
);
songs.push(createSong("Hallelujah", "Leonard Cohen", "Folk", "4:09", 1984, "hallelujah.jpg"));

// Array for the playlist (initially empty)
const playlist = [];

// Array for favorites (initially includes the favorite song from songs)
const favorites = songs.filter((song) => song.favorite);

// Add a song to the playlist
function addToPlaylist(song) {
  playlist.push(song);

}
// Remove a song from the playlist
function removeFromPlaylist(song) {
    const index = playlist.indexOf(song);
    if (index !== -1) {
      playlist.splice(index, 1);
    }
  }
  
  // Toggle the favorite flag of a song
  function toggleFavorite(song) {
    song.favorite = !song.favorite;
    // You can update the favorites list based on this change here
    if (song.favorite) {
      favorites.push(song);
    } else {
      const index = favorites.indexOf(song);
      if (index !== -1) {
        favorites.splice(index, 1);
      }
    }
  }
  
  // Example usage:
  addToPlaylist(songs[0]); // Add Bohemian Rhapsody to the playlist
  toggleFavorite(songs[1]); // Remove Imagine from favorites (as it's already there)
  
  console.log("Songs:", songs);
  console.log("Playlist:", playlist);
  console.log("Favorites:", favorites);

  function filterSongs(searchTerm) {
    // Assume you have an array of song objects with properties like name, artist, genre
    const songs = ongs.push(createSong("Bohemian Rhapsody", "Queen", "Rock", "5:55", 1975, "bohemian-rhapsody.jpg"));
    songs.push(
      createSong("Imagine", "John Lennon", "Pop", "3:37", 1971, "imagine.jpg", true)
    );
    songs.push(createSong("Hallelujah", "Leonard Cohen", "Folk", "4:09", 1984, "hallelujah.jpg"));;
  
    // Convert search term to lowercase for case-insensitive search
    const lowercaseTerm = searchTerm.toLowerCase();
  
    // Filter songs based on search term matching name, artist, or genre
    const filteredSongs = songs.filter(song => {
      const lowercaseName = song.name.toLowerCase();
      const lowercaseArtist = song.artist.toLowerCase();
      const lowercaseGenre = song.genre.toLowerCase();
  
      return (
        lowercaseName.includes(lowercaseTerm) ||
        lowercaseArtist.includes(lowercaseTerm) ||
        lowercaseGenre.includes(lowercaseTerm)
      );
    });
  
    return filteredSongs;
  }  
  const songListPlayButtons = document.querySelectorAll('.song-list .play-button');
const songModalPlayButton = document.querySelector('.song-modal .play-button');
const songListMuteButtons = document.querySelectorAll('.song-list .mute-button');
const songModalMuteButton = document.querySelector('.song-modal .mute-button');

// Add event listeners
songListPlayButtons.forEach(button => button.addEventListener('click', handlePlayPause));
songModalPlayButton.addEventListener('click', handlePlayPause);
songListMuteButtons.forEach(button => button.addEventListener('click', toggleMute));
songModalMuteButton.addEventListener('click', toggleMute);

function searchSongs() {
    const searchTerm = document.getElementById("search").value;
    const filteredSongs = filterSongs(searchTerm);

    // Clear existing song lists
    document.getElementById("flex-container").innerHTML = "";
    document.getElementById("favorites-container").innerHTML = "";
    document.getElementById("playlist-container").innerHTML = "";

    // Display filtered songs in the respective containers
    displaySongs(filteredSongs, "flex-container");
    displaySongs(favorites, "favorites-container");
    displaySongs(playlist, "playlist-container");
}

function displaySongs(songs, containerId) {
    const container = document.getElementById(containerId);

    songs.forEach(song => {
        const songBox = document.createElement("div");
        songBox.className = "song-box";

        const songInfo = document.createElement("div");
        songInfo.className = "song-info";
        songInfo.innerText = `${song.name} - ${song.artist}`;

        const playBtn = document.createElement("button");
        playBtn.className = "play-btn btn-song";
        playBtn.innerHTML = "&#9654;";
        playBtn.addEventListener("click", () => playSong(song));

        const likeBtn = document.createElement("button");
        likeBtn.className = "like-btn btn-song";
        likeBtn.innerHTML = "&#9829;";
        likeBtn.addEventListener("click", () => toggleFavorite(song));

        const addBtn = document.createElement("button");
        addBtn.className = "add-btn btn-song";
        addBtn.innerHTML = "+";
        addBtn.addEventListener("click", () => addToPlaylist(song));

        songBox.appendChild(songInfo);
        songBox.appendChild(playBtn);
        songBox.appendChild(likeBtn);
        songBox.appendChild(addBtn);

        container.appendChild(songBox);
    });
}

/ Event listener function for play/pause
function handlePlayPause(event) {
  const button = event.target;
  const isPlaying = button.classList.contains('playing');

  if (isPlaying) {
    audioElement.pause();
  } else {
    playSong();
  }
  button.classList.toggle('playing');
}

// Event listener function for mute
function toggleMute(event) {
  const button = event.target;
  audioElement.muted = !audioElement.muted;
  button.classList.toggle('muted');
}

// Create audio element
const audioElement = new Audio();

// Function to play the current song
function playSong() {
  // Get current song data (based on your implementation)
  const currentSong = getCurrentSong();

  // Set audio source
  audioElement.src = currentSong.audioSrc;

  // Play the audio
  audioElement.play();
}

function playSong(song) {
    // Update the current song details in the modal
    document.getElementById("current-song-cover").src = song.cover;
    document.getElementById("current-song-name").innerText = `Now Playing: ${song.name}`;
    document.getElementById("current-song-duration").innerText = `Duration: ${song.duration}`;
    document.getElementById("current-song-album").innerText = `Album: ${song.album}`;
    document.getElementById("current-song-year").innerText = `Year: ${song.year}`;
    document.getElementById("current-song-genre").innerText = `Genre: ${song.genre}`;

    // Your existing playSong function remains unchanged
    // ...

    // Add your playSong logic here based on the updated modal details
}


