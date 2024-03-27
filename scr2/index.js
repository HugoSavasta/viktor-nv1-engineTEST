'use strict';

import DAW from "./daw";
import Synth from "./instrument";
import PatchLibrary from "../src/patches/library";

const _DAW = DAW;
export { _DAW as DAW };

const _Synth = Synth;
export { _Synth as Synth };

const _PatchLibrary = PatchLibrary;
export { _PatchLibrary as PatchLibrary };

export function create( AudioContext, store ) {

	var patchLibrary = new PatchLibrary( "VIKTOR_SYNTH", require( "../src/patches/defaults" ), store ),
		dawEngine = new DAW(
			AudioContext,
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