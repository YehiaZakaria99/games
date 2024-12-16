"use strict";
export class Home {
  constructor(category) {
    this.category = category;
  }
  async getHomeApi() {
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${this.category}`;
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
      return result.slice(0, -1);
    } catch (error) {
      console.error(error);
      return error;
    } finally {
      loadingScreen.classList.add("d-none");
    }
  }
}
