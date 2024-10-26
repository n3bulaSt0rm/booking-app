// import React from "react";


// export default function AddressLink({children,className=null}) {
//     if (!className) {
//       className = 'my-3 block';
//     }
//     className += ' flex gap-1 font-semibold underline';
//     return (
//       <a className={className} target="_blank" href={'https://maps.google.com/?q='+children}>
//         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//           <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
//           <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
//         </svg>
//         {children}
//       </a>
//     );
//   }

import React from "react";
import './AddressLink.css';
// import { Link, useLocation } from "react-router-dom";


export default function AddressLink({ children, className = null }) {
  // Nếu không có className, gán giá trị mặc định
  if (!className) {
    className = "my-3 block";
  }
  // Thêm các lớp bổ sung
  className += " flex gap-1 font-semibold underline";

  // Tạo URL an toàn cho Google Maps
  const mapUrl = "https://maps.google.com/?q=" + encodeURIComponent(children);

  return (
    <a
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      href={mapUrl}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
        />
      </svg>
      {children}
    </a>
  );
}


//Giải thích các thay đổi:
// Sử dụng encodeURIComponent: Điều này giúp bảo vệ URL bằng cách mã hóa các ký tự đặc biệt trong children.
// rel="noopener noreferrer": Điều này cải thiện bảo mật khi mở liên kết trong một tab mới bằng cách ngăn chặn trang mở truy cập vào trang nguồn.
// Code sạch và dễ hiểu hơn: Cấu trúc này giúp mã dễ đọc và đảm bảo rằng bạn có kiểm tra biến className ngay từ đầu.
// Với những cải tiến này, file AddressLink.js sẽ hoạt động an toàn và ổn định hơn. 