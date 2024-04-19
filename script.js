class getKey {
  #keyApi = "055877ba4940446b9a6182855241904";

  showKey() {
    return this.#viewKey();
  }

  #viewKey() {
    return this.#keyApi;
  }
}

$("#searchLocation").submit(async function (e) {
  e.preventDefault();

  const location = $("#location").val();

  if (location != "") {
    const weater = await getWeater(location);

    if (weater) {
      const wind = weater.current.wind_kph;
      const humidity = weater.current.humidity;
      const tempLocation = weater.current.temp_c;
      const nameLocation = weater.location.country;

      $("#temp").text(`${tempLocation}º C`);
      $("#nameLocation").text(nameLocation);
      $("#humidity").text(`${humidity}%`);
      $("#wind").text(`${wind}Km/h`);
      $(".box").css({
        height: "500px",
      });

      $(".box header").css({
        height: "60px",
      });

      setTimeout(function () {
        $(".box main").css({
          height: "100%",
          transform: "translate(-50%, -50%) scale(1)",
        });
      }, 500);
    } else {
      $("#temp").text(`--º C`);
      $("#nameLocation").text("Not Found");
      $("#humidity").text(`--%`);
      $("#wind").text(`--Km/h`);

      $(".box").css({
        height: "500px",
      });

      $(".box header").css({
        height: "60px",
      });

      setTimeout(function () {
        $(".box main").css({
          height: "100%",
          transform: "translate(-50%, -50%) scale(1)",
        });
      }, 500);
    }
  }
});

function getWeater(location) {
  return new Promise((resolve) => {
    const key = new getKey().showKey();
    const url = `http://api.weatherapi.com/v1/forecast.json?q=${location}&days=5&aqi=yes&key=${key}`;
    const settings = {
      async: true,
      crossDomain: true,
      url,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      processData: false,
      data: "",
      success: function (data) {
        resolve(data);
      },
      error: function (data) {
        resolve(false);
      },
    };

    $.ajax(settings);
  });
}
