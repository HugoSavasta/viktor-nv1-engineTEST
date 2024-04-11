// A simple Web Component that displays a message, using an html template
let template = document.createElement('template');
template.innerHTML = `
    <style>
        p {
            color: red;
        }
    </style>
    <p>hello this is the Web Component content</p>
`;

export default class ExampleWebComponent extends HTMLElement {
    constructor() {
        super();
        // USE SHADOW DOM
        this.attachShadow({ mode: 'open' });

        // USE TEMPLATE FOR HTML/CSS GUI
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        // GET HTML ATTRIBUTE VALUE and set content of paragraph with it
        this.shadowRoot.querySelector('p').innerText = this.getAttribute('message');
    }
}

// DEFINE THE CUSTOM ELEMENT
customElements.define('example-web-component', ExampleWebComponent);