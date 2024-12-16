"use strict";
export class Details {
  constructor(id) {
    this.id = id;
  }
  async getDetailsApi() {
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${this.id}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "80a7ddc8bcmshf50baf1aa21f777p175e84jsn71d9cf117b2f",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
    loadingScreen.classList.remove("d-none");
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
      return error;
    } finally {
      loadingScreen.classList.add("d-none");
    }
  }
}
