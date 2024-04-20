// Question 1, tous les champs doit saisis :
const champsSaisis = Array.from(document.querySelector(".info").children);
const telInput = champsSaisis[2];

function validation() {
  let valid = true;
  for (let i = 0; i < champsSaisis.length - 1; i++) {
    if (champsSaisis[i].value === "") {
      champsSaisis[i].style.borderColor = "red";
      valid = valid && false;
    } else {
      champsSaisis[i].style.borderColor = "green";
      valid = valid && true;
    }
  }
  if (champsSaisis[3].value === "course-type") {
    champsSaisis[3].style.borderColor = "red";
    valid = valid && false;
  } else {
    champsSaisis[3].style.borderColor = "green";
    valid = valid && true;
  }
  return valid;
}

// Test champsSaisis function :
const btnEnvoyer = document.querySelector('input[type="button"]');

btnEnvoyer.onclick = function () {
  if (validation() && verifTel()) {
    viderChamps();
    console.log("OKKKKK");
  }
};

// Question 2, validation du tel :
function verifTel() {
  let pattern = /[0-9]{10}/;
  let valid = pattern.test(telInput.value);
  if (!valid) {
    telInput.style.borderColor = "red";
    alert("Le numéro de téléphone doit être composé de 10 chiffres.");
    return false;
  } else {
    telInput.style.borderColor = "green";
    return true;
  }
}

// Question 5 : vider les champs:
function viderChamps() {
  const inputs = document.querySelectorAll('input[type="text"]');
  inputs.forEach((input) => (input.value = ""));
  const select = document.querySelector("select");
  select.selectedIndex = 0;
}

// Question 6 :
function remplirType(data) {
  const select = document.querySelector("select");
  select.innerHTML =
    '<option value="course-type" selected>Type de cours*</option>';
  data.types.forEach((type) => {
    const option = document.createElement("option");
    option.value = type.nom;
    option.textContent = type.nom;
    select.appendChild(option);
  });
}

function fetchData() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "data.json", true);
  xhr.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        const jsonData = JSON.parse(this.responseText);
        remplirType(jsonData);
      } else {
        console.error("Failed to fetch data:", this.status);
      }
    }
  };
  xhr.send();
}

document.addEventListener("DOMContentLoaded", fetchData);
