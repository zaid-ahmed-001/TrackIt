import React from 'react';
import { TextField, Popper, Box } from '@mui/material';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { styled } from '@mui/system';

const Arrow = styled('div')(({ theme }) => ({
  position: 'absolute',
  width: 0,
  height: 0,
  borderStyle: 'solid',
  borderWidth: '8px 8px 8px 0', // This makes a right-pointing arrow
  borderColor: `transparent #4a4a4a transparent transparent`, // The color is applied to the right side
  left: '2px', // Position the arrow to the right of the tooltip
  top: '50%',
  transform: 'translateY(-50%)', // Rotates the arrow to point left
}));

const getRanges = (id: string) => {
  switch (id) {
    case "combiningWithTeammates":
      return [
        { range: 10, label: "Very Bad" },
        { range: 30, label: "Bad" },
        { range: 50, label: "Okay" },
        { range: 70, label: "Good" },
        { range: 90, label: "Very Good" },
      ];
    case "performance":
      return [
        { range: 20, label: "Slow" },
        { range: 40, label: "Below Average" },
        { range: 60, label: "Average" },
        { range: 80, label: "Fast" },
        { range: 100, label: "Very Fast" },
      ];
    default:
      return [
        { range: 20, label: "Bad" },
        { range: 40, label: "Poor" },
        { range: 60, label: "Average" },
        { range: 80, label: "Good" },
        { range: 100, label: "Excellent" },
      ];
  }
};
// const generateTooltipContent = () => {

//   return (
//     <table>
//       <tbody>
//         {ranges.map((item, index) => (
//           <tr key={index}>
//             <td style={{ paddingRight: '10px', textAlign: 'left', whiteSpace: 'nowrap' }}>
//               {item.range}
//             </td>
//             <td style={{paddingRight:'10px'}}>:</td>
//             <td style={{ textAlign: 'left', whiteSpace: 'nowrap' }}>
//               {item.label}
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

export const renderTextField = (id: any, name: any, label: any, formik: any,anchorEl:any, setAnchorEl:any,open:any, setOpen:any,arrowRef:any, setArrowRef:any) => {


  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
    setOpen(false);
  };
  const handleFocus = (event: React.FocusEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleBlur = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  return (
    <Box className="mt-3 w-96 flex items-center justify-center ml-16" display="flex" alignItems="center" mb={4}>
     <FormControl fullWidth variant="outlined" size="small">
        <InputLabel>{label}</InputLabel>
        <Select
          id={id}
          name={name}
          value={formik.values[name]}
          onChange={formik.handleChange}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleFocus}
          onBlur={handleBlur}
          label={label}
          error={formik.touched[name] && Boolean(formik.errors[name])}
        >
        {getRanges(id).map((item, index) => (
          <MenuItem key={index} value={item.range}>
            {item.label}
          </MenuItem>
        ))}
        </Select>
      </FormControl>
    </Box>
  );
};
