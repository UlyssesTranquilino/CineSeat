import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useUserStore, useTheme } from "../global/mode"; // Or your correct store path

import { Toaster, toast } from "react-hot-toast";
// PayPal global object (if SDK script were loaded in a real scenario)
declare global {
  interface Window {
    paypal?: any; // Basic type for PayPal SDK
  }
}

interface PaymentLocationState {
  location: any;
  theaterName: any;
  screen: any;
  genre: any;
  id: string; // Movie ID or a unique identifier for the booking item
  title: string;
  seats: string[];
  totalPrice: number;
  day: {
    week: string;
    month: string;
    day: string;
  };
  time: string;
  image: string;
}

const Payment: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { processPayment, currentUser } = useUserStore(); // For credit cards (sample)
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as PaymentLocationState | undefined;

  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  // Controlled inputs for card details
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState(""); // To store "MM/YY"
  const [cvv, setCvv] = useState("");

  const [isCreditCardProcessing, setIsCreditCardProcessing] = useState(false);

  // Local loading/error states for other payment methods (sample)
  const [isOtherPaymentProcessing, setIsOtherPaymentProcessing] =
    useState(false);
  const [otherPaymentError, setOtherPaymentError] = useState<string | null>(
    null
  );

  const toastError = () => {
    toast.error("Payment failed. Please try again.", {
      style: isDarkMode
        ? {
            border: "1px solid #b91c1c",
            color: "#fff",
            backgroundColor: "#1f2937",
          }
        : {
            border: "1px solid #ef4444",
            color: "#000",
            backgroundColor: "#fef2f2",
          },
      iconTheme: isDarkMode
        ? { primary: "#ef4444", secondary: "#fef2f2" }
        : { primary: "#dc2626", secondary: "#fef2f2" },
    });
  };
  const handleCreditCardSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!state) return;

    setIsCreditCardProcessing(true);
    setOtherPaymentError(null);

    try {
      // Prepare booking data
      const movieDetails = {
        id: state.id,
        genre: state.genre,
        image: state.image,
        title: state.title,
      };

      const bookingDetails = {
        date: {
          day: state.day,
          time: state.time,
        },
        seats: state.seats,
        price: state.totalPrice,
        screen: state.screen,
        theaterName: state.theaterName,
        location: state.location,
        paymentMethod: "Credit/Debit Card",
      };

      // Process payment (booking)
      await processPayment(currentUser, movieDetails, bookingDetails);

      await new Promise((resolve) =>
        setTimeout(resolve, 2000 + Math.random() * 1000)
      );

      // Navigate to confirmation
      navigate(`/movie/confirmation/${state.id}`, {
        state: {
          ...state,
          price: state.totalPrice.toFixed(2),
          paymentMethod: "Credit/Debit Card",
        },
      });
    } catch (error: any) {
      console.error("Error during credit card submission:", error);
      setOtherPaymentError("Payment failed. Please try again.");

      toastError();
    } finally {
      setIsCreditCardProcessing(false);
    }
  };

  const simulatePaymentAndNavigate = async (methodName: string) => {
    if (!state) return;
    setIsOtherPaymentProcessing(true);
    setOtherPaymentError(null);

    await new Promise((resolve) =>
      setTimeout(resolve, 2000 + Math.random() * 1000)
    ); // Simulate network delay

    try {
      // Prepare booking data
      const movieDetails = {
        id: state.id,
        genre: state.genre,
        image: state.image,
        title: state.title,
      };

      const bookingDetails = {
        date: {
          day: state.day,
          time: state.time,
        },
        seats: state.seats,
        price: state.totalPrice,
        screen: state.screen,
        theaterName: state.theaterName,
        location: state.location,
        paymentMethod: methodName,
      };

      // Process payment (booking)
      await processPayment(currentUser, movieDetails, bookingDetails);

      await new Promise((resolve) =>
        setTimeout(resolve, 2000 + Math.random() * 1000)
      );

      // Navigate to confirmation
      navigate(`/movie/confirmation/${state.id}`, {
        state: {
          ...state,
          price: state.totalPrice.toFixed(2),
          paymentMethod: methodName,
        },
      });
    } catch (error) {
      console.error("Error during credit card submission:", error);
      setOtherPaymentError("Payment failed. Please try again.");

      toastError();
    } finally {
      setIsOtherPaymentProcessing(false);
    }
  };

  const handleGCashPayment = () => simulatePaymentAndNavigate("GCash");
  const handlePayMayaPayment = () => simulatePaymentAndNavigate("PayMaya");
  const handlePaypalPayment = () => simulatePaymentAndNavigate("Paypal");

  // --- PayPal Integration (Sample: Renders a placeholder button if SDK isn't really loaded) ---
  useEffect(() => {
    if (paymentMethod === "paypal" && state) {
      const paypalContainer = document.getElementById(
        "paypal-button-container"
      );
      if (paypalContainer) {
        paypalContainer.innerHTML = ""; // Clear previous
        if (window.paypal && typeof window.paypal.Buttons === "function") {
          // This part would run if the PayPal SDK was actually loaded and configured

          try {
            window.paypal
              .Buttons({
                createOrder: (data: any, actions: any) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: state.totalPrice.toFixed(2),
                          currency_code: "PHP",
                        },
                        description: `Sample booking for ${state.title}`,
                        custom_id: state.id,
                      },
                    ],
                  });
                },
                onApprove: async (data: any, actions: any) => {
                  const orderDetails = await actions.order.capture();

                  await simulatePaymentAndNavigate("PayPal (Approved via SDK)");
                },
                onError: (err: any) => {
                  console.error("Sample PayPal Button SDK Error:", err);
                  setOtherPaymentError(
                    "Simulated PayPal SDK error. Please try again."
                  );
                  setIsOtherPaymentProcessing(false);
                },
                onCancel: () => {
                  setOtherPaymentError("PayPal payment was cancelled.");
                  setIsOtherPaymentProcessing(false);
                },
              })
              .render("#paypal-button-container");
          } catch (sdkError) {
            console.error(
              "Error rendering PayPal SDK buttons (sample):",
              sdkError
            );
            // Fallback if SDK render fails even if window.paypal exists
            paypalContainer.innerHTML = `<p class="text-sm text-yellow-500">Error initializing PayPal buttons. SDK might be misconfigured for sample.</p>`;
          }
        } else {
          // Fallback if PayPal SDK is not loaded (most likely for this sample)

          const placeholderButton = document.createElement("button");
          placeholderButton.innerHTML = `Proceed with PayPal (Sample - ₱${state.totalPrice.toFixed(
            2
          )})`;
          placeholderButton.className =
            "w-full cursor-pointer bg-blue-600 hover:bg-blue-700 rounded-md p-3 mt-4 text-white font-semibold transition-colors duration-300 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed";
          placeholderButton.onclick = () =>
            simulatePaymentAndNavigate("PayPal (Placeholder)");
          if (isOtherPaymentProcessing) placeholderButton.disabled = true;
          paypalContainer.appendChild(placeholderButton);
        }
      }
    }
  }, [paymentMethod, state, isOtherPaymentProcessing]); // Rerun if isOtherPaymentProcessing changes for button disabling

  if (!state) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-white light:text-black p-4">
        <p className="text-xl mb-4 text-center">
          Payment information is missing.
        </p>
        <Link to="/" className="text-[#FFD700] hover:underline font-semibold">
          Return to Homepage
        </Link>
      </div>
    );
  }

  const PageHeader = () => (
    <div className="flex gap-3 items-center mb-6">
      <div
        onClick={() => navigate(-1)}
        className="cursor-pointer p-2 -ml-2 rounded-fulltransition-colors"
      >
        <ArrowBackIosIcon className=" text-white light:text-black" />{" "}
        {/* Adjusted icon alignment */}
      </div>
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white light:text-black">
          {state.title}
        </h1>

        <p className="text-sm text-gray-400 light:text-gray-600">
          {state.day.week}, {state.day.month} {state.day.day} | {state.time}
        </p>
      </div>
    </div>
  );

  const TicketSummary = () => (
    <div className="flex-[2] lg:flex-[1.5] xl:flex-[1] md:sticky md:top-6 bg-gray-900 light:bg-gray-100 p-4 sm:p-6 rounded-lg shadow-xl mb-6 md:mb-0">
      <h2 className="text-xl font-bold mb-4 text-white light:text-black">
        Ticket Summary
      </h2>
      <img
        className="w-full rounded-md mb-4 max-w-xs mx-auto mt-3"
        src={state.image}
        alt={state.title}
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "https://via.placeholder.com/300x450/000000/FFFFFF?text=Poster+Not+Available";
        }}
      />
      <div className="space-y-2 text-sm text-gray-200 light:text-gray-800">
        <div className="font-semibold text-base text-white light:text-black">
          Selected Seats:
        </div>
        {state.seats.length > 0 ? (
          <div className="flex flex-wrap items-center gap-2">
            {state.seats.map((seat: string) => (
              <div
                key={seat}
                className="border border-gray-600 light:border-gray-400 bg-gray-700 light:bg-gray-200 p-2 w-10 h-10 flex items-center justify-center rounded-md text-xs"
              >
                {seat}
              </div>
            ))}
          </div>
        ) : (
          <p>No seats selected</p>
        )}
      </div>
      <div className="border-t border-gray-700 light:border-gray-300 my-4"></div>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white light:text-black">
          Total Price:
        </h3>
        <h4 className="text-xl font-bold text-[#FFD700] light:text-yellow-600">
          ₱{state.totalPrice.toFixed(2)}
        </h4>
      </div>
    </div>
  );

  // Common button styling
  const paymentButtonClasses =
    "w-full cursor-pointer rounded-md p-3 mt-6 text-black font-semibold transition-colors duration-300 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center";
  const processingSpinner = (
    <svg
      className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;

    // Remove everything that is NOT a digit
    val = val.replace(/\D/g, "");

    // Limit to 11 digits
    if (val.length > 11) val = val.slice(0, 11);

    // Update the input value programmatically
    e.target.value = val;
  };

  return (
    <div className="px-4 sm:px-8 mt-5 text-left text-white light:text-black">
      <Toaster position="top-center" reverseOrder={false} />
      <PageHeader />
      <div className="gap-6 md:flex flex-row-reverse items-start justify-between">
        <TicketSummary />

        <div className="flex-[3] lg:flex-[2.5] xl:flex-[3]">
          <div className="mt-6 md:mt-0">
            <label
              htmlFor="paymentMethod"
              className="block text-lg font-semibold mb-2 text-white light:text-black"
            >
              Choose Payment Method:
            </label>
            <select
              id="paymentMethod"
              name="paymentMethod" // Still useful if we ever wanted to include it in a generic FormData
              value={paymentMethod}
              onChange={(e) => {
                setPaymentMethod(e.target.value);
                setOtherPaymentError(null); // Clear errors when changing method
              }}
              className="w-full p-3 border border-gray-600 light:border-gray-400 rounded-md bg-gray-700 light:bg-gray-200 text-white light:text-black focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] outline-none"
            >
              <option value="credit_card">Credit/Debit Card (Sample)</option>
              <option value="gcash">GCash (Sample)</option>
              <option value="paymaya">PayMaya (Sample)</option>
              <option value="paypal">PayPal (Sample)</option>
            </select>
          </div>

          {/* Error display for non-credit card methods */}
          {otherPaymentError && paymentMethod !== "credit_card" && (
            <div className="mt-4 p-3 bg-red-900 bg-opacity-50 text-red-300 border border-red-700 rounded-md text-sm">
              {otherPaymentError}
            </div>
          )}

          {paymentMethod === "credit_card" && (
            <form onSubmit={handleCreditCardSubmit} className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="cardNumber"
                  className="block text-sm font-medium mb-1 text-gray-300 light:text-gray-700"
                >
                  Card Number
                </label>
                <input
                  id="cardNumber"
                  type="text"
                  name="cardNumber"
                  value={cardNumber}
                  onChange={(e) => {
                    // Format card number with spaces every 4 digits
                    const value = e.target.value
                      .replace(/\s/g, "")
                      .replace(/(\d{4})/g, "$1 ")
                      .trim();
                    setCardNumber(value.substring(0, 19));
                  }}
                  placeholder="0000 0000 0000 0000"
                  className="w-full p-3 border border-gray-600 light:border-gray-400 rounded-md bg-gray-700 light:bg-gray-200 text-white light:text-black focus:border-[#FFD700]"
                  required
                  pattern="\d{4} \d{4} \d{4} \d{4}"
                  maxLength={19}
                  disabled={isCreditCardProcessing}
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label
                    htmlFor="expiryDate"
                    className="block text-sm font-medium mb-1 text-gray-300 light:text-gray-700"
                  >
                    Expiry Date (MM/YY)
                  </label>
                  <input
                    id="expiryDate"
                    type="text"
                    name="expiryDate"
                    value={expiryDate}
                    onChange={(e) => {
                      // Format expiry date as MM/YY
                      let value = e.target.value.replace(/\D/g, "");
                      if (value.length > 2) {
                        value =
                          value.substring(0, 2) + "/" + value.substring(2, 4);
                      }
                      setExpiryDate(value.substring(0, 5));
                    }}
                    placeholder="MM/YY"
                    className="w-full p-3 border border-gray-600 light:border-gray-400 rounded-md bg-gray-700 light:bg-gray-200 text-white light:text-black focus:border-[#FFD700]"
                    required
                    pattern="\d{2}/\d{2}"
                    maxLength={5}
                    disabled={isCreditCardProcessing}
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="cvv"
                    className="block text-sm font-medium mb-1 text-gray-300 light:text-gray-700"
                  >
                    CVV
                  </label>
                  <input
                    id="cvv"
                    type="password"
                    name="cvv"
                    value={cvv}
                    onChange={(e) => {
                      // Only allow numbers and limit length
                      const value = e.target.value.replace(/\D/g, "");
                      setCvv(value.substring(0, 4));
                    }}
                    placeholder="•••"
                    className="w-full p-3 border border-gray-600 light:border-gray-400 rounded-md bg-gray-700 light:bg-gray-200 text-white light:text-black focus:border-[#FFD700]"
                    required
                    pattern="\d{3,4}"
                    maxLength={4}
                    disabled={isCreditCardProcessing}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isCreditCardProcessing || !state}
                className={`${paymentButtonClasses} bg-[#FFD700] hover:bg-yellow-400`}
              >
                {isCreditCardProcessing ? (
                  <>{processingSpinner} Processing...</>
                ) : (
                  `Pay ₱${
                    state
                      ? state.totalPrice.toLocaleString("en-PH", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      : "0.00"
                  } with Card`
                )}
              </button>
            </form>
          )}

          {["gcash", "paymaya", "paypal"].includes(paymentMethod) && (
            <div className="mt-6 space-y-4">
              <p className="text-sm light:text-gray-500 text-gray-400">
                {paymentMethod === "gcash" &&
                  "You will be redirected to GCash (sample flow)."}

                {paymentMethod === "paymaya" &&
                  "You will be redirected to PayMaya (sample flow)."}

                {paymentMethod === "paypal" &&
                  "Use the PayPal button below to complete your payment (sample)."}
              </p>

              <div>
                <label
                  htmlFor="phone-number"
                  className="block text-sm font-medium light:text-gray-700 text-gray-300 mb-1"
                >
                  Phone Number
                </label>
                <input
                  id="phone-number"
                  type="tel"
                  placeholder="09xxxxxxxxx"
                  maxLength={11}
                  inputMode="numeric"
                  onChange={handlePhoneChange}
                  className="w-full px-4 py-2 rounded-md border light:border-gray-300 border-gray-600 
             light:bg-white bg-gray-800 light:text-gray-900 text-white 
             focus:outline-none focus:ring-2 focus:border-[#FFD700]  focus:ring-[#FFD700] outline-none"
                />
              </div>

              {paymentMethod === "gcash" && (
                <button
                  onClick={handleGCashPayment}
                  disabled={isOtherPaymentProcessing || !state}
                  className={`${paymentButtonClasses} bg-blue-500 hover:bg-blue-600 text-white`}
                >
                  {isOtherPaymentProcessing ? (
                    <>{processingSpinner} Processing...</>
                  ) : (
                    `Proceed with GCash (₱${
                      state?.totalPrice.toFixed(2) ?? "0.00"
                    })`
                  )}
                </button>
              )}

              {paymentMethod === "paymaya" && (
                <button
                  onClick={handlePayMayaPayment}
                  disabled={isOtherPaymentProcessing || !state}
                  className={`${paymentButtonClasses} bg-green-500 hover:bg-green-600 text-white`}
                >
                  {isOtherPaymentProcessing ? (
                    <>{processingSpinner} Processing...</>
                  ) : (
                    `Proceed with PayMaya (₱${
                      state?.totalPrice.toFixed(2) ?? "0.00"
                    })`
                  )}
                </button>
              )}

              {paymentMethod === "paypal" && (
                <button
                  onClick={handlePaypalPayment}
                  disabled={isOtherPaymentProcessing || !state}
                  className={`${paymentButtonClasses} bg-blue-600 hover:bg-blue-700 text-white`}
                >
                  {isOtherPaymentProcessing ? (
                    <>{processingSpinner} Processing...</>
                  ) : (
                    `Proceed with Paypal (₱${
                      state?.totalPrice.toFixed(2) ?? "0.00"
                    })`
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;
