import { Button } from '@mui/material';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { FaCaretDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { MdDiscount } from 'react-icons/md';
import CategoryPannel from './CategoryPannel';
import { useState } from 'react';
import '../Navigation/style.css';

const Navigation = () => {
  const [isOpenCategory, setIsOpenCategory] = useState(false);
  const toogleCategory = () => setIsOpenCategory(!isOpenCategory);

  return (
    <>
      <nav>
        <div className="container hidden xl:flex items-center justify-start gap-8">
          <div className="col_1 w-[16%]">
            <Button
              className="!text-white gap-2 !bg-black w-full cursor-pointer hover:!bg-gray1"
              onClick={toogleCategory}
            >
              <HiOutlineMenuAlt2 className="text-[18px]" /> Shop by categories
            </Button>
          </div>

          {/* Điều hướng chính */}
          <div className="col_2 w-[65%]">
            <ul className="flex items-center justify-center gap-5 nav">
              <li className="list-none">
                <Link to={'/'} className="link transition text-[16px] font-[500]">
                  <Button className="link transition font-[500] hover:!text-primary !py-4">Home</Button>
                </Link>
              </li>

              <li className="list-none relative">
                <Link to={'/listing/fashion'} className="link transition text-[16px] font-[500]">
                  <Button className="link transition font-[500] hover:!text-primary !py-4">Fashion</Button>
                </Link>

                <div
                  className="submenu absolute top-[120%] left-[0] min-w-[150px] bg-white shadow-md 
                opacity-0  transition-all duration-300"
                >
                  <ul>
                    <li className="list-none w-full relative">
                      <Link to={'/listing/men'}>
                        <Button className="!text-textPrimary w-full !justify-start !rounded-none">Men</Button>
                      </Link>

                      {/* inner menu */}
                      <div
                        className="submenu absolute top-[0%] left-[100%] min-w-[150px] bg-white shadow-md 
                opacity-0  transition-all duration-300"
                      >
                        <ul>
                          <li className="list-none w-full">
                            <Link to={'/listing/men/t-shirt'}>
                              <Button className="!text-textPrimary w-full !justify-start !rounded-none">T-Shirt</Button>
                            </Link>
                          </li>

                          <li className="list-none w-full">
                            <Link to={'/women'}>
                              <Button className="!text-textPrimary w-full !justify-start !rounded-none">Jeans</Button>
                            </Link>
                          </li>

                          <li className="list-none w-full">
                            <Link to={'/children'}>
                              <Button className="!text-textPrimary w-full !justify-start !rounded-none">
                                Footwear
                              </Button>
                            </Link>
                          </li>

                          <li className="list-none w-full">
                            <Link to={'/other'}>
                              <Button className="!text-textPrimary w-full !justify-start !rounded-none">Watch</Button>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </li>

                    <li className="list-none w-full">
                      <Link to={'/women'}>
                        <Button className="!text-textPrimary w-full !justify-start !rounded-none">Women</Button>
                      </Link>
                    </li>

                    <li className="list-none w-full">
                      <Link to={'/children'}>
                        <Button className="!text-textPrimary w-full !justify-start !rounded-none">Kids</Button>
                      </Link>
                    </li>

                    <li className="list-none w-full">
                      <Link to={'/other'}>
                        <Button className="!text-textPrimary w-full !justify-start !rounded-none">Other</Button>
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="list-none">
                <Link to={'/listing/footwear'} className="link transition text-[16px] font-[500]">
                  <Button className="link transition font-[500] hover:!text-primary !py-4">Footwear</Button>
                </Link>
              </li>

              <li className="list-none">
                <Link to={'/listing/jewellery'} className="link transition text-[16px] font-[500]">
                  <Button className="link transition font-[500] hover:!text-primary !py-4">Jewellery</Button>
                </Link>
              </li>

              <li className="list-none">
                <Link to={'/listing/sale'} className="link transition text-[16px] font-[500]">
                  <Button className="link transition font-[500] hover:!text-primary !py-4">Sale</Button>
                </Link>
              </li>
            </ul>
          </div>

          <div className="col_3 w-[15%] flex items-center justify-end gap-2 ">
            <Button color="error" variant="text">
              <MdDiscount />
              &nbsp;
              <p className="text-[14px] font-[500] text-primary">FreeShip</p>
            </Button>
          </div>
        </div>
      </nav>

      <CategoryPannel isOpenCategory={isOpenCategory} toogleCategory={toogleCategory} />
    </>
  );
};

export default Navigation;
