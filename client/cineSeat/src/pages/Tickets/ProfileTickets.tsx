import React from "react";

import { useUserStore } from "../../global/mode";

const ProfileTickets = () => {
  const { currentUser } = useUserStore();

  const ticketBookings = currentUser.bookings;

  console.log(currentUser);

  console.log(ticketBookings);

  const TicketSummary = (ticketData: any) => {
    const formatTicketDate = () => {
      const date = new Date(ticketData.bookingDate);

      const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
      const month = date.toLocaleDateString("en-US", { month: "long" });
      const day = date.getDate();
      const time = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      });

      return {
        week: weekday,
        month: month,
        day: day,
        time: time,
      };
    };

    const ticketDate = { day: formatTicketDate() };

    return (
      <div className=" w-full  flex-[2] lg:flex-[1.5] xl:flex-[1] md:sticky md:top-6 bg-gray-900 light:bg-gray-100 p-4 sm:p-6 rounded-lg shadow-xl mb-6 md:mb-0">
        <h2 className="text-xl font-bold mb-4 text-white light:text-black">
          {ticketData.movieDetails.title}
        </h2>

        <p className="light:text-red-600 text-red-400 font-medium">
          {ticketData?.theaterName} {ticketData?.location} | Cinema{" "}
          {ticketData?.screen}
        </p>

        <p className="light:text-red-600 text-red-400 font-medium">
          {ticketDate?.day?.week}, {ticketDate?.day?.month}{" "}
          {ticketDate.day?.day} | {ticketDate?.day?.time}
        </p>
        <img
          className="w-full  rounded-md mb-4 max-w-70 mx-auto mt-3"
          src={ticketData.movieDetails.image}
          alt={ticketData.movieDetails.title}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://via.placeholder.com/300x450/000000/FFFFFF?text=Poster+Not+Available";
          }}
        />
        <div className="space-y-2 text-sm text-gray-200 light:text-gray-800">
          <div className="font-semibold text-base text-white light:text-black">
            Selected Seats:
          </div>
          {ticketData.seats.length > 0 ? (
            <div className="flex flex-wrap items-center gap-2">
              {ticketData.seats.map((seat: string) => (
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
            ₱{ticketData.totalPrice.toFixed(2)}
          </h4>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h1 className="font-semibold text-xl text-left mt-3">My Tickets</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mt-5 gap-3 place-items-center sm:place-items-start">
        {ticketBookings.map((ticket: any) => (
          <div key={ticket.showtimeId}>{TicketSummary(ticket)}</div>
        ))}
      </div>
    </div>
  );
};

export default ProfileTickets;
function formatTicketDate() {
  throw new Error("Function not implemented.");
}
