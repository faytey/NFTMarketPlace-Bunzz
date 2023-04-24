import React, { useEffect, useState } from "react";

export const CountDownTimer = ({ time }) => {
  let timer = Number(time);
  var countDownDate = new Date(timer).getTime();
  const [string, setString] = useState("");
  // const [tInfo, setTInfo] = useState();
  // Update the count down every 1 second

  var x = setInterval(function () {
    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate * 1000 - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    let v;
    // Display the result in the element with id="demo"
    // v = document.getElementById("demo")?.innerHTML;
    // setTInfo(v);

    v = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
    setString(v);

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      // document.getElementById("demo").innerHTML =

      setString("00d 00h 00m 00s");
    }
  }, 1000);

  let str = 0 + "d " + 0 + "h " + 0 + "m " + 0 + "s ";

  useEffect(() => {
    setString(str);
  }, [str]);

  return (
    <div
      id="demo"
      className="border border-black shadow-md drop-shadow-lg p-1 w-[50%] text-center rounded-md bg-[rgba(255,255,255,0.5)] text-black"
    >
      {string}
    </div>
  );
};
