import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
    Box,
    IconButton,
    Stack,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faHandsHelping, faTrash, faUserAstronaut, faUserTag } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { alertsStore } from '../../../stores/alertsStore';
import { widgetsStore } from '../../../stores/widgetsStore';
import { useConfirmDialog } from '../../../utils/hooks/useConfirmDialog';
import type { LogEntry } from '../../../types/alerts';
import WidgetContainer from '../WidgetContainer/WidgetContainer';
import { useEffect } from 'react';

interface RecentAlertActivityProps {
    id: string;
}

const iconMap: Record<string, typeof faBell> = {
    'fa-bell': faBell,
    'fa-hands-helping': faHandsHelping,
    'fa-user-astronaut': faUserAstronaut,
    'fa-user-tag': faUserTag,
};

function getIcon(iconClass?: string) {
    if (!iconClass) return null;
    const key = iconClass.split(' ').pop() || '';
    const faIcon = iconMap[key];
    return faIcon ? <FontAwesomeIcon icon={faIcon} size="sm" /> : null;
}

const RecentAlertActivity: React.FC<RecentAlertActivityProps> = observer(({ id }) => {
    const { confirm, ConfirmDialog } = useConfirmDialog();
    useEffect(() => {
        alertsStore.loadRecentActivity();
    }, []);
    const data: LogEntry[] = alertsStore.recentActivity;

    return (
        <WidgetContainer
            title="Recent alert activity"
            loading={alertsStore.activityLoading}
            error={alertsStore.activityError}
        >
            <>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Typography variant="h6" gutterBottom>
                        Recent alert activity
                    </Typography>
                    <IconButton
                        size="small"
                        aria-label="delete"
                        onClick={() => confirm(() => widgetsStore.removeWidget(id))}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </IconButton>
                </Stack>

                <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Alert source</TableCell>
                                <TableCell>Alert</TableCell>
                                <TableCell>Time</TableCell>
                                <TableCell>Activity</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map(entry => (
                                <TableRow key={entry.id}>
                                    <TableCell>
                                        <Box display="flex" alignItems="center" gap={1}>
                                            {entry.alert.alertSource.iconUrl && (
                                                <img
                                                    src={entry.alert.alertSource.iconUrl}
                                                    alt="icon"
                                                    width={16}
                                                    height={16}
                                                />
                                            )}
                                            <Typography variant="body2">{entry.alert.alertSource.name}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
                                            {entry.alert.summary}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>{moment(entry.timestamp).fromNow()}</TableCell>
                                    <TableCell>
                                        <Box display="flex" alignItems="center" gap={1}>
                                            {getIcon(entry.iconClass)}
                                            <Typography variant="body2">{entry.text}</Typography>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {ConfirmDialog}
            </>
        </WidgetContainer>
    );
});

export default RecentAlertActivity;
