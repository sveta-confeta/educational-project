import React, {ChangeEvent, useRef} from 'react';
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

export const LoaderAvatar = () => {
   // const [avatar, setAvatar] = useState<string>(userAvatar ? userAvatar : defaultAva)

    const refLoader=useRef<HTMLInputElement>(null)
const selectImageHandler=()=>{
        refLoader&& refLoader.current?.click();
}
    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) { //e.target.files=это массив . нужно проверить что он тру и у него есть длина
            const file = e.target.files[0]
            // if (file.size < 1000000) { //это одно из свойст загружаемого файла показано сколько mgbate-1, если больше то преобразование
            //     convertFileToBase64(file, (file64: string) => {
            //         setAvatar(file64)
            //         changeUserAvatar(file64)
            //     })
            // } else {
            //     dispatch(setAppErrorAC('The file is too large'))
             }
        }
    }
    return (
        <div>
            <CloudDownloadIcon onClick ={selectImageHandler} color="action" sx={{right: 0, top: '-8px'}} />
            <input type='file'
                   ref={refLoader}
                   onChange={uploadHandler}
                   style={{display: 'none'}}
                   accept={'image/gif,image/png'}/>
        </div>
    );
};

