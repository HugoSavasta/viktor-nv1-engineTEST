'use strict';

function Filter( audioContext ) {
	var self = this,
		node = audioContext.createBiquadFilter();

	node.type = "lowpass";

	self.node = node;
}

export default Filter;