const getById = (id) => {
  return document.getElementById(id);
};
// declaration button
const buttons = document.getElementsByTagName("button");
const btn_rechercher = buttons[0];
const btn_supprimer = buttons[1];
const btn_ajouter = buttons[2];
const btn_modifier = buttons[3];
// declaration input
const inputs = document.getElementsByTagName("input");
const rechercher = inputs[0];
const nomComplet = inputs[1];
const cin = inputs[2];
const age = inputs[3];
// declaration select
const selects = document.getElementsByTagName("select");
const sNiveau = selects[0];
const sBranche = selects[1];
// div show
let affichage = document.getElementsByTagName("li");
// variable
const Niveau = ["Qalifiant", "Technicien", "Technicien Specialise"];
const Branche = {
  Qalifiant: ["Mecanique", "electricite", "menuiserie"],
  Technicien: ["electro Mecaanique", "electricite Batiment"],
  "Technicien Specialise": [
    "Devloppment Digital",
    "Resaux Informatique",
    "Infographie",
    "Design",
  ],
};
class Students {
  static cmpt = 0;
  static listeStudents = ["student1"];
  constructor(nomComplet, cin, age, Branche, Niveau) {
    Students.cmpt += 1;
    Students.listeStudents.push("student" + (Students.cmpt + 1));
    this.nomComplet = nomComplet;
    this.cin = cin;
    this.age = age;
    this.Branche = Branche;
    this.Niveau = Niveau;
  }
}
// load option of niveau select
document.addEventListener("DOMContentLoaded", loadOptionNiveau);
function loadOptionNiveau() {
  Niveau.forEach((value) => {
    sNiveau.innerHTML += `<option value="${value}">${value}</option>`;
  });
}

// load option of branche select
sNiveau.addEventListener("change", function () {
  sBranche.innerHTML = "";
  let valueOfSelect = sNiveau.value;
  if (valueOfSelect === "") {
    return (sBranche.innerHTML = "");
  }
  Branche[valueOfSelect].forEach((value) => {
    sBranche.innerHTML += `<option value="${value}">${value}</option>`;
  });
});

// add student in liste

btn_ajouter.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    Students.listeStudents.find((item) => {
      return item.cin === cin.value;
    }) === undefined
  ) {
    Students.listeStudents[Students.listeStudents.length - 1] = new Students(
      nomComplet.value,
      cin.value,
      Number(age.value),
      sBranche.value,
      sNiveau.value
    );
    console.log(Students.listeStudents);
  } else {
    alert("deja exister ");
  }
});

// delete student
btn_supprimer.addEventListener("click", function (e) {
  e.preventDefault();
  let findIndex = Students.listeStudents.findIndex((item) => {
    return item.cin === rechercher.value;
  });
  Students.listeStudents.splice(findIndex, 1);
  Students.cmpt - 1;
});

// rechercher student

btn_rechercher.addEventListener("click", function (e) {
  e.preventDefault();
  let findIndex = Students.listeStudents.findIndex((item) => {
    return item.cin === rechercher.value;
  });
  const objectKeys = Object.keys(Students.listeStudents[findIndex]);
  objectKeys.forEach((value, index) => {
    affichage[index].innerHTML += Students.listeStudents[findIndex][value];
  });
});
