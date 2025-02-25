const Banner = () => {
  return (
    <section className="banner h-[250px]  md:h-[300px] lg:h-[350px] xl:h-[450px] w-full  mb-20 mt-2">
      <div className="relative w-full h-full rounded-lg">
        <div className="absolute inset-0 overlay bg-gradient-to-t from-[rgba(0,0,0,0.7)] top-[rgba(0,0,0,0.5)] rounded-lg"></div>
        <img
          src="https://t4.ftcdn.net/jpg/02/36/95/59/360_F_236955957_OEqpRqNjanfak01le5SiEiPU776glr30.jpg"
          alt=""
          className="object-cover w-full h-full rounded-lg"
        />
        <span className="absolute flex flex-col gap-4 right-5 top-5">
          <i className="text-[50px] md:text-[70px] bx bx-film"></i>
        </span>
        <div className="absolute right-0 text-white -translate-y-1/2 top-1/2 ">
          <span className=" inline-block mb-6 md:!text-[35px] lg:text-[40px] font-bold">
            MOVIES NIGHT
          </span>
          <p className="md:!text-[20px] lg:text-[20px] w-[60%] font-bold mb-8 italic">
            Unlimited <span className="text-[#e2d703] ">Movie</span> TVs Shows,
            & More.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Banner;
