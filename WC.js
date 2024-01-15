(function () {
  let tmpl_btn = document.createElement("template");
  let tmpl_popup = document.createElement("template");
  tmpl_btn.innerHTML = `<style>
    #newBTN {
      padding: 5px 20px;
      margin-left: 5px;
      font-size: 15px;
      background-color: #008CBA;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  </style>
  <button type="button" id="newBTN">Visualize Performance</button>
  `;
  tmpl_popup.innerHTML = `
    <style>  
      #popup-content {
        background-color: white;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
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
      shadowRoot.appendChild(tmpl_btn.content.cloneNode(true));
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
          //this.shadowRoot.appendChild(popup);
          let globalView = document.getElementsByClassName(
            "sapHcsShellMainContent"
          )[0];
          globalView.appendChild(popup);
          let lv_popup = document.getElementById("popup");
          lv_popup.style.zIndex = "99";
          lv_popup.style.height = "500px";
          lv_popup.style.width = "500px";
        }
      });
    }
  }
  customElements.define("cw-simplified", Visuals);
})();
