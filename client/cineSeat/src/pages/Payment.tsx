import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const Payment = () => {
  const navigate = useNavigate();
  const { state } = useLocation(); // Receives data from Seat component
  const [paymentMethod, setPaymentMethod] = useState("credit_card");

  const handlePayment = () => {
    // Simulate Payment Processing
    setTimeout(() => {
      navigate(`/confirmation${state.id}`, {
        state: {
          title: state?.title,
          selectedSeats: state?.seats,
          totalPrice: state?.totalPrice,
          day: state?.day,
          time: state?.time,
          image: state?.image,
          id: state?.id,
        },
      });
    }, 2000);
  };

  return (
    <div className="px-4 sm:px-8 mt-5 text-left">
      {/* Back Button and Title */}
      <div className="flex gap-3 md:hidden">
        <div onClick={() => navigate(-1)} className="cursor-pointer flex mt-7">
          <ArrowBackIosIcon className="mt-1 text-white light:text-black" />
        </div>
        <div>
          <h1 className="mt-6 text-xl sm:text-3xl font-bold text-white light:text-black">
            Payment
          </h1>
          <p className="text-gray-300">{state?.title}</p>
          <p className="text-gray-400">
            {state?.day?.week}, {state?.day?.month} {state?.day?.day} |{" "}
            {state?.time}
          </p>
        </div>
      </div>

      <div className="gap-10 md:flex flex-row-reverse items-start justify-end">
        <div className="flex-[2]">
          {/* Selected Seats & Total Price */}
          <div className="mt-5 text-white light:text-black">
            <h1 className="mt-6 text-xl sm:text-3xl font-bold text-white light:text-black">
              Ticket Summary
            </h1>

            <img className="max-w-50" src={state.image} alt={state.title} />
            {/* Selected Seats */}
            <div className="mt-5 text-white light:text-black text-sm ">
              <h1 className="font-semibold text-xl md:text-2xl">
                Selected Seats:{" "}
              </h1>
              <div className="mt-3">
                {state.seats.length > 0 ? (
                  <div className="flex items-center gap-3">
                    {state.seats.map((seat: string) => (
                      <div
                        key={seat}
                        className="border-1 p-3 w-10 h-10 flex items-center justify-center rounded-md"
                      >
                        {seat}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="md:text-lg">No seats selected</p>
                )}
              </div>
            </div>
            <p className="text-lg mt-2"></p>
            <h2 className="text-xl font-semibold mt-4">
              Total Price:{" "}
              <h4 className="text-[#FFD700] light:text-gray-600">
                {" "}
                ₱{state?.totalPrice.toFixed(2)}
              </h4>
            </h2>
          </div>
        </div>

        <div className="flex-[4] ">
          {/* Back Button and Title */}
          <div className="md:flex gap-3 hidden ">
            <div
              onClick={() => navigate(-1)}
              className="cursor-pointer flex mt-7"
            >
              <ArrowBackIosIcon className="mt-1 text-white light:text-black" />
            </div>
            <div>
              <h1 className="mt-6 text-xl sm:text-3xl font-bold text-white light:text-black">
                Payment
              </h1>
              <p className="text-gray-300">{state?.title}</p>
              <p className="text-gray-400">
                {state?.day?.week}, {state?.day?.month} {state?.day?.day} |{" "}
                {state?.time}
              </p>
            </div>
          </div>
          {/* Payment Options */}
          <div className="mt-6 max-w-180">
            <h2 className="text-lg font-semibold text-white light:text-black">
              Choose Payment Method:
            </h2>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className=" w-full p-2 border border-gray-400 rounded-md bg-[#292929] light:bg-gray-200 text-white light:text-black focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] outline-none mt-3"
            >
              <option value="credit_card">Credit/Debit Card</option>
              <option value="gcash">GCash</option>
              <option value="paymaya">PayMaya</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>

          {/* Payment Details */}
          {paymentMethod === "credit_card" && (
            <div className="mt-4 max-w-180">
              <input
                type="text"
                placeholder="Card Number"
                className="w-full p-2 mb-2 border rounded-md bg-[#292929] text-white light:bg-gray-200 light:text-black"
              />
              <div className="flex gap-3 mt-3">
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-1/2 p-2 border rounded-md bg-[#292929] text-white light:bg-gray-200 light:text-black"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="w-1/2 p-2 border rounded-md bg-[#292929] text-white light:bg-gray-200 light:text-black"
                />
              </div>
            </div>
          )}

          {/* Pay Button */}

          <button
            onClick={handlePayment}
            className=" max-w-180 cursor-pointer bg-[#FFD700] rounded-sm p-3 mt-6 w-full text-black font-semibold hover:shadow-lg shadow-yellow-500/50 light:shadow-gray-200 transition-all duration-300 ease-in-out"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
