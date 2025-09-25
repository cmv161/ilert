import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Typography, Stack, IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react-lite';
import { faCheckCircle, faExclamationCircle, faMinusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { servicesStore } from '../../../stores/servicesStore';
import { useConfirmDialog } from '../../../utils/hooks/useConfirmDialog';
import { widgetsStore } from '../../../stores/widgetsStore';
import type { Service } from '../../../types/services';
import WidgetContainer from '../WidgetContainer/WidgetContainer';

type Props = {
    id: string;
};

const ServiceStatus: React.FC<Props> = observer(({ id }: Props) => {
    const { confirm, ConfirmDialog } = useConfirmDialog();
    const data = servicesStore.services;
    const getStatusIcon = (status: Service['status']) => {
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
        <WidgetContainer title="Service status" loading={servicesStore.loading} error={servicesStore.error}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Typography variant="h6" gutterBottom>
                    Service status
                </Typography>
                <IconButton
                    size="small"
                    aria-label="delete"
                    onClick={() => confirm(() => widgetsStore.removeWidget(id))}
                >
                    <FontAwesomeIcon icon={faTrash} />
                </IconButton>
            </Stack>

            <List>
                {data.map(service => (
                    <ListItem key={service.id}>
                        <ListItemIcon>{getStatusIcon(service.status)}</ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography variant="body1" sx={{ color: 'primary.main', cursor: 'pointer' }}>
                                    {service.name}
                                </Typography>
                            }
                            secondary={
                                <Typography variant="body2" color="textSecondary">
                                    {service.description || `${service.status} status`}
                                </Typography>
                            }
                        />
                    </ListItem>
                ))}
            </List>
            {ConfirmDialog}
        </WidgetContainer>
    );
});

export default ServiceStatus;
