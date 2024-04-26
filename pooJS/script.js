class Personne {
  constructor(id, nom, prenom) {
    this.id = id;
    this.nom = nom;
    this.prenom = prenom;
  }
  presentez_vous() {
    return "I am : " + this.nom + " " + this.prenom;
  }
}

let personne1 = new Personne(56898, "MARZOUG", "KHALID");
let personne2 = new Personne(56899, "SIDQUI", "ZAKARIA");

// Heritage :
class Etudiant extends Personne {
  constructor(id, nom, prenom, groupe, note) {
    super(id, nom, prenom);
    this.groupe = groupe;
    this.note = note;
  }
  presentez_vous() {
    return super.presentez_vous() + " " + "groupe : " + this.groupe;
  }
  moyenne() {
    return this.note;
  }
}

let etudiant1 = new Etudiant(1, "MARZOUG", "KHALID", "DD-105", 15);

console.log(etudiant1.presentez_vous());
console.log(etudiant1.moyenne());

// key events :
document.addEventListener("keyup", function (event) {
  if (event.key === "ArrowLeft") {
    document.body.style.background = "#001100";
    console.log(event.keyCode);
  } else if (event.key === "ArrowRight") {
    document.body.style.background = "#115500";
    console.log(event.keyCode);
  }
});
let google;
document.getElementById("btn").onclick = function () {
  google = window.open("https://google.com/", "_blank");
};

document.getElementById("btnn").onclick = function () {
  console.log("OOOOOK");
  google.close();
};
