import * as BABYLON from '@babylonjs/core/Legacy/legacy';
import { sizeX, generations, amMice, amSnakes, amCats } from '$lib/stores.js';

export const startGame = (canvas) => {
	var engine = new BABYLON.Engine(canvas);
	var scene = new BABYLON.Scene(engine);
	scene.clearColor = new BABYLON.Color3(0.8, 0.8, 0.8);
	var camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 0, -10), scene);
	var light = new BABYLON.PointLight('light', new BABYLON.Vector3(10, 10, 0), scene);

	var box = BABYLON.Mesh.CreateBox('box', 2, scene);
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

	var t = 0;
	var renderLoop = function () {
		scene.render();
		t -= 0.01;
		box.rotation.y = t * 2;
		torus.scaling.z = Math.abs(Math.sin(t * 2)) + 0.5;
		cylinder.position.y = Math.sin(t * 3);
	};
  var initScene = function () {
    
  };
	engine.runRenderLoop(renderLoop);
	return scene;
};
