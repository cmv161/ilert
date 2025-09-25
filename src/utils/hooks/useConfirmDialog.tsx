import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

export function useConfirmDialog() {
    const [open, setOpen] = useState(false);
    const [onConfirm, setOnConfirm] = useState<(() => void) | null>(null);

    const confirm = (action: () => void) => {
        setOnConfirm(() => action);
        setOpen(true);
    };

    const ConfirmDialog = (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Remove widget</DialogTitle>
            <DialogContent>
                <Typography>Are you sure you want to remove this widget?</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button
                    color="error"
                    variant="contained"
                    onClick={() => {
                        if (onConfirm) onConfirm();
                        setOpen(false);
                    }}
                >
                    Remove
                </Button>
            </DialogActions>
        </Dialog>
    );

    return { confirm, ConfirmDialog };
}
