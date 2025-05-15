import {Button, Tooltip} from "@mui/material";

export default function Tooltips(props) {
    return (
        <Tooltip {...props}>
            <Button sx={{ width: '1.5em',
                height: '1.5em',
                color: 'white',
                verticalAlign: 'text-bottom',
                paddingBottom: '1em',
                borderRadius: '1em',
                fontSize: 'larger'
            }}>?</Button>
        </Tooltip>
    );
}
