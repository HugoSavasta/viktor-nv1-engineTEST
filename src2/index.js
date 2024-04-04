'use strict';

import DAW from "./daw.js";
import Synth from "./instrument.js";
import PatchLibrary from "./library.js";
import * as defaultPatches from "./default.js";

const _DAW = DAW;
export { _DAW as DAW };

const _Synth = Synth;
export { _Synth as Synth };

const _PatchLibrary = PatchLibrary;
export { _PatchLibrary as PatchLibrary };

export function create( context, store ) {

	// var patchLibrary = new PatchLibrary( "VIKTOR_SYNTH", require( "../src/patches/defaults" ), store ),
	// 	dawEngine = new DAW(
	// 		AudioContext,
	// 		[
	// 			Synth
	// 		],
	// 		patchLibrary.getSelected().patch
	// 	);

	var patchLibrary = new PatchLibrary( "VIKTOR_SYNTH", defaultPatches.default, store ),
		dawEngine = new DAW(
			context,
			[
				Synth
			],
			patchLibrary.getSelected().patch
		);

	return {
		dawEngine: dawEngine,
		patchLibrary: patchLibrary
	};

}