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

    NV1Engine.create(audioContext, store, function (dEngine, pLibrary) {

        dawEngine = dEngine;
        patchLibrary = pLibrary;

    });

}
