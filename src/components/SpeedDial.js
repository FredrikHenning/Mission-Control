import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import StopIcon from '@mui/icons-material/Stop';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ControlCameraIcon from '@mui/icons-material/ControlCamera';

const actions = [
  { icon: <StopIcon />, name: 'Stop' },
  { icon: <ControlCameraIcon />, name: 'Control' }
];

export default function BasicSpeedDial() {
  return (
    <Box>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon openIcon={<AssignmentIcon />} />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}