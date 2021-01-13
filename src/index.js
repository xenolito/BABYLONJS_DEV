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
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import firma from "console-signature";

/*import "core-js/stable";
import "regenerator-runtime/runtime";*/

(function () {
  firma();

  let myScene = new DefaultScene("renderCanvas", {
    showFPS: true, // boolean
    camera: null, // camera obj.
    debug: true, // boolean
  });

  function errorHandle(err) {
    console.log(err);
  }

  async function x() {
    const url = "https://www.caisocios.com/wp-json/wp/v2/";
    const data = await (
      await fetch(url + "pages/?per_page=20").catch(errorHandle)
    ).json();

    Object.keys(data).forEach((key) => console.table(data[key].title));

    console.table(data);
  }

  x();

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

  //let myModel = loadMeshGltf(lastMesh, meshLoaded);
  //let loadMesh = loadMeshGltf("fcar", meshLoaded);
  let loadMesh = loadMeshGltf("fcar", meshLoaded);
  function loadMeshGltf(meshKeyName) {
    let camera = myScene._defCamera;
    SceneLoader.ShowLoadingScreen = true;

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

      // ! console.table(result.meshes[0]);

      // Default Camera configurations

      camera.setTarget(result.meshes[0], false, false);
      camera.allowUpsideDown = false;

      //camera.lowerBetaLimit = 0.1;
      //camera.upperBetaLimit = (Math.PI / 2) * 1.1;
      camera.lowerRadiusLimit = 3;
      camera.upperRadiusLimit = 45;

      camera.useFramingBehavior = true;
      camera.framingBehavior.elevationReturnTime = 1200;
      camera.framingBehavior.defaultElevation = 0.45;
      camera.framingBehavior.autoCorrectCameraLimitsAndSensibility = true;

      //console.table(camera);

      // camera sensitivity
      //sensitivity
      //camera.angularSensibilityX = 4100;
      //camera.angularSensibilityY = 6500;
      //camera.panningSensibility = 100;
      //camera.speed = 0.5;

      // Zoom Out
      camera.pinchPrecision = 50.0;
      //camera.wheelPrecision = 50; //Mouse wheel speed
      camera.wheelDeltaPercentage = 0.01; //Mouse wheel speed

      camera.useAutoRotationBehavior = true;

      //console.log(camera.autoRotationBehavior);

      camera.autoRotationBehavior._zoomStopsAnimation = false;
      camera.autoRotationBehavior._idleRotationSpeed = 0.2;
      camera.autoRotationBehavior._idleRotationWaitTime = 1500;

      /*
      //Buncing behavior
      camera.useBouncingBehavior = true;
      camera.bouncingBehavior.transitionDuration = 300; //The transition time of the rebound effect
      camera.bouncingBehavior.lowerRadiusTransitionRange = 3.5; //The range of the rebound when the closest distance is reached. The default value is 2
      camera.bouncingBehavior.upperRadiusTransitionRange = -1; //Resilience distance when reaching the farthest distance, the default value is -2
      camera.bouncingBehavior.autoTransitionRange = false; // Whether to automatically define the lowerRadiusTransitionRange and upperRadiusTransitionRange values, the default value is false. The transition range is set to 5% of the diagonal box in world space
*/

      /*
      camera.autoRotationBehavior.idleRotationSpeed ​​= 1; //Automatic rotation speed
      camera.autoRotationBehavior.idleRotationWaitTime = 1000; //How many times after the user interaction turns on automatic rotation (milliseconds)
      camera.autoRotationBehavior.idleRotationSpinupTime = 1000; //Time (milliseconds) from the start of automatic rotation to the set rotation speed
      camera.autoRotationBehavior.zoomStopsAnimation = true; //Set whether the zoom will stop auto-rotating
        */

      meshLoaded(meshKeyName, myScene, result.meshes[0]);
      return result.meshes[0];
    });
  }

  function meshLoaded(keyname, scene, model) {
    //console.log(`Model loaded ==> ${model}`);
    console.log(`MESH ${keyname} LOADED!`);
    //console.dir(model);
  }

  function rotateModel(scene, model) {
    /*let axis = new Vector3(1, 1, 1);
    var axisLine = MeshBuilder.CreateLines(
      "axis",
      { points: [axis.scale(-5), axis.scale(5)] },
      myScene._scene
    );
    axis.normalize();*/
    let theta = Math.PI;

    myScene._scene.beforeRender = function () {
      theta += 0.01;
      let axis = new Vector3(0, 1, 0);
      const quaternion = new Quaternion.RotationAxis(
        axis,
        Math.round((theta + Number.EPSILON) * 100) / 100
      );
      model.rotationQuaternion = quaternion;

      //console.log(quaternion);
    };
  }
})();
