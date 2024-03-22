const listLiveres = [
  { ISBN: "01234", titre: "Langage C", image: "langagec.jpg", prix: 150 },
  {
    ISBN: "56789",
    titre: "Programmation Javascript",
    image: "javascript.jpg",
    prix: 250,
  },
  { ISBN: "11778", titre: "Laravel", image: "laravel.jpg", prix: 200 },
];
// Question 1 :
const charger = () => {
  const selectBook = document.getElementById("selectBook");
  listLiveres.forEach(
    (item) =>
      (selectBook.innerHTML += `<option value="${item.ISBN}">${item.titre}</option>`)
  );
};
// test :
document.addEventListener("DOMContentLoaded", charger);

// Question 2:
const afficher = () => {
  const selectBook = document.getElementById("selectBook");
  const affichageBook = document.getElementById("affichage");
  affichageBook.innerHTML = "";
  const bookSelected = selectBook.value;
  const bookSelectedIndex = listLiveres.findIndex(
    (item) => item.ISBN === bookSelected
  );
  const objectKeys = Object.keys(listLiveres[bookSelectedIndex]);
  objectKeys.forEach(
    (item) =>
      (affichageBook.innerText += `${item} : ${listLiveres[bookSelectedIndex][item]}\n`)
  );
};
// test :
document.getElementById("selectBook").addEventListener("change", afficher);

// Question 3 :
let prixTotal = 0;
const ajouter = () => {
  const prixTotalDiv = document.getElementById("pirxTotal");
  const selectBook = document.getElementById("selectBook");
  const panier = document.getElementById("panier");
  const bookAdded = selectBook.value;
  const bookSelectedIndex = listLiveres.findIndex(
    (item) => item.ISBN === bookAdded
  );
  panier.innerHTML += `<span class="border"> Book : ${listLiveres[bookSelectedIndex].titre} Prix : ${listLiveres[bookSelectedIndex].prix} <a class="link" href="#" onclick='retirer(event)' class="${listLiveres[bookSelectedIndex].ISBN}">retirer</a></span>`;
  prixTotal += Number(listLiveres[bookSelectedIndex].prix);
  prixTotalDiv.innerText = `Prix Total : ${prixTotal}`;
};
document.getElementById("sendToPanier").addEventListener("click", ajouter);

// Question 4 :
function retirer(event) {
  event.preventDefault();
  const prixTotalDiv = document.getElementById("pirxTotal");
  const prixTarget = event.target.parentNode.innerText
    .split(" ")
    .findIndex((value) => !isNaN(Number(value)));
  prixTotal -= Number(event.target.parentNode.innerText.split(" ")[prixTarget]);
  prixTotalDiv.innerText = `Prix Total : ${prixTotal}`;
  event.target.parentNode.remove();
}
