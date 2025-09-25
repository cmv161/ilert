import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Box, Typography, IconButton, Card, CardContent } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { alertsStore } from '../../../stores/alertsStore';
import { widgetsStore } from '../../../stores/widgetsStore';
import { useConfirmDialog } from '../../../utils/hooks/useConfirmDialog';
import WidgetContainer from '../WidgetContainer/WidgetContainer';

type Props = {
    id: string;
};

const OpenAlertsWidget = observer(({ id }: Props) => {
    const { confirm, ConfirmDialog } = useConfirmDialog();
    useEffect(() => {
        alertsStore.loadAlerts({ states: ['OPEN'] });
    }, []);
    const pending = alertsStore.pendingAlertsCount;
    const accepted = alertsStore.acceptedAlertsCount;

    return (
        <WidgetContainer title="Open Alerts" loading={alertsStore.loading} error={alertsStore.error}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 2,
                }}
            >
                <Typography variant="subtitle1" fontWeight={700}>
                    Open alerts
                </Typography>

                <IconButton
                    size="small"
                    aria-label="delete"
                    onClick={() =>
                        confirm(() => {
                            console.log('confirm delete');
                            widgetsStore.removeWidget(id);
                        })
                    }
                >
                    <FontAwesomeIcon icon={faTrash} />
                </IconButton>
            </Box>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 2,
                }}
            >
                <Card variant="outlined" sx={{ textAlign: 'center' }}>
                    <CardContent sx={{ py: 3 }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            Pending alerts
                        </Typography>
                        <Typography variant="h4" fontWeight={700} color="primary">
                            {pending}
                        </Typography>
                    </CardContent>
                </Card>

                <Card variant="outlined" sx={{ textAlign: 'center' }}>
                    <CardContent sx={{ py: 3 }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            Accepted alerts
                        </Typography>
                        <Typography variant="h4" fontWeight={700} color="primary">
                            {accepted}
                        </Typography>
                    </CardContent>
                </Card>
                {ConfirmDialog}
            </Box>
        </WidgetContainer>
    );
});
export default OpenAlertsWidget;
