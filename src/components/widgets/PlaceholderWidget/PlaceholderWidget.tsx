import { observer } from 'mobx-react-lite';
import { Box, IconButton } from '@mui/material';
import WidgetSelector from '../WidgetSelector/WidgetSelector';
import { widgetsStore } from '../../../stores/widgetsStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
type Props = { id: string };

const PlaceholderWidget = observer(({ id }: Props) => {
    return (
        <Box
            p={2}
            border="2px dashed gray"
            borderRadius={2}
            textAlign="center"
            sx={{ bgcolor: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                <WidgetSelector id={id} />
            </Box>

            <IconButton size="small" aria-label="delete" onClick={() => widgetsStore.deleteWidget(id)}>
                <FontAwesomeIcon icon={faTrash} />
            </IconButton>
        </Box>
    );
});

export default PlaceholderWidget;
