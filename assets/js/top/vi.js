 // シーン
 (function() {

  var scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2( 0xffffff, 0.015 );
  var width = window.innerWidth;
  var height = window.innerHeight;
   

  var i;
  var simplexNoise = new SimplexNoise;
  var geometry = new THREE.PlaneGeometry( 150, 150, 64, 64 );
  geometry.computeFaceNormals();
  geometry.computeVertexNormals();
  var map1 = THREE.ImageUtils.loadTexture( 'images/top/grey.jpg' );
  for ( i = 0; i < geometry.vertices.length; i++ ) {
    var vertex = geometry.vertices[i];
    vertex.z = simplexNoise.noise( vertex.x / 10, vertex.y / 10 );

  }

  map1.wrapS = map1.wrapT = THREE.RepeatWrapping;
  map1.repeat.set( 4, 4 );
  ground = new THREE.Mesh(
      geometry,
      new THREE.MeshLambertMaterial( { map: map1 } )
  );

  ground.rotation.x = 0;
  ground.rotation.y = 1.4;
  ground.rotation.z = 1.5;
  ground.castShadow = true;
  ground.receiveShadow = true;
  scene.add( ground );


  var jsonLoader = new THREE.JSONLoader();
  jsonLoader.load("js/top/ramenshop.js", function(geometry, materials) { 
    var faceMaterial = new THREE.MeshFaceMaterial( materials );
    var mesh = new THREE.Mesh( geometry, faceMaterial );
    mesh.position.set(50, 10, 50); // 決めうち! mapには反映してないオブジェクト
    mesh.scale.set( 1000, 2000, 2000 );
    mesh.material.materials[0].ambient = mesh.material.materials[0].color;
    mesh.material.materials[1].ambient = mesh.material.materials[1].color;
    mesh.material.materials[2].ambient = mesh.material.materials[2].color;
    scene.add(mesh);
    loadsideObject = mesh;
  });

  var light = new THREE.DirectionalLight( 0xffffff, 1 );
  light.position.set( 20, 40, -15 );
  light.target.position.copy( scene.position );
  light.castShadow = true;
  light.shadowCameraLeft = -60;
  light.shadowCameraTop = -60;
  light.shadowCameraRight = 60;
  light.shadowCameraBottom = 60;
  light.shadowCameraNear = 20;
  light.shadowCameraFar = 200;
  light.shadowBias = -.0001
  light.shadowMapWidth = light.shadowMapHeight = 2048;
  light.shadowDarkness = .7;
  scene.add( light );

  // camera
  var camera = new THREE.PerspectiveCamera(45, width/ height, 1, 1000);
  camera.position.set( 0, 10, 0 );

  // rendering
  var renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(width, height);
  renderer.setClearColor(0xffffff, 1);
  // renderer.autoClear = false;
  // renderer.shadowMapEnabled = true;
  document.getElementById("webgl-bg").appendChild(renderer.domElement);

  function animate() {
    var timer = Date.now();
    requestAnimationFrame( animate );
    camera.position.y = 50 * Math.sin( timer / 50 * Math.PI / 360 );
     // camera.position.z = 50 * Math.cos( timer / 50 * Math.PI / 360 );
    camera.lookAt( scene.position );
    renderer.render( scene, camera );
  }

  animate();

  // interaction

  

  $("#webgl-bg").mousemove(function(e){
    // camera.position.x =   50 * Math.sin( e.clientX / 500 * Math.PI / 360 );
    // ground.rotation.x = e.clientX * Math.PI / 360
    // ground.rotation.y = e.clientX * Math.PI / 360
    // console.log("x:"+ground.rotation.x + "y:"+ground.rotation.y)
  });


 })();