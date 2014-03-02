/*
 * Waves - Cláudio Marinho (claudio@bacae.com)
 */

'use strict'


var camera, scene, renderer, controls;
var geometry, material, mesh, light;

var angles = Array();
var speed = 0.05;
var range = 200;

function init() {

	
	// Camera
	camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.x = 0;
	camera.position.y = 0;
	camera.position.z = 1500;
		
		
	// Controls
	controls = new THREE.OrbitControls( camera );
	
	
	// Scene
	scene = new THREE.Scene();
	
	
	// Geometry
	geometry = new THREE.PlaneGeometry(1000, 1000, 4, 4);
		
	
	// Material
	material = new THREE.MeshBasicMaterial( { color:0x0000ff, wireframe:true, wireframeLinewidth:0.5 } ); 
	
	
	// Mesh
	mesh = new THREE.Mesh( geometry, material );
	mesh.rotation.x = -0.5;	
	scene.add( mesh );
	
	
	// Angles 
	for(var i in geometry.vertices)
	{
		angles.push( i * 0.2 );
	}
	

	// renderer
	renderer = new THREE.CanvasRenderer( { antialias: false } );	
	renderer.setSize( window.innerWidth, window.innerHeight );
	
	
	// Canvas
	document.body.appendChild( renderer.domElement );

	
	// Listener
	window.addEventListener( 'resize', onWindowResize, false );
	

}


function animate() {

   
	requestAnimationFrame( animate );
	
	for(var i in geometry.vertices)
	{
	
		mesh.geometry.vertices[i].z = 0 + Math.sin(angles[i])*range; 
		angles[i] += speed;
		
	}
		
	controls.update();		
	renderer.render( scene, camera );

}



function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}


window.onload = function()
{
	
	init();
	animate();

};


