import '../ProductItem/style.css';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { FaRegHeart } from 'react-icons/fa';
import { IoGitCompareOutline } from 'react-icons/io5';
import { MdZoomOutMap } from 'react-icons/md';
import Tooltip from '@mui/material/Tooltip';

const ProductItem = () => {
  return (
    <div className="productItem rounded-md w-[100%] overflow-hidden bg-white text-black shadow-lg relative">
      <div className="group imgWrapper overflow-hidden rounded-none relative">
        <Link to="/">
          <div className="img h-[250px] overflow-hidden">
            <img
              src="https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.3/h_466,c_limit/dab259aa-dbc3-4c18-85e8-38dababbed92/dunk-low-retro-shoes-Xhh8kc.png"
              className="w-full h-full object-cover"
            />
            <img
              src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/a5e44b11-0b0a-4a8a-87bc-a3961bfeee0c/WMNS+AIR+JORDAN+1+LOW.png"
              className="w-full h-full object-cover absolute top-[0px] left-[0px] opacity-0 transition-all duration-1000 group-hover:opacity-100"
            />
          </div>
        </Link>
        <span className="discount flex items-center absolute top-[10px] left-[10px] z-50 bg-primary text-white p-2 rounded-md ">
          -10%
        </span>

        <div className="actions absolute transition-all duration-1000 top-[-200px] group-hover:top-[15px] right-[0px] z-50 flex items-center gap-2 flex-col w-[50px] opacity-0 group-hover:opacity-100">
          <Tooltip title="Add" placement="left-start">
            <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-white !rounded-full hover:!bg-primary">
              <FaRegHeart className="!text-black" />
            </Button>
          </Tooltip>
          <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-white !rounded-full hover:!bg-primary">
            <MdZoomOutMap className="!text-black" />
          </Button>
          <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-white !rounded-full hover:!bg-primary">
            <IoGitCompareOutline className="!text-black" />
          </Button>
        </div>
      </div>

      <div className="info p-3">
        <h6 className="text-[14px]">
          <Link to="/" className="link transition-all">
            Footwear
          </Link>
        </h6>
        <h3 className="text-[16px] title mt-2 font-[500] mb-2">
          <Link to="/" className="link transition-all">
            Nike Jordan 2025
          </Link>
        </h3>

        <div className="flex items-center gap-4">
          <span className="oldPrice line-through font-light">$58.00</span>
          <span className="newPrice text-primary font-bold">$50.00</span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
