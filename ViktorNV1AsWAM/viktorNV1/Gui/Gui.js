// https://github.com/g200kg/webaudio-controls/blob/master/webaudio-controls.js
import '../utils/webaudio-controls.js';

// This works when youuse a bundler such as rollup
// If you do no wan to use a bundler, then  look at other examples
// that build in pure JS the syles and html template directly
// in the code...
let style = `
  #dawContainer {
	position: relative;
    width: 1200px;
    height: 400px;
    padding-bottom: 195px;
    border-radius: 14px;
    background-position: 50% 50%;
    background-repeat: none;
    background-size: contain;
    box-shadow: 0 10px 28px rgba(0,0,0,0.8);
    color: #eee;
    transform: scale(0.9);
  }
  #viktorPresetMenu {
	position:absolute;
	left:500px;
	top:15px;
  }

  #viktorPresetMenu select {
	font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
	font-weight: 100;
	font-size: 30px;
	color: #eee;
	background: linear-gradient(to bottom, rgba(150, 150, 150, 0.69) 5%, rgba(230, 230, 230, 0) 100%);
  }
  #viktorPresetMenu option {
	font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
	font-weight: 100;
	font-size: 30px;
	color: #eee;
	background: linear-gradient(to bottom, rgba(150, 150, 150, 0.69) 5%, rgba(230, 230, 230, 0) 100%);
  }

  .knob-with-label {
	display:flex;
	flex-direction:column;
	text-align:center;
  }
  .knob-with-label h6 {
	font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
	font-weight: 100;
	font-size: 12px;
	color:#eee;
	margin:5px;
  }
  .row {
	display:flex;
	flex-direction:row;
  }
  .column {
	display:flex;
	flex-direction:column;
  }
  .no-select {
	user-select: none;
  }

  /* ---- top row, left to right ---- */
  .modulation-polyphony {
	position:absolute;
	top:60px;
	left:80px;
	display:flex;
	flex-direction:column;
	align-items:center;
  }
  
  .modulation-polyphony h5 {
	margin:0px;
	margin-bottom:5px;
	font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
	font-weight: 100;
	font-size: 14px;
	color:#eee;
  }
  .modulation-polyphony-column {
	display:flex;
	flex-direction:column;
	align-items:center;
  }
  .modulation-polyphony-column h4 {
	font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
	font-weight: 100;
	font-size: 18px;
	color:#eee;
	margin:5px 10px 5px 10px;
  }

  .modulation-polyphony-top-column {
	border:1px solid #8e8e8e;
	border-radius: 10px 10px 0 0;
	padding-top:15px;
  }

  .modulation-polyphony-bottom-column {
	border:1px solid #8e8e8e;
	border-radius:  0 0 10px 10px;
	padding-top:10px;
  }
  .modulation-polyphony-bottom-column h4 {
	padding: 0 0 0 5
  }

  
  .oscillators {
	position:absolute;
	top:60px;
	left:185px;
	border:1px solid #8e8e8e;
	border-radius:10px;
	display:flex;
	flex-direction:column;
	align-items:center;
  }

  .oscillator-column {
		display:flex;
		flex-direction:column;
		align-items:center;
	}
	.oscillator-column h5 {
		margin-top:15px;
		margin-bottom:5px;
		font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
		font-weight: 100;
		font-size: 14px;
		color:#eee;
	}
	.oscillator-row-1, .oscillator-row-2,.oscillator-row-3 {
		display:flex;
		flex-direction:row;
		align-items: flex-end;
		padding:0 10 0 10;
	}
	#oscillator2h5 {
		margin-top:0px;
	}
	#oscillator2h5 {
		margin-top:0px;
	}
	#oscillator3h5 {
		margin-top:7px;
		margin-bottom:17px;
	}
	.oscillator-filler {
		width:70px;
	}
	.oscillator-row-3 h5 {
		margin:0px;
	}
	.oscillators h4 {
		font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
		font-weight: 100;
		font-size: 18px;
		color:#eee;
		margin:12px 10px 5px 10px;
	}

  /* ----  bottom row ----  */
  .compressor {
	position:absolute;
	top:400px;
	left:760px;
	border:1px solid #8e8e8e;
	border-radius:10px;	
  }

  .compressor-first-row {
	display:flex;
	align-items: center;
  	justify-content: left;
  }
 
  
  .compressor h4 {
	margin:0px;
	margin-left:10px;
	font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
	font-weight: 100;
	font-size: 18px;
	color:#eee;
  }

  .master-volume {
	position:absolute;
	top:400px;
	left:1050px;
	width:98px;
	height:185px;
	border:1px solid #8e8e8e;
	border-radius:10px;	
	display:flex;
	flex-direction:column;
	align-items:center;
  }
  .master-volume h4 {
	margin:0px;
	margin-top:22px;
	font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
	font-weight: 100;
	font-size: 18px;
	color:#eee;
  }

  .reverb {
	position:absolute;
	top:495px;
	left:985px;
	padding-left:5px;
	padding-right:5px;
	border:1px solid #8e8e8e;
	border-radius:10px;	
	display:flex;
	flex-direction:column;
	align-items:center;
  }
  .reverb h4 {
	margin:0px;
	font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
	font-weight: 100;
	font-size: 18px;
	color:#eee;
  }

  .delay {
	position:absolute;
	top:495px;
	left:760px;
	width:220px;
	border:1px solid #8e8e8e;
	border-radius:10px;	
	display:flex;
	flex-direction:column;
	align-items:center;
  }
  .delay h4 {
	margin:0px;
	font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
	font-weight: 100;
	font-size: 18px;
	color:#eee;
  }
  
  .keyboard {
	position:absolute;
	top:400px;
	left:195px;
  }

  .modulation-wheel {
	position:absolute;
	top:420px;
	left:75px;
  }

  .pitch-bend {
	position:absolute;
	top:420px;
	left:35px;
  }

  #form-knob {
	margin:0px;
  }
  `;
