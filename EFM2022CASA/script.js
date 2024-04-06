function getID(id) {
  return document.getElementById(id);
}
const selectTV = getID("tvs");
const quantite = getID("quantite");
const btnAjouter = getID("btnAjouter");
// Question 2 :
// Validation Champs TV et Quantite :
function validationChampsTVQuantite() {
  let checkForm = true;
  if (selectTV.value !== "") {
    selectTV.style.borderColor = "green";
    checkForm = checkForm && true;
  } else {
    selectTV.style.borderColor = "red";
    checkForm = checkForm && false;
  }
  if (Number(quantite.value) >= 1 && Number(quantite.value) <= 10) {
    quantite.style.borderColor = "green";
    checkForm = checkForm && true;
  } else {
    quantite.style.borderColor = "red";
    checkForm = checkForm && false;
  }
  return checkForm;
}
// List of Tvs from json file :
let dataTVs = [];
// backEnd Data :
class Product {
  constructor(reference, qte, prix) {
    this.reference = reference;
    this.qte = qte;
    this.prix = prix;
  }
}
const tvsSelected = [];

// Question 3 :
function remplirTVs() {
  const request = new XMLHttpRequest();
  request.open("GET", "tvs.json", true);
  request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      dataTVs = JSON.parse(this.responseText).tvs;
      dataTVs.forEach((element) => {
        selectTV.innerHTML += `<option value="${element.nom}">${element.nom}</option>`;
      });
    }
  };
  request.send();
}
// test remplir Tvs :
document.addEventListener("DOMContentLoaded", remplirTVs);

// Question 4 :
function ajouterAuPanier() {
  validationChampsTVQuantite();
  const tbody = document.getElementsByTagName("tbody")[0];
  if (validationChampsTVQuantite()) {
    let tvSelected = dataTVs.find((tv) => tv.nom === selectTV.value);
    let indexTvInBackEnd = tvsSelected.findIndex(
      (tv) => tv.reference === tvSelected.nom
    );
    trInfos = `<tr>
                <td>${tvSelected.nom}</td>
                <td>${quantite.value}</td>
                <td><img src="${tvSelected.image}" /></td>
                <td><input type="button" class="btn btn-danger" onclick="supprimerDuPanier(event)" value="Supprimer" /></td>
              </tr>`;
    if (indexTvInBackEnd === -1) {
      tbody.innerHTML += trInfos;
      // add the tv in the backend list :
      const produit = new Product(
        tvSelected.nom,
        Number(quantite.value),
        tvSelected.prix
      );
      tvsSelected.push(produit);
    } else {
      tvsSelected[indexTvInBackEnd].qte += Number(quantite.value);
      // change qte in the table :
      let trOfTv = Array.from(tbody.children).find((tr) => {
        return tr.children[0].textContent === tvSelected.nom;
      });
      trOfTv.children[1].textContent =
        Number(trOfTv.children[1].textContent) + Number(quantite.value);
    }
  }
  console.table(tvsSelected);
  calculerPrixHT();
  calculerPrixTTC();
  jsonSerializer();
}

// test ajouter Au Panier :
btnAjouter.onclick = ajouterAuPanier;

// Question 5 :
function supprimerDuPanier(event) {
  const confirmation = confirm("Are You Sure ?");
  if (confirmation) {
    event.target.parentElement.parentElement.remove();
    // remove from backEnd :
    let tvSelected =
      event.target.parentElement.parentElement.children[0].textContent;
    let indexTvSelected = tvsSelected.findIndex(
      (tv) => tv.reference === tvSelected
    );
    tvsSelected.splice(indexTvSelected, 1);
    console.table(tvsSelected);
  }
  calculerPrixHT();
  calculerPrixTTC();
  jsonSerializer();
}

// Question 6 :
function calculerPrixHT() {
  const htInput = getID("ht");
  let prixHT = tvsSelected.reduce((acc, value) => {
    return acc + value.qte * value.prix;
  }, 0);
  htInput.value = `${prixHT} Dhs`;
}

// Question 7 :
function calculerPrixTTC() {
  const htInput = getID("ht");
  const ttcInput = getID("ttc");
  let prixTTC = parseInt(htInput.value) + parseInt(htInput.value) * 0.2;
  ttcInput.value = `${prixTTC} Dhs`;
}

// Question 8 :
function jsonSerializer() {
  const tvsCommandeList = [];
  tvsSelected.forEach((tv) =>
    tvsCommandeList.push({ reference: tv.reference, quantite: tv.qte })
  );
  const jsonObject = {
    tvs_commande: tvsCommandeList,
  };
  const jsonSerializerObject = JSON.stringify(jsonObject);
  console.log(jsonSerializerObject);
}
