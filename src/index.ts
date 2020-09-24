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


function handleDocumentKeypress(e: KeyboardEvent) {
	if(e.key != ' ') return;

	e.stopPropagation();
	e.preventDefault();

	if(e.type == 'keydown')
	{
		metronome.togglePlayback();

		document.getElementById("PlayingIcon").style.display = metronome.playing?'none':'inline-block';
		document.getElementById("PauseIcon").style.display   = metronome.playing?'inline-block':'none';
	}
}
document.body.addEventListener('keydown', handleDocumentKeypress);
document.body.addEventListener('keyup', handleDocumentKeypress);
