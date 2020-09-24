import toastr from 'toastr'
import Metronome from './Metronome'

let metronome = new Metronome();


let playButton = document.getElementById("PlayButton");

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
playButton.addEventListener('click', e => metronome.togglePlayback());
document.body.addEventListener('keypress', e => {
	if(e.key == ' ') {
		metronome.togglePlayback();
		e.stopPropagation();
		e.preventDefault();
	}
});
