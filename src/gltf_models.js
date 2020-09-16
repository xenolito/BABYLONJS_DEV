const assetsBaseURL = "https://webgl.pictau.com/3Dassets/meshes/";

const Meshes = {
  baseURL: assetsBaseURL,
  meshes: {
    alien: {
      dir: "Alien",
      mesh: "Alien.gltf",
      scale: 2,
      position: { x: -0.5, y: 1.5 },
    },
    brainStem: {
      dir: "BrainStem",
      mesh: "BrainStem.gltf",
      scale: 1.5,
    },
    cloth: {
      dir: "Sheen",
      mesh: "Cloth.gltf",
      position: { x: -0.5, y: 0.01 },
    },
    fan: {
      dir: "vintageDeskFan",
      mesh: "vintageFan_animated.gltf",
      scale: 0.08,
      position: { x: 0, y: 0, z: 0 },
    },
    bbox: {
      dir: "BoomBox",
      mesh: "UnlitBoomBox.gltf",
      scale: 100,
      position: { x: 0, y: 0, z: 0 },
    },
    buggy: {
      dir: "Buggy/glTF",
      mesh: "Buggy.gltf",
      scale: 0.05,
      position: { x: 0, y: 0, z: 0 },
    },
    marble: {
      dir: "Marble/marbleTower",
      mesh: "marbleTower.gltf",
      scale: 0.3,
      position: { x: 0, y: 10, z: -10 },
    },
    sans: {
      dir: "sans",
      mesh: "scene.gltf",
      scale: 1.8,
      position: { x: 0, y: 1.8, z: 1 },
    },
    ball: {
      dir: "shaderBall",
      mesh: "BabylonShaderBall_Simple.gltf",
      scale: 0.5,
      position: { x: 0, y: 3, z: 1 },
    },
    penguin: {
      dir: "penguin",
      mesh: "model.gltf",
      scale: 1,
      position: { x: 0, y: 3, z: 1 },
    },
    pedra: {
      dir: "pedra",
      mesh: "blank.gltf",
      scale: 0.1,
      position: { x: 0, y: 3, z: 1 },
    },
    deers: {
      dir: "deers",
      mesh: "Olen.gltf",
      scale: 1,
      position: { x: 0, y: 3, z: 1 },
    },
    fcar: {
      dir: "future_car",
      mesh: "Future_Car.gltf",
      scale: 0.5,
      position: { x: 0, y: 3, z: 1 },
    },
  },
};

export { Meshes };
