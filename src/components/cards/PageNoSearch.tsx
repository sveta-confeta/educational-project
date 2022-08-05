import React from 'react';
import s from "../packs/Packs.module.css";
import {Button} from "@mui/material";

export const PageNoSearch = () => {
    return (
        <div className={s.wrapper}>
            <div>
            <div className={s.back}>Back to Packs List</div>
            </div>
            <div>
                <p>This pack is empty. Click add new card to fill this pack</p>
                <Button className={s.btn}
                        variant={'contained'}
                        color="secondary"
                    // onClick={}
                    >
                    Add new pack
                </Button>
            </div>

        </div>
    );
};

