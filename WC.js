(function () {
    let tmpl_popup = document.createElement("template");
  
    tmpl_popup.innerHTML = `
      <style>  
        #popup-content {
          background-color: white;
          padding: 20px;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
          height: 500px;
          width: 500px;
         //  display: flex;
        //  flex-direction: column;
          align-items: center;
        }
        #popup-content span {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        </style>
    <div id="popup-content">
     <span> Performance Visualizations:</span>
     <canvas id="myChart" style="width:100%;max-width:700px"></canvas>
     </div>
     </div>
    `;
  
    class Visuals extends HTMLElement {
      constructor() {
        super();
        window.globalThis = this;
        this.init();
      }
      init() {
        let shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(tmpl_popup.content.cloneNode(true));
        this.addEventListener("click", (event) => {
          var event = new Event("onClick");
          this.fireChanged();
          this.dispatchEvent(event);
        });
        window.document.addEventListener("keydown", function (event) {
          if (event.ctrlKey && event.key === "p" && event.altKey) {
            
            console.log("Pop Up Opened.");
            let popup = tmpl_popup.content.cloneNode(true);
            this.shadowRoot.appendChild(popup);
            var Script = document.createElement("script");
            Script.src = "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js";
            this.shadowRoot.appendChild(Script);
            let globalView = document.getElementsByClassName(
              "sapHcsShellMainContent"
            )[0];
            let cw = document.getElementsByClassName(
              "sapCustomWidgetWebComponent"
            )[0];
            let parentPanel = cw.parentNode.parentNode.parentNode;
            globalView.appendChild(parentPanel);
            globalView.appendChild(script);
            parentPanel.style.zIndex = "99";
            parentPanel.style.height = "500px";
            parentPanel.style.width = "500px";
            var aDatasets1 = [65, 59, 80, 81, 56, 55, 40];
            var aDatasets2 = [20, 30, 40, 50, 60, 20, 25];
            var aDatasets3 = [30, 20, 25, 65, 90, 34, 20];
    
            console.log(["ctw:", ctx]);
  
            var myChart = new Chart("myChart", {
              type: "bar",
              data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  
                datasets: [
                  {
                    label: "Result",
                    fill: false,
                    data: aDatasets1,
                    backgroundColor: "#E91E63",
                    borderColor: [
                      "rgba(255,99,132,1)",
                      "rgba(255,99,132,1)",
                      "rgba(255,99,132,1)",
                      "rgba(255,99,132,1)",
                      "rgba(255,99,132,1)",
                      "rgba(255,99,132,1)",
                    ],
                    borderWidth: 1,
                  },
  
                  {
                    label: "Attendance",
                    fill: false,
                    data: aDatasets2,
                    backgroundColor: "#3F51B5",
                    borderColor: [
                      "rgba(255,99,132,1)",
                      "rgba(255,99,132,1)",
                      "rgba(255,99,132,1)",
                      "rgba(255,99,132,1)",
                      "rgba(255,99,132,1)",
                      "rgba(255,99,132,1)",
                    ],
                    borderWidth: 1,
                  },
                  {
                    label: ["score"],
                    data: aDatasets3,
                    fill: false,
                    backgroundColor: "#004D40",
                    borderColor: [
                      "rgba(255,99,132,1)",
                      "rgba(255,99,132,1)",
                      "rgba(255,99,132,1)",
                      "rgba(255,99,132,1)",
                      "rgba(255,99,132,1)",
                      "rgba(255,99,132,1)",
                    ],
                    borderWidth: 1,
                  },
                ],
              },
              options: {
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        beginAtZero: true,
                      },
                    },
                  ],
                },
                title: {
                  display: true,
                  text: "Nishi IT Institute",
                },
                responsive: true,
  
                tooltips: {
                  callbacks: {
                    labelColor: function (tooltipItem, chart) {
                      return {
                        borderColor: "rgb(255, 0, 20)",
                        backgroundColor: "rgb(255,20, 0)",
                      };
                    },
                  },
                },
                legend: {
                  labels: {
                    // This more specific font property overrides the global property
                    fontColor: "red",
                  },
                },
              },
            });
          }
        });
      }
    }
    customElements.define("cw-simplified", Visuals);
  })();
  
