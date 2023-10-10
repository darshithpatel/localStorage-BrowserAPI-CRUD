function validateInputs() {
  var age = document.getElementById("age").value;
  if (age < 0 || age > 130) {
    alert("Please enter a valid age.");
    return false;
  }

  var gender = document.querySelector('input[name="gender"]:checked').value;
  if (gender == "") {
    alert("Please select a gender.");
    return false;
  }

  return true;
}

function readData() {
  var clientList;
  if (localStorage.getItem("clientList") == null) {
    clientList = [];
  } else {
    clientList = JSON.parse(localStorage.getItem("clientList"));
  }

  var html = "";

  clientList.forEach(function (element, index) {
    html += "<tr>";
    html += '<td data-label="First Name">' + element.firstName + "</td>";
    html += '<td data-label="Last Name">' + element.lastName + "</td>";
    html += '<td data-label="Age">' + element.age + "</td>";
    html += '<td data-label="Email">' + element.eMail + "</td>";
    html += '<td data-label="Gender">' + element.gender + "</td>";
    html += `<td data-label="Actions">
        <button onclick="updateData(${index})" class="action-btn btn-update"><a href="#scrollToForm">Update</a></button>
        <button onclick="deleteData(${index})" class="action-btn btn-delete"><a>Delete</a></button>
    </td>`;
    html += "</tr>";
  });

  document.querySelector("#clientRows tbody").innerHTML = html;
}

function resetForm() {
  document.getElementById("firstName").value = "";
  document.getElementById("lastName").value = "";
  document.getElementById("age").value = "";
  document.getElementById("eMail").value = "";
  document.querySelector('input[name="gender"]:checked').checked = false;
}

document.onload = readData();

function addData() {
  if (validateInputs() == true) {
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var age = document.getElementById("age").value;
    var eMail = document.getElementById("eMail").value;
    var gender = document.querySelector('input[name="gender"]:checked').value;

    var clientList;

    if (localStorage.getItem("clientList") == null) {
      clientList = [];
    } else {
      clientList = JSON.parse(localStorage.getItem("clientList"));
    }

    clientList.push({
      firstName: firstName,
      lastName: lastName,
      age: age,
      eMail: eMail,
      gender: gender,
    });

    localStorage.setItem("clientList", JSON.stringify(clientList));
    readData();
    resetForm();
  }
}
function deleteData(index) {
  var clientList;
  if (localStorage.getItem("clientList") == null) {
    clientList = [];
  } else {
    clientList = JSON.parse(localStorage.getItem("clientList"));
  }

  clientList.splice(index, 1);
  localStorage.setItem("clientList", JSON.stringify(clientList));
  readData();
}

function updateData(index) {
  showUpdate();
  var clientList;
  if (localStorage.getItem("clientList") == null) {
    clientList = [];
  } else {
    clientList = JSON.parse(localStorage.getItem("clientList"));
  }

  document.getElementById("firstName").value = clientList[index].firstName;
  document.getElementById("lastName").value = clientList[index].lastName;
  document.getElementById("age").value = clientList[index].age;
  document.getElementById("eMail").value = clientList[index].eMail;

  // Get the gender value from the selected row
  var gender = clientList[index].gender;

  // Check the appropriate radio button based on the gender value
  if (gender === "Male") {
    document.getElementById("dot-1").checked = true;
  } else if (gender === "Female") {
    document.getElementById("dot-2").checked = true;
  } else if (gender === "Other") {
    document.getElementById("dot-3").checked = true;
  }

  document.querySelector("#updateButton").onclick = function () {
    if (validateInputs() == true) {
      clientList[index].firstName = document.getElementById("firstName").value;
      clientList[index].lastName = document.getElementById("lastName").value;
      clientList[index].age = document.getElementById("age").value;
      clientList[index].eMail = document.getElementById("eMail").value;
      // clientList[index].gender = document.getElementById("gender").value;
      var selectedGender = document.querySelector(
        'input[name="gender"]:checked'
      ).value;
      clientList[index].gender = selectedGender;

      localStorage.setItem("clientList", JSON.stringify(clientList));
      readData();
      resetForm();
      showRegister();
    }
  };
}

function showUpdate() {
  document.getElementById("registerButton").style.display = "none";
  document.getElementById("updateButton").style.display = "block";
}
function showRegister() {
  document.getElementById("registerButton").style.display = "block";
  document.getElementById("updateButton").style.display = "none";
}
