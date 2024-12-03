import React from "react";

const Banner = () => {
  return (
    <section className="banner h-[500px] w-full  mb-20 mt-20">
      <div className="relative w-full h-full rounded-lg">
        <div className="absolute inset-0 overlay bg-gradient-to-t from-[rgba(0,0,0,0.7)] top-[rgba(0,0,0,0.5)] rounded-lg"></div>
        <img
          src="https://t4.ftcdn.net/jpg/02/36/95/59/360_F_236955957_OEqpRqNjanfak01le5SiEiPU776glr30.jpg"
          alt=""
          className="object-cover w-full h-full rounded-lg"
        />
        <span className="absolute flex flex-col gap-4 right-5 top-5">
          <i className="text-[100px] bx bx-film"></i>
          {/* <i className="text-[100px] bx bx-film"></i> */}
          {/* <i className="text-[100px] bx bx-film"></i> */}
        </span>
        <div className="absolute right-0 text-white -translate-y-1/2 top-1/2 ">
          <span className="inline-block mb-6 text-[50px] font-bold">
            MOVIES NIGHT
          </span>
          <p className="text-[30px] w-[60%] font-bold mb-8 italic">
            Unlimited <span className="text-[#e2d703] ">Movie</span> TVs Shows,
            & More.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Banner;
