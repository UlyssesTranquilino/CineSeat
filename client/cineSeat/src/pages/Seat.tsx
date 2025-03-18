import { useState } from "react";
import { useLocation } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const Seat = () => {
  const { state } = useLocation();
  const [seats, setSeats] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  if (state) {
    const { location, theaterName, time, screen, title, day } = state;
    console.log({ location, theaterName, time, screen, day });
  }

  const totalSeats = 40;
  const seatsPerRow = 8;

  const handleSelectSeat = (seatNumber: string) => {
    setSelectedSeats((prev) => {
      if (prev.includes(seatNumber)) {
        return prev.filter((seat) => seat !== seatNumber);
      } else if (prev.length < seats) {
        return [...prev, seatNumber];
      } else {
        return prev; // If already at max seats, don't add more
      }
    });
  };

  const frontRowSeats = 14; // 14 seats per row in the front
  const frontRowCount = 3;

  const columnSeats = 10; // 15 seats per column
  const rowCount = 9; // 20 rows
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="px-5 mt-5 text-left">
      {/* <div className="flex items-end">
        <ArrowBackIosIcon />
      </div> */}

      <div className="flex items-center gap-3">
        <ArrowBackIosIcon className="mt-1 light:text-black" />
        <div>
          <h1 className=" mt-10 text-2xl sm:text-4xl font-bold text-left text-white light:text-black">
            {state.title}
          </h1>

          <p className="text-left mt-3 md:text-lg light:text-black">
            {state.day.week}, {state.day.month}, {state.day.day} | {state.time}
          </p>
        </div>
      </div>

      <div className="mt-10 sm:flex items-center  gap-5 ">
        <h1 className="block text-white light:text-black mb-2 md:text-lg">
          Select Seats
        </h1>
      </div>

      <div className="sm:flex items-center  gap-5 ">
        <label className="block text-white light:text-black mb-2">
          Number of Seats:
        </label>
        <input
          type="number"
          min="1"
          value={seats}
          onChange={(e) => setSeats(Number(e.target.value))}
          className="w-full max-w-50 p-2 border border-gray-400 rounded-md bg-[#292929] light:bg-gray-200 text-white light:text-black focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] outline-none"
        />
      </div>

      <div className="mt-15">
        <div className="bg-gray-500 flex items-center justify-center p-2 md:text-lg max-w-240 mx-auto mb-15">
          SCREEN
        </div>
      </div>

      {/* Front Row */}
      <div className="mb-8">
        {[...Array(frontRowCount)].map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="flex justify-center items-center gap-2 mb-2"
          >
            {/* Label for row */}
            <span className="w-6 text-center text-white light:text-black">
              {alphabet[rowIndex]}
            </span>
            {[...Array(frontRowSeats)].map((_, seatIndex) => {
              const seatLabel = `${alphabet[rowIndex]}${seatIndex + 1}`;
              return (
                <button
                  key={seatLabel}
                  onClick={() => handleSelectSeat(seatLabel)}
                  className={`w-10 h-10 rounded-md flex items-center justify-center transition
                    ${
                      selectedSeats.includes(seatLabel)
                        ? "bg-[#FFD700] text-black"
                        : "bg-[#292929] text-white hover:bg-[#404040]"
                    }
                  `}
                >
                  {seatLabel}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Space Between Rows */}
      <div className="h-8"></div>

      {/* Main Seating Area */}
      <div className="flex justify-center gap-12">
        {/* Left Column */}
        <div>
          {[...Array(rowCount)].map((_, rowIndex) => (
            <div key={rowIndex} className="flex items-center gap-2 mb-2">
              {/* Label for row */}
              <span className="w-6 text-center text-white light:text-black">
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
                    className={`w-10 h-10 rounded-md flex items-center justify-center transition
                      ${
                        selectedSeats.includes(seatLabel)
                          ? "bg-[#FFD700] text-black"
                          : "bg-[#292929] text-white hover:bg-[#404040]"
                      }
                    `}
                  >
                    {seatLabel}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div>
          {[...Array(rowCount)].map((_, rowIndex) => (
            <div key={rowIndex} className="flex items-center gap-2 mb-2">
              {/* Label for row */}
              <span className="w-6 text-center text-white light:text-black">
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
                    className={`w-10 h-10 rounded-md flex items-center justify-center transition
                      ${
                        selectedSeats.includes(seatLabel)
                          ? "bg-[#FFD700] text-black"
                          : "bg-[#292929] text-white hover:bg-[#404040]"
                      }
                    `}
                  >
                    {seatLabel}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      {/* Selected Seats */}
      <div className="mt-5 text-white light:text-black">
        <p>
          Selected Seats:{" "}
          {selectedSeats.length > 0
            ? selectedSeats.join(", ")
            : "No seats selected"}
        </p>
      </div>
    </div>
  );
};

export default Seat;