let template = `
<div id="dawContainer" class="noselect">
	<!-- ###### TOP ROW #### -->
	<div id="viktorPresetMenu"></div>

	<div class="modulation-polyphony">
		<div class="modulation-polyphony-column modulation-polyphony-top-column">
			<div class="knob-with-label">
					<h5>Form</h5>
					<webaudio-knob src="images/range-knob.png"
						value="{{modulation.waveform.value}}" min="{{modulation.waveform.range[ 0 ]}}" max="{{modulation.waveform.range[ 1 ]}}" step="1" diameter="240" sprites="5" width="60" height="60"></webaudio-knob>
			</div>
			<div class="knob-with-label">
					<h5>Glide</h5>
					<webaudio-knob src="images/0-100-knob.png"
						value="{{modulation.portamento.value}}" min="{{modulation.portamento.range[ 0 ]}}" max="{{modulation.portamento.range[ 1 ]}}" step="1" diameter="120" sprites="44" width="60" height="60"></webaudio-knob>
			</div>
			<h4>Modulation</h4>
		</div> 
		<div class="modulation-polyphony-column modulation-polyphony-bottom-column">
			<div class="knob-with-label">
				<webaudio-knob src="images/0-100-knob.png"
					value="{{polyphony.voiceCount.value}}" min="{{polyphony.voiceCount.range[ 0 ]}}" max="{{polyphony.voiceCount.range[ 1 ]}}" step="1" diameter="120" sprites="44" width="60" height="60"></webaudio-knob>
				<h5>Voices</h5>
			</div>
			<h4>Polyphony</h4>
		</div>
	</div>

	<div class="oscillators">
		<div class="oscillator-column">
			<h5>Oscillator 1</h5>
			<div class="oscillator-row-1">
				<webaudio-knob src="images/6-range-knob.png"
					value="{{oscillators.osc1.range.value}}" min="1" max="{{oscillators.osc1.range.range[ 1 ]}}" step="1" diameter="240" sprites="5" width="60" height="60">
				</webaudio-knob>
				<div class="oscillator-filler">
				</div>
				<webaudio-knob src="images/range-knob.png"
					value="{{oscillators.osc1.waveform.value}}" min="{{oscillators.osc1.waveform.range[ 0 ]}}" max="{{oscillators.osc1.waveform.range[ 1 ]}}" step="1" diameter="240" sprites="5" width="60" height="60">
				</webaudio-knob>
			</div>
			<h5 id="oscillator2h5">Oscillator 2</h5>
			<div class="oscillator-row-2">
				<webaudio-knob src="images/6-range-knob.png"
					value="{{oscillators.osc2.range.value}}" min="1" max="{{oscillators.osc2.range.range[ 1 ]}}" step="1" diameter="240" sprites="5" width="60" height="60">
				</webaudio-knob>
				<webaudio-knob src="images/0-100-knob.png"
					value="{{oscillators.osc2.fineDetune.value}}" min="{{oscillators.osc2.fineDetune.range[ 0 ]}}" max="{{oscillators.osc2.fineDetune.range[ 1 ]}}" step="1" diameter="120" sprites="44" width="60" height="60">
				</webaudio-knob>
				<webaudio-knob src="images/range-knob.png"
					value="{{oscillators.osc2.waveform.value}}" min="{{oscillators.osc2.waveform.range[ 0 ]}}" max="{{oscillators.osc2.waveform.range[ 1 ]}}" step="1" diameter="240" sprites="5" width="60" height="60">
				</webaudio-knob>
			</div>

			<h5 id="oscillator3h5">Oscillator 3</h5>
			<div class="oscillator-row-3">
				<div class="knob-with-label">
					<webaudio-knob src="images/lfo-knob.png"
						value="{{oscillators.osc3.range.value}}" min="{{oscillators.osc3.range.range[ 0 ]}}" max="{{oscillators.osc3.range.range[ 1 ]}}" step="1" diameter="240" sprites="6" width="60" height="60">
					</webaudio-knob>
					<h5>Range</h5>
				</div>
				<div class="knob-with-label">
					<webaudio-knob src="images/0-100-knob.png"
						value="{{oscillators.osc3.fineDetune.value}}" min="{{oscillators.osc3.fineDetune.range[ 0 ]}}" max="{{oscillators.osc3.fineDetune.range[ 1 ]}}" step="1" diameter="120" sprites="44" width="60" height="60">
					</webaudio-knob>
					<h5>Detune</h5>
				</div>
				<div class="knob-with-label">
					<webaudio-knob src="images/range-knob.png"
						value="{{oscillators.osc3.waveform.value}}" min="{{oscillators.osc3.waveform.range[ 0 ]}}" max="{{oscillators.osc3.waveform.range[ 1 ]}}" step="1" diameter="240" sprites="5" width="60" height="60">
					</webaudio-knob>
					<h5>Form</h5>
				</div>
  			</div>
			<h4>Oscillator Bank</h4>
		</div>
	</div>

    <!-- ###### BOTTOM ROW #### -->
	<div class="compressor">
		<div class="row compressor-first-row">
			<div class="on-off-switch no-padding">
					<webaudio-switch src="images/switch.png" width="20" height="20"
						value="{{compressor.enabled.value}}"></webaudio-switch>
			</div>
			<h4>Compressor</h4>
		</div>
		<div class="row">
			<div class="knob-with-label">
				<webaudio-knob src="images/0-100-knob.png"
					value="{{compressor.threshold.value}}" min="{{compressor.threshold.range[ 0 ]}}" max="{{compressor.threshold.range[ 1 ]}}"
					step="0.5"
					sprites="44" width="45" height="45"></webaudio-knob>
				<h6>Threshold</h6>
			</div>
			<div class="knob-with-label">
				<webaudio-knob src="images/0-100-knob.png"
					value="{{compressor.ratio.value}}" min="{{compressor.ratio.range[ 0 ]}}" max="{{compressor.ratio.range[ 1 ]}}"
					step="0.1"
					sprites="44" width="45" height="45"></webaudio-knob>
				<h6>Ratio</h6>
			</div>
			<div class="knob-with-label">
				<webaudio-knob src="images/0-100-knob.png"
					value="{{compressor.knee.value}}" min="{{compressor.knee.range[ 0 ]}}" max="{{compressor.knee.range[ 1 ]}}"
					step="0.1"
					sprites="44" width="45" height="45"></webaudio-knob>
				<h6>Knee</h6>
			</div>
			<div class="knob-with-label">
				<webaudio-knob src="images/0-100-knob.png"
					value="{{compressor.attack.value}}" min="{{compressor.attack.range[ 0 ]}}" max="{{compressor.attack.range[ 1 ]}}"
					step="0.1"
					sprites="44" width="45" height="45"></webaudio-knob>
				<h6>Attack</h6>
			</div>
			<div class="knob-with-label">
				<webaudio-knob src="images/0-100-knob.png"
					value="{{compressor.release.value}}" min="{{compressor.release.range[ 0 ]}}" max="{{compressor.release.range[ 1 ]}}"
					step="1"
					sprites="44" width="45" height="45"></webaudio-knob>
				<h6>Release</h6>
			</div>
			<div class="knob-with-label">
				<webaudio-knob src="images/0-100-knob.png"
					value="{{compressor.makeupGain.value}}" min="{{compressor.makeupGain.range[ 0 ]}}" max="{{compressor.makeupGain.range[ 1 ]}}"
					step="0.1"
					sprites="44" width="45" height="45"></webaudio-knob>
				<h6>Gain</h6>
			</div>
		</div>
	</div>

	<div class="master-volume">
		<h4>Volume</h4>
		<div class="row">
			<div class="knob-with-label">
				<webaudio-knob src="images/0-100-knob.png" id="masterVolume"
					value="1" min="0" max="1" step=0.01 diameter="120" sprites="44" width="90" height="90"></webaudio-knob>
			<h6>Level</h6>
			</div>
		</div>
	</div>

	<div class="reverb">
		<h4>Reverb</h4>
		<div class="row">
			<div class="knob-with-label">
				<webaudio-knob src="images/0-100-knob.png"
					value="{{reverb.level.value}}" min="{{reverb.level.range[ 0 ]}}" max="{{reverb.level.range[ 1 ]}}"
					step="1"
					sprites="44" width="45" height="45"></webaudio-knob>
				<h6>Level</h6>
			</div>
		</div>
	</div>

	<div class="delay">
		<h4>Delay</h4>
		<div class="row">
			<div class="knob-with-label">
				<webaudio-knob src="images/0-100-knob.png"
					value="{{delay.time.value}}" min="{{delay.time.range[ 0 ]}}" max="{{delay.time.range[ 1 ]}}"
					step="1"
					sprites="44" width="45" height="45"></webaudio-knob>
				<h6>Time</h6>
			</div>
			<div class="knob-with-label">
				<webaudio-knob src="images/0-100-knob.png"
					value="{{delay.feedback.value}}" min="{{delay.feedback.range[ 0 ]}}" max="{{delay.feedback.range[ 1 ]}}"
					step="1"
					sprites="44" width="45" height="45"></webaudio-knob>
				<h6>Feed</h6>
			</div>
			<div class="knob-with-label">
				<webaudio-knob src="images/0-100-knob.png"
					value="{{delay.dry.value}}" min="{{delay.dry.range[ 0 ]}}" max="{{delay.dry.range[ 1 ]}}"
					step="1"
					sprites="44" width="45" height="45"></webaudio-knob>
				<h6>Dry</h6>
			</div>
			<div class="knob-with-label">
				<webaudio-knob src="images/0-100-knob.png"
					value="{{delay.wet.value}}" min="{{delay.wet.range[ 0 ]}}" max="{{delay.wet.range[ 1 ]}}"
					step="1"
					sprites="44" width="45" height="45"></webaudio-knob>
				<h6>Wet</h6>
			</div>
		</div>
	</div>



	<div class="modulation-wheel">
		<webaudio-knob src="images/wheel.png" value="{{modulationWheel.modulation.value}}"
			min="{{modulationWheel.modulation.range[ 0 ]}}" max="{{modulationWheel.modulation.range[ 1 ]}}"
			sprites="44" width="60" height="150">
		</webaudio-knob>
	</div>

	<div class="pitch-bend">
		<webaudio-knob src="images/wheel.png" value="{{pitch.bend.value}}"
			min="{{pitch.bend.range[ 0 ]}}" max="{{pitch.bend.range[ 1 ]}}" step="1"
			sprites="44" width="60" height="150">
		</webaudio-knob>
	</div>
</div>
<div class="keyboard">
<webaudio-keyboard
	keyboard-value
	keys="39" min="61" width="539" height="162">
</webaudio-keyboard>
<!-- 	<webaudio-keyboard
		keyboard-value
		keys="39" min="61" width="539" height="170">
		</webaudio-keyboard> -->
</div>
`;

