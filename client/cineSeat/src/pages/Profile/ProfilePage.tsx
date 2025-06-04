import { useActionState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";
import { useUserStore, useTheme } from "../../global/mode";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import EmptyFavoriteImg from "../../assets/Empty Favorite.png";

import { Toaster, toast } from "react-hot-toast";
const ProfilePage = () => {
  const { currentUser, updateUser } = useUserStore();
  const { isDarkMode } = useTheme();

  const movieFavorites = currentUser.favorites ?? [];
  const movieWatchlists = currentUser.watchlist ?? [];

  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  type ActionResponse = {
    success: boolean;
    message?: string;
  };

  const [actionResponse, formAction, isPending] = useActionState<
    ActionResponse | undefined
  >(
    updateUser,
    undefined // Initial state for actionResponse
  );

  const toastNotif = (message: string, isError: boolean) => {
    if (!isError) {
      toast.success(message, {
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
    } else {
      toast.error(message, {
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
    }
  };

  const previousIsPending = useRef(isPending);

  useEffect(() => {
    // Only trigger toasts when an action has just completed
    if (previousIsPending.current && !isPending && actionResponse) {
      if (actionResponse.success) {
        toastNotif(
          actionResponse.message || "Profile updated successfully!",
          false
        );
      } else {
        toastNotif(actionResponse.message || "An error occurred.", true);
      }
    }
    previousIsPending.current = isPending;
  }, [isPending, actionResponse, toastNotif]);

  return (
    <div className="px-3">
      <Toaster position="top-center" reverseOrder={false} />

      <div
        onClick={handleBackClick}
        className="flex items-start light:text-gray-400 text-gray-500 cursor-pointer py-2 mb-2 light:hover:bg-gray-100 light:hover:text-gray-500  hover:bg-gray-900/50 hover:text-gray-200 w-20 rounded-sm transition-all duration-200 ease-in-out "
      >
        <ArrowBackIosIcon className="scale-80" />
        Back
      </div>

      <h1 className="font-semibold light:text-black text-white text-xl md:text-2xl text-left mt-5">
        Profile
      </h1>

      <form action={formAction} className="mt-5 flex flex-col gap-3">
        <div className="flex flex-col lg:flex-row w-full gap-5">
          <div className="w-full">
            <label
              htmlFor="name"
              className="block text-sm text-gray-200 light:text-gray-900 mb-2 text-left "
            >
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your email"
              autoComplete="off"
              name="name"
              defaultValue={currentUser.name}
              required
              className="w-[100%] p-1 border-1 border-[#BEBEBF] focus:yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500 text-sm rounded-sm"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="email"
              className="block text-sm text-gray-200 light:text-gray-900 mb-2 text-left "
            >
              Email
            </label>
            <input
              type="text"
              placeholder="Enter your email"
              autoComplete="off"
              name="email"
              defaultValue={currentUser.email}
              required
              className="w-[100%] p-1 border-1 border-[#BEBEBF] focus:yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500 text-sm rounded-sm "
            />
          </div>
        </div>

        <h1 className="font-medium mt-6 text-left "> Edit Password</h1>

        <div className="mt-3 flex flex-col lg:flex-row w-full gap-5">
          <div className="w-full">
            <label
              htmlFor="currentPassword"
              className="block text-sm text-gray-200 light:text-gray-900 mb-2 text-left "
            >
              Current Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              autoComplete="off"
              name="currentPassword"
              className="w-[100%] p-1 border-1 border-[#BEBEBF] focus:yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500 text-sm rounded-sm"
            />
          </div>

          <div className="w-full">
            <label
              htmlFor="newPassword"
              className="block text-sm text-gray-200 light:text-gray-900 mb-2 text-left "
            >
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              autoComplete="off"
              name="newPassword"
              className="w-[100%] p-1 border-1 border-[#BEBEBF] focus:yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500 text-sm rounded-sm"
            />
          </div>
        </div>

        <div className="lg:w-1/2 pr-2 mt-3">
          <label
            htmlFor="confirmPassword"
            className="block text-sm text-gray-200 light:text-gray-900 mb-2 text-left "
          >
            Confirm New Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            autoComplete="off"
            name="confirmPassword"
            className="w-[100%] p-1 border-1 border-[#BEBEBF] focus:yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500 text-sm rounded-sm"
          />
        </div>
        {/* <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {actionErrorMessage && (
            <p className="text-sm text-red-500">{actionErrorMessage}</p>
          )}
        </div> */}

        <button
          type="submit"
          className="bg-[#FFD700] my-10 h-11 mx-auto md:h-auto rounded-sm w-full max-w-100 text-base sm:text-[14px]  text-black cursor-pointer font-semibold p-1 lg:py-2 md:text-md lg:text-[16px]  hover:shadow-lg shadow-yellow-500/50 transition-all duration-300 ease-in-out"
        >
          Edit Profile
        </button>
      </form>

      <h1 className="mt-15 font-semibold light:text-black text-white text-lg md:text-xl text-left">
        My Favorites
      </h1>

      {/* Movie Grid */}
      {movieFavorites.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-7 rounded-sm mt-10">
          {movieFavorites.slice(0, 4).map((movie: any) => (
            <Link to={`/movie/${movie._id}`} key={movie._id}>
              <div className="mb-10 rounded-sm overflow-hidden bg-black relative h-full cursor-pointer hover:opacity-80 hover:scale-105  transition-all duration-300 group">
                <div className="overflow-hidden">
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="object-cover"
                  />
                </div>

                <div className="bg-black light:bg-gray-100  flex flex-col justify-between py-4 px-2 h-20 absolute bottom-0 w-full">
                  <h1 className="text-left font-semibold text-white light:text-black truncate w-full overflow-hidden whitespace-nowrap">
                    {movie.title}
                  </h1>

                  <div className="flex items-center justify-between text-gray-400 light:text-gray-700 gap-2">
                    <div className="flex items-center truncate overflow-hidden whitespace-nowrap">
                      {movie.genre.map((genre: string, index: number) => (
                        <p key={genre} className="mr-1 text-sm mt-1">
                          {genre}
                          {index !== movie.genre.length - 1 ? ", " : ""}
                        </p>
                      ))}
                    </div>
                    <div className="flex items-center justify-center gap-1 mt-[2px]">
                      <Rating
                        name="read-only"
                        value={movie.rating.value / 5}
                        readOnly
                        precision={0.5}
                        max={1}
                        size="small"
                      />
                      <p className="text-sm text-yellow-400 light:text-yellow-600 mt-[1px]">
                        {movie.rating.value}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <button
        onClick={() => navigate("/favorites")}
        className="mt-10 bg-[#FFD700] h-8 md:h-auto rounded-sm w-24 sm:w-30 lg:w-40 text-xs sm:text-[14px]  text-black cursor-pointer font-semibold p-1 lg:py-2 md:text-md lg:text-[16px]  hover:shadow-lg shadow-yellow-500/50 transition-all duration-300 ease-in-out"
      >
        View All
      </button>

      <h1 className="mt-15 font-semibold light:text-black text-white text-lg md:text-xl text-left">
        My Watchlists
      </h1>

      {movieWatchlists.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-7 rounded-sm mt-10">
          {movieWatchlists.map((movie: any) => (
            <Link to={`/movie/${movie._id}`} key={movie._id}>
              <div className="mb-10 rounded-sm overflow-hidden bg-black relative h-full cursor-pointer hover:opacity-80 hover:scale-105  transition-all duration-300 group">
                <div className="overflow-hidden">
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="object-cover"
                  />
                </div>

                <div className="bg-black light:bg-gray-100  flex flex-col justify-between py-4 px-2 h-20 absolute bottom-0 w-full">
                  <h1 className="text-left font-semibold text-white light:text-black truncate w-full overflow-hidden whitespace-nowrap">
                    {movie.title}
                  </h1>

                  <div className="flex items-center justify-between text-gray-400 light:text-gray-700 gap-2">
                    <div className="flex items-center truncate overflow-hidden whitespace-nowrap">
                      {movie.genre.map((genre: string, index: number) => (
                        <p key={genre} className="mr-1 text-sm mt-1">
                          {genre}
                          {index !== movie.genre.length - 1 ? ", " : ""}
                        </p>
                      ))}
                    </div>
                    <div className="flex items-center justify-center gap-1 mt-[2px]">
                      <Rating
                        name="read-only"
                        value={movie.rating.value / 5}
                        readOnly
                        precision={0.5}
                        max={1}
                        size="small"
                      />
                      <p className="text-sm text-yellow-400 light:text-yellow-600 mt-[1px]">
                        {movie.rating.value}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <button
        onClick={() => navigate("/watchlists")}
        className="mt-10 bg-[#FFD700] h-8 md:h-auto rounded-sm w-24 sm:w-30 lg:w-40 text-xs sm:text-[14px]  text-black cursor-pointer font-semibold p-1 lg:py-2 md:text-md lg:text-[16px]  hover:shadow-lg shadow-yellow-500/50 transition-all duration-300 ease-in-out"
      >
        View All
      </button>
    </div>
  );
};

export default ProfilePage;
