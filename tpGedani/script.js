function id(id) {
  return document.getElementById(id);
}

// declaration :
const ageInput = id("age");
const ageGroupRadios = Array.from(document.getElementsByName("ageGroup"));
const select = document.getElementsByTagName("select")[0];
const conditionsCheckBox = Array.from(document.getElementsByName("conditions"));
const nameInput = id("name");
const url =
  "https://getpantry.cloud/apiv1/pantry/48db89c1-ef9c-4410-b945-2c1a51212191/basket/medications";
let dataClients;
let dataMedications;
const priceInput = id("price");
const totalInput = id("total");
const quantityInput = id("qte");
const tbody = document.getElementsByTagName("tbody")[0];
const alertConditions = id("alertConditions");

// Selection auto pour adult ou child a partir d age :
function autoSelectRadio() {
  if (Number(ageInput.value) < 1 || Number(ageInput.value > 130)) {
    ageInput.style.borderColor = "red";
    ageInput.value = "";
  } else {
    if (Number(ageInput.value) > 18) {
      ageInput.style.borderColor = "green";
      ageGroupRadios[0].checked = true;
      ageGroupRadios[0].removeAttribute("disabled", "disabled");
      ageGroupRadios[1].setAttribute("disabled", "disabled");
    } else {
      ageInput.style.borderColor = "green";
      ageGroupRadios[1].checked = true;
      ageGroupRadios[1].removeAttribute("disabled", "disabled");
      ageGroupRadios[0].setAttribute("disabled", "disabled");
    }
  }
}

// event input is an event when make changes in value of input :
ageInput.addEventListener("input", autoSelectRadio);

// disable Select madication if the conditions more than 2 :
function disableSelect() {
  const conditionsChecked = conditionsCheckBox.filter(
    (condition) => condition.checked === true
  );
  if (conditionsChecked.length > 2) {
    alertConditions.style.textDecoration = "none";
    select.setAttribute("disabled", "disabled");
  } else {
    alertConditions.style.textDecoration = "line-through";
    select.removeAttribute("disabled", "disabled");
  }
}
// applique disable select function on checkbox event :
conditionsCheckBox.forEach((condition) => {
  condition.onchange = disableSelect;
});

// validation form :
function validationForm() {
  const patternName = /^[a-z]+$/i;
  let valid = true;
  const conditionsCheckBoxAllChecked = [...conditionsCheckBox].every(
    (box) => box.checked === true
  );
  if (patternName.test(nameInput.value)) {
    nameInput.style.borderColor = "blue";
    valid = valid && true;
  } else {
    nameInput.style.borderColor = "red";
    valid = valid && false;
  }
  if (ageInput.value.length !== 0) {
    ageInput.style.borderColor = "blue";
    valid = valid && true;
  } else {
    ageInput.style.borderColor = "red";
    valid = valid && false;
  }
  if (select.value !== "") {
    select.style.borderColor = "blue";
    valid = valid && true;
  } else {
    select.style.borderColor = "red";
    valid = valid && false;
  }
  if (conditionsCheckBoxAllChecked) {
    alertConditions.style.backgroundColor = "yellow";
    setTimeout(() => {
      alertConditions.style.backgroundColor = "white";
    }, 100);
    alertConditions.style.textDecoration = "none";
    valid = valid && false;
  } else {
    alertConditions.style.textDecoration = "line-through";
    valid = valid && true;
  }
  return valid;
}

// action of validation form on btn buy medication :
class Client {
  constructor(name, age, medications) {
    this.name = name;
    this.age = age;
    this.medications = medications;
  }
}

class Medication {
  constructor(name, qte) {
    this.name = name;
    this.quantity = qte;
  }
}

id("buy").onclick = function () {
  if (validationForm()) {
    const medicationBuyed = new Medication(
      select.value,
      Number(quantityInput.value)
    );
    const client = new Client(nameInput.value, ageInput.value, [
      medicationBuyed,
    ]);
    const clienExist = dataClients.findIndex((cl) => cl.name === client.name);
    if (clienExist !== -1) {
      const medicationExist = dataClients[clienExist].medications.findIndex(
        (med) => med.name === select.value
      );
      if (medicationExist !== -1) {
        dataClients[clienExist].medications[medicationExist].quantity += Number(
          quantityInput.value
        );
      } else {
        dataClients[clienExist].medications.push(medicationBuyed);
      }
    } else {
      dataClients.push(client);
    }
    ajaxPost(url, { clients: dataClients, medications: dataMedications });
    chargeTable();
    document.forms[0].reset();
    ageInput.removeAttribute("disabled", "disabled");
  } else {
    console.log("Form Invalide");
  }
};

// AJAX functions :
function ajaxGet(url) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status >= 200 && this.status < 300) {
        const response = JSON.parse(this.responseText);
        dataClients = response.clients;
        dataMedications = response.medications;
        chargeTable();
      } else {
        console.error("Error: " + this.status);
      }
    }
  };
  xhr.send();
}

