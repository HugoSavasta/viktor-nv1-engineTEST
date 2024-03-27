'use strict';

import { transposeParam } from "viktor-nv1-settings-convertor";
import { TUNA_COMPRESSOR_DEFAULT_SETTINGS, TUNA_DELAY_DEFAULT_SETTINGS, TUNA_REVERB_DEFAULT_SETTINGS, ENGINE_VERSION, DEFAULT_COMPRESSOR_SETTINGS, DEFAULT_DELAY_SETTINGS, DEFAULT_REVERB_SETTINGS, DEFAULT_MASTER_VOLUME_SETTINGS, DEFAULT_PITCH_SETTINGS, DEFAULT_MODULATION_SETTINGS } from "./const.js";
import { load, prepareForSerialization } from "./patch-loader.js";
import MIDIController from "./midi.js";
import Tuna from "./tuna.js";

function DAW( AudioContext, instrumentTypes, selectedPatch ) {
	var self = this,
		audioContext = new AudioContext(),
		tuna = new Tuna( audioContext ),
		compressor = new tuna.Compressor( TUNA_COMPRESSOR_DEFAULT_SETTINGS ),
		delay = new tuna.Delay( TUNA_DELAY_DEFAULT_SETTINGS ),
		reverb = new tuna.Convolver( TUNA_REVERB_DEFAULT_SETTINGS ),
		masterVolume = audioContext.createGain();

	masterVolume.gain.value = 1;

	compressor.connect( delay.input );
	delay.connect( reverb.input );
	reverb.connect( masterVolume );
	masterVolume.connect( audioContext.destination );

	self.audioContext = audioContext;
	self.selectedPatch = selectedPatch;
	self.instrumentTypes = instrumentTypes;
	self.midiController = new MIDIController();
	self.compressor = compressor;
	self.delay = delay;
	self.reverb = reverb;
	self.masterVolume = masterVolume;
	self.instruments = [];
	self.selectedInstrument = null;
	self.externalMidiMessageHandlers = [];
	self.version = ENGINE_VERSION;
	self.settings = {
		pitch: null,
		modulation: null,
		compressor: null,
		delay: null,
		reverb: null,
		masterVolume: null
	};
	self._patchChangeHandlers = [];

	self._defineProps();

	// pitch & modulation settings are set in init

	self.compressorSettings = DEFAULT_COMPRESSOR_SETTINGS;
	self.delaySettings = DEFAULT_DELAY_SETTINGS;
	self.reverbSettings = DEFAULT_REVERB_SETTINGS;
	self.masterVolumeSettings = DEFAULT_MASTER_VOLUME_SETTINGS;

	self.init();
}

