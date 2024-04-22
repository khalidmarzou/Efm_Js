// Question 2 :
function viderChamps() {
  const inputs = document.getElementsByTagName("input");
  for (let i = 0; i < 6; i++) {
    inputs[i].value = "";
  }
}

// Question 3 :
const matriculeInput = document.getElementsByName("matricule")[0];
function verifierMatricule() {
  const patternMatricule = /^(\d{1,8}-[a-z]-\d{1,2})$/i;
  const valid = patternMatricule.test(matriculeInput.value);
  if (!valid) {
    matriculeInput.style.borderColor = "red";
    matriculeInput.style.backgroundColor = "orange";
    matriculeInput.setAttribute("placeholder", "Matricule Invalid");
  } else {
    matriculeInput.style.borderColor = "green";
    matriculeInput.style.backgroundColor = "white";
  }
  return valid;
}

// Question  4:
const marqueInput = document.getElementsByName("marque")[0];
const carburantInput = document.getElementsByName("carburant")[0];

const verifierMarqueCarburant = () => {
  const pattern = /^([a-z]{4,15})$/i;
  const validMar = pattern.test(marqueInput.value);
  const validCar = pattern.test(carburantInput.value);
  if (!validMar) {
    marqueInput.style.borderColor = "red";
    marqueInput.style.backgroundColor = "orange";
    marqueInput.setAttribute("placeholder", "Marque Invalid");
  } else {
    marqueInput.style.borderColor = "green";
    marqueInput.style.backgroundColor = "white";
  }
  if (!validCar) {
    carburantInput.style.borderColor = "red";
    carburantInput.style.backgroundColor = "orange";
    carburantInput.setAttribute("placeholder", "Invalid");
  } else {
    carburantInput.style.borderColor = "green";
    carburantInput.style.backgroundColor = "white";
  }
  return validCar && validMar;
};

const enregistrerBtn = document.querySelectorAll('input[type="button"]')[1];
enregistrerBtn.onclick = function () {
  if (validationForm()) {
    sendDATA();
    viderChamps();
  }
};

// Question 5 :
const prixInput = document.querySelectorAll('input[type="number"]')[1];
function validationForm() {
  let validPrix = /^([0-9]+)$/.test(prixInput.value);
  if (!validPrix) {
    prixInput.style.borderColor = "red";
    prixInput.style.backgroundColor = "orange";
    prixInput.setAttribute("placeholder", "pix invalid");
  } else {
    prixInput.style.borderColor = "green";
    prixInput.style.backgroundColor = "white";
  }
  const validMatricule = verifierMatricule();
  const validCarbMar = verifierMarqueCarburant();
  const formValid = validMatricule && validCarbMar && validPrix;
  console.log(formValid);
  return formValid;
}

/*
function sendData() {
  dataJSON = {
    matricule: matriculeInput.value,
    marque: marqueInput.value,
    modele: document.getElementsByName("modele")[0].value,
    anneeProd: document.getElementsByName("AnneeProd")[0].value,
    carburant: carburantInput.value,
    prix: prixInput.value,
  };
  
  console.log(dataJSON);
  dataJSON = JSON.stringify(dataJSON);
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "voitures.json", true);
  xhr.setRequestHeader("content-type", "application/json; charset=UTF-8");
  xhr.onload = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        alert("infos send with success");
      }
    }
  };
  xhr.onerror = function () {
    alert("failed to send data");
  };

  xhr.send(dataJSON);
}
*/

// Question 6 :
const dataJSON = [];
class Voiture {
  constructor(matricule, marque, modele, anneeProd, carburant, prix) {
    this.matricule = matricule;
    this.marque = marque;
    this.modele = modele;
    this.anneeProd = anneeProd;
    this.carburant = carburant;
    this.prix = prix;
  }
}
function sendDATA() {
  const voiture = new Voiture(
    matriculeInput.value,
    marqueInput.value,
    document.getElementsByName("modele")[0].value,
    document.getElementsByName("AnneeProd")[0].value,
    carburantInput.value,
    prixInput.value
  );
  dataJSON.push(voiture);
  console.log(dataJSON);
}

// Question 7 :
const btnConsulter = document.querySelector('input[type="button"]');
function afficher() {
  const divAffichage = document.getElementById("affichage");
  divAffichage.innerHTML = "";
  const table = document.createElement("table");
  table.classList.add("table", "border");
  const thead = document.createElement("tr");
  thead.innerHTML =
    "<tr><td>Matricule</td><td>Marque</td><td>Modele</td><td>Anne Prod</td><td>Carburant</td><td>Prix</td></tr>";
  table.appendChild(thead);
  dataJSON.forEach((voiture) => {
    const tr = document.createElement("tr");
    const matricule = document.createElement("td");
    const marque = document.createElement("td");
    const modele = document.createElement("td");
    const anneeProd = document.createElement("td");
    const carburant = document.createElement("td");
    const prix = document.createElement("td");
    matricule.textContent = voiture.matricule;
    marque.textContent = voiture.marque;
    modele.textContent = voiture.modele;
    anneeProd.textContent = voiture.anneeProd;
    carburant.textContent = voiture.carburant;
    prix.textContent = voiture.prix;
    tr.append(matricule, marque, modele, anneeProd, carburant, prix);
    table.appendChild(tr);
  });
  divAffichage.appendChild(table);
}

btnConsulter.onclick = afficher;
