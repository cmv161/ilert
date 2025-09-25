import { useState } from 'react';
import { Box, Typography, Select, MenuItem, Button } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';

import WidgetSelector from '../widgets/WidgetSelector/WidgetSelector';

const DashboardHeader = () => {
    const [team, setTeam] = useState('SRE Team');

    const handleTeamChange = (event: SelectChangeEvent) => {
        setTeam(event.target.value);
    };

    return (
        <Box sx={{ px: 3, py: 2, borderBottom: '1px solid #ddd' }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h5" fontWeight="500">
                    Dashboard / {team}
                </Typography>

                <Select size="small" value={team} onChange={handleTeamChange} sx={{ minWidth: 150 }}>
                    <MenuItem value="SRE Team">SRE Team</MenuItem>
                    <MenuItem value="DevOps">DevOps</MenuItem>
                    <MenuItem value="Backend">Backend</MenuItem>
                </Select>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 1 }}>
                <Button variant="outlined">Save</Button>
                <WidgetSelector />
            </Box>
        </Box>
    );
};

export default DashboardHeader;
