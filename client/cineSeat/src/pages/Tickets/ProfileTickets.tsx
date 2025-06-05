import { useState } from "react";
import { useNavigate } from "react-router";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useUserStore } from "../../global/mode";
import { QRCodeSVG } from "qrcode.react";
import Modal from "@mui/material/Modal";

const ProfileTickets = () => {
  const { currentUser } = useUserStore();
  const ticketBookings = currentUser.bookings;
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
      <div className="w-full max-w-72  h-200 text-center  flex-[2] lg:flex-[1.5] xl:flex-[1] md:sticky md:top-6 bg-gray-900 light:bg-gray-100 p-4 sm:p-6 rounded-lg shadow-xl mb-6 md:mb-0">
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
          className="w-full  rounded-md mb-4 max-w-60 mx-auto mt-3"
          src={ticketData.movieDetails.image}
          alt={ticketData.movieDetails.title}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://via.placeholder.com/300x450/000000/FFFFFF?text=Poster+Not+Available";
          }}
        />

        <div className="space-y-2 text-sm text-gray-200 light:text-gray-800">
          <div className="font-semibold text-base text-left text-white light:text-black">
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

        <div className="flex flex-col items-center gap-4 mt-6">
          <div className="flex flex-col items-center gap-5">
            <QRCodeSVG
              value={JSON.stringify({
                ticketId: ticketData.ticketId,
                userId: currentUser.id,
                showtimeId: ticketData.showtimeId,
                seats: ticketData.seats,
              })}
              size={120}
              fgColor="#000000"
              bgColor="#ffffff"
            />
          </div>
          <div className="w-full flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white light:text-black">
              Total Price:
            </h3>
            <h4 className="text-xl font-bold text-[#FFD700] light:text-yellow-600">
              ₱{ticketData.totalPrice.toFixed(2)}
            </h4>
          </div>
        </div>
      </div>
    );
  };

  const [activeTicket, setActiveTicket] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div>
      <div
        onClick={handleBackClick}
        className="flex items-start light:text-gray-400 text-gray-500 cursor-pointer py-2 pl-1 mt-1  light:hover:bg-gray-100 light:hover:text-gray-500  hover:bg-gray-900/50 hover:text-gray-200 w-20 rounded-sm transition-all duration-200 ease-in-out "
      >
        <ArrowBackIosIcon className="scale-80" />
        Back
      </div>

      <h1 className="light:text-black font-semibold text-xl md:text-2xl text-left mt-7">
        My Tickets
      </h1>

      <Modal open={open} onClose={handleClose}>
        <div className="w-72 sm:w-100 mx-auto py-10 ">
          <div className="overflow-y-scroll  custom-scrollbar bg-gray-900 light:bg-gray-100  h-[90vh] pt-65 sm:pt-50 pb-5  flex items-center justify-center rounded-md">
            {activeTicket && TicketSummary(activeTicket)}
          </div>
        </div>
      </Modal>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 gap-3 place-items-center sm:place-items-start">
        {ticketBookings.map((ticket: any) => (
          <div
            key={ticket.showtimeId}
            onClick={() => {
              setActiveTicket(ticket);
              handleOpen();
            }}
            className="cursor-pointer"
          >
            {TicketSummary(ticket)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileTickets;
