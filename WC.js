(function () {
  let template = document.createElement("template");
  template.innerHTML = `<div>
  <canvas id="myChart"></canvas>
</div>

<meta http-equiv="Content-Security-Policy" content="default-src 'self' data: gap: https://cdn.jsdelivr.net 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *">

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<script>
  const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
</script>`;
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
