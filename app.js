const seats = document.querySelectorAll(".seats");
const Class = "Economy";
const ticketPrice = 550;
const totalSeat = 40;
let selectedSeatNumber = 0;
let totalPrice = 0;

for (let index = 0; index < seats.length; index++) {
  const seat = seats[index];

  seat.addEventListener("click", function () {
    const seatName = seat.innerText;

    if (seat.classList.contains("selected")) {
      seat.classList.remove("selected");
      selectedSeatNumber--;

      const selectedSeatName = document.getElementById("selectedSeatName");
      const seatRemove = Array.from(selectedSeatName.children).find(function (
        p
      ) {
        return p.innerText.includes(seatName);
      });

      if (seatRemove) {
        selectedSeatName.removeChild(seatRemove);
      }
    } else if (selectedSeatNumber < 4) {
      seat.classList.add("selected");
      selectedSeatNumber++;

      const selectedSeatName = document.getElementById("selectedSeatName");
      const p = document.createElement("p");
      p.innerText = `${seatName}${Class}${ticketPrice}`;
      selectedSeatName.appendChild(p);
    } else {
      alert("You can only book up to 4 seats at a time.");
    }
    updateStatus();
  });
}

function updateStatus() {
  let numberOfSeat = document.getElementById("numberOfSeat");
  numberOfSeat.innerText = selectedSeatNumber;

  let seatLeft = totalSeat - selectedSeatNumber;
  const total_seat = document.getElementById("total-seat");
  total_seat.innerText = seatLeft + " " + "Seats left";

  totalPrice = selectedSeatNumber * ticketPrice;
  const total_price = document.getElementById("total-price");
  total_price.innerText = totalPrice;

  const userNumber = document.getElementById("number");
  const nextBtn = document.getElementById("nextBtn");
  //   nextBtn.disabled = true;

  nextBtn.addEventListener("click", function () {
    if (selectedSeatNumber > 0 && userNumber.value !== "") {
      console.log("clicked");
      my_modal_2.showModal();
    } else {
      alert("Enter your phone number");
    }
  });
}

const couponBtn = document.getElementById("coupon-btn");

couponBtn.addEventListener("click", function () {
  const couponValue = document
    .getElementById("coupon-text")
    .value.split(" ")
    .join("")
    .toUpperCase();

  if (selectedSeatNumber === 4) {
    const discountContainer = document.getElementById("discount-price");
    const discountPercentage = { NEW15: 0.15, NEW20: 0.2 }[couponValue];

    if (discountPercentage !== undefined) {
      const discountPrice = totalPrice * discountPercentage;
      discountContainer.innerText = discountPrice;
      document.getElementById("grand-total").innerText =
        totalPrice - discountPrice;

      const couponField = document.getElementById("coupon-text");
      couponField.style.display = "none";
      couponBtn.style.display = "none";
    } else {
      alert("Invalid Coupon code. Please enter a valid code");
    }
  } else {
    alert("You need to buy 4 tickets to apply a coupon code :)");
  }
});
