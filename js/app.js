const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');


// song title
const songs = ['hey','summer', 'ukulele'];

// song number
let songIndex = 2;

// loading song initially
loadSong(songs[songIndex])

// update song details
function loadSong(song){
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}

// play / pause
playBtn.addEventListener('click' , () => {
     const isPlaying = musicContainer.classList.contains('play');
     if (isPlaying)
     {
         pauseSong();
     }
     else{
         playSong();
     }
});

function pauseSong(){
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');

    // to pause the audio
    audio.pause();
}

function  playSong(){
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    // to play the audio
    audio.play();
}


// previous button
prevBtn.addEventListener('click' , () => {
    songIndex = songIndex - 1;

    if(songIndex < 0){
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex])

    playSong();
})

// next button 
nextBtn.addEventListener('click' , nextSong);

function nextSong(){
    songIndex = songIndex + 1;

    if(songIndex > songs.length - 1){
        songIndex = 0;
    }

    loadSong(songs[songIndex]);

    playSong();
}

// progress bar
audio.addEventListener('timeupdate', (e) => {
    // console.log(e.srcElement.currentTime); // current time of playing song
   //  console.log(e.srcElement.duration); // total time of playing song
   const time = e.srcElement.currentTime;
   const total_time = e.srcElement.duration;
   const progressPrecent = (time / total_time) * 100;

   progress.style.width = `${progressPrecent}%`; // changing the width of progress bar
});

//  to change the time of song using progress bar
progressContainer.addEventListener('click' , setProgress);

function setProgress(e){
    const width = this.clientWidth;
    const clickX = e.offsetX
    const duration = audio.duration;

   audio.currentTime = (clickX / width) * duration

}

//  play next song when song ends
audio.addEventListener('ended' , nextSong)