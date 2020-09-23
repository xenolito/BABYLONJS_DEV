//import { Engine } from "@babylonjs/core/Engines/engine"; // Imported automatically for all modules via WEBPACK's ProvidePlugin
//import { Scene } from "@babylonjs/core/scene"; // Imported automatically for all modules via WEBPACK's ProvidePlugin
//import { Vector3 } from "@babylonjs/core/Maths/math"; // Imported automatically for all modules via WEBPACK's ProvidePlugin
//import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Mesh } from "@babylonjs/core/Meshes/mesh";

import { GridMaterial } from "@babylonjs/materials/grid";
// Required side effects to populate the Create methods on the mesh class. Without this, the bundle would be smaller but the createXXX methods from mesh would not be accessible.
import "@babylonjs/core/Meshes/meshBuilder";
import { Color4, Color3 } from "@babylonjs/core/Maths/math.color";
//import "@babylonjs/loaders";
import { GLTFLoader } from "@babylonjs/loaders/glTF/2.0/glTFLoader";
import { SceneLoader } from "@babylonjs/core/Loading/sceneLoader";

//Meshes to load config object
import { Meshes } from "./gltf_models";

/***  Own components  ***/

import DefaultScene from "./default_scene";

/*** CSS ***/
import "./css/global.scss";
import "./css/layouts.scss";

(function () {
  let myScene = new DefaultScene("renderCanvas", {
    showFPS: true, // boolean
    camera: null, // camera obj.
    debug: true, // boolean
  });

  //  myScene.createScene();

  // Create a grid material
  //var material = new GridMaterial("grid", scene);

  /*
    // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
    var sphere = Mesh.CreateSphere("sphere1", 16, 2, scene);
    // Move the sphere upward 1/2 its height
    sphere.position.y = 2;
    // Affect a material
    sphere.material = material;
    */

  // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
  //  var ground = Mesh.CreateGround("ground1", 6, 6, 2, scene);

  // Affect a material
  //ground.material = material;

  /*
    Promise.all([
        SceneLoader.ImportMeshAsync(null, baseUrl + "BoomBox/glTF/", "BoomBox.gltf", scene).then(
            function (result) {
                result.meshes[0].position.x = 1.5;
                result.meshes[0].position.y = 0.5;
                result.meshes[0].scaling.scaleInPlace(50);
            }
        ),
        SceneLoader.ImportMeshAsync(null, baseUrl + "Avocado/glTF/", "Avocado.gltf", scene).then(
            function (result) {
                result.meshes[0].position.x = -0.01;
                result.meshes[0].position.y = -0.01;
                result.meshes[0].scaling.scaleInPlace(10.25);
            }
        )
    ]).then(() => {});

    */

  /*SceneLoader.ImportMeshAsync(null, baseUrl + "Avocado/glTF/", "Avocado.gltf", scene).then(
        function (result) {
            result.meshes[0].position.x = 1;
            result.meshes[0].position.y = 0.5;
            result.meshes[0].scaling.scaleInPlace(10);
            console.log("mesh loaded");
        }
    );
    */

  /* SceneLoader.ImportMeshAsync(null, assetsBaseURL + "BoomBox-web/", "BoomBox.gltf", scene).then(
        function (result) {
            result.meshes[0].position.x = -0.5;
            result.meshes[0].position.y = 1;
            result.meshes[0].scaling.scaleInPlace(50);
            console.log("mesh loaded");
        }
    );
    */

  const lastMesh = Object.keys(Meshes.meshes)[
    Object.keys(Meshes.meshes).length - 1
  ];

  let loadMesh = loadMeshGltf(lastMesh);

  function loadMeshGltf(meshKeyName) {
    SceneLoader.ImportMeshAsync(
      null,
      Meshes.baseURL + Meshes.meshes[meshKeyName].dir + "/",
      Meshes.meshes[meshKeyName].mesh,
      myScene._scene
    ).then(function (result) {
      result.meshes[0].position.x =
        Meshes.meshes[meshKeyName].position.x || -0.5;
      result.meshes[0].position.y =
        Meshes.meshes[meshKeyName].position.y || 1.5;
      result.meshes[0].position.z = Meshes.meshes[meshKeyName].position.z || 0;
      result.meshes[0].scaling.scaleInPlace(
        Meshes.meshes[meshKeyName].scale || 1
      );
      myScene._defCamera.setTarget(result.meshes[0], false, false);
      myScene._defCamera.allowUpsideDown = false;

      myScene._defCamera.lowerBetaLimit = 0.1;
      myScene._defCamera.upperBetaLimit = (Math.PI / 2) * 1.1;
      myScene._defCamera.lowerRadiusLimit = 3;
      myScene._defCamera.upperRadiusLimit = 45;
      // camera sensitivity
      //sensitivity
      //camera.angularSensibilityX = 4100;
      //camera.angularSensibilityY = 6500;
      //camera.panningSensibility = 100;
      //camera.speed = 0.5;
      myScene._defCamera.pinchPrecision = 50.0;
      //camera.pinchDeltaPercentage = 800;

      return result.meshes[0];
    });
  }
})();
