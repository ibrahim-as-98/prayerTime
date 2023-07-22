let citys = [
  {
    arName: "القاهرة",
    name: "Al Jīzah	",
    country: "ُEG",
  },
  {
    arName: "مكة",
    name: "Makkah al Mukarramah",
    country: "SA",
  },
  {
    arName: "الرياض",
    name: "Ar Riyāḑ",
    country: "SA",
  },
  {
    arName: "المنصورة",
    name: "Ad Daqahlīyah",
    country: "ُEG",
  },
];

for (let city of citys) {
  let contant = ` <option >${city.arName}</option>`;
  document.getElementById("selector").innerHTML += contant;
}
document.getElementById("selector").addEventListener("change", function () {
  document.getElementById("cityName").innerHTML = this.value;
  let cityName = "";
  let country = "";
  for (let city of citys) {
    if (city.arName == this.value) {
      cityName = city.name;
      country = city.country;
    }
  }
  mainfunc(cityName, country);
});

function mainfunc(cityName, country) {
  let params = {
    country: country,
    city: cityName,
    method: "3",
    tune: "3,17,4,20,17,16,16,17",
  };
  axios
    .get("http://api.aladhan.com/v1/timingsByCity", {
      params: params,
    })
    .then(function (response) {
      let timings = response.data.data.timings;
      fillAdhanTime("Fajr", timings.Fajr);
      fillAdhanTime("Sunrise", timings.Sunrise);
      fillAdhanTime("Dhuhr", timings.Dhuhr);
      fillAdhanTime("Asr", timings.Asr);
      fillAdhanTime("Maghrib", timings.Maghrib);
      fillAdhanTime("Isha", timings.Isha);
      let date = response.data.data.date.readable;
      let day = response.data.data.date.hijri.weekday.ar;
      document.getElementById("date").innerHTML = day + " " + date;
      document.querySelectorAll(".time").forEach((el) => {
        el.addEventListener("click", (e) => {
          var cur = e.target.innerHTML;
          let noow = ` ${date} ${cur}`;
          countDown(noow);
          setTimeout(() => {
            document.getElementById("now").innerHTML = "";
          }, 2000);
        });
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}
mainfunc("Al Jīzah", "ُEG");

function fillAdhanTime(id, time) {
  document.getElementById(id).innerHTML = time;
}
function countDown(a) {
  var countDownDate = new Date(a).getTime();

  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds

  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  if (minutes < 0) {
    document.getElementById("now").innerHTML = ` انقضى وقت الصلاة منذ${
      -hours - 1
    }ساعة و ${-minutes - 1} دقيقة `;
    return;
  }
  document.getElementById(
    "now"
  ).innerHTML = ` المتبقي عن الصلاة ${hours}ساعة و ${minutes} دقيقة `;
}
