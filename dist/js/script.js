const homebtn = document.getElementById("home-btn");
// const fiturbtn = document.getElementById("fitur-btn");
const detailbtn = document.getElementById("detail-btn");
const home = document.getElementById("home");
// const fitur = document.getElementById("fitur");
const detail = document.getElementById("detail");
const navBtn = document.getElementById("nav-btn");
const closest = document.getElementById("close");
const opened = document.getElementById("open");
const todetail = document.getElementById("todetail");
const backhome = document.getElementById("backhome");

navBtn.addEventListener("click", () => {
  closest.classList.toggle("hidden");
  opened.classList.toggle("hidden");
});

homebtn.addEventListener("click", () => {
  homebtn.classList.add("bg-gray-200");
  homebtn.classList.remove("text-gray-100");
  home.style.display = "block";
  home.classList.add("opacity-100");
  home.classList.remove("opacity-0");
  // fitur.style.display = "none";
  // fitur.classList.add("opacity-0");
  // fiturbtn.classList.remove("bg-gray-200");
  // fiturbtn.classList.add("text-gray-100");
  // fitur.classList.remove("opacity-100");
  detail.style.display = "none";
  detail.classList.add("opacity-0");
  detail.classList.remove("opacity-100");
  detailbtn.classList.remove("bg-gray-200");
  detailbtn.classList.add("text-gray-100");
});

// fiturbtn.addEventListener("click", () => {
//   home.style.display = "none";
//   home.classList.add("opacity-0");
//   home.classList.remove("opacity-100");
//   homebtn.classList.remove("bg-gray-200");
//   homebtn.classList.add("text-gray-100");
//   fitur.style.display = "block";
//   fitur.classList.remove("opacity-0");
//   fitur.classList.add("opacity-100");
//   fiturbtn.classList.add("bg-gray-200");
//   fiturbtn.classList.remove("text-gray-100");
//   detail.style.display = "none";
//   detail.classList.add("opacity-0");
//   fitur.classList.remove("opacity-100");
//   detailbtn.classList.remove("bg-gray-200");
//   detailbtn.classList.add("text-gray-100");
// });

detailbtn.addEventListener("click",  () => {
  home.style.display = "none";
  home.classList.add("opacity-0");
  home.classList.remove("opacity-100");
  homebtn.classList.remove("bg-gray-200");
  homebtn.classList.add("text-gray-100");
  // fitur.style.display = "none";
  // fitur.classList.add("opacity-0");
  // fitur.classList.remove("opacity-100");
  // fiturbtn.classList.remove("bg-gray-200");
  // fiturbtn.classList.add("text-gray-100");
  detail.style.display = "block";
  detail.classList.remove("opacity-0");
  detail.classList.add("opacity-100");
  detailbtn.classList.add("bg-gray-200");
  detailbtn.classList.remove("text-gray-100");
});

todetail.addEventListener("click", () => {
  home.style.display = "none";
  home.classList.add("opacity-0");
  home.classList.remove("opacity-100");
  homebtn.classList.remove("bg-gray-200");
  homebtn.classList.add("text-gray-100");
  // fitur.style.display = "none";
  // fitur.classList.add("opacity-0");
  // fitur.classList.remove("opacity-100");
  // fiturbtn.classList.remove("bg-gray-200");
  // fiturbtn.classList.add("text-gray-100");
  detail.style.display = "block";
  detail.classList.remove("opacity-0");
  detail.classList.add("opacity-100");
  detailbtn.classList.add("bg-gray-200");
  detailbtn.classList.remove("text-gray-100");
});

backhome.addEventListener("click", () => {
  homebtn.classList.add("bg-gray-200");
  homebtn.classList.remove("text-gray-100");
  home.style.display = "block";
  home.classList.add("opacity-100");
  home.classList.remove("opacity-0");
  // fitur.style.display = "none";
  // fitur.classList.add("opacity-0");
  // fiturbtn.classList.remove("bg-gray-200");
  // fiturbtn.classList.add("text-gray-100");
  // fitur.classList.remove("opacity-100");
  detail.style.display = "none";
  detail.classList.add("opacity-0");
  detail.classList.remove("opacity-100");
  detailbtn.classList.remove("bg-gray-200");
  detailbtn.classList.add("text-gray-100");
});