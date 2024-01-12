(function () {
    let tmpl_btn=document.createElement('template');
    let tmpl_popup = document.createElement('template');
    tmpl_btn.innerHTML=`<style>
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
      #popup {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: flex-start;
      }  `;
    

    class Visuals extends HTMLElement{
        constructor(){
            super();
            this.init();
        }
        init(){
            let shadowRoot=this.attachShadow({mode:"open"});
            shadowRoot.appendChild(tmpl_btn.content.cloneNode(true));
            shadowRoot.appendChild(tmpl_popup.content.cloneNode(true));
            this.addEventListener("click", event => {
                var event= new Event("onClick");
                this.fireChanged();
                this.dispatchEvent(event);
            });
            }
        
    fireChanged(){
        console.log("OnClick Triggered.")
    }
}

    customElements.define(cw-simplified,Visuals);
})();
