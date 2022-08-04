import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {useAppDispatch, useAppSelector} from "../../bll/state";
import {setMinMaxAC} from "../../bll/packsReducer";

export const RangeSlider = React.memo(() => {
    const dispatch = useAppDispatch()

    const minCardsCount = useAppSelector(state => state.packs.minCardsCount)
    const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)
    const min = useAppSelector(state => state.packs.params.min)
    const max = useAppSelector(state => state.packs.params.max)

    const [value, setValue] = React.useState<number | number[]>([min, max]);

    const handleChangeMinMax = (event: React.SyntheticEvent | Event, value: number | Array<number>) => {
        if (Array.isArray(value)) {
            dispatch(setMinMaxAC(value[0], value[1]));
            setValue([value[0], value[1]])
        }
    };

    return (
        <Box sx={{width: 200}}>
            <Slider
                color={'secondary'}
                valueLabelDisplay="on"
                disableSwap

                value={value}
                onChange={(e, newValue) => setValue(newValue)}
                onChangeCommitted={handleChangeMinMax}
                min={minCardsCount}
                max={maxCardsCount}
            />
        </Box>
    );
});

