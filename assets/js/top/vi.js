 // シーン
 (function() {

  var scene = new THREE.Scene();
  var width = window.innerWidth;
  var height = window.innerHeight;

  var geometry = new THREE.PlaneGeometry(1000, 1000);
  var material = new THREE.MeshBasicMaterial( { color: 0x000000, opacity: 0.0, transparent: true } );
  var cube = new THREE.Mesh(geometry, material);
  cube.position.set(100, 100 / 2, 100);
  scene.add(cube);


  // 背景
  var geometry = new THREE.SphereGeometry(100, 100, 100);
  var bgImg = new THREE.ImageUtils.loadTexture('../../images/top/sky2.jpg')
  var uniforms = {
    texture: { type: 't', value:  bgImg }
  };
  var material = new THREE.ShaderMaterial( {
    uniforms:       uniforms,
    vertexShader:   document.getElementById('sky-vertex').textContent,
    fragmentShader: document.getElementById('sky-fragment').textContent
  });
  skyBox = new THREE.Mesh(geometry, material);
  skyBox.scale.set(-70, 70, 70);
  skyBox.position.set(50 * 100, 250, 50 * 100);
  skyBox.eulerOrder = 'XZY';
  skyBox.renderDepth = 2000.0;
  //skyBox.position.setY(300);
  scene.add(skyBox);


  // light
  var light = new THREE.PointLight(0x0000F0, 1.5, 300);
  light.position.set(0, 100, 0);
  scene.add(light);
  var ambient = new THREE.AmbientLight(0xFFFFF0);
  scene.add(ambient);

  // camera
  var camera = new THREE.PerspectiveCamera(45, width/ height, 1, 15000);
  camera.position.set(0, 100 / 2, 0);

  // rendering
  var renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 1);
  renderer.autoClear = false;
  renderer.shadowMapEnabled = true;
  document.getElementById("webgl-bg").appendChild(renderer.domElement);
  console.log(renderer.domElement)

  setInterval(function() {
    camera.rotation.y += 0.02;
    renderer.render(scene, camera);
  }, 20);

 })();