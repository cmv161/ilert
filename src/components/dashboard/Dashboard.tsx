import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Paper } from '@mui/material';
import { widgetsStore } from '../../stores/widgetsStore';
import OpenAlertsWidget from '../widgets/OpenAlertsWidget/OpenAlertsWidget';
import DashboardHeader from './DashboardHeader';
import RecentAlertActivity from '../widgets/RecentAlertActivityWidget/RecentAlertActivityWidget';
import ServiceStatus from '../widgets/ServiceStatusWidget/ServiceStatusWidget';
import OpenIncidents from '../widgets/OpenIncidentsWidget/OpenIncidentsWidget.';
import PlaceholderWidget from '../widgets/PlaceholderWidget/PlaceholderWidget';

const Dashboard = observer(() => {
    type WidgetType = 'alerts' | 'services' | 'activity' | 'incidents' | 'placeholder';

    type Widget = {
        id: string;
        type: WidgetType;
    };

    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

    const handleDrop = (e: React.DragEvent, dropIndex: number) => {
        const dragIndex = parseInt(e.dataTransfer.getData('index'), 10);
        widgetsStore.moveWidget(dragIndex, dropIndex);
        setDragOverIndex(null);
    };

    const renderWidget = (widget: Widget) => {
        switch (widget.type) {
            case 'alerts':
                return <OpenAlertsWidget id={widget.id} />;
            case 'services':
                return <ServiceStatus id={widget.id} />;
            case 'activity':
                return <RecentAlertActivity id={widget.id} />;
            case 'incidents':
                return <OpenIncidents id={widget.id} />;
            case 'placeholder':
                return <PlaceholderWidget id={widget.id} />;
            default:
                return null;
        }
    };

    const handleDragStart = (e: React.DragEvent, index: number) => {
        e.dataTransfer.setData('index', index.toString());
    };

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        setDragOverIndex(index);
    };

    const handleDragLeave = () => {
        setDragOverIndex(null);
    };

    return (
        <div>
            <DashboardHeader />
            <Box
                sx={{
                    width: '90%',
                    mx: 'auto',
                    my: 5,
                }}
            >
                {widgetsStore.widgets.map((widget, index) => (
                    <Paper
                        key={widget.id}
                        draggable
                        onDragStart={e => handleDragStart(e, index)}
                        onDrop={e => handleDrop(e, index)}
                        onDragOver={e => handleDragOver(e, index)}
                        onDragLeave={handleDragLeave}
                        elevation={1}
                        sx={{
                            mb: 2,
                            p: 2,
                            position: 'relative',
                            border: dragOverIndex === index ? '2px dashed #666' : '1px solid #ccc',
                            borderRadius: 2,
                            backgroundColor: '#fff',
                            cursor: 'grab',
                            transition: 'all 0.2s ease',
                            '&:active': {
                                cursor: 'grabbing',
                            },

                            ...(dragOverIndex === index && {
                                '&::after': {
                                    content: '""',
                                    position: 'absolute',
                                    inset: 0,
                                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                    borderRadius: 2,
                                },
                            }),
                        }}
                    >
                        {renderWidget(widget)}
                    </Paper>
                ))}
            </Box>
        </div>
    );
});

export default Dashboard;
