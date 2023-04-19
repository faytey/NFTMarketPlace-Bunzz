import React from "react";

export const CountDownTimer = ({ time }) => {
  let timer = new Date(Number(time));
  //   let times = timer.slice(4, 23);
  console.log(timer);
  var countDownDate = new Date("Apr 20, 2023 18:16:04").getTime();

  // Update the count down every 1 second
  var x = setInterval(function () {
    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    document.getElementById("demo").innerHTML =
      days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("demo").innerHTML = "00d 00h 00m 00s";
    }
  }, 1000);
  return (
    <div
      id="demo"
      className="border p-1 w-[50%] text-center rounded-md bg-white text-black"
    ></div>
  );
};
