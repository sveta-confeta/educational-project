import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

type SearchCardRadioType = {
    radioValue?: string
    onChangeRadio?: (value: string) => void
}

export const SearchCardRadio: React.FC<SearchCardRadioType> = React.memo(({radioValue, onChangeRadio}) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChangeRadio && onChangeRadio((event.target as HTMLInputElement).value);
    };

    return (
        <FormControl>
            <RadioGroup
                value={radioValue}
                onChange={handleChange}
            >
                <FormControlLabel value="Question" control={<Radio color={'secondary'}/>} label="Question"/>
                <FormControlLabel value="Answer" control={<Radio color={'secondary'}/>} label="Answer"/>
            </RadioGroup>
        </FormControl>
    );
});
