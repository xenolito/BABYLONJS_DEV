const canvas = document.getElementById("renderCanvas");
const engine2 = new Engine(canvas);
const scene2 = new Scene(engine2);

export default function sayHi() {
  //engine2.resize();
  console.log("Hola scene2: " + scene2.render());
  return "Hola que ase 🙂  y ole";
}
