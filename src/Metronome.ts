import toastr from 'toastr';

export default
class Metronome {
	public bpm: number = 100;
	public timeBasis: number = 4;
	public timeCount: number = 4;
	public volume: number = .5;

	public playing: boolean = false;

	public start() {
		console.log("start");
		this.playing = true;
		this.createContext();
		this._start();
	}

	public stop() {
		console.log("stop");
		this.playing = false;
	}

	public togglePlayback() {
		if(this.playing)
			this.stop();
		else
			this.start();
	}

	private audioContext: AudioContext;
	private createContext() {
		if(this.audioContext) return;

		console.log("Create context");

		if(!window.AudioContext) {
			toastr.error("No window.AudioContext");
			throw new Error("No window.AudioContext");
		}
		this.audioContext = new AudioContext();
	}

	private _start() {
		setTimeout(() => {
			try {
				this.oneSound(this.audioContext.currentTime);
				if(this.playing)
					this._start();
			}
			catch(e) {
				toastr.error(e.message, "Failure during playback");
				console.error(e);
			}
		}, 60000 * this.timeBasis / (this.bpm * this.timeBasis));
	}

	private oneSound(time: number) {
		const duration = .03;
		const fade     = .02;
		const padding  = .1;

		const osc = this.audioContext.createOscillator();
		osc.type = "sawtooth";
		osc.frequency.value = 800;

		const envelope = this.audioContext.createGain();
		envelope.gain.value = this.volume;
		envelope.gain.setValueAtTime(this.volume, time + duration);
		envelope.gain.exponentialRampToValueAtTime(0.0001, time + duration + fade);

		osc.connect(envelope);
		envelope.connect(this.audioContext.destination);

		osc.start(time);
		osc.stop(time + duration + fade + padding);
	}
};

// if(!window.AudioContext) {
// 	toastr.error("window.AudioContext is not available in your browser - no sound can be played");
// 	return false;
// }

// return new AudioContext();
