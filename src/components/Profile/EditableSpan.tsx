import React, {ChangeEvent, useCallback, useState} from 'react';
import {Box, TextField} from '@mui/material';
import {AccountCircle} from '@mui/icons-material';
import {useAppSelector} from "../../bll/state";

type PropsType = {
    title: string
    changeTitle: (title: string) => void
    setEditMode: (editMode: boolean) => void
    editMode: boolean
}

export const EditableSpan = React.memo(({
                                            title,
                                            changeTitle,
                                            editMode,
                                            setEditMode,
                                        }: PropsType) => {

    //const userName = useAppSelector(state => state.profile.name)
   // const [localTitle, setLocalTitle] = useState<string>(userName)

    // const activateViewMode = useCallback(() => {
    //     changeTitle(localTitle)
    //     setEditMode(false)
    // }, [changeTitle, localTitle])
    //
    // const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    //     setLocalTitle(e.currentTarget.value)
    // }, [])

    // const onKeyPressHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    //     if (e.key === 'Enter') {
    //         activateViewMode()
    //     }
    // }

    return editMode

        ? <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
            <AccountCircle sx={{color: 'action.active', mr: 1, my: 0.5}}/>
            <TextField
                id="input-with-sx"
                variant="standard"
                // value={localTitle}
                // onChange={onChangeHandler}
                // onKeyDown={onKeyPressHandler}
                // onBlur={activateViewMode}
                autoFocus
                color={'secondary'}
            />
        </Box>
        : <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
            <AccountCircle sx={{color: 'action.active', mr: 1, my: -0.3}}/>
            <span>{title}</span>
        </Box>
})