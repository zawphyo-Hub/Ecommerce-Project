function Admin() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
 
  window.location.href = "/signin"; // or use react-router navigate()
}
