import * as BABYLON from '@babylonjs/core/Legacy/legacy';
import { sizeX, sizeY, generations, amMice, amSnakes, amCats } from '$lib/stores.js';
var engine,scene,camera,light,ground,mouse,cat,snake;
const mice = [];
const cats = [];
const snakes = [];
function createScene(canvas){
	console.log(sizeX);
    engine = new BABYLON.Engine(canvas);
	scene = new BABYLON.Scene(engine);
	scene.debugLayer.show();
	scene.clearColor = new BABYLON.Color3(0, 50, 25);
	camera = new BABYLON.UniversalCamera("camera1", new BABYLON.Vector3(0, 1, -sizeY), scene);
    camera.attachControl(canvas, true);
    camera.checkCollisions = true;
    camera.speed = 1;
	camera.keysUp.push(87); // “w”
camera.keysDown.push(83); // “s”
camera.keysLeft.push(65); // “a”
camera.keysRight.push(68); // “d”
    camera.inputs.addMouseWheel();
	light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, -15), scene);
  	light.intensity = 0.5;
  	ground = BABYLON.MeshBuilder.CreateGround("ground", {height: 100/*sizeX*/, width: 400/*sizeY*/, subdivisions: 1});
	var groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
	groundMaterial.backFaceCulling = false;
	ground.material = groundMaterial;
}
function initFirstGen(){
	for (let i = 0; i < 5/*amMice.length*/; i++) {
		let mouse = new Mouse(10,10,1);
	}
}
function gameLoop(canvas){
	createScene(canvas);
  	initFirstGen();
	/*var box = BABYLON.Mesh.CreateBox('box', 2, scene);
	box.rotation.x = -0.2;
	box.rotation.y = -0.4;

	var boxMaterial = new BABYLON.StandardMaterial('material', scene);
	boxMaterial.emissiveColor = new BABYLON.Color3(0, 0.58, 0.86);
	box.material = boxMaterial;

	var torus = BABYLON.Mesh.CreateTorus('torus', 2, 0.5, 15, scene);
	torus.position.x = -5;
	torus.rotation.x = 1.5;

	var torusMaterial = new BABYLON.StandardMaterial('material', scene);
	torusMaterial.emissiveColor = new BABYLON.Color3(0.4, 0.4, 0.4);
	torus.material = torusMaterial;

	var cylinder = BABYLON.Mesh.CreateCylinder('cylinder', 2, 2, 2, 12, 1, scene);
	cylinder.position.x = 5;
	cylinder.rotation.x = -0.2;

	var cylinderMaterial = new BABYLON.StandardMaterial('material', scene);
	cylinderMaterial.emissiveColor = new BABYLON.Color3(1, 0.58, 0);
	cylinder.material = cylinderMaterial;

	var t = 0;*/
	var renderLoop = function () {
		scene.render();
		/*t -= 0.01;
		box.rotation.y = t * 2;
		torus.scaling.z = Math.abs(Math.sin(t * 2)) + 0.5;
		cylinder.position.y = Math.sin(t * 3);*/
	};
  var initScene = function () {
    
  };
	engine.runRenderLoop(renderLoop);
	return scene;
}
const startGame = (canvas) => {
	gameLoop(canvas);
};
export {startGame};
class Mouse {
    constructor(posX, posY, generation) {
      this.posX = posX;
      this.posY = posY;
      this.generation = generation;
    }
	posX;
	posY;
	generation;
  }