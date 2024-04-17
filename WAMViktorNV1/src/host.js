const player = document.querySelector('#player');
const mount = document.querySelector('#mount');

// Safari...
const AudioContext = window.AudioContext // Default
	|| window.webkitAudioContext // Safari and old versions of Chrome
	|| false;

const audioContext = new AudioContext();

// Very simple function to connect the plugin audionode to the host
const connectPlugin = (audioNode) => {
	audioNode.connect(audioContext.destination);
};

// Very simple function to append the plugin root dom node to the host
const mountPlugin = (domNode) => {
	mount.innerHtml = '';
	mount.appendChild(domNode);
};

(async () => {
	// Init WamEnv
	const { default: initializeWamHost } = await import("https://www.webaudiomodules.com/sdk/2.0.0-alpha.6/src/initializeWamHost.js");
	const [hostGroupId] = await initializeWamHost(audioContext);

	// Import WAM
	const { default: WAM } = await import('./index.js');

	// Create a new instance of the plugin
	// You can can optionnally give more options such as the initial state of the plugin
	const pluginInstance = await WAM.createInstance(hostGroupId, audioContext, {});

	window.instance = pluginInstance;
	// instance.enable();

	// Connect the audionode to the host
	connectPlugin(pluginInstance.audioNode);

	document.getElementById("note").addEventListener("click", () => {
		// if audio context is suspended, resume it
		audioContext.resume().then(() => {

			let wam = window.instance;

			wam.audioNode.scheduleEvents({ type: 'wam-midi', time: wam.audioNode.context.currentTime, data: { bytes: new Uint8Array([0x90, 74, 100]) } });
			wam.audioNode.scheduleEvents({
				type: 'wam-midi',
				time: wam.audioNode.context.currentTime + 0.25,
				data: {
					bytes: new Uint8Array([0x80, 74, 100])
				}
			});
		});
	})

	// Load the GUI if need (ie. if the option noGui was set to true)
	// And calls the method createElement of the Gui module
	const pluginDomNode = await pluginInstance.createGui();

	mountPlugin(pluginDomNode);

})();
