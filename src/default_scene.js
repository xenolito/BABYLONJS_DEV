//import { Engine } from "@babylonjs/core/Engines/engine"; // Imported automatically for all modules via WEBPACK's ProvidePlugin
//import { Scene } from "@babylonjs/core/scene"; // Imported automatically for all modules via WEBPACK's ProvidePlugin
//import { Vector3 } from "@babylonjs/core/Maths/math"; // Imported automatically for all modules via WEBPACK's ProvidePlugin

//import "@babylonjs/core/Debug/debugLayer";
//import "@babylonjs/inspector";

import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { GridMaterial } from "@babylonjs/materials/grid";
/*import {
  Color3,
  Color4,
  Vector2,
  Vector3,
  Plane,
} from "@babylonjs/core/Maths/math";*/

// Required side effects to populate the Create methods on the mesh class. Without this, the bundle would be smaller but the createXXX methods from mesh would not be accessible.
import "@babylonjs/core/Meshes/meshBuilder";
import { Color4, Color3 } from "@babylonjs/core/Maths/math.color";

export default class DefaultScene {
  constructor(canvasID, options) {
    this._canvas = document.getElementById(canvasID);
    this._engine = new Engine(this._canvas, true, null, true);
    window._engine = this._engine; // learn how to do this properly without referencing on window
    this._fpsUI = options?.showFPS && this.buildFPSui();
    this._defCamera = options?.camera;
    this._debugUI = options?.debug && this.showDegugUI();

    this.createScene();
  }

  createScene() {
    this._scene = new Scene(this._engine);
    //this._scene.clearColor = Color4.FromColor3(Color3.Random());
    this._scene.clearColor = new Color4(0, 0, 0, 0);
    this._defCamera = this.createCamera();
    this.createLight();
    this.doRender();
    this.resize();
  }

  createCamera() {
    if (!this._defCamera) {
      this._defCamera = new ArcRotateCamera(
        "Camera",
        0,
        0,
        15,
        new Vector3(0, 0, 0),
        this._scene,
        true
      );
    }
    this._defCamera.setPosition(new Vector3(0, 5, 10));
    this._defCamera.attachControl(this._canvas, true);
    this._defCamera.setTarget(Vector3.Zero());
    return this._defCamera;
  }

  createLight() {
    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    this._defLight = new HemisphericLight(
      "light1",
      new Vector3(0, 1, 0),
      this._scene
    );
    this._defLight.intensity = 0.7;
    return this._defLight;
  }

  doRender() {
    this._engine.runRenderLoop(() => {
      this._scene.render();
      if (this._fpsUI)
        this._fpsUI.innerHTML = this._engine.getFps().toFixed() + " fps";
    });
  }

  buildFPSui() {
    let uid = "fps_" + Date.now();
    let fpsel = document.createElement("div");
    fpsel.id = uid;
    fpsel.innerHTML = "0";
    document.body.appendChild(fpsel);
    return document.getElementById(uid);
  }

  showDegugUI() {
    //this._scene.debugLayer.show();
  }

  resize() {
    //console.log(window.innerWidth);
    window.addEventListener("resize", function () {
      this._engine.resize();
    });
  }
}
