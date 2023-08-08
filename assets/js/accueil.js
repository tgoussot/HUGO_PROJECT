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


// ECRAN DE CHARGEMENT 
let scene, camera, renderer, reelMaterial, reel, filmPlane;

function init() {
    // Initialisation de la scène, de la caméra et du rendu
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('three-container').appendChild(renderer.domElement);

    // Création de la bobine de film
    const reelGeometry = new THREE.CylinderGeometry(5, 5, 2, 32);
    reelMaterial = new THREE.MeshBasicMaterial({ 
        map: new THREE.TextureLoader().load('bobine.jpg') // Remplacez par votre texture de bobine
    });
    reel = new THREE.Mesh(reelGeometry, reelMaterial);
    scene.add(reel);

    // Plan sur lequel le "film" sera projeté
    const planeGeometry = new THREE.PlaneGeometry(20, 10, 1, 1);
    const planeMaterial = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('path_to_video_frame.jpg') // Remplacez par une image ou un extrait de film
    });
    filmPlane = new THREE.Mesh(planeGeometry, planeMaterial);
    filmPlane.position.set(0, 0, -10);
    scene.add(filmPlane);

    camera.position.z = 15;
    animate();
}

function animate() {
    requestAnimationFrame(animate);

    // Rotation de la bobine
    reel.rotation.x += 0.01;
    reel.rotation.y += 0.01;

    renderer.render(scene, camera);
}

// Masquer l'écran de chargement après 5 secondes
window.addEventListener('load', function() {
    init();

    setTimeout(function() {
        var preloader = document.getElementById('preloader');
        preloader.style.display = 'none';
    }, 5000);
});

