import Metronome from './Metronome'

let metronome = new Metronome();

let inputs = {
	InputBPM:       document.getElementById("InputBPM")       as HTMLInputElement,
	InputTimeCount: document.getElementById("InputTimeCount") as HTMLInputElement,
	InputTimeBasis: document.getElementById("InputTimeBasis") as HTMLInputElement,
	PlayButton:     document.getElementById("PlayButton")     as HTMLLinkElement,
};

function bindInput<T>(object: T, input: HTMLInputElement, name: keyof(T)) {
	let onChange = function() {
		if(input.value.length) {
			object[name] = +input.value as any;
			console.log(`${name}: ${object[name]}`)
		}
	};
	input.addEventListener('change', onChange);
	onChange();
}
bindInput(metronome, inputs.InputBPM,       "bpm");
bindInput(metronome, inputs.InputTimeCount, "timeBasis");
bindInput(metronome, inputs.InputTimeBasis, "timeCount");
inputs.PlayButton.addEventListener('click', e => metronome.togglePlayback());
document.body.addEventListener('keypress', e => {
	if(e.key == ' ') {
		metronome.togglePlayback();

		document.getElementById("PlayingIcon").style.display = metronome.playing?'none':'inline-block';
		document.getElementById("PauseIcon").style.display   = metronome.playing?'inline-block':'none';

		e.stopPropagation();
		e.preventDefault();
	}
});
