"use strict";
// bắt sự kiện vào sidebar
const sidebarBtn = document.getElementById("sidebar");
sidebarBtn.addEventListener("click", function () {
  sidebarBtn.classList.toggle("active");
});

//DOM elements
const submitBtn = document.getElementById("submit-btn");
const inputType = document.getElementById("input-type");
const inputBreed = document.getElementById("input-breed");

//table pets
const tableBodyEl = document.getElementById("tbody");

//khai báo mảng breed
let breedArr = JSON.parse(getFromStorage("breedArr")) ?? [];

// render dữ liệu ngay khi tải trang
renderBreedData(breedArr);
console.log("breedArray", breedArr); // in thử breedArr

// Bắt sự kiện Click vào nút "Submit"
submitBtn.addEventListener("click", function () {
  // Lấy dữ liệu từ các Input Form
  const dataBreed = {
    breed: inputBreed.value,
    type: inputType.value,
  };
  // Xác thực dữ liệu hợp lệ
  function validateData(dataBreed) {
    if (!dataBreed.breed) {
      alert("Please input Breed!");
      return false;
    } else if (dataBreed.type === "Select Type") {
      alert("Please select Type!");
      return false;
    } else {
      return true;
    }
  }

  // Thêm breed vào danh sách
  const validate = validateData(dataBreed);
  if (validate) {
    breedArr.push(dataBreed);
    saveToStorage("breedArr", JSON.stringify(breedArr)); //lưu breetArr vào Storage
    clearInput();
    renderBreedData(breedArr);
  }
  //in thử data
  console.log(dataBreed);
});
// Hiển thị danh sách breed trong table
function renderBreedData(breedArr) {
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < breedArr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
    <th>${i + 1}</th>
    <td>${breedArr[i].breed} </td>
    <td>${breedArr[i].type} </td> 
    <td><button type="button" class="btn btn-danger" onclick="deletePet('${i}')">Delete</button></td>
    `;
    tableBodyEl.appendChild(row);
  }
}
// reset các dữ liệu vừa nhập trên Form
const clearInput = () => {
  inputType.value = "Select Type";
  inputBreed.value = "";
};
//xóa breed
const deletePet = (breedId) => {
  // Confirm before delete
  if (confirm("Are you sure?")) {
    breedArr.splice(breedId, 1);
    saveToStorage("breedArr", JSON.stringify(breedArr));
    renderBreedData(breedArr);
  }
};
