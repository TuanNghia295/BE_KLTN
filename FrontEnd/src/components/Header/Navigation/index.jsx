import { Button } from '@mui/material';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { FaCaretDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { MdDiscount } from 'react-icons/md';
import CategoryPannel from './CategoryPannel';
import { useState } from 'react';

const Navigation = () => {
  const [isOpenCategory, setIsOpenCategory] = useState(false);
  const toggleCategory = () => {
    setIsOpenCategory(!isOpenCategory);
  };
  return (
    <>
      <nav className="py-2">
        <div className="container flex items-center justify-start gap-8">
          <div className="col_1 w-[20%]">
            <Button className="!text-black gap-2 w-full" onClick={() => toggleCategory()}>
              <HiOutlineMenuAlt2 className="text-[18px]" /> Shop by categories
              <FaCaretDown className="text-[16px] ml-auto" />
            </Button>
          </div>

          {/* Điều hướng chính */}
          <div className="col_2 w-[65%]">
            <ul className="flex items-center gap-5">
              <li className="list-none">
                <Link to={'/home'} className="link transition text-[16px] font-[500]">
                  <Button className="link transition font-[500] hover:!text-primary">Home</Button>
                </Link>
              </li>

              <li className="list-none">
                <Link to={'/fashion'} className="link transition text-[16px] font-[500]">
                  <Button className="link transition font-[500] hover:!text-primary">Fashion</Button>
                </Link>
              </li>

              <li className="list-none">
                <Link to={'/electronics'} className="link transition text-[16px] font-[500]">
                  <Button className="link transition font-[500] hover:!text-primary">Electronics</Button>
                </Link>
              </li>

              <li className="list-none">
                <Link to={'/bags'} className="link transition text-[16px] font-[500]">
                  <Button className="link transition font-[500] hover:!text-primary">Bags</Button>
                </Link>
              </li>

              <li className="list-none">
                <Link to={'/footwear'} className="link transition text-[16px] font-[500]">
                  <Button className="link transition font-[500] hover:!text-primary">Footwear</Button>
                </Link>
              </li>

              <li className="list-none">
                <Link to={'/croceries'} className="link transition text-[16px] font-[500]">
                  <Button className="link transition font-[500] hover:!text-primary">Croceries</Button>
                </Link>
              </li>

              <li className="list-none">
                <Link to={'/beauty'} className="link transition text-[16px] font-[500]">
                  <Button className="link transition font-[500] hover:!text-primary">Beauty</Button>
                </Link>
              </li>

              <li className="list-none">
                <Link to={'/wellness'} className="link transition text-[16px] font-[500]">
                  <Button className="link transition font-[500] hover:!text-primary">Wellness</Button>
                </Link>
              </li>

              <li className="list-none">
                <Link to={'/jewllery'} className="link transition text-[16px] font-[500]">
                  <Button className="link transition font-[500] hover:!text-primary">Jewellery</Button>
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

      <CategoryPannel isOpenCategory={isOpenCategory} toggleCategory={toggleCategory} />
    </>
  );
};

export default Navigation;
