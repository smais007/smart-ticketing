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

      const seatInfo = `<div style="display:flex"><span style="margin-right: 153px;">${seatName}</span> <span style="margin-right: 100px;">${Class}</span> <span>${ticketPrice}</span></div>`;

      const p = document.createElement("p");
      p.innerHTML = seatInfo;
      selectedSeatName.appendChild(p);
    } else {
      // alert("You can only book up to 4 seats at a time.");
      swal({
        title: "OPPS!",
        text: "You can only book up to 4 seats at a time.",
        icon: "warning",
      });
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
  const discount_price = document.getElementById("grand-total");
  total_price.innerText = totalPrice;
  discount_price.innerText = totalPrice;

  const userNumber = document.getElementById("number");
  const nextBtn = document.getElementById("nextBtn");
  //   nextBtn.disabled = true;

  nextBtn.addEventListener("click", function () {
    if (selectedSeatNumber > 0 && userNumber.value !== "") {
      // console.log("clicked");
      my_modal_2.showModal();

      setTimeout(function () {
        window.location.reload();
      }, 2000);
    } else {
      swal({
        title: "Pone Number Required",
        text: "Please enter your phone number",
        icon: "info",
      });
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
    const discountPercentage = { NEW15: 0.15, COUPLE20: 0.2 }[couponValue];

    if (discountPercentage !== undefined) {
      const discountPrice = totalPrice * discountPercentage;
      discountContainer.innerText = discountPrice;
      document.getElementById("grand-total").innerText =
        totalPrice - discountPrice;

      const couponField = document.getElementById("coupon-text");
      couponField.style.display = "none";
      couponBtn.style.display = "none";
    } else {
      // alert("Invalid Coupon code. Please enter a valid code");
      swal({
        title: "Invalid coupon code",
        text: "Please enter a valid coupon code.",
        icon: "error",
      });
    }
  } else {
    // alert("You need to buy 4 tickets to apply a coupon code :)");
    swal({
      title: "OPPS!",
      text: "You need to buy 4 tickets to apply a coupon code ",
      icon: "error",
    });
  }
});

// modal close
function closeModal() {
  const modal = document.getElementById("my_modal_2");
  modal.close();
}
