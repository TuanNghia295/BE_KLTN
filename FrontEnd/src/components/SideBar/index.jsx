import CategoryCollapse from '../CatergoryCollapse';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function SideBar() {
  return (
    <aside className="sidebar">
      <div className="box mb-3">
        <h3 className="text-[16px] font-[600]">Shop by category</h3>
        <div className="scroll">
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                sx={{
                  color: 'grey', // Màu của dấu check khi không được chọn
                  '&.Mui-checked': {
                    color: 'black', // Màu của dấu check khi được chọn
                  },
                }}
              />
            }
            label="Men"
            className="w-full"
            size="small"
          />
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                sx={{
                  color: 'grey', // Màu của dấu check khi không được chọn
                  '&.Mui-checked': {
                    color: 'black', // Màu của dấu check khi được chọn
                  },
                }}
              />
            }
            label="Women"
            className="w-full"
            size="small"
          />
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                sx={{
                  color: 'grey', // Màu của dấu check khi không được chọn
                  '&.Mui-checked': {
                    color: 'black', // Màu của dấu check khi được chọn
                  },
                }}
              />
            }
            label="Kids"
            className="w-full"
            size="small"
          />
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                sx={{
                  color: 'grey', // Màu của dấu check khi không được chọn
                  '&.Mui-checked': {
                    color: 'black', // Màu của dấu check khi được chọn
                  },
                }}
              />
            }
            label="Others"
            className="w-full"
            size="small"
          />
        </div>
      </div>
    </aside>
  );
}