const getBaseURL = () => {
	const base = new URL('.', import.meta.url);
	return `${base}`;
};

// The GUI is a WebComponent. Not mandatory but useful.
// MANDORY : the GUI should be a DOM node. WebComponents are
// practical as they encapsulate everyhing in a shadow dom
export default class ViktorNV1HTMLElement extends HTMLElement {
	// plugin = the same that is passed in the DSP part. It's the instance
	// of the class that extends WebAudioModule. It's an Observable plugin
	constructor(plugin) {
		super();

		this.root = this.attachShadow({
			mode: 'open',
		});
		this.root.innerHTML = `<style>${style}</style>${template}`;

		// MANDATORY for the GUI to observe the plugin state
		this.plugin = plugin;

		// Compute base URI of this main.html file. This is needed in order
		// to fix all relative paths in CSS, as they are relative to
		// the main document, not the plugin's main.html
		this.basePath = getBaseURL();
		console.log('basePath = ' + this.basePath);

		// Fix relative path in WebAudio Controls elements
		this.fixRelativeImagePaths();

		this.setBackgroundImage();
	}

	setBackgroundImage() {
		let dawContainer = this.root.querySelector("#dawContainer");
		let backgroundImagePath = this.basePath + "/images/synth-base-panel.jpg";
		console.log(backgroundImagePath)
		dawContainer.style.backgroundImage = `url(${backgroundImagePath})`;
	}

	
	fixRelativeImagePaths() {
		// change webaudiocontrols relative paths for spritesheets to absolute
		let webaudioControls = this.root.querySelectorAll(
			'webaudio-knob, webaudio-slider, webaudio-switch, img'
		);
		webaudioControls.forEach((e) => {
			let currentImagePath = e.getAttribute('src');
			if (currentImagePath !== undefined) {
				//console.log("Got wc src as " + e.getAttribute("src"));
				let imagePath = e.getAttribute('src');
				e.setAttribute('src', this.basePath + '/' + imagePath);
				//console.log("After fix : wc src as " + e.getAttribute("src"));
			}
		});

		let sliders = this.root.querySelectorAll('webaudio-slider');
		sliders.forEach((e) => {
			let currentImagePath = e.getAttribute('knobsrc');
			if (currentImagePath !== undefined) {
				console.log('Got img src as ' + e.getAttribute('src'));
				let imagePath = e.getAttribute('knobsrc');
				e.setAttribute('knobsrc', this.basePath + '/' + imagePath);
				console.log(
					'After fix : slider knobsrc as ' + e.getAttribute('knobsrc')
				);
			}
		});
	}

	
	connectedCallback() {
		// appelé une fois que la GUI est affichée
		this.setResources();
		this.setKnobs();
		this.setSwitchListener();

		console.log("connected callback");
		this.buildPresetMenu(this.plugin.patchLibrary, this.plugin.dawEngine);

		window.requestAnimationFrame(this.handleAnimationFrame);
	}

