var CanvasWaveGradient = (function() {
  function Gradient(cvs) {
    this._cvs = cvs;
    this._ctx = cvs.getContext("2d");
    
    let w = cvs.parentElement.clientWidth;
    let h = cvs.parentElement.clientHeight;
    this._ctx.width = w;
    this._ctx.height = h;
    this._cvs.width = w;
    this._cvs.height = h;
    
    this._fillGrad = this._ctx.createLinearGradient(0, 0, this._ctx.width, this._ctx.height);
    this._fillGrad.addColorStop(1, "#9900cc");
    this._fillGrad.addColorStop(0, "#ff6666");
    
    this._strokeGrad = this._ctx.createLinearGradient(0, 0, this._ctx.width, this._ctx.height);
    this._strokeGrad.addColorStop(0, "#ff9999");
    this._strokeGrad.addColorStop(1, "#ff0066");
    
    this.rate = 0.03;
    this.amp = 40;
    this.osc = 1;
    this._theta = 0;
  }
  
  Gradient.prototype.draw = function() {
    let ctx = this._ctx;
    
    ctx.fillStyle = this._fillGrad;
    ctx.fillRect(0, 0, ctx.width, ctx.height);
    
    ctx.strokeStyle = this._strokeGrad;
    
    let dx = 5;
    let dt = (this.osc * Math.PI * 2 / ctx.width) * dx;
    
    ctx.beginPath();
    for (let bY = -37.5; bY < ctx.height + 37.5; bY += 25) {
      ctx.moveTo(0, bY);
      let tTheta = this._theta;
      for (let x = 5; x < ctx.width + 10; x += dx, tTheta += dt) {
        ctx.lineTo(x, bY + (Math.sin(tTheta) * (this.amp * x / ctx.width)));
      }
    }
    
    ctx.stroke();
    
    this._theta -= this.rate;
    this._theta %= Math.PI * 2;
  }
  
  return Gradient;
})();

var SvgWaveGradient = (function() {
  function Gradient(cont) {
    let svg = document.createElement("svg");
    this._svg = svg;
    svg.width = cont.clientWidth;
    svg.height = cont.clientHeight;
    cont.appendChild(svg);
    
    let backGrad = document.createElement("linearGradient");
    backGrad.x1 = "";
    
    let bkg = document.createElement("rect");
    this._bkg = bkg;
    bkg.width = svg.width;
    bkg.height = svg.height;
  }
  
  return Gradient;
})();