function ajaxPost(url, data) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        console.log(xhr.responseText);
      } else {
        console.error("Error: " + xhr.status);
      }
    }
  };
  const jsonData = JSON.stringify(data);
  xhr.send(jsonData);
}

// Load data from server :
document.addEventListener("DOMContentLoaded", () => {
  ajaxGet(url);
});

function chargeTable() {
  tbody.innerHTML = "";
  dataClients.forEach((client, index) => {
    let colorAndGroup =
      client.age > 18
        ? { color: "success", group: "adult" }
        : { color: "danger", group: "child" };
    client.medications.forEach((med) => {
      const mediPrice = dataMedications[colorAndGroup.group].find(
        (medi) => medi.name === med.name
      ).price;
      tbody.innerHTML += `
                                <tr>
                                  <th scope="row">${index + 1}</th>
                                  <td>${client.name}</td>
                                  <td class="text-${colorAndGroup.color}">${
        client.age
      }</td>
                                  <td>${med.name}</td>
                                  <td>${mediPrice}</td>
                                  <td>${med.quantity}</td>
                                  <td>${mediPrice * med.quantity}</td>
                                  <td class="d-flex gap-1"><a href="#" class="btn btn-danger" onclick="deleteTr(event)">Delete</a><a href="#" class="btn btn-warning" onclick="edit(event)">Edit</a></td>
                                </tr>
                              `;
    });
  });
}

// create options of select :
ageInput.addEventListener("focusout", createSelect);

function createSelect() {
  select.innerHTML = "<option value=''>-- Select Medication --</option>";
  if (ageGroupRadios[0].checked) {
    const medications = dataMedications.adult;
    medications.forEach((med) => {
      select.innerHTML += `<option value='${med.name}'>${med.name}</otption>`;
      // auto price :
      select.onchange = function () {
        const medicationSelected = medications.find(
          (med) => med.name === this.value
        );
        priceInput.value = medicationSelected.price;
      };
    });
  } else if (ageGroupRadios[1].checked) {
    const medications = dataMedications.child;
    medications.forEach((med) => {
      select.innerHTML += `<option value='${med.name}'>${med.name}</otption>`;
    });
    // auto price :
    select.onchange = function () {
      const medicationSelected = medications.find(
        (med) => med.name === this.value
      );
      priceInput.value = medicationSelected.price;
    };
  }
}

// auto total when client saise quantity :
quantityInput.addEventListener("input", autoTotal);

function autoTotal() {
  let total = Number(priceInput.value) * Number(quantityInput.value);
  totalInput.value = total + " MAD";
}

// Complete infos auto :
function autoCompleteInfos() {
  const clientIndex = dataClients.findIndex(
    (cl) => cl.name === nameInput.value
  );
  if (clientIndex !== -1) {
    ageInput.value = dataClients[clientIndex].age;
    ageInput.setAttribute("disabled", "disabled");
  } else {
    ageInput.removeAttribute("disabled", "disabled");
  }
}

nameInput.addEventListener("focusout", function () {
  autoCompleteInfos();
  autoSelectRadio();
  createSelect();
});

// just upper case in name :
nameInput.oninput = function () {
  this.value = this.value.toUpperCase();
};

// delete function :
function deleteTr(event) {
  const tr = event.target.parentElement.parentElement;
  const clientIndex = dataClients.findIndex(
    (cl) => cl.name === tr.children[1].textContent
  );
  const medicationIndex = dataClients[clientIndex].medications.findIndex(
    (med) => med.name === tr.children[3].textContent
  );
  if (dataClients[clientIndex].medications.length === 2) {
    dataClients[clientIndex].medications.splice(medicationIndex, 1);
  } else if (dataClients[clientIndex].medications.length === 1) {
    dataClients.splice(clientIndex, 1);
  }
  tr.remove();
  ajaxPost(url, { clients: dataClients, medications: dataMedications });
  chargeTable();
}

// edit function :
function edit(event) {
  const tr = event.target.parentElement.parentElement;
  const clientIndex = dataClients.findIndex(
    (cl) => cl.name === tr.children[1].textContent
  );
  const medicationIndex = dataClients[clientIndex].medications.findIndex(
    (med) => med.name === tr.children[3].textContent
  );
  tr.children[5].innerHTML = `<input class="form-control" type="number" value="${tr.children[5].textContent}"/>`;
  event.target.onclick = function () {
    tr.children[5].innerHTML = tr.children[5].firstElementChild.value;
    dataClients[clientIndex].medications[medicationIndex].quantity = Number(
      tr.children[5].textContent
    );
    ajaxPost(url, { clients: dataClients, medications: dataMedications });
    ajaxGet(url);
  };
}
