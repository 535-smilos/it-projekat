import React from 'react'
import "./Player.css"
function Player() {
    return (
        <>
            <div class="player">
                <div class="player-track-meta">
                    <p>Track name</p>
                    <p><span>Track Author</span></p>
                </div>
                <div class="player-controls">
                    <button class="player-play-btn"
                        role="button"
                        aria-label="Play"
                        data-playing="false"
                    >
                        <div class="player-icon-play">
                            <svg xmlns="https://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><title>play</title><polygon class="icon-play" points="19.05 12 6 3.36 6 20.64 19.05 12" /><rect class="icon-container" width="24" height="24" /></svg>
                        </div>

                        <div class="player-icon-pause hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><title>pause</title><g><rect class="icon-pause" x="6" y="3.26" width="4" height="17.48" /><rect class="icon-pause" x="14" y="3.26" width="4" height="17.48" /></g><rect class="icon-container" width="24" height="24" /></svg>
                        </div>
                    </button>
                    <div class="player-timeline">
                        <span class="player-time player-time-current">00:00</span>
                        <div class="player-progress">
                            <div class="player-progress-filled"></div>
                        </div>
                        <span class="player-time player-time-duration">00:00</span>
                    </div>
                    <div class="player-volume-container">
                        <input type="range" id="volume" min="0" max="1" value="1" step="0.01" class="player-volume" />
                    </div>
                </div>

                <audio src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/858/outfoxing.mp3" crossorigin="anonymous" ></audio>
            </div>
        </>
    )
}

export default Player