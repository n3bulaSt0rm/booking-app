// export default function Footer() {
//   return (
//     <div className="mt-auto pt-10 px-14 pb-6 bg-gray-100 flex justify-between">
//       <div>
//         <h1 className="font-bold text-xl pb-2">GoBooking</h1>
//         <h1 className="text-gray-500">
//           Đem đến trải nghiệm tuyệt vời nhất <br />
//           cho bạn!
//         </h1>
//       </div>
//       <div className="text-gray-500 text-right">
//         <h1 className="font-semibold text-black">Thông tin liên hệ</h1>
//         <h1>Nhóm 21</h1>
//         <h1>
//           Công nghê Web và<br />
//           Dịch vụ trực tuyến
//         </h1>
//       </div>
//     </div>
//   );
// }


import { FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <div className="mt-auto pt-10 px-14 pb-6 bg-gray-100 flex justify-between">
      <div>
        <h1 className="font-bold text-xl pb-2">TravelNest</h1>
        <h1 className="text-gray-500 mb-4">
          Chạm vào từng trải nghiệm, ghi dấu mọi hành trình!
        </h1>
        {/* Icons */}
        <div className="flex justify-left items-center space-x-6 text-2xl text-gray-600">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-pink-500 hover:text-pink-700" />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF className="text-blue-600 hover:text-blue-800" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-blue-400 hover:text-blue-600" />
          </a>
        </div>
      </div>
      <div className="text-gray-500 text-right">
        <h1 className="font-semibold text-black">Thông tin liên hệ</h1>
        <h1>Nhóm 21</h1>
        <h1>
          Công nghê Web và<br />
          Dịch vụ trực tuyến
        </h1>
      </div>
    </div>
  );
}
