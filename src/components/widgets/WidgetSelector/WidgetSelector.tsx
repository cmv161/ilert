import { useState } from 'react';
import { MenuItem, Button, Menu, Snackbar, Alert } from '@mui/material';
import { widgetsStore, type WidgetType } from '../../../stores/widgetsStore';

type AddButtonProps = {
    id?: string;
};

const WidgetSelector: React.FC<AddButtonProps> = ({ id }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const [open, setOpen] = useState(false);

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleAddWidget = (type: WidgetType) => {
        if (id) {
            widgetsStore.replacePlaceholder(id, type);
        } else {
            const success = widgetsStore.addWidget(type);
            if (!success) {
                setOpen(true);
            }
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
            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={() => setOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert severity="warning" onClose={() => setOpen(false)}>
                    This widget already exists!
                </Alert>
            </Snackbar>
        </>
    );
};

export default WidgetSelector;
