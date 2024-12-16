"use strict";
const showMainData = document.getElementById("showMainData");
const showDetails = document.getElementById("showDetails");
const links = document.querySelectorAll("[data-target] li a");
const gameSection = document.getElementById("gameSection");
const detailsSection = document.getElementById("detailsSection");
const closeBtn = document.getElementById("closeBtn");
// Get Class Home 
import { Home } from "./home.module.js";
// Get Class Details 
import { Details } from "./details.module.js";

// Home
class DisplayHome {
  constructor(homeArr) {
    this.homeArr = homeArr;
  }
  displayHomeData() {
    let tmp = ``;
    this.homeArr.map(function (game) {
      tmp += `
                          <div class="col-xl-3 col-lg-4 col-md-6 col-12">
                              <div class="game-box" id="${game.id}">
                                <div class="card bg-transparent h-100">
                                  <div class="card-header border-0 py-3 pb-0">
                                    <div class="img-box">
                                      <img
                                        class="card-img-top w-100"
                                        src="${game.thumbnail}"
                                        alt="Title"
                                      />
                                    </div>
                                  </div>
                                  <div class="card-body">
                                    <div
                                      class="d-flex justify-content-between align-items-center"
                                    >
                                      <h4 class="card-title fs-14 m-0 pt-0">${
                                        game.title
                                      }</h4>
                                      <span class="text-white bg-free rounded-3 px-2">Free</span>
                                    </div>
                                    <p class="card-text text-center card-txt-color">
                                      ${game.short_description.split(" ", 8)}
                                    </p>
                                  </div>
                                  <div class="card-footer">
                                    <div
                                      class="d-flex justify-content-between align-items-center mb-0"
                                    >
                                      <span
                                        class="text-uppercase text-white bg-footer rounded-2 px-2 fs-14"
                                        >${game.genre}</span
                                      >
                                      <span
                                        class="text-uppercase text-white bg-footer rounded-2 px-2 fs-14"
                                        >${game.platform}</span
                                      >
                                    </div>
                                  </div>
                                </div>
                              </div>
                          </div>
                      `;
    });
    showMainData.innerHTML = tmp;
  }
}
// Details
class DisplayDetails {
  constructor(detailsObj) {
    this.detailsObj = detailsObj;
  }
  displayDetailsData() {
    let tmp = `
                        <div class="col-md-4 col-12">
                            <div class="img">
                              <img class="w-100" src="${this.detailsObj.thumbnail}" alt="thumbnail" />
                            </div>
                        </div>
                        <div class="col-md-8 col-12">
                          <div class="content-box">
                            <h3>Title: <span class="active-color">${this.detailsObj.title}</span></h3>
                            <h4 class="mt-3">
                              Category: <span class="text-uppercase">${this.detailsObj.genre}</span>
                            </h4>
                            <h4>Platform: <span class="">${this.detailsObj.platform}</span></h4>
                            <h4>Status: <span class="">${this.detailsObj.status}</span></h4>
                            <p class="text-white">
                                ${this.detailsObj.description}
                            </p>
                            <a class="btn btn-outline-warning text-white" href="${this.detailsObj.game_url}" target="_blank"
                              >Show Game</a
                            >
                          </div>
                        </div>
                        `;
    showDetails.innerHTML = tmp;
    // gameSection.classList.remove("d-none");
  }
}
// Set Home
async function setHomeData(id = "mmorpg") {
  const show = new Home(id);
  const displayHome = new DisplayHome(await show.getHomeApi());
  displayHome.displayHomeData();

  const gamesBox = document.querySelectorAll(".game-box");
  [...gamesBox].map(function (game) {
    game.addEventListener("click", function () {
      console.log(game.id);
      setDetailsData(game.id);
    });
  });
}
// Set Details
async function setDetailsData(id) {
  const detail = new Details(id);
  const displayDetails = new DisplayDetails(await detail.getDetailsApi());
  displayDetails.displayDetailsData();
  showDetailsSection();
  closeDetails();
}
// Remove class "active" from Links
function removeActive() {
  [...links].map(function (a) {
    a.classList.remove("active");
  });
}

function closeDetails() {
  closeBtn.addEventListener("click", function (e) {
    showHomeSection();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      showHomeSection();
    }
  });
}

function showHomeSection() {
  detailsSection.classList.add("d-none");
  gameSection.classList.remove("d-none");
}

function showDetailsSection() {
  detailsSection.classList.remove("d-none");
  gameSection.classList.add("d-none");
}

export function show() {
  setHomeData();
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("nav-link")) {
      removeActive();
      e.target.classList.add("active");
      setHomeData(e.target.id);
    }
  });
}
