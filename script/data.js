"use strict";
// bắt sự kiện vào sidebar
const sidebarBtn = document.getElementById("sidebar");
sidebarBtn.addEventListener("click", function () {
  sidebarBtn.classList.toggle("active");
});

//btn
const inputFile = document.getElementById("input-file");
const exBtn = document.getElementById("export-btn");
const imFile = document.getElementById("import-btn");

let petArr = JSON.parse(getFromStorage("petArr")) ?? [];

// export
//link tham khảo:https://websparrow.org/web/how-to-create-and-save-text-file-in-javascript
exBtn.addEventListener("click", function saveStaticDataToFile() {
  let blob = new Blob([getFromStorage("petArr")], { type: "application/json" });
  saveAs(blob, "Pets.json");
});

//import
//link tham khảo:https://stackoverflow.com/questions/750032/reading-file-contents-on-the-client-side-in-javascript-in-various-browsers

inputFile.addEventListener("change", inputFiles, false);
async function inputFiles(event) {
  const file = event.target.files.item(0);
  const text = await file.text();
  // console.log("Pets : ", text);
  let petInput = JSON.parse(text);
  // console.log("Pets : ", petInput);
  for (let i = 0; i < petInput.length; i++) {
    petArr.unshift(petInput[i]);
  }
  // saveToStorage("petArr", JSON.stringify(petArr)); //lưu petArr vào Storage
  // console.log("Pet Array : ", petArr);

  //Kiểm tra phần tử trùng trong mảng :https://www.anonystick.com/tips-and-tricks/kiem-tra-phan-tu-trung-trong-mang-javascript
  // function getUnique(arr, comp) {
  //   const unique = arr
  //     .map((e) => e[comp])
  //     .map((e, i, final) => final.indexOf(e) === i && i)
  //     .filter((e) => arr[e])
  //     .map((e) => arr[e]);
  //   return unique;
  // }
  // const uniquePetArr = getUnique(petArr, "id");
  // saveToStorage("uniquePetArr", JSON.stringify(uniquePetArr));
  // petArr = uniquePetArr;
  // saveToStorage("petArr", JSON.stringify(petArr));
  // console.log("unique", uniquePetArr);
  // console.log("Pet Array : ", petArr);
}

// thêm sự kiện nút Import

imFile.addEventListener("click", function () {
  saveToStorage("petArr", JSON.stringify(petArr)); //lưu petArr vào Storage
  //Kiểm tra phần tử trùng trong mảng :https://www.anonystick.com/tips-and-tricks/kiem-tra-phan-tu-trung-trong-mang-javascript
  function getUnique(arr, comp) {
    const unique = arr
      .map((e) => e[comp])
      .map((e, i, final) => final.indexOf(e) === i && i)
      .filter((e) => arr[e])
      .map((e) => arr[e]);
    return unique;
  }
  const uniquePetArr = getUnique(petArr, "id");
  saveToStorage("uniquePetArr", JSON.stringify(uniquePetArr));
  petArr = uniquePetArr;
  saveToStorage("petArr", JSON.stringify(petArr));
  alert("Imported!");
});
