var TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  };
  
  TxtRotate.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];
  
    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
  
    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
  
    var that = this;
    var delta = 300 - Math.random() * 100;
  
    if (this.isDeleting) { delta /= 2; }
  
    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }
  
    setTimeout(function() {
      that.tick();
    }, delta);
  };
  
  window.onload = function() {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-rotate');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtRotate(elements[i], JSON.parse(toRotate), period);
      }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);
  };

// BOUTON RETOUR EN HAUT 
window.onscroll = function() {showButton()};

function showButton() {
  var btn = document.getElementById("myBtn");
  if (document.documentElement.scrollTop > 200 || document.body.scrollTop > 200) {
      btn.style.display = "block";
      setTimeout(function() { btn.style.opacity = "1"; }, 10);
  } else {
      btn.style.opacity = "0";
      setTimeout(function() { btn.style.display = "none"; }, 500);  // correspond à la durée de la transition
  }
}

function topFunction() {
    var position = document.body.scrollTop || document.documentElement.scrollTop;
    if (position) {
        window.scrollBy(0, -Math.max(1, Math.floor(position / 10)));
        window.setTimeout(topFunction, 30);
    }
}

document.addEventListener("DOMContentLoaded", function() {
  animateSignature();
});

function animateSignature() {
  // Sélectionnez tous les tracés dans le SVG
  const signaturePaths = document.querySelectorAll('.signature-container path');
  let delay = 0; // Initial delay

  signaturePaths.forEach(path => {
      const length = path.getTotalLength();
      
      // Définir les propriétés initiales
      path.style.transition = path.style.WebkitTransition = 'none';
      path.style.strokeDasharray = length + ' ' + length;
      path.style.strokeDashoffset = length;
      
      // Force le redessin du tracé (hack pour que les changements soient appliqués avant la transition)
      path.getBoundingClientRect();
      
      // Appliquer la transition avec un délai
      path.style.transition = path.style.WebkitTransition = `stroke-dashoffset 0.5s ease-in-out ${delay}s`;
      path.style.strokeDashoffset = '0';

      // Augmenter le délai pour le prochain tracé (lettre)
      delay += 0.5; // 3 secondes pour chaque lettre
  });
}