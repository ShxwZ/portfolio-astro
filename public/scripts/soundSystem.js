/**
 * Sound Utility
 * Handles all sound effects in the application
 */

class SoundSystem {
    constructor() {
        this.volume = 0.5;
        this.audioCache = {};
        this.init();
    }

    init() {
        // Preload common sounds
        this.preloadSounds([
            "/sounds/click.mp3",
            "/sounds/switch.mp3",
            "/sounds/pop.mp3",
            "/sounds/tada.mp3"
        ]);
        
        // Make playSound globally available for onclick handlers
        window.playSound = this.playSound.bind(this);
    }

    preloadSounds(soundPaths) {
        soundPaths.forEach(path => {
            try {
                const audio = new Audio(path);
                audio.preload = 'auto';
                audio.volume = this.volume;
                this.audioCache[path] = audio;
            } catch (error) {
                console.debug('Sound preload failed:', path, error);
            }
        });
    }

    playSound(src = "/sounds/click.mp3") {
        try {
            let audio;
            
            // Use cached audio if available, otherwise create new
            if (this.audioCache[src]) {
                audio = this.audioCache[src].cloneNode();
            } else {
                audio = new Audio(src);
                audio.volume = this.volume;
            }
            
            // Play immediately
            audio.currentTime = 0; // Reset to start
            audio.play().catch(error => {
                console.debug('Audio play failed:', error);
            });
        } catch (error) {
            console.debug('Audio creation failed:', error);
        }
    }

    // Specific sound effects
    playClickSound() {
        this.playSound("/sounds/click.mp3");
    }

    playPopSound() {
        this.playSound("/sounds/pop.mp3");
    }

    playSwitchSound() {
        this.playSound("/sounds/switch.mp3");
    }

    playTadaSound() {
        this.playSound("/sounds/tada.mp3");
    }

    // Volume control
    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
    }

    getVolume() {
        return this.volume;
    }
}

// Initialize the sound system
const soundSystem = new SoundSystem();

// Make it globally available
window.SoundSystem = soundSystem;
