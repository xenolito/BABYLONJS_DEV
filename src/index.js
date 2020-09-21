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

//import "@babylonjs/loaders";
import { GLTFLoader } from "@babylonjs/loaders/glTF/2.0/glTFLoader";
import { SceneLoader } from "@babylonjs/core/Loading/sceneLoader";

//Meshes to load config object
import { Meshes } from "./gltf_models";

/*** CSS ***/
import "./css/global.scss";
import "./css/layouts.scss";

/*------------------------------------------------------------------------------------------------------*
                        DEGUG LIBRARIES
\*------------------------------------------------------------------------------------------------------*/
/*
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
*/

(function () {
  let divFps = document.getElementById("fps");
  // Get the canvas element from the DOM.
  const canvas = document.getElementById("renderCanvas");

  // Associate a Babylon Engine to it.
  const engine = new Engine(canvas);

  // Render every frame
  engine.runRenderLoop(() => {
    scene.render();
    divFps.innerHTML = engine.getFps().toFixed() + " fps";
  });

  window.addEventListener("resize", function () {
    engine.resize();
  });

  // Create our first scene.
  var scene = new Scene(engine);

  // Parameters: alpha, beta, radius, target position, scene
  var camera = new ArcRotateCamera(
    "Camera",
    0,
    0,
    15,
    new Vector3(0, 0, 0),
    scene,
    true
  );

  // Positions the camera overwriting alpha, beta, radius
  camera.setPosition(new Vector3(0, 5, 10));

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  /*
    // This creates and positions a free camera (non-mesh)
var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);

// This targets the camera to scene origin
camera.setTarget(Vector3.Zero());

// This attaches the camera to the canvas
camera.attachControl(canvas, true);
*/
  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  var light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;

  // Create a grid material
  var material = new GridMaterial("grid", scene);

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

  //scene.debugLayer.show();

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
  /*let loadMesh = loadMeshGltf(
    gltfMeshesToTest.meshes[gltfMeshesToTest.meshes.length]
  );*/

  /*------------------------------------------------------------------------------------------------------*
                            SHOW DEBUG LAYER
    \*------------------------------------------------------------------------------------------------------*/
  //scene.debugLayer.show();

  /*
    SceneLoader.ImportMeshAsync(null, assetsBaseURL + "sans/", "scene.gltf", scene).then(function (
        result
    ) {
        result.meshes[0].position.x = -0.5;
        result.meshes[0].position.y = 1;
        result.meshes[0].scaling.scaleInPlace(1);
        camera.setTarget(result.meshes[0], false, false);
        camera.allowUpsideDown = false;
        console.log("mesh loaded");
        return result.meshes[0];
    });
    */

  function loadMeshGltf(meshKeyName) {
    SceneLoader.ImportMeshAsync(
      null,
      Meshes.baseURL + Meshes.meshes[meshKeyName].dir + "/",
      Meshes.meshes[meshKeyName].mesh,
      scene
    ).then(function (result) {
      result.meshes[0].position.x =
        Meshes.meshes[meshKeyName].position.x || -0.5;
      result.meshes[0].position.y =
        Meshes.meshes[meshKeyName].position.y || 1.5;
      result.meshes[0].position.z = Meshes.meshes[meshKeyName].position.z || 0;
      result.meshes[0].scaling.scaleInPlace(
        Meshes.meshes[meshKeyName].scale || 1
      );
      camera.setTarget(result.meshes[0], false, false);
      camera.allowUpsideDown = false;

      camera.lowerBetaLimit = 0.1;
      camera.upperBetaLimit = (Math.PI / 2) * 1.1;
      camera.lowerRadiusLimit = 3;
      camera.upperRadiusLimit = 45;
      // camera sensitivity
      //sensitivity
      //camera.angularSensibilityX = 4100;
      //camera.angularSensibilityY = 6500;
      //camera.panningSensibility = 100;
      //camera.speed = 0.5;
      camera.pinchPrecision = 50.0;
      //camera.pinchDeltaPercentage = 800;

      return result.meshes[0];
    });
  }
})();
