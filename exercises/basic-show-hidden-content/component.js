class Component extends HTMLElement {
  constructor() {
    super();
    this._isOpen = false;
    this._buttonShowText = "Show";
    this._buttonHideText = "Hide";

    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (this.hasAttribute("open") && this.getAttribute("open") === "true")
      this._isOpen = true;

    this.shadowRoot.innerHTML = `
      <style>
        .hide {
          display: none;
        }
        .content {
          padding: 10px;
        }
      </style>
      <button>Show</button>
      <div class='content ${!this._isOpen && "hide"}'>
        <slot>Default message!</slot>
      </div>
    `;

    const container = this.shadowRoot.querySelector(".content");
    const buttonToggle = this.shadowRoot.querySelector("button");
    const hideText = this.getAttribute("hide-text");
    const showText = this.getAttribute("show-text");
    if (showText) this._buttonShowText = showText;
    if (hideText) this._buttonHideText = hideText;

    buttonToggle.textContent = this._isOpen
      ? this._buttonHideText
      : this._buttonShowText;

    buttonToggle.addEventListener("click", () => {
      if (this._isOpen) {
        container.classList.add("hide");
        buttonToggle.textContent = this._buttonShowText;
        this._isOpen = false;
      } else {
        container.classList.remove("hide");
        buttonToggle.textContent = this._buttonHideText;
        this._isOpen = true;
      }
    });
  }
}

customElements.define("vaz-component", Component);
