class Stagiare {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }
}

const stagiare1 = new Stagiare("khalid", "marzoug");
const stagiare2 = "ZAKARIA SIDQUI";

console.log(stagiare1 instanceof Stagiare);
console.log(stagiare2 instanceof Stagiare);
