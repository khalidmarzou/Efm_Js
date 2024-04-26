// declaration :
function id(id) {
  return document.getElementById(id);
}

const idd = id("id");
const name = id("name");
const age = id("age");
const radios = document.getElementsByName("gender");
const checkboxs = document.getElementsByName("interests");
const tbody = document.getElementsByTagName("tbody")[0];
let gender;
let interests;

// Liste Personnes :
let personnes = [];
class Personne {
  constructor(id, name, age, gender, interests) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.interests = interests;
  }
}
// validation :
function validationForm() {
  const idPattern = /^[0-9]+$/;
  const namePattern = /^([a-z]+ [a-z]+)$/i;
  const ageValidation = Number(age.value) > 10 && Number(age.value) < 120;
  const genderValidation = Array.from(radios).find(
    (radio) => radio.checked === true
  );
  const interestsValidation = Array.from(checkboxs).filter(
    (checkbox) => checkbox.checked === true
  );
  let valid = true;
  if (!idPattern.test(idd.value)) {
    idd.style.borderColor = "red";
    valid = false;
  } else {
    idd.style.borderColor = "green";
  }
  if (!namePattern.test(name.value)) {
    name.style.borderColor = "red";
    valid = false;
  } else {
    name.style.borderColor = "green";
  }
  if (!ageValidation) {
    age.style.borderColor = "red";
    valid = false;
  } else {
    age.style.borderColor = "green";
  }
  if (genderValidation === undefined) {
    Array.from(radios).forEach(
      (radio) => (radio.nextElementSibling.style.color = "red")
    );
    valid = false;
  } else {
    Array.from(radios).forEach(
      (radio) => (radio.nextElementSibling.style.color = "green")
    );
    gender = genderValidation.value;
  }
  if (interestsValidation.length === 0) {
    Array.from(checkboxs).forEach(
      (box) => (box.nextElementSibling.style.color = "red")
    );
    valid = false;
  } else {
    Array.from(checkboxs).forEach(
      (box) => (box.nextElementSibling.style.color = "green")
    );
    interests = interestsValidation.map((interest) => interest.value);
  }

  return valid;
}

// on submit send data to the server :
function sendDATA(a) {
  if (a) {
    const personne = new Personne(
      idd.value,
      name.value,
      Number(age.value),
      gender,
      interests
    );
    const currentPersonne = personnes.findIndex(
      (per) => per.id === personne.id
    );
    if (currentPersonne !== -1) {
      personnes[currentPersonne].id = personne.id;
      personnes[currentPersonne].name = personne.name;
      personnes[currentPersonne].age = personne.age;
      personnes[currentPersonne].gender = personne.gender;
      personnes[currentPersonne].interests = personne.interests;
    } else {
      personnes.push(personne);
    }
  }
  const dataJSON = JSON.stringify({
    data: personnes,
  });
  const xhr = new XMLHttpRequest();
  xhr.open(
    "POST",
    "https://getpantry.cloud/apiv1/pantry/48db89c1-ef9c-4410-b945-2c1a51212191/basket/perssonnes",
    true
  );
  xhr.setRequestHeader("content-type", "application/json");
  xhr.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status >= 200 && this.status < 300) {
        console.log(this.responseText);
      } else {
        console.error("Failed to send DATA to the server");
      }
    }
  };
  xhr.send(dataJSON);
}

document.forms[0].onsubmit = function (event) {
  event.preventDefault();
  if (validationForm()) {
    sendDATA(true);
  }
};

// afficher dans table and get data from server :
function getDATA() {
  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "https://getpantry.cloud/apiv1/pantry/48db89c1-ef9c-4410-b945-2c1a51212191/basket/perssonnes",
    true
  );
  xhr.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status >= 200 && this.status < 300) {
        const data = JSON.parse(this.responseText).data;
        tbody.innerHTML = "";
        data.forEach((personne) => {
          tbody.innerHTML += `
                              <tr>
                                <td>${personne.id}</td>
                                <td>${personne.name}</td>
                                <td>${personne.age}</td>
                                <td>${personne.gender}</td>
                                <td>${personne.interests.join(" - ")}</td>
                                <td class='d-flex gap-1'><a class="btn btn-warning" onclick="edit(event)">Edit</a><a class="btn btn-danger" onclick="deleteTr(event)">Delete</a></td>
                              </tr>
                            `;
        });
      }
    }
  };
  xhr.send();
}

id("btnAfficher").onclick = getDATA;

document.addEventListener("DOMContentLoaded", function () {
  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "https://getpantry.cloud/apiv1/pantry/48db89c1-ef9c-4410-b945-2c1a51212191/basket/perssonnes",
    true
  );
  xhr.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status >= 200 && this.status < 300) {
        const data = JSON.parse(this.responseText).data;
        personnes = data;
      }
    }
  };
  xhr.send();
});

// supprimer un perssone :
function deleteTr(event) {
  const idpersonne =
    event.target.parentElement.parentElement.firstElementChild.textContent;
  const perssoneIndex = personnes.findIndex((per) => per.id === idpersonne);
  personnes.splice(perssoneIndex, 1);
  sendDATA(false);
  event.target.parentElement.parentElement.remove();
}

// modification des donnes :
function edit(event) {
  const idpersonne =
    event.target.parentElement.parentElement.firstElementChild.textContent;
  const perssoneIndex = personnes.findIndex((per) => per.id === idpersonne);
  idd.value = personnes[perssoneIndex].id;
  name.value = personnes[perssoneIndex].name;
  age.value = personnes[perssoneIndex].age;
  Array.from(radios).find(
    (radio) => radio.value === personnes[perssoneIndex].gender
  ).checked = true;
  Array.from(checkboxs).forEach((box) => (box.checked = false));
  personnes[perssoneIndex].interests.forEach((interest) => {
    Array.from(checkboxs).find((box) => box.value === interest).checked = true;
  });
  // Now you can edit and use Submit to edit infos;
}
