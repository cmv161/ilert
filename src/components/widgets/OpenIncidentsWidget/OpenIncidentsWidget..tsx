import React from 'react';
import { Box, Typography, Card, CardContent, Chip, Stack, IconButton } from '@mui/material';
import moment from 'moment';
import { observer } from 'mobx-react-lite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faMinusCircle, faCheckCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { incidentsStore } from '../../../stores/incidentsStore';
import { widgetsStore } from '../../../stores/widgetsStore';
import { useConfirmDialog } from '../../../utils/hooks/useConfirmDialog';
import type { Incident } from '../../../types/incidents';
import WidgetContainer from '../WidgetContainer/WidgetContainer';

type ServiceStatus = 'OPERATIONAL' | 'DEGRADED' | 'MAJOR_OUTAGE';

interface OpenIncidentsProps {
    id: string;
}

const OpenIncidents: React.FC<OpenIncidentsProps> = observer(({ id }) => {
    const { confirm, ConfirmDialog } = useConfirmDialog();
    const data: Incident[] = incidentsStore.incidents;
    const getServiceIcon = (status: ServiceStatus) => {
        switch (status) {
            case 'OPERATIONAL':
                return <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green' }} />;
            case 'DEGRADED':
                return <FontAwesomeIcon icon={faMinusCircle} style={{ color: 'orange' }} />;
            case 'MAJOR_OUTAGE':
                return <FontAwesomeIcon icon={faExclamationCircle} style={{ color: 'red' }} />;
            default:
                return null;
        }
    };

    return (
        <WidgetContainer title="Open incidents" loading={incidentsStore.loading} error={incidentsStore.error}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Typography variant="h6" gutterBottom>
                    Open incidents
                </Typography>
                <IconButton
                    size="small"
                    aria-label="delete"
                    onClick={() => {
                        console.log('confirm delete');
                        confirm(() => {
                            widgetsStore.removeWidget(id);
                        });
                    }}
                >
                    <FontAwesomeIcon icon={faTrash} />
                </IconButton>
            </Stack>

            {data.map(incident => (
                <Card key={incident.id} variant="outlined" sx={{ mb: 2, borderRadius: 2 }}>
                    <CardContent>
                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                            <Box>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <Typography variant="subtitle1" fontWeight="bold" color="primary">
                                        {incident.summary}
                                    </Typography>
                                    <Chip label={incident.status} size="small" color="info" sx={{ mt: 0.5 }} />
                                </Stack>

                                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                                    {moment(incident.createdAt).fromNow()} – {incident.message}
                                </Typography>
                                <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                                    {incident.affectedServices.map(s => (
                                        <Box key={s.service.id} display="flex" alignItems="center" gap={0.5}>
                                            {getServiceIcon(s.impact)}
                                            <Typography variant="body2">{s.service.name}</Typography>
                                        </Box>
                                    ))}
                                </Stack>
                            </Box>
                        </Stack>
                    </CardContent>
                </Card>
            ))}

            {ConfirmDialog}
        </WidgetContainer>
    );
});

export default OpenIncidents;
