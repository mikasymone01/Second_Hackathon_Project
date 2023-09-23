function submitInfo(email, major, location) {
  console.log("storing");
  alert(location);
  var name = document.getElementById();
  var email = document.getElementById("email").value;
  var major = document.getElementById("major").value;

  localStorage.setItem("userEmail", email);
  localStorage.setItem("userMajor", major);
  localStorage.setItem("tempLoc", location);
}
