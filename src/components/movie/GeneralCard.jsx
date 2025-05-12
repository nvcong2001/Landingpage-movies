import Button from "../button/Button";

const GeneralCard = ({ item }) => {
  const getRelativeTime = (isoString) => {
    if (!isoString) return "không rõ thời gian";
    const timestamp = new Date(isoString).getTime(); // chuyển từ ISO string → milliseconds
    const now = Date.now();
    const diff = Math.abs(now - timestamp);
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes} phút`;
    if (hours < 24) return `${hours} giờ`;
    return `${days} ngày`;
  };
  return (
    <div className="flex flex-col p-3 rounded-lg h-full bg-[rgb(47,48,50)]  ">
      <div className="relative mb-5">
        <img
          src={`https://phimimg.com/${item.poster_url}`}
          className="h-[150px] md:h-[250px] object-cover w-full rounded-lg"
          alt=""
        />
        <div className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded">
          {getRelativeTime(item.modified.time)}
        </div>
        <div className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
          {item.episode_current}
        </div>
      </div>
      <div className="flex flex-col h-full">
        <h3 className="mb-auto text-[16px] font-bold text-white line-clamp-2">
          {item.name}
        </h3>
        <div className="flex items-center justify-between text-[#8d939c] text-[13px] mb-4 mt-2">
          <span>{item.year}</span>
          <div className="flex items-center gap-1">
            <span>{item.time}</span>
          </div>
        </div>
        <Button to={`/phim/${item.slug}`}>Xem ngay</Button>
      </div>
    </div>
  );
};

export default GeneralCard;
