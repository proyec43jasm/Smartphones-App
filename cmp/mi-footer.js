class MiFooter
  extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */
      `<p>
        &copy; 2023
        Solis Morales Jorge Aaron.
      </p>`;
  }
}

customElements.define(
  "mi-footer", MiFooter);
