const form = document.forms[0];
const inputs = Array.from(document.getElementsByTagName("input"));
const codeInput = inputs[0];
const titreInput = inputs[1];
const descriptionInput = inputs[2];
const prixInput = inputs[3];
const categorieInput = inputs[4];
const listChamps = [];
const produit = {
  code: 0,
  titre: "",
  description: "",
  prix: 0,
  categorie: "",
};
const tbody = document.getElementsByTagName("tbody")[0];

function verifierForm() {
  let checkFormValues = inputs.every((item) => item.value !== "");
  let checkAlphaTitre = /[a-z]+/gi.test(titreInput.value);
  let uniqueCode = listChamps.find(
    (item) => item.code === Number(codeInput.value)
  );
  let uniquePrix = listChamps.find(
    (item) => item.prix === Number(prixInput.value)
  );
  return (
    checkFormValues &&
    checkAlphaTitre &&
    uniqueCode === undefined &&
    uniquePrix === undefined
  );
}

// Question 1 Button ajouter :
const btnAjouter = document.getElementById("ajouter");
btnAjouter.addEventListener("click", () => {
  form.removeAttribute("style");
});

// Question 2 Button Souvgarder:
const btnSouvgarder = document.createElement("input");
btnSouvgarder.type = "button";
btnSouvgarder.value = "Souvgarder";
form.appendChild(btnSouvgarder);
btnSouvgarder.onclick = function () {
  if (verifierForm()) {
    produit.code = Number(codeInput.value);
    produit.titre = titreInput.value;
    produit.description = descriptionInput.value;
    produit.prix = Number(prixInput.value);
    produit.categorie = categorieInput.value;
    listChamps.push({ ...produit });
    console.log(listChamps);
  } else {
    alert(
      "You must complete the form. The title must contain only alphabetical characters && Code Unique && Prix Unique"
    );
  }
  ajouterAuTableau();
};

// Question 3 Button Annuler :
const btnAnnuler = document.createElement("input");
btnAnnuler.type = "button";
btnAnnuler.value = "Annuler";
form.appendChild(btnAnnuler);
btnAnnuler.addEventListener("click", () => {
  let indexProduitAnnuler = listChamps.findIndex(
    (item) => item.code === Number(codeInput.value)
  );
  if (indexProduitAnnuler !== -1) {
    listChamps.splice(indexProduitAnnuler, 1);
    form.reset();
    console.log(listChamps);
  } else {
    alert("Product Not Found in Data Base");
  }
  ajouterAuTableau();
});

// Question 4 Button Vider :
const btnVider = document.createElement("input");
btnVider.type = "button";
btnVider.value = "Vider";
form.appendChild(btnVider);
btnVider.onclick = () => {
  listChamps.splice(0, listChamps.length);
  document.getElementsByTagName("tbody")[0].innerHTML = "";
  form.reset();
  console.log(listChamps);
  ajouterAuTableau();
};

// Question 5 affiche produits au tableau :
function ajouterAuTableau() {
  tbody.innerHTML = "";
  listChamps.forEach((item) => {
    tbody.innerHTML += `<tr onclick="colorise(event)" tabindex="0" style="cursor:pointer;"><td>${item.code}</td><td>${item.titre}</td><td>${item.description}</td><td>${item.prix}</td><td>${item.categorie}</td></tr>`;
  });
}

// Question 6 :
function colorise(event) {
  event.target.parentElement.style.backgroundColor = "green";
}

// Question 7 button Suprrimer:
const btnSupprimer = document.createElement("input");
btnSupprimer.type = "button";
btnSupprimer.value = "Supprimer";
document.body.append(btnSupprimer);
btnSupprimer.addEventListener("click", () => {
  const elementsSupprimerCode = [];
  Array.from(tbody.children)
    .filter((item) => {
      return item.style.backgroundColor === "green";
    })
    .forEach(
      (item) =>
        elementsSupprimerCode.push(Number(item.children[0].innerText)) &&
        item.remove()
    );
  elementsSupprimerCode.forEach((code) =>
    listChamps.splice(
      listChamps.findIndex((prod) => prod.code === code),
      1
    )
  );
  console.log(listChamps);
});

// Question 8 Creer Classe :
class Produit {
  constructor(codeProduit, titre, description, prix, categorie) {
    this.codeProduit = codeProduit;
    this.titre = titre;
    this.description = description;
    this.prix = prix;
    this.categorie = categorie;
  }
}

// Question 9 instance des Objects :
let eliteBook = new Produit(
  1,
  "elite Book i9",
  "elite Book i9 16RAM 1TO SSD",
  13500,
  "electronique"
);
let supra = new Produit(2, "supra", "everybody knows supra", 2000000, "cars");

console.log(supra);

// Question 10 API:
btnAfficherAPI = document.createElement("input");
btnAfficherAPI.type = "button";
btnAfficherAPI.value = "Afficher la liste des Categories";
document.body.append(btnAfficherAPI);

// fetch API :
btnAfficherAPI.onclick = function () {
  let request = new XMLHttpRequest();
  request.open("GET", "https://khalidmarzoug.pythonanywhere.com/", true);
  request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let response = JSON.parse(this.responseText);
      if (document.getElementsByTagName("ul").length === 0) {
        const ul = document.createElement("ul");
        response.data.forEach(
          (item) => (ul.innerHTML += `<li>${item.titre}</li>`)
        );
        document.body.append(ul);
      } else {
        document.getElementsByTagName("ul")[0].innerHTML = "";
        response.data.forEach(
          (item) =>
            (document.getElementsByTagName(
              "ul"
            )[0].innerHTML += `<li>${item.titre}</li>`)
        );
      }
    }
  };
  request.send();
};
