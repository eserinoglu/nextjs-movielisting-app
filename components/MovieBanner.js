"use client";
import React, { useContext, useEffect } from "react";
import Image from "next/image";
import {
  AiOutlineHeart,
  AiOutlineEye,
  AiOutlineShareAlt,
  AiFillHeart,
  AiFillEye,
} from "react-icons/ai";
import { LuListPlus } from "react-icons/lu";
import { BiTimeFive, BiSolidStar } from "react-icons/bi";
import { MovieContext } from "@/context/MovieContext";
import { useUser } from "@clerk/nextjs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MovieBanner({ data }) {
  const { user } = useUser();
  const {
    addFavorite,
    removeFavorite,
    favorites,
    watchlist,
    removeWatchlist,
    addWatchlist,
  } = useContext(MovieContext);
  const [isLiked, setIsLiked] = React.useState(false);
  const [isInWatchlist, setIsInWatchlist] = React.useState(false);

  useEffect(() => {
    setIsLiked(
      favorites.length > 0 && favorites.find((fav) => fav.id === data.id)
    );
    setIsInWatchlist(
      watchlist.length > 0 && watchlist.find((watch) => watch.id === data.id)
    );
  }, [favorites, watchlist]);
  return (
    <div className="w-full h-auto relative flex rounded-xl overflow-hidden items-center px-4 py-5 md:p-7 md:py-12 shadow-lg bg-black">
      <ToastContainer
        position="top-center"
        autoClose={1600}
        limit={5}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Image
        fill
        loading="eager"
        sizes="100%"
        className="absolute bottom-0 left-0 object-cover opacity-50"
        src={`https://image.tmdb.org/t/p/w300${data.backdrop_path}`}
        alt=""
      />
      <div className="flex flex-col md:flex-row md:items-center gap-5 z-20 w-full h-full">
        <div className="w-[10rem] md:w-[12rem] aspect-[2/3] relative">
          <Image
            priority
            loading="eager"
            fill
            sizes="100%"
            className="rounded-xl shadow-lg"
            src={`https://image.tmdb.org/t/p/w342${data.poster_path}`}
            alt=""
          />
        </div>
        <div className="flex flex-col gap-3 md:gap-6">
          <div className="flex flex-col gap-1">
            <h4 className="opacity-50 text-sm md:text-base">{data.release_date.split("-")[0]}</h4>
            <h4 className="text-2xl md:text-4xl font-semibold">{data.title}</h4>
          </div>
          <div className="flex items-center gap-5">
            {isLiked ? (
              <AiFillHeart
                onClick={() => removeFavorite(data)}
                color="red"
                size={26}
              />
            ) : (
              <AiOutlineHeart
                onClick={() => addFavorite(data)}
                className="opacity-30 hover:opacity-100 cursor-pointer duration-100"
                color="white"
                size={26}
              />
            )}
            {isInWatchlist ? (
              <AiFillEye
                onClick={() => removeWatchlist(data)}
                color="#3dd2cc"
                size={30}
              />
            ) : (
              <AiOutlineEye
                onClick={() => addWatchlist(data)}
                className="opacity-30 hover:opacity-100 cursor-pointer duration-100"
                color="white"
                size={30}
              />
            )}

            <LuListPlus
              className="opacity-30 hover:opacity-100 cursor-pointer duration-100"
              color="white"
              size={30}
            />
            <AiOutlineShareAlt
              className="opacity-30 hover:opacity-100 cursor-pointer duration-100"
              color="white"
              size={30}
            />
          </div>
          <div className="flex items-center gap-2">
            <BiTimeFive className="opacity-50" color="white" size={20} />
            <p className="opacity-50">{data.runtime} min</p>
          </div>
          <div className="flex items-end gap-3 h-[1.8rem]">
            <BiSolidStar color="FAB52A" size={24} />
            <h5 className="font-semibold text-2xl leading-none">
              {data.vote_average.toFixed(1)}
            </h5>
            <div className="w-[1px] h-full bg-white opacity-30"></div>
            <p className="opacity-50 leading-[1.2]">
              {data.vote_count} ratings
            </p>
          </div>
        </div>
      </div>
      <div className="w-full h-full absolute bottom-0 right-0  backdrop-blur-lg"></div>
    </div>
  );
}