DAW.prototype = {

	init: function() {
		var self = this,
			audioContext = self.audioContext,
			midiController = self.midiController,
			instruments = self.instruments,
			quietPatchChange = true;

		midiController.init();

		midiController.setMessageHandler(
			self.propagateMidiMessage.bind( self )
		);

		self.instrumentTypes.forEach( function( Instrument ) {
			instruments.push( self.createInstrument( Instrument ) );
		} );

		self.selectInstrument( 0 );

		self.pitchSettings = DEFAULT_PITCH_SETTINGS;
		self.modulationSettings = DEFAULT_MODULATION_SETTINGS;

		self.loadPatch( self.selectedPatch, quietPatchChange );
		self.audioContext = audioContext;
	},

	loadPatch: function( patch, quiet ) {
		var self = this,
			instruments = self.instruments;

		patch = load( patch );

		if ( patch ) {
			// first apply instrument patches (pitch, modulation etc. should override)
			instruments.forEach( function( instrument ) {
				var instrumentPatch = patch.instruments[ instrument.name ];
				if ( instrumentPatch ) {
					instrument.loadPatch( instrumentPatch );
				}
			} );

			Object.keys( patch.daw ).forEach( function( key ) {
				self[ key + "Settings" ] = patch.daw[ key ];
			} );

			if ( !quiet ) {
				self._patchChangeHandlers.forEach( function( handler ) {
					handler( patch );
				} );
			}
		}
	},

	getPatch: function() {
		var self = this,
			instrumentPatches = {};

		self.instruments.forEach( function( instrument ) {
			instrumentPatches[ instrument.name ] = instrument.getPatch();
		} );

		var patch = JSON.parse( JSON.stringify( {
			version: self.version,
			daw: self.settings,
			instruments: instrumentPatches
		} ) );

		prepareForSerialization( patch );

		return patch;
	},

	onPatchChange: function( handler ) {
		var self = this;

		self._patchChangeHandlers.push( handler );
	},

	selectInstrument: function( index ) {
		var self = this;

		self.selectedInstrument = self.instruments[ index ];
	},

	createInstrument: function( Instrument ) {
		var self = this,
			audioContext = self.audioContext,
			newInstrument = new Instrument( audioContext );

		newInstrument.outputNode.connect( self.compressor.input );

		return newInstrument;
	},

	propagateMidiMessage: function( eventType, parsed, rawEvent ) {
		var self = this,
			selectedInstrument = self.selectedInstrument,
			externalHandlers = self.externalMidiMessageHandlers;

		if ( eventType === "volume" ) {
			self.masterVolumeSettings = {
				level: transposeParam( parsed.volume, [ 0, 1 ] )
			};
		}

		selectedInstrument.onMidiMessage( eventType, parsed, rawEvent );

		externalHandlers.forEach( function( handler ) {
			handler( eventType, parsed, rawEvent );
		} );
	},

	externalMidiMessage: function( midiEvent ) {
		var self = this,
			midiController = self.midiController;

		midiController.onMidiMessage( midiEvent );
	},

	addExternalMidiMessageHandler: function( handler ) {
		var self = this,
			handlers = self.externalMidiMessageHandlers;

		handlers.push( handler );
	},

	_defineProps: function() {
		var self = this;

		Object.defineProperty( self, "pitchSettings", {
			get: function() {
				var self = this;

				return JSON.parse( JSON.stringify( self.settings.pitch ) );
			},
			set: function( settings ) {
				var self = this,
					oldSettings = self.settings.pitch || { bend: {} };

				if ( oldSettings.bend.value !== settings.bend.value ) {
					self.instruments.forEach( function( instrument ) {
						instrument.pitchSettings = settings;
					} );
				}

				self.settings.pitch = JSON.parse( JSON.stringify( settings ) );
			}
		} );

		Object.defineProperty( self, "modulationSettings", {
			get: function() {
				var self = this;

				return JSON.parse( JSON.stringify( self.settings.modulation ) );
			},
			set: function( settings ) {
				var self = this,
					oldSettings = self.settings.modulation || {};

				if ( oldSettings.rate !== settings.rate ) {
					self.instruments.forEach( function( instrument ) {
						var alteredSettings = instrument.modulationSettings;

						alteredSettings.rate = settings.rate;

						instrument.modulationSettings = alteredSettings;
					} );
				}

				self.settings.modulation = JSON.parse( JSON.stringify( settings ) );
			}
		} );

		Object.defineProperty( self, "compressorSettings", {
			get: function() {
				var self = this;

				return JSON.parse( JSON.stringify( self.settings.compressor ) );
			},
			set: function( settings ) {
				var self = this,
					oldSettings = self.settings.compressor ||
						{ enabled: {}, threshold: {}, ratio: {}, knee: {}, attack: {}, release: {}, makeupGain: {} },
					compressor = self.compressor;

				if ( oldSettings.enabled.value !== settings.enabled.value ) {
					compressor.bypass = ( settings.enabled.value === 0 );
				}
				if ( oldSettings.threshold.value !== settings.threshold.value ) {
					compressor.threshold = settings.threshold.value;
				}
				if ( oldSettings.ratio.value !== settings.ratio.value ) {
					compressor.ratio = settings.ratio.value;
				}
				if ( oldSettings.knee.value !== settings.knee.value ) {
					compressor.knee = settings.knee.value;
				}
				if ( oldSettings.attack.value !== settings.attack.value ) {
					compressor.attack = settings.attack.value;
				}
				if ( oldSettings.release.value !== settings.release.value ) {
					compressor.release = settings.release.value;
				}
				if ( oldSettings.makeupGain.value !== settings.makeupGain.value ) {
					compressor.makeupGain = settings.makeupGain.value;
				}

				self.settings.compressor = JSON.parse( JSON.stringify( settings ) );
			}
		} );

		Object.defineProperty( self, "delaySettings", {
			get: function() {
				var self = this;

				return JSON.parse( JSON.stringify( self.settings.delay ) );
			},
			set: function( settings ) {
				var self = this,
					oldSettings = self.settings.delay || { time: {}, feedback: {}, dry: {}, wet: {} },
					delay = self.delay;

				if ( oldSettings.time.value !== settings.time.value ) {
					delay.delayTime = settings.time.value;
				}
				if ( oldSettings.feedback.value !== settings.feedback.value ) {
					delay.feedback = settings.feedback.value;
				}
				if ( oldSettings.dry.value !== settings.dry.value ) {
					delay.dryLevel = settings.dry.value;
				}
				if ( oldSettings.wet.value !== settings.wet.value ) {
					delay.wetLevel = settings.wet.value;
				}

				self.settings.delay = JSON.parse( JSON.stringify( settings ) );
			}
		} );

		Object.defineProperty( self, "reverbSettings", {
			get: function() {
				var self = this;

				return JSON.parse( JSON.stringify( self.settings.reverb ) );
			},
			set: function( settings ) {
				var self = this,
					oldSettings = self.settings.reverb || { level: {} },
					reverb = self.reverb;

				if ( oldSettings.level.value !== settings.level.value ) {
					var newGain = settings.level.value;

					reverb.wetLevel = newGain;
					reverb.dryLevel = 1 - ( newGain / 2 );
				}

				self.settings.reverb = JSON.parse( JSON.stringify( settings ) );
			}
		} );

		Object.defineProperty( self, "masterVolumeSettings", {
			get: function() {
				var self = this;

				return JSON.parse( JSON.stringify( self.settings.masterVolume ) );
			},
			set: function( settings ) {
				var self = this,
					oldSettings = self.settings.masterVolume || { level: {} },
					masterVolume = self.masterVolume;

				if ( oldSettings.level.value !== settings.level.value ) {
					masterVolume.gain.value = settings.level.value;
				}

				self.settings.masterVolume = JSON.parse( JSON.stringify( settings ) );
			}
		} );

	}

};

export default DAW;