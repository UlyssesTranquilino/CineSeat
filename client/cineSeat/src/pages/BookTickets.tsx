import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useTheme } from "../global/mode";

const BookTickets = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  const { id } = useParams();
  const [movie, setMovie] = useState<any>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const fetchMovieDetails = async (id: string) => {
    const res = await fetch(`http://localhost:5000/${id}`);

    const { data, success } = await res.json();
    setIsSuccess(success);
    setMovie(data);
  };

  useEffect(() => {
    if (id) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant", // 👈 This makes it immediate
      });
      fetchMovieDetails(id);
    }
  }, [id]);

  const [days, setDays] = useState([]);
  const activeDay = days.find((day) => day.isActive);

  useEffect(() => {
    const nextThreeDays = [];

    for (let i = 0; i < 3; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);

      nextThreeDays.push({
        month: date.toLocaleDateString("en-US", { month: "short" }),
        day: date.getDate(),
        week: date.toLocaleDateString("en-US", { weekday: "short" }),
        isActive: i == 0 ? true : false,
      });
    }

    setDays(nextThreeDays); // Update state once after the loop
  }, []);

  const toggleDate = (toggledDay: string) => {
    setDays((days: any) =>
      days.map((item: any) => {
        if (item.day == toggledDay) {
          return { ...item, isActive: true };
        } else return { ...item, isActive: false };
      })
    );
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC", // Adjust as needed
    });
  };

  const generateShowtimes = (index: number) => {
    const showtimes = [];
    const baseTimes =
      index % 2 === 0
        ? [2, 5, 8, 11] // First pattern
        : [4, 7]; // Second pattern

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    baseTimes.forEach((hour) => {
      const time = new Date(today);
      time.setUTCHours(hour);
      showtimes.push(time.toISOString());
    });

    return showtimes;
  };

  return (
    <section>
      {isSuccess ? (
        <div className="px-5 mt-10">
          <h1 className="text-2xl sm:text-4xl font-bold text-left text-white light:text-black">
            {movie.title}
          </h1>

          <div className="text-white flex flex-wrap items-center text-[13px] sm:text-[15px] gap-2 mt-3">
            {movie.genre.map((genre: string) => (
              <div
                key={genre}
                className=" px-3 py-2 rounded-full bg-[#1A1A1A] light:bg-gray-200 light:text-black"
              >
                {genre}
              </div>
            ))}
          </div>

          {/* Date Selection */}
          <div className="mt-5 flex gap-3">
            {days.map((day: any) => (
              <div
                key={`${day.week}-${day.day}`}
                className={`w-20 h-20 flex flex-col items-center justify-center rounded-md cursor-pointer transition ${
                  day.isActive
                    ? "bg-[#FFD700] text-black"
                    : isDarkMode
                    ? "bg-[#292929] text-white"
                    : "bg-gray-200 text-black"
                }`}
                onClick={() => toggleDate(day.day)}
              >
                <p className="text-sm">{day.week.toUpperCase()}</p>
                <h1 className="text-xl font-semibold">{day.day}</h1>
                <p className="text-sm">{day.month}</p>
              </div>
            ))}
          </div>

          {/* Showtimes Table */}
          <div className="mt-10">
            <table className="w-full border-collapse border border-gray-400">
              <thead>
                <tr
                  className={`  ${
                    isDarkMode
                      ? "bg-gray-900 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  <th className="border border-gray-700 p-4 text-left ">
                    Location
                  </th>
                  <th className="border border-gray-700 p-4 text-left ">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {movie.showtimes.map((show: any, index: number) => {
                  const showtimes = generateShowtimes(index);

                  return (
                    <tr key={show._id} className=" transition">
                      {/* Location */}
                      <td className="border  border-gray-700 p-4">
                        <div>
                          <h1 className="text-white light:text-black font-medium">
                            {show.theaterName}
                          </h1>
                          <p className="text-gray-400 light:text-gray-600">
                            {show.location}
                          </p>
                        </div>
                      </td>

                      {/* All Showtimes in Same Row */}
                      <td className="border border-gray-700 p-4">
                        <div className="flex gap-2 flex-wrap">
                          {showtimes.map((time) => (
                            <Link
                              key={time}
                              to={`/movie/seat/${id}`}
                              state={{
                                id: show._id,
                                location: show.location,
                                theaterName: show.theaterName,
                                time: formatTime(time),
                                screen: show.screen,
                                title: movie.title,
                                day: activeDay,
                                price: show.price.toFixed(2),
                                image: movie.posterUrl,
                                genre: movie.genre,
                              }}
                            >
                              <button className="cursor-pointer bg-[#292929] rounded-md px-3 py-2 transition hover:bg-[#404040] light:hover:bg-gray-100 light:bg-transparent light:border-1 border-black">
                                <h1 className="text-[#FFD700] light:text-black text-lg font-semibold">
                                  {formatTime(time)}
                                </h1>
                                <p className="text-gray-300 light:text-gray-700 text-sm">
                                  Screen {show.screen}
                                </p>
                                <p className="text-white light:text-black text-sm mt-1">
                                  ₱{show.price.toFixed(2)}
                                </p>{" "}
                                {/* Display price */}
                              </button>
                            </Link>
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </section>
  );
};

export default BookTickets;
