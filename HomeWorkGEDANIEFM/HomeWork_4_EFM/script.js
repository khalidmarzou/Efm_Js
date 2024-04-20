class Stagiaire {
  static stagiaires = [
    {
      id: 1,
      nom: "Alami Hicham",
      note: 8,
      filiere: "TDI",
    },
  ];
  constructor(id, nom, note, filiere) {
    this.id = id;
    this.nom = nom;
    this.note = note;
    this.filiere = filiere;
  }
}
function addStagiaire(id, nom, note, filiere) {
  const stagiaire = new Stagiaire(id, nom, note, filiere);
  Stagiaire.stagiaires.push(stagiaire);
}
function removeStagiaire(idd) {
  const index = Stagiaire.stagiaires.findIndex((st) => st.id === idd);
  Stagiaire.stagiaires.splice(index, 1);
}
function findStagiaire(idd) {
  const stagiaire = Stagiaire.stagiaires.find((st) => st.id === idd);
  return stagiaire;
}

// Question 2 :
const inputs = Array.from(document.querySelectorAll('input[type = "number"]'));
inputs[1].setAttribute("type", "text");
function validation() {
  let valid = true;
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value === "") {
      inputs[i].classList.add("border", "border-success");
      inputs[i].classList.add("border", "border-danger");
      inputs[i].setAttribute("placeholder", "Champ Obligatoire");
      valid = valid && false;
    } else {
      inputs[i].classList.remove("border", "border-danger");
      inputs[i].classList.add("border", "border-success");
      valid = valid && true;
    }
  }
  // id unique :
  if (findStagiaire(Number(inputs[0].value)) !== undefined) {
    inputs[0].classList.add("border", "border-success");
    inputs[0].classList.add("border", "border-danger");
    inputs[0].value = "";
    inputs[0].setAttribute("placeholder", "id Unique");
    valid = valid && false;
  } else {
    valid = valid && true;
  }
  return valid;
}
// Test Question 2 et 3:
const btnAjouter = document.getElementById("btnAjouter");
btnAjouter.onclick = function () {
  if (validation()) {
    ajouterNote();
    actualiserNoteMax();
  } else {
    return null;
  }
};

// Question 3 :
function ajouterNote() {
  const tbody = document.getElementsByTagName("tbody")[0];
  let filiere = Array.from(
    document.querySelectorAll('input[name="filiere"]')
  ).find((box) => box.checked === true).nextElementSibling.textContent;
  let color = Number(inputs[2].value) > 10 ? "green" : "red";
  tbody.innerHTML += `<tr>
                            <td>${inputs[0].value}</td>
                            <td>${inputs[1].value}</td>
                            <td style="color : ${color}">${inputs[2].value}</td>
                            <td>${filiere}</td>
                            <td>
                                <input type="button" onclick="supprimer(event)" value="Supprimer" class="btn btn-danger" />
                            </td>
                        </tr>`;
  addStagiaire(
    Number(inputs[0].value),
    inputs[1].value,
    Number(inputs[2].value),
    filiere
  );
}

// Question 4 :
function afficheInfos() {
  const stagiaire = findStagiaire(Number(inputs[0].value));
  if (stagiaire !== undefined) {
    inputs[1].value = stagiaire.nom;
    inputs[2].value = stagiaire.note;
    Array.from(document.querySelectorAll("input[name='filiere']")).find(
      (radio) => {
        return radio.id === stagiaire.filiere.toLowerCase();
      }
    ).checked = true;
  } else {
    inputs[0].value = "";
    inputs[0].setAttribute("placeholder", "Not found");
  }
}

// test Q 4 :
document.getElementById("lire").onclick = afficheInfos;

// Question 5 :
function supprimer(event) {
  const idSt = Number(
    event.target.parentElement.parentElement.firstElementChild.textContent
  );
  removeStagiaire(idSt);
  event.target.parentElement.parentElement.remove();
  actualiserNoteMax();
}

// Question 6 :
function actualiserNoteMax() {
  if (Stagiaire.stagiaires.length !== 0) {
    const maxStagiaire = Stagiaire.stagiaires.reduce((acc, currentValue) => {
      return acc.note > currentValue.note ? acc : currentValue;
    });
    document.getElementById("noteMax").textContent = maxStagiaire.note;
  } else {
    document.getElementById("noteMax").textContent = "00";
  }
}
