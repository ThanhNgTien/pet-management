"use strict";
// bắt sự kiện vào sidebar
const sidebarBtn = document.getElementById("sidebar");
sidebarBtn.addEventListener("click", function () {
  sidebarBtn.classList.toggle("active");
});

// lấy DOM elements
const inputId = document.getElementById("input-id");
const inputName = document.getElementById("input-name");
const inputType = document.getElementById("input-type");
const inputBreed = document.getElementById("input-breed");
const inputVaccinated = document.getElementById("input-vaccinated");
const inputDewormed = document.getElementById("input-dewormed");
const inputSterilized = document.getElementById("input-sterilized");

//button
const findBtn = document.getElementById("find-btn");

//table pets
const tableBodyEl = document.getElementById("tbody");

let petArr = JSON.parse(getFromStorage("petArr")) ?? [];

// Bắt sự kiện Click vào nút "Find"
findBtn.addEventListener("click", function () {
  // Lấy dữ liệu từ các search Form
  const data = {
    id: inputId.value,
    Name: inputName.value,
    type: inputType.value,
    breed: inputBreed.value,
    vacinated: inputVaccinated.checked,
    dewormed: inputDewormed.checked,
    sterilized: inputSterilized.checked,
  };
  // hàm search
  let result = [];
  for (let i = 0; i < petArr.length; i++) {
    if (
      petArr[i].id.includes(data.id) &&
      petArr[i].Name.includes(data.Name) &&
      (petArr[i].type.includes(data.type) ||
        data.type.includes("Select Type")) &&
      (petArr[i].breed.includes(data.breed) ||
        data.breed.includes("Select Breed")) &&
      (petArr[i].vacinated === data.vacinated || data.vacinated === false) &&
      (petArr[i].dewormed === data.dewormed || data.dewormed === false) &&
      (petArr[i].sterilized === data.sterilized || data.sterilized === false)
    )
      result.push(petArr[i]);
  }
  renderTableData(result);
});
// Hiển thị danh sách pet trong table
function renderTableData(result) {
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < result.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
    <th>${result[i].id} </th>  
    <td>${result[i].Name} </td>  
    <td>${result[i].age} </td>
    <td>${result[i].type} </td>  
    <td>${result[i].weight} kg</td>
    <td>${result[i].length1} cm</td>  
    <td>${result[i].breed} </td>
    <td><i class="bi bi-square-fill" style="color: ${
      result[i].color
    }"></i></td>  
    <td>${
      result[i].vacinated === true
        ? "<i class='bi bi-check-circle-fill'></i>"
        : "<i class='bi bi-x-circle-fill'> </i>"
    }</td>  
    <td>${
      result[i].dewormed === true
        ? "<i class='bi bi-check-circle-fill'></i>"
        : "<i class='bi bi-x-circle-fill'> </i>"
    }</td>  
    <td>${
      result[i].sterilized === true
        ? "<i class='bi bi-check-circle-fill'></i>"
        : "<i class='bi bi-x-circle-fill'> </i>"
    }</td>
    <td>${result[i].date}</td>
    `;
    tableBodyEl.appendChild(row);
  }
}

//Hiển thị danh sách Breed theo Type

const renderBreed = function () {
  inputBreed.innerHTML = "";
  inputBreed.innerHTML = `<option>Select Breed</option>`;
  let breedArr = JSON.parse(getFromStorage("breedArr")) ?? [];
  const breedDog = breedArr.filter((item) => item.type === "Dog");
  const breedCat = breedArr.filter((item) => item.type === "Cat");
  if (inputType.value === "Dog") {
    breedDog.forEach(function (el) {
      const option = document.createElement("option");
      option.innerHTML = `${el.breed}`;
      inputBreed.appendChild(option);
    });
  } else if (inputType.value === "Cat") {
    breedCat.forEach(function (el) {
      const option = document.createElement("option");
      option.innerHTML = `${el.breed}`;
      inputBreed.appendChild(option);
    });
  } else if (inputType.value === "Select Type") {
    renderBreedAll();
  }
};
inputType.addEventListener("click", renderBreed);

// hiển thị all breed
const renderBreedAll = function () {
  inputBreed.innerHTML = "";
  inputBreed.innerHTML = `<option>Select Breed</option>`;
  let breedArr = JSON.parse(getFromStorage("breedArr")) ?? [];
  breedArr.forEach(function (el) {
    const option = document.createElement("option");
    option.innerHTML = `${el.breed}`;
    inputBreed.appendChild(option);
  });
};
renderBreedAll();