	buildPresetMenu(patchLibrary, dawEngine) {
		var select = document.createElement("select"),
			option,
			patch,
			i;
	
		let names = patchLibrary.getDefaultNames()
		// build select options
		for (i = 0; i < names.length; i++) {
			option = document.createElement("option");
			option.value = names[i];
			option.text = names[i];
			select.appendChild(option);
		}
	
		select.addEventListener("change", function () {
			var selectedItem = patchLibrary.getPatch(select.value);
	
			dawEngine.loadPatch(selectedItem.patch);
		});
	
		this.root.querySelector('#viktorPresetMenu').append(select);
	}

	updateStatus = (status) => {
		//this.shadowRoot.querySelector('#switch1').value = status;
	};

	handleAnimationFrame = () => {
		const { enabled } = this.plugin.audioNode.getParamsValues();

		window.requestAnimationFrame(this.handleAnimationFrame);
	};

	/**
	 * Change relative URLS to absolute URLs for CSS assets, webaudio controls spritesheets etc.
	 */
	setResources() {
	}

	async setKnobs() {
		// Master Volume
		this.root.getElementById('masterVolume').addEventListener('input', (e) => {
			console.log("On change le master vol du plugin + val = " + e.target.value);
			this.plugin.dawEngine.masterVolume.gain.value =  parseFloat(e.target.value); // master volume
		});	
	}


	setSwitchListener() {

	}

	// name of the custom HTML element associated
	// with the plugin. Will appear in the DOM if
	// the plugin is visible
	static is() {
		return 'wimmics-viktor-synth';
	}
}

if (!customElements.get(ViktorNV1HTMLElement.is())) {
	customElements.define(
		ViktorNV1HTMLElement.is(),
		ViktorNV1HTMLElement
	);
}
