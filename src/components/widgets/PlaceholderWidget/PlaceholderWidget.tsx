import { observer } from 'mobx-react-lite';
import { Box } from '@mui/material';
import WidgetSelector from '../WidgetSelector/WidgetSelector';
type Props = { id: string };

const PlaceholderWidget = observer(({ id }: Props) => {
    return (
        <Box p={2} border="2px dashed gray" borderRadius={2} textAlign="center" sx={{ bgcolor: '#fafafa' }}>
            <WidgetSelector id={id} />
        </Box>
    );
});

export default PlaceholderWidget;
