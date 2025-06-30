import React from 'react';
import { TextField, Popper, Box } from '@mui/material';
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
const generateTooltipContent = () => {
  const ranges = [
    { range: "0-20", label: "Bad" },
    { range: "21-40", label: "Poor" },
    { range: "41-60", label: "Average" },
    { range: "61-80", label: "Good" },
    { range: "81-100", label: "Excellent" }
  ];

  return (
    <table>
      <tbody>
        {ranges.map((item, index) => (
          <tr key={index}>
            <td style={{ paddingRight: '10px', textAlign: 'left', whiteSpace: 'nowrap' }}>
              {item.range}
            </td>
            <td style={{paddingRight:'10px'}}>:</td>
            <td style={{ textAlign: 'left', whiteSpace: 'nowrap' }}>
              {item.label}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

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
      <TextField
        id={id}
        name={name}
        label={label}
        type="number"
        value={formik.values[name]}
        onChange={formik.handleChange}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        variant="outlined"
        size="small"
        error={formik.touched[name] && Boolean(formik.errors[name])}
        helperText={formik.touched[name] && formik.errors[name]}
        fullWidth
        InputLabelProps={{
          shrink: true,
          style: { color: "#8697B4", fontSize: "16px" },
        }}
      />
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="right"
        style={{paddingLeft:'10px',zIndex:'15'}}
        disablePortal
      >
        <Arrow ref={setArrowRef} />
        <Box
          sx={{
            padding: '10px',
            backgroundColor: '#333',
            color: 'white',
            borderRadius: '5px',
            boxShadow: 1,
          }}
        >
          {generateTooltipContent()}
        </Box>
      </Popper>
    </Box>
  );
};
