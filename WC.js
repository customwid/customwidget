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
  // new Chart(ctx, {
  //       type: "bar",
  //       data: {
  //         labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  //         datasets: [
  //           {
  //             label: "# of Votes",
  //             data: [12, 19, 3, 5, 2, 3],
  //             borderWidth: 1,
  //           },
  //         ],
  //       },
  //     });
  
    }}
  customElements.define("cw-simplified", Visuals);
})();
