import { Link } from 'react-router-dom';
import logoWhiteTheme from '../../assets/logoWhiteTheme.jpg';
import Search from '../Search';
import Badge from '@mui/material/Badge';
import { styled, StyledEngineProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Favorite from '@mui/icons-material/Favorite';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Navigation from './Navigation';
import { IoMdMenu } from 'react-icons/io';
import { useContext } from 'react';
import { MyContext } from '../../App';
import { useStoreProvider } from '../../contexts/StoreProvider'
import { Button } from '@mui/material';
//Call API
import { useNavigate } from 'react-router-dom';
import { logout } from '../../apis/authServices'

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 4,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const CustomTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'black',
    color: 'white',
  },
});

export default function Header() {
  const context = useContext(MyContext);
  const { userInfo, clearInfo } = useStoreProvider()

  //Handle Logout
  const handleLogout = async () => {
    await logout();
    clearInfo();
  }
  
  return (
    <header className="bg-white">
      {/* Phần trên của header chính. Tạm gọi là affix header */}
      <div className="top-strip py-2 border-t-[1px] border-b-[1px] border-gray-250">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="col1 w-[50%]">
              <p className="text-[14px] font-[400]">Get up to 50% off for the new season.</p>
            </div>

            <div className="col2 flex items-center justify-end">
              <ul className="flex items-center gap-2">
                <li className="list-none">
                  <Link to={'/help-center'} className="text-[13px] link font-[500] transition">
                    Help
                  </Link>
                </li>
                &nbsp;
                <li className="list-none">
                  <Link to={'/order-tracking'} className="text-[13px] link font-[500] transition">
                    Order Tracking
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="header py-3 border-b-[1px] border-b-[1px] border-gray-250">
        <div className="container flex items-center justify-between">
          {/* logo */}
          <div className="col1 w-[25%] flex justify-center items-center">
            <Link to={'/'} className="w-full">
              <img src={logoWhiteTheme} alt="Logo" className="w-1/2 md:w-1/3 lg:w-1/4 object-contain" />
            </Link>
          </div>

          {/* Thanh Search */}
          <div className="col2 w-[45%]">
            <Search />
          </div>

          <div className="col3 w-[30%] flex items-center pl-7">
            <ul className="flex items-center justify-end gap-3 w-full">
              {/* Đăng nhập */}
              { userInfo ? (
                <>
                <p>Hi, {userInfo.fullName}</p>
                <Button onClick={handleLogout}>Logout</Button>
                </>
              ) : (
                <>
                  <li className="list-none hidden xl:block">
                    <Link to={'/login'} className="link transition text-[14px] font-[500]">
                      Sign In
                    </Link>
                    &nbsp; | &nbsp;
                    <Link to={'/register'} className="link transition text-[14px] font-[500]">
                      Sign Up
                    </Link>
                  </li>
                </>
                ) }
              {/*Menu Responsive*/}
              <li className="xl:hidden">
                <StyledEngineProvider injectFirst>
                  <CustomTooltip title="Menu">
                    <IconButton aria-label="cart">
                      <IoMdMenu style={{ color: '#000' }} />
                    </IconButton>
                  </CustomTooltip>
                </StyledEngineProvider>
              </li>
              {/* Giỏ hàng */}
              <li>
                <StyledEngineProvider injectFirst>
                  <CustomTooltip title="Giỏ hàng">
                    <IconButton aria-label="cart" onClick={() => context.setOpenCartPanel(true)}>
                      <StyledBadge badgeContent={4} color="error">
                        <ShoppingCartIcon style={{ color: '#000' }} />
                      </StyledBadge>
                    </IconButton>
                  </CustomTooltip>
                </StyledEngineProvider>
              </li>

              {/* Danh sách yêu thích */}
              <li>
                <StyledEngineProvider injectFirst>
                  <CustomTooltip title="Danh sách yêu thích">
                    <IconButton aria-label="cart">
                      <Favorite style={{ color: '#000' }} />
                    </IconButton>
                  </CustomTooltip>
                </StyledEngineProvider>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <Navigation />
    </header>
  );
}
