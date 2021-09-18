// WHAT WE HAVE ACCOMPLISH RIGHT NOW
// 1 LOAD A 3D MODEL FROM BLENDER
// 2 LOAD A 360 picture and put is a a mesh inside a sphere!!
// TO DO:
// CHANGE THE PICTURE WHEN SOMETHING HAPPEN --DONE :D
// WHAT WE ACCOMPLISHED TODAY:
// 1: CHANGE BETWEEN TWO OR MORE MESHES IN SPHERES
// 2: TOUCH A CERTAIN PART OF A MODEL
//
//IF WE WERE ABOUT TO BUILD A SOFTWARE FOR THIS THING I THINK WE WOULD HAVE
//AROUND 40% DONE, TO ME ITS GOING FOR GOD PATH
//
//TO DO FOR TOMORROW : 
//1) MAKE A BETTER FIT FOR A PATH ... 
// A) Try with something that looks more like a path... a line will work!!!
// B) rotate with the keys then we can put it more like a path
// C) make somethign that float over the path... this will make look like google/// DONE :D
//
//
//
//11 september
//better control of the path, keep it on, you can do it!
//try to keep the rotation of the camera in only one point, respect to the same camera
///
import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/controls/OrbitControls.js';
import {OBJLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/loaders/OBJLoader.js';

import {MTLLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/loaders/MTLLoader.js';

let camera, scene, sphereInter,edit_flag;

/// this is for the mouse move and raycaster
  
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  var objects = []
function main() {
  var edit_flag  = true;
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({canvas});

  const fov = 80;
  const aspect = window.innerWidth / window.innerHeight;  // the canvas default
  const near = 1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 10, 20);

  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 0, 0);
  controls.update();
  
  scene = new THREE.Scene();
  const geometry = new THREE.SphereGeometry(300,128,48);
  geometry.scale(-1,1,1);
  var texture = new THREE.TextureLoader().load('test1.JPG');
  const material = new THREE.MeshBasicMaterial({map: texture});
  const mesh = new THREE.Mesh(geometry, material);
  //scene.add(mesh);

  //scene.background = new THREE.Color('black');
  //
//LETS CREATE THE SPHERE THAT WILL SHOW JUST OVER ANY 3D MODEL :D
  const new_dot  = new THREE.SphereGeometry( 2 );
  const dot_material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
  sphereInter = new THREE.Mesh( new_dot, dot_material );
  sphereInter.visible = false;
  scene.add( sphereInter );

    //
    
    const objLoader = new OBJLoader();
    var road;
    var xSpeed = 0.1;
    var ySpeed = 0.1;
document.addEventListener("mousemove",onMouseMove,false);
document.addEventListener("mousedown",createSphere,false);
document.addEventListener("keydown", onDocumentKeyDown, false);

function createSphere(event){ 
    mouse.x = ( event.clientX / canvas.clientWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / canvas.clientHeight ) * 2 + 1;
    console.log('lets create a sphere');
    const geometry = new THREE.SphereGeometry(3,64,32);
    //geometry.scale(-1,1,1);
    mesh.updateMatrixWorld();
    const material = new THREE.MeshBasicMaterial({color: 0xffff00});
    const dot = new THREE.Mesh(geometry, material);
    //dot.position.set(mouse.x*20, mouse.y*20, mouse.x*20);
    const intersects = raycaster.intersectObjects( objects, true );
    if (edit_flag == true){
	    if ( intersects.length > 0 ) {
		    dot.position.copy( intersects[ 0 ].point );
            scene.add(dot);
        }
    }
    else{
        if(intersects.length > 0){
         var length=10;
         var dir = camera.position.clone().sub(intersects[0].point).normalize().multiplyScalar(length);
         //camera.position.copy(intersects[0].point.clone().add(dir));
         camera.lookAt(0,0,0);
         
         //controls.target.set(intersects[0].point);
         //controls.update();
         camera.updateProjectionMatrix();
         console.log(intersects[0].point);
        }
    }
}

function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 87) {
        road.position.y += ySpeed;
        console.log(road.position.y)
    } else if (keyCode ==69){
        edit_flag = false;
    } else if (keyCode == 83) {
        road.position.y -= ySpeed;
    } else if (keyCode == 65) {
        road.position.x -= xSpeed;
    } else if (keyCode == 68) {
        road.position.x += xSpeed;
    } else if (keyCode == 32) {
        road.position.set(0, 0, 0);
    }else if(keyCode == 71){
        //how the fuck do we change the texture of the sphere?
        
     //const geometry = new THREE.SphereGeometry(300,128,48);
     //geometry.scale(-1,1,1);
     mesh.updateMatrixWorld();
     var texture2 = new THREE.TextureLoader().load('test2.JPG');
     const material2 = new THREE.MeshBasicMaterial({map: texture2});
     const mesh2 = new THREE.Mesh(geometry, material2);
     scene.add(mesh2);
    }else if(keyCode == 78){
        //how the fuck do we change the texture of the sphere?
        
     //const geometry = new THREE.SphereGeometry(300,128,48);
     //geometry.scale(-1,1,1);
     var texture3 = new THREE.TextureLoader().load('test1.JPG');
     const material3 = new THREE.MeshBasicMaterial({map: texture3});
     const mesh3 = new THREE.Mesh(geometry, material3);
     scene.add(mesh3);
    }
}

  {
    const planeSize = 40;

    const loader = new THREE.TextureLoader();
    //const texture = loader.load('https://threejsfundamentals.org/threejs/resuources/images/checker.png');
    //texture.wrapS = THREE.RepeatWrapping;
    //texture.wrapT = THREE.RepeatWrapping;
    //texture.magFilter = THREE.NearestFilter;
    //const repeats = planeSize / 2;
    //texture.repeat.set(repeats, repeats);

    //const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
    //const planeMat = new THREE.MeshPhongMaterial({
      //map: texture,
      //side: THREE.DoubleSide,
    //});
    //const mesh = new THREE.Mesh(planeGeo, planeMat);
    //mesh.rotation.x = Math.PI * -.5;
    //scene.add(mesh);
  }

  {
    const skyColor = 0xB1E1FF;  // light blue
    const groundColor = 0xFFFFFF;  // brownish orange
    const intensity = 1.1;
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    scene.add(light);
  }

  {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(0, 10, 0);
    light.target.position.set(-5, 0, 0);
    scene.add(light);
    scene.add(light.target);
  }

  {
      console.log('fuck you@@@@')
    var materialLoader = new MTLLoader()
      materialLoader.setMaterialOptions( { invertTrProperty: true } )
          materialLoader.load('cerro.mtl', (materials) => {
              materials.preload();
              new OBJLoader()
              .setMaterials(materials)
              .load('cerro.obj',function(object){
                //object.position.y = -95;
                var texture2 = new THREE.TextureLoader().load("cerro.1001.jpg");
              object.traverse(function (child) {// aka setTexture
                if (child instanceof THREE.Mesh) {
                    child.material.map = texture2;
                    child.geometry.center();
                }
            });
           // objects.push(object);
            scene.add(object);
            //mesh.updateMatrixWorld();
        });
              })

  }

  function resizeRendererToDisplaySize(renderer) {

    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }


function onMouseMove( event ) {
	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components

	mouse.x = ( event.clientX / canvas.clientWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / canvas.clientHeight ) * 2 + 1;
    raycaster.setFromCamera( mouse, camera );

	const intersects = raycaster.intersectObjects( objects, true );
	if ( intersects.length > 0 ) {
		sphereInter.visible = true;
		sphereInter.position.copy( intersects[ 0 ].point );
	} else {
		sphereInter.visible = false;
	}
	renderer.render( scene, camera );
}

  function render() {
    raycaster.setFromCamera( mouse, camera );

	// calculate objects intersecting the picking ray
	const intersects = raycaster.intersectObjects(objects,true );
	for ( let i = 0; i < intersects.length; i ++ ) {
		intersects[ i ].object.material.color.set( 0xff0000 );
	}

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
