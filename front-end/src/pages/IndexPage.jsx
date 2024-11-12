import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/top-feedback").then((response) => {
      setPlaces(response.data);
    });
  }, []);

  return (
    <div className="mx-10 lg:mx-16 -mt-5">
      <div
        style={{
          backgroundImage: `url("https://file1.dangcongsan.vn/data/0/images/2023/04/19/upload_4752/5.jpg")`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="rounded-3xl shadow-lg text-center py-36 mt-5 px-3"
      >
        <h1 className="text-5xl font-bold text-white pb-2">
          Hãy đến với Go Booking
        </h1>
        <h2 className="text-2xl text-white opacity-90">
          Hơn 2.000.000 homestays tuyệt vời đang chờ đợi bạn!
        </h2>
      </div>
      <div className="mt-5">
        <h1 className="text-2xl font-semibold">Địa điểm nổi tiếng</h1>
        <div className="grid md:grid-cols-4 grid-cols-2 mt-5 gap-6">
          <Link
            to={"/find/Ha noi"}
            className="rounded-3xl shadow-lg"
            style={{
              backgroundImage: `url("https://media.istockphoto.com/id/478073811/vi/anh/l%E1%BB%91i-v%C3%A0o-%C4%91%E1%BA%B9p-t%E1%BA%A1i-v%C4%83n-mi%E1%BA%BFu-qu%E1%BB%91c-t%E1%BB%AD-gi%C3%A1m.jpg?s=612x612&w=0&k=20&c=FXgEWvQQLlDi9iP8tacv4_QbnjyaAGWlT2Pij_awKTc=")`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <div className="pt-3 flex pb-3 pl-3">
              <h1 className="px-3 rounded-xl bg-gray-100 bg-opacity-50 font-medium">
                Ha Noi
              </h1>
            </div>
          </Link>
          <div className="grid-rows-2">
            <div
              className="rounded-3xl shadow-lg"
              style={{
                backgroundImage: `url("https://static.vinwonders.com/production/nha-trang-o-dau-1.jpg")`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <Link
                to={"/find/Nha Trang"}
                className="pt-52 flex pb-3 pl-3 mb-4"
              >
                <h1 className="px-3 rounded-xl bg-gray-100 bg-opacity-50 font-medium">
                  Nha Trang
                </h1>
              </Link>
            </div>
            <div
              className="rounded-3xl shadow-lg"
              style={{
                backgroundImage: `url("https://cdnmedia.baotintuc.vn/Upload/c2tvplmdloSDblsn03qN2Q/files/2020/11/04/thanh-pho-thu-duc-tp-ho-chi-minh-41120.jpg")`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <Link to="/find/Ho Chi Minh" className="pt-28 flex pb-3 pl-3">
                <h1 className="px-3 rounded-xl bg-gray-100 bg-opacity-50 font-medium">
                  TP Ho Chi Minh
                </h1>
              </Link>
            </div>
          </div>
          <Link
            to="/find/Da Nang"
            className="rounded-3xl shadow-lg"
            style={{
              backgroundImage: `url("https://res.klook.com/image/upload/fl_lossy.progressive,w_800,c_fill,q_85/destination/ur2mrg23d91mex03l4mw.jpg")`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <div className="pt-3 flex pb-3 pl-3">
              <h1 className="px-3 rounded-xl bg-gray-100 bg-opacity-50 font-medium">
                Da Nang
              </h1>
            </div>
          </Link>
          <div className="grid-rows-2 grid-flow-row">
            <div
              className="rounded-3xl shadow-lg"
              style={{
                backgroundImage: `url("https://vcdn1-dulich.vnecdn.net/2022/04/18/dulichSaPa-1650268886-1480-1650277620.png?w=0&h=0&q=100&dpr=2&fit=crop&s=JTUw8njZ_Glkqf1itzjObg")`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <Link to="/find/Sa Pa" className="pt-32 flex pb-3 pl-3 mb-4">
                <h1 className="px-3 rounded-xl bg-gray-100 bg-opacity-50 font-medium">
                  Sa Pa
                </h1>
              </Link>
            </div>
            <div
              className="rounded-3xl shadow-lg"
              style={{
                backgroundImage: `url("https://nld.mediacdn.vn/291774122806476800/2021/11/26/cap-treo-hon-thom-02-1637912751786500410806.jpg")`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <Link to="/find/Phu Quoc" className="pt-48 flex pb-3 pl-3">
                <h1 className="px-3 rounded-xl bg-gray-100 bg-opacity-50 font-medium">
                  Phu Quoc
                </h1>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <h1 className="text-2xl font-semibold">Địa điểm được yêu thích</h1>
        <div className="mt-6 grid gap-x-4 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {places.length > 0 &&
            places.map((doc) => (
              <Link to={"/place/" + doc.place._id} key={doc.place._id}>
                <div className="border-2 p-4 rounded-xl shadow-lg">
                  <div className="bg-gray-500 mb-2 rounded-2xl flex">
                    {doc.place.photos?.[0] && (
                      <img
                        className="rounded-2xl object-cover aspect-square w-full"
                        src={doc.place.photos?.[0]}
                        alt=""
                      />
                    )}
                    {!doc.place.photos?.[0] && (
                      <img
                        className="rounded-2xl object-cover aspect-square"
                        src="https://kelembagaan.kemnaker.go.id/assets/img/no-image.svg"
                        alt=""
                      />
                    )}
                  </div>
                  <div className="h-28">
                    <h2 className="font-bold">{doc.place.title}</h2>
                    <h3 className="text-sm text-gray-500">
                      {doc.place.address}
                    </h3>
                  </div>
                  <div className="mt-1 flex justify-between">
                    <div>
                      <span className="font-bold">${doc.place.price}</span>
                      /night
                    </div>
                    <div className="flex items-center">
                      <span className="material-symbols-outlined text-lg">
                        star
                      </span>
                      <h1 className="font-semibold">
                        {doc.rating.toPrecision(2)}
                      </h1>
                      <h1 className="text-gray-400">/5</h1>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
        <Link to="/all" className="flex float-right my-5 cursor-pointer ">
          <h1 className="pr-1 hover:underline">Xem tất cả</h1>
          <span className="material-symbols-outlined">arrow_right_alt</span>
        </Link>
      </div>
    </div>
  );
}
