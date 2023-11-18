"use client";
import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { MovieContext } from "@/context/MovieContext";
import { useRouter } from "next/navigation";

export default function Lists() {
  const router = useRouter();
  const { favorites, watchlist, isLoading } = useContext(MovieContext);

  if (isLoading) {
    return (
      <div className="w-full md:w-5/6 ml-auto h-[70vh] flex justify-center items-center">
        <div className="w-14 h-14 rounded-full border-2 border-[#3dd2cc] border-dashed animate-spin"></div>
      </div>
    );
  }
  return (
    <div className="w-full md:w-5/6 md:ml-auto px-3 md:px-10 flex flex-col">
      <div className="flex flex-col gap-2 mb-5 w-full p-6 rounded-xl bg-[#212121]">
        <h4 className="font-semibold text-2xl md:text-3xl opacity-90">
          Your lists
        </h4>
        <p className="opacity-30 text-xs md:text-sm">
          Here you can view and edit your favorites list, watchlist and other
          lists you have created.
        </p>
      </div>

      <div className="w-full flex flex-col md:grid md:grid-cols-2 gap-5">
        {favorites.length > 0 ? (
          <div className="w-full rounded-xl bg-[#212121] p-5 flex flex-col gap-4 md:border-[1px] md:border-transparent md:hover:border-[#ffffff2d] md:duration-100 relative overflow-hidden md:hover:shadow-2xl">
            <div
              onClick={() => router.push("/lists/favorites")}
              className="absolute cursor-pointer rounded-xl w-full h-full right-0 top-0 blur-2xl opacity-40 overflow-hidden"
            >
              <Image
                fill
                loading="eager"
                sizes="100%"
                className="absolute right-0 rounded-xl"
                src={`https://image.tmdb.org/t/p/w185${favorites[0].poster_path}`}
              />
            </div>
            <h4 className="text-3xl font-semibold">Favorites</h4>
            <div className="w-full grid grid-cols-4 gap-2 relative ">
              {favorites.slice(0, 4).map((favorite) => (
                <div
                  key={favorite.id}
                  className="col-span-1 aspect-[2/3] relative"
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/w185${favorite.poster_path}`}
                    alt=""
                    loading="eager"
                    sizes="100%"
                    fill
                    className="rounded-xl"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full rounded-xl bg-[#212121] px-5 py-24 flex flex-col gap-4 items-center justify-center opacity-60 hover:opacity-100 duration-150 ">
            <h4 className="text-2xl font-semibold">
              Your favorites list is empty.
            </h4>
            <p className="opacity-50 text-sm">
              Add movies to your favorites to see them here.
            </p>
          </div>
        )}
        {watchlist.length > 0 ? (
          <div className="w-full rounded-xl bg-[#212121] p-5 flex flex-col gap-4 md:border-[1px] md:border-transparent md:hover:border-[#ffffff2d] md:duration-100 relative overflow-hidden md:hover:shadow-2xl">
            <div onClick={()=> router.push("/lists/watchlist")} className="absolute rounded-xl w-full h-full right-0 top-0 blur-2xl opacity-40 overflow-hidden cursor-pointer">
              <Image
                fill
                loading="eager"
                sizes="100%"
                className="absolute right-0 rounded-xl"
                src={`https://image.tmdb.org/t/p/w342${watchlist[0].poster_path}`}
              />
            </div>
            <h4 className="text-3xl font-semibold">Watchlist</h4>
            <div className="w-full grid grid-cols-4 gap-2 relative ">
              {watchlist.slice(0, 4).map((watchlist) => (
                <div
                  key={watchlist.id}
                  className="col-span-1 aspect-[2/3] relative rounded-xl"
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/w342${watchlist.poster_path}`}
                    alt=""
                    loading="eager"
                    sizes="100%"
                    fill
                    className="rounded-xl"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full rounded-xl bg-[#212121] p-5 flex flex-col gap-4 items-center justify-center opacity-60 hover:opacity-100 duration-150">
            <h4 className="text-2xl font-semibold">Your watchlist is empty.</h4>
            <p className="opacity-50 text-sm">
              Add movies to your watchlist to see them here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}