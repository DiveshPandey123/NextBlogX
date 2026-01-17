"use client";

const error = ({ error, reset }) => {
  return (
    <div className="min-h-[55vh] bgColor textColor text-center flex justify-center items-center">
      <div className="mx-auto lg:max-w-6xl xl:max-w-7xl px-4 lg:px-10 pt-16 sm:pt-20">
        <p className="font-semibold SoftText text-2xl">Unable to process your request</p>
        <h1 className=" mt-5 font-bold text-3xl text-red-500">
          {error.message || "Something Went Wrong"}
        </h1>
        <button
          className="mt-5 flex w-fit mx-auto px-5 py-3 softBg rounded-lg"
          onClick={reset}
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default error;
