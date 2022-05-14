class Modal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.isOpen = false;
    this.shadowRoot.innerHTML = `
      <style>
        #backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(0,0,0,0.75);
          
          opacity: 0;
          pointer-events: none;
          z-index: 10;
        }

        #modal {
          position: fixed;
          top: 15vh;
          left: 25%;
          width: 50%;
          height: 30rem;
          background-color: white;
          border-radius: 3px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.26);
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          opacity: 0;
          pointer-events: none;
          z-index: 100;
        }

        :host([opened]) #backdrop,
        :host([opened]) #modal {
          opacity: 1;
          pointer-events: all;
        }

        header {
          padding: 1rem;
        }

        ::slotted(h1) {
          font-size: 1.25rem;
        }

        #main {
          padding: 1rem;
        }

        #actions {
          border-top: 1px solid #ccc;
          padding: 1rem;
          display: flex;
          justify-content: flex-end;
          gap: 0.5rem;
        }
      </style>
      <div id='backdrop'></div>
      <div id='modal'>
        <header>
          <slot name='title'>Please confirm payment</slot>
        </header>
        <section id='main'>
          <slot></slot>
        </section>
        <section id='actions'>
          <button id='cancel-button'>Cancel</button>
          <button id='confirm-button'>Confirm</button>
        </section>
      </div>
    `;

    // this is useful when we need control the slot changes
    // const slots = this.shadowRoot.querySelectorAll("slot");
    // slots[1].addEventListener("slotchange", (e) => {
    //   console.dir(slots[1].assignedNodes());
    // });

    const cancelButton = this.shadowRoot.querySelector("#cancel-button");
    const confirmButton = this.shadowRoot.querySelector("#confirm-button");

    cancelButton.addEventListener("click", this._cancel.bind(this));
    confirmButton.addEventListener("click", this._confirm.bind(this));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (this.hasAttribute("opened")) this.isOpen = true;
    else this.isOpen = false;
  }

  static get observedAttributes() {
    return ["opened"];
  }

  open() {
    this.setAttribute("opened", "");
  }

  hide() {
    if (this.hasAttribute("opened")) this.removeAttribute("opened");
    this.isOpen = false;
  }

  _cancel() {
    this.hide();
  }

  _confirm() {
    this.hide();
  }
}

customElements.define("vaz-modal", Modal);
