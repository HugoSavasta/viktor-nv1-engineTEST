import * as NV1Engine from './src2/index.js';

window.onload = init;

class Store {
    set(key, value) {
        // set LocalStorage key/value
        localStorage.setItem(key, value);
    }

// Get current user
get(user) {
    return localStorage.getItem(user);
}

// Remove current user
remove(user) {
     localStorage.removeItem(user);
}

// Clear all keys
clearAll(){
    localStorage.clear();
}

// Loop over all stored values
each(callback) {}
}

let store = new Store();

function init() {
    console.log("init")

    var audioContext = new AudioContext(),
        dawEngine,
        patchLibrary;

    /*NV1Engine.create(audioContext, store, function (dEngine, pLibrary) {

        dawEngine = dEngine;
        patchLibrary = pLibrary;

    });
    */

    var result = NV1Engine.create( audioContext, store );

		dawEngine = result.dawEngine;
		patchLibrary = result.patchLibrary;

    // Add a button in the HTML, when clicked, resume audioContext,
    // and play a MIDI note
    var button = document.createElement("button");
    button.innerHTML = "Play";
    document.body.appendChild(button);

    // Build preset menu
    buildPresetMenu(patchLibrary, dawEngine);

    button.addEventListener("click", function () {
        audioContext.resume().then(() => {
            // Regarder dans le code du synthé pour voir comment jouer une note
            // chercher les écouteurs du clavier piano et faire pareil en envoyant un son à l'engine
            // TODO !!!
            console.log("PLAYING NOTE !!!!!!ç")
            var isNoteOn = true;
            var noteNumber = 60;

            var msg = produceMidiMessage(
				isNoteOn ? 144 : 128,
				noteNumber,
				100
			);
            dawEngine.externalMidiMessage(msg);
        });
    });

}

var produceMidiMessage = function( firstByte, secondByte, thirdByte ) {
    return { data: [ firstByte, secondByte, thirdByte ] };
};

function buildPresetMenu( patchLibrary, dawEngine ) {
    var select = document.createElement( "select" ),
        option,
        patch,
        i;

        let names = patchLibrary.getDefaultNames()
        // build select options
        for ( i = 0; i < names.length; i++ ) {
            option = document.createElement( "option" );
            option.value = names[i];
            option.text = names[i];
            select.appendChild( option );
        }

    select.addEventListener( "change", function() {
        var selectedItem = patchLibrary.getPatch( select.value );

        dawEngine.loadPatch( selectedItem.patch );
    });

    document.body.appendChild( select );
}