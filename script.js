var select = document.querySelectorAll(".dropdown");
var input = document.getElementById("input");
var result = document.getElementById("result");
var button = document.getElementById("btn");
var errormsg = document.getElementById("errormsg");

fetch("https://api.frankfurter.app/currencies")
  .then((response) => response.json())
  .then((response) => displaydropdown(response));

function displaydropdown(response) {
  console.log(Object.entries(data)[0][0]);
  var country = Object.entries(response);
  for (let i = 0; i < country.length; i++) {
    let option = `<option value="${country[i][0]}">${country[i][1]}</option>`;
    select[0].innerHTML += option;
    select[1].innerHTML += option;
  }
}
button.addEventListener("click", function () {
  let curr1 = select[0].value;
  let curr2 = select[1].value;
  let inputValue = input.value;
  if (curr1 === curr2) {
    errormsg.style.display = "block";
    errormsg.innerHTML = "<h3> Please select different countries</h3>";
  } else {
    convert(curr1, curr2, inputValue);
    errormsg.style.display = "none";
  }
});
function convert(curr1, curr2, inputValue) {
  const host = "api.frankfurter.app";
  fetch(`https://${host}/latest?amount=${inputValue}&from=${curr1}&to=${curr2}`)
    .then((resp) => resp.json())
    .then((data) => {
      document.getElementById("result").value = Object.values(data.rates)[0];
    })
    .catch((error) => console.error("Conversion error:", error));
}
