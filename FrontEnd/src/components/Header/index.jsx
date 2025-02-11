import React from 'react';
import { Link } from 'react-router-dom';
import logoBlackTheme from '../../assets/logoBlackTheme.jpg';
import logoWhiteTheme from '../../assets/logoWhiteTheme.jpg';

export default function Header() {
  return (
    <header>
      {/* Phần trên của header chính. Tạm gọi là affix header */}
      <div className="top-strip py-2 border-t-[1px] border-b-[1px] border-gray-250">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="columns-1 w-[50%]">
              <p className="text-[14px] font-[400]">
                Nhận ngay giảm giá lên tới 50% cho mùa mới
              </p>
            </div>

            <div className="columns-2 flex items-center justify-end">
              <ul className="flex items-center gap-2">
                <li className="list-none">
                  <Link
                    to={'/help-center'}
                    className="text-[13px] link font-[500] transition"
                  >
                    Trợ giúp
                  </Link>
                </li>

                <li className="list-none">
                  <Link
                    to={'/order-tracking'}
                    className="text-[13px] link font-[500] transition"
                  >
                    Theo dõi đơn hàng
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Làm header */}
      <div className="header">
        <div className="container flex items-center justify-between">
          {/* logo */}
          <div className="columns-1">
            <img src={logoWhiteTheme} alt="Logo" width={'20%'} height={'20%'} />
          </div>
          <div className="columns-2"></div>
          <div className="columns-3"></div>
        </div>
      </div>
    </header>
  );
}
