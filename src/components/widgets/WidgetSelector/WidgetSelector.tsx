import { useState } from 'react';
import { MenuItem, Button, Menu } from '@mui/material';
import { widgetsStore, type WidgetType } from '../../../stores/widgetsStore';

type AddButtonProps = {
    id?: string;
};

const WidgetSelector: React.FC<AddButtonProps> = ({ id }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleAddWidget = (type: WidgetType) => {
        if (id) {
            widgetsStore.replacePlaceholder(id, type);
        } else {
            widgetsStore.addWidget(type);
        }
        setAnchorEl(null);
    };

    return (
        <>
            <Button variant="contained" onClick={handleOpenMenu}>
                Add
            </Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
                <MenuItem onClick={() => handleAddWidget('alerts')}>Open alerts</MenuItem>
                <MenuItem onClick={() => handleAddWidget('activity')}>Recent alert activity</MenuItem>
                <MenuItem onClick={() => handleAddWidget('services')}>Service status</MenuItem>
                <MenuItem onClick={() => handleAddWidget('incidents')}>Open incidents</MenuItem>
            </Menu>
        </>
    );
};

export default WidgetSelector;
