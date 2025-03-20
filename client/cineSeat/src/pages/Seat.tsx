import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const Seat = () => {
  const navigate = useNavigate();

  const { state } = useLocation();
  const [seats, setSeats] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [totalPrice, setTotalPrice] = useState(0);

  // Center the scroll container when component mounts
  useEffect(() => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      container.scrollLeft =
        (container.scrollWidth - container.clientWidth) / 2;
    }
  }, []);

  const handleSelectSeat = (seatNumber: string) => {
    setSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((seat) => seat !== seatNumber)
        : prev.length < seats
        ? [...prev, seatNumber]
        : prev
    );
  };

  const frontRowSeats = 14;
  const frontRowCount = 3;
  const columnSeats = 10;
  const rowCount = 9;
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="px-4 sm:px-8 mt-5 text-left">
      {/* Back Button and Title */}
      <div className="flex items-center gap-3">
        <div onClick={() => navigate(-1)} className="cursor-pointer">
          <ArrowBackIosIcon className="mt-1 text-white light:text-black" />
        </div>
        <div>
          <h1 className="mt-6 text-xl sm:text-3xl font-bold text-white light:text-black">
            {state?.title}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-300 light:text-black">
            {state?.day.week}, {state?.day.month} {state?.day.day} |{" "}
            {state?.time}
          </p>
        </div>
      </div>

      {/* Seat Selection Input */}
      <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <label className="text-white light:text-black text-sm sm:text-base md:text-lg">
          Number of Seats:
        </label>
        <input
          type="number"
          min="1"
          value={seats}
          onChange={(e) => setSeats(Number(e.target.value))}
          className="w-full sm:w-auto max-w-20 p-2 border border-gray-400 rounded-md bg-[#292929] light:bg-gray-200 text-white light:text-black focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] outline-none"
        />
      </div>

      {/* Selected Seats */}
      <div className="mt-5 text-white light:text-black text-sm">
        <h1 className="font-semibold text-xl md:text-2xl">Selected Seats: </h1>
        <div className="mt-3">
          {selectedSeats.length > 0 ? (
            <div className="flex items-center gap-3">
              {selectedSeats.map((seat: string) => (
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

      {/* Price */}
      <div className="mt-5 text-white light:text-black text-sm">
        <h1 className="font-semibold text-xl md:text-2xl">Total Price </h1>
        <div className="mt-3">
          {selectedSeats.length > 0 ? (
            <h1 className="md:text-lg">
              {" "}
              ₱{(selectedSeats.length * state.price).toFixed(2)}
            </h1>
          ) : (
            <p className="md:text-lg">Select seats to see the total price</p>
          )}
        </div>
      </div>

      {/* Screen */}
      <div className="mt-8 lg:mt-15">
        <div className="bg-gray-500 text-white flex items-center justify-center p-2 text-sm sm:text-base mx-auto max-w-[1000px]">
          SCREEN
        </div>
      </div>

      <div
        ref={scrollRef}
        className="overflow-x-scroll seats-container mt-6 whitespace-nowrap  lg:flex lg:flex-col lg:items-center"
        style={{
          scrollBehavior: "smooth",
        }}
      >
        {/* Front Row */}
        <div className="mb-8 space-y-2 w-full flex flex-col items-start lg:items-center justify-center ml-30 sm:ml-35 md:ml-40 lg:ml-0">
          {[...Array(frontRowCount)].map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="flex justify-center items-center gap-x-2"
            >
              <span className="w-5 text-center text-sm sm:text-base text-white light:text-black">
                {alphabet[rowIndex]}
              </span>
              {[...Array(frontRowSeats)].map((_, seatIndex) => {
                const seatLabel = `${alphabet[rowIndex]}${seatIndex + 1}`;
                return (
                  <button
                    key={seatLabel}
                    onClick={() => handleSelectSeat(seatLabel)}
                    className={`min-w-8 min-h-8 sm:min-w-10 sm:min-h-10 text-xs sm:text-sm rounded-md flex items-center justify-center cursor-pointer transition
              ${
                selectedSeats.includes(seatLabel)
                  ? "bg-[#FFD700] text-black"
                  : "bg-[#292929] text-white hover:bg-[#404040]"
              }`}
                  >
                    {seatLabel}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Main Seating Area */}
        <div className="flex justify-start gap-8">
          {/* Left Side */}
          <div className="space-y-2">
            {[...Array(rowCount)].map((_, rowIndex) => (
              <div key={rowIndex} className="flex items-center gap-x-2">
                <span className="w-5 text-center text-sm sm:text-base text-white light:text-black">
                  {alphabet[rowIndex + frontRowCount]}
                </span>
                {[...Array(columnSeats)].map((_, seatIndex) => {
                  const seatLabel = `${alphabet[rowIndex + frontRowCount]}${
                    seatIndex + 1
                  }`;
                  return (
                    <button
                      key={seatLabel}
                      onClick={() => handleSelectSeat(seatLabel)}
                      className={`min-w-8 min-h-8 sm:min-w-10 sm:min-h-10 text-xs sm:text-sm rounded-md flex items-center justify-center cursor-pointer transition
                  ${
                    selectedSeats.includes(seatLabel)
                      ? "bg-[#FFD700] text-black"
                      : "bg-[#292929] text-white hover:bg-[#404040]"
                  }`}
                    >
                      {seatLabel}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Right Side */}
          <div className="space-y-2">
            {[...Array(rowCount)].map((_, rowIndex) => (
              <div key={rowIndex} className="flex items-center gap-x-2">
                <span className="w-5 text-center text-sm sm:text-base text-white light:text-black">
                  {alphabet[rowIndex + frontRowCount]}
                </span>
                {[...Array(columnSeats)].map((_, seatIndex) => {
                  const seatLabel = `${alphabet[rowIndex + frontRowCount]}${
                    seatIndex + columnSeats + 1
                  }`;
                  return (
                    <button
                      key={seatLabel}
                      onClick={() => handleSelectSeat(seatLabel)}
                      className={`min-w-8 min-h-8 sm:min-w-10 sm:min-h-10 text-xs sm:text-sm rounded-md flex items-center justify-center cursor-pointer transition
                  ${
                    selectedSeats.includes(seatLabel)
                      ? "bg-[#FFD700] text-black"
                      : "bg-[#292929] text-white hover:bg-[#404040]"
                  }`}
                    >
                      {seatLabel}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Check Out */}

      <div className="mt-20 flex items-center justify-center">
        <button className="bg-[#FFD700] rounded-sm p-2 mt-4 w-full max-w-50 text-xs sm:text-[14px] md:text-lg sm:mt-7 text-black cursor-pointer font-semibold md:text-md lg:text-lg hover:shadow-lg shadow-yellow-500/50 transition-all duration-300 ease-in-out">
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default Seat;
