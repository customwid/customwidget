(function () {
  let template = document.createElement("template");
  template.innerHTML = `
     <div class="container" style='display: block'>
  <canvas id="myChart" width="600" height="400"></canvas>
        <script src='https://cdn.jsdelivr.net/npm/chart.js'></script>
    </div>`;
  class Visuals extends HTMLElement {
    constructor() {
      super();
      let shadowRoot = this.attachShadow({ mode: "open" });
      shadowRoot.appendChild(template.content.cloneNode(true));
      this.addEventListener("click", (event) => {
        var event = new Event("onClick");
        this.dispactchEvent(event);
      });
      const ctx = document.getElementById("myChart");

      
    }}
  customElements.define("cw-simplified", Visuals);
})();
