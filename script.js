"use strict";

// lấy DOM elements
const inputId = document.getElementById("input-id");
const inputName = document.getElementById("input-name");
const inputAge = document.getElementById("input-age");
const inputType = document.getElementById("input-type");
const inputWeight = document.getElementById("input-weight");
const inputLength = document.getElementById("input-length");
const inputColor1 = document.getElementById("input-color-1");
const inputBreed = document.getElementById("input-breed");
const inputVaccinated = document.getElementById("input-vaccinated");
const inputDewormed = document.getElementById("input-dewormed");
const inputSterilized = document.getElementById("input-sterilized");

//button
const submitBtn = document.getElementById("submit-btn");
const healthyBtn = document.getElementById("healthy-btn");
const btnCalculateBMI = document.getElementById("calculate-btn");

//table pets
const tableBodyEl = document.getElementById("tbody");

let petArr = JSON.parse(getFromStorage("petArr")) ?? [];
// thời gian hiện tại
const d = new Date();

// render dữ liệu ngay khi tải trang
renderTableData(petArr);

console.log(petArr);

// Bắt sự kiện Click vào nút "Submit"
submitBtn.addEventListener("click", function () {
  // Lấy dữ liệu từ các Input Form
  const data = {
    id: inputId.value,
    Name: inputName.value,
    age: inputAge.value,
    type: inputType.value,
    weight: inputWeight.value,
    length1: inputLength.value,
    color: inputColor1.value,
    breed: inputBreed.value,
    vacinated: inputVaccinated.checked,
    dewormed: inputDewormed.checked,
    sterilized: inputSterilized.checked,
    date: `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`,
  };

  // Xác thực dữ liệu hợp lệ
  // check trùng ID
  let checkID = true;
  for (let i = 0; i < petArr.length; i++) {
    if (inputId.value === petArr[i].id) {
      alert("ID must unique!");
      checkID = false;
    }
  }
  function validateData(data) {
    if (!data.id) {
      alert("vui lòng nhập id");
      return false;
    } else if (!data.Name) {
      alert("vui lòng nhập tên pet");
      return false;
    } else if (data.age < 1 || data.age > 15 || !data.age) {
      alert("Age must be between 1 and 15!");
      return false;
    } else if (data.type === "Select Type") {
      alert("Please select Type!");
      return false;
    } else if (data.weight < 1 || data.weight > 15 || !data.weight) {
      alert("Weight must be between 1 and 15!");
      return false;
    } else if (data.length1 < 1 || data.length1 > 100 || !data.length1) {
      alert("Length must be between 1 and 100!");
      return false;
    } else if (data.breed === "Select Breed") {
      alert("Please select Breed!");
      return false;
    } else {
      return true;
    }
  }

  // Thêm thú cưng vào danh sách
  const validate = validateData(data);
  if (validate && checkID) {
    petArr.push(data);
    saveToStorage("petArr", JSON.stringify(petArr)); //lưu petArr vào Storage
    clearInput();
    renderBreed();
    renderTableData(petArr);
  }
  //in thử data
  console.log(data);
});

// Hiển thị danh sách pet trong table
function renderTableData(petArr) {
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
    <th>${petArr[i].id} </th>  
    <td>${petArr[i].Name} </td>  
    <td>${petArr[i].age} </td>
    <td>${petArr[i].type} </td>  
    <td>${petArr[i].weight} kg</td>
    <td>${petArr[i].length1} cm</td>  
    <td>${petArr[i].breed} </td>
    <td><i class="bi bi-square-fill" style="color: ${
      petArr[i].color
    }"></i></td>  
    <td>${
      petArr[i].vacinated === true
        ? "<i class='bi bi-check-circle-fill'></i>"
        : "<i class='bi bi-x-circle-fill'> </i>"
    }</td>  
    <td>${
      petArr[i].dewormed === true
        ? "<i class='bi bi-check-circle-fill'></i>"
        : "<i class='bi bi-x-circle-fill'> </i>"
    }</td>  
    <td>${
      petArr[i].sterilized === true
        ? "<i class='bi bi-check-circle-fill'></i>"
        : "<i class='bi bi-x-circle-fill'> </i>"
    }</td>
    <td>${petArr[i].date}</td>
    <td><button type="button" class="btn btn-danger" onclick="deletePet('${
      petArr[i].id
    }')">Delete</button></td>
    `;

    tableBodyEl.appendChild(row);
  }
}

// Xóa các dữ liệu vừa nhập trên Form
const clearInput = () => {
  inputId.value = "";
  inputName.value = "";
  inputAge.value = "";
  inputType.value = "Select Type";
  inputWeight.value = "";
  inputLength.value = "";
  inputColor1.value = "#000000";
  inputBreed.value = "Select Breed";
  inputVaccinated.checked = false;
  inputDewormed.checked = false;
  inputSterilized.checked = false;
};

// Xóa một thú cưng
//kết hợp findIndex và splice :https://www.codementor.io/@lautiamkok/javascript-tips-searching-the-index-of-an-element-and-delete-or-replace-it-cfpy6uasy
const deletePet = (petId) => {
  // Confirm before deletePet
  if (confirm("Are you sure?")) {
    const pet = petArr.findIndex((x) => x.id === petId);
    console.log(pet); //in thử pet
    petArr.splice(pet, 1);
    saveToStorage("petArr", JSON.stringify(petArr));
    renderTableData(petArr);
  }
};

// Hiển thị pets khỏe mạnh, dùng hàm filter :https://www.javascripttutorial.net/javascript-array-filter/
let healthyCheck = true;
healthyBtn.addEventListener("click", function () {
  if (healthyCheck === true) {
    let healthyPetArr = petArr.filter((petArr) => {
      return (
        petArr.vacinated === true &&
        petArr.dewormed === true &&
        petArr.sterilized === true
      );
    });
    renderTableData(healthyPetArr);
    healthyBtn.textContent = "Show all pet";
    healthyCheck = false;
  } else {
    renderTableData(petArr);
    healthyBtn.textContent = "Show healthy pet";
    healthyCheck = true;
  }
});

///ASM2

// bắt sự kiện vào sidebar
const sidebarBtn = document.getElementById("sidebar");
sidebarBtn.addEventListener("click", function () {
  sidebarBtn.classList.toggle("active");
});

//Hiển thị danh sách Breed theo Type

const renderBreed = function () {
  inputBreed.innerHTML = "";
  inputBreed.innerHTML = `<option value='0'>Select Breed</option>`;
  let breedArr = JSON.parse(getFromStorage("breedArr")) ?? [];
  const breedDog = breedArr.filter((item) => item.type === "Dog");
  const breedCat = breedArr.filter((item) => item.type === "Cat");
  if (inputType.value === "Dog") {
    breedDog.forEach(function (el) {
      const option = document.createElement("option");
      option.innerHTML = `${el.breed}`;
      inputBreed.appendChild(option);
      console.log(option);
      // const inputBreed = document.getElementById("input-breed");
    });
  } else if (inputType.value === "Cat") {
    breedCat.forEach(function (el) {
      const option = document.createElement("option");
      option.innerHTML = `${el.breed}`;
      inputBreed.appendChild(option);
    });
  }
  // console.log(breedCat);
  // console.log(breedDog);
  // console.log(breedArr);
};
inputType.addEventListener("click", renderBreed);
