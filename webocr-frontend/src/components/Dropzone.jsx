import {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import styled from "styled-components";

const DropzoneHeader = styled.h2`
    color: #00844E;
    font-weight: bold;
    font-family: 'Lexend Deca';
`

const DropzoneHint = styled.p`
    color: #374151;
    margin-top: 12px;
    font-size: 0.875rem;
    line-height: 1.25rem;
`

function Dropzone() {
    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles)
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <form className="p-16 mt-10 border border-neutral-200 w-1/3 flex flex-col items-center justify-center">
        <div {...getRootProps()} className="flex flex-col items-center">
            <input {...getInputProps()} />
            <img src="/upload-cloud.png" alt="" className="mb-4"/>
            {
                isDragActive ?
                    <DropzoneHeader className="text-xl">Kliknij, by wrzucić zdjęcie</DropzoneHeader> :
                    <div className="flex flex-row gap-2">
                        <DropzoneHeader className="text-xl">Kliknij, by wrzucić zdjęcie</DropzoneHeader>
                        <p className="text-xl">lub przeciągnij i upuść</p>
                    </div>
            }
            <DropzoneHint>Dopuszczalne formaty JPG i PNG, maksymalnie 10 MB</DropzoneHint>
        </div>
        </form>
    )
}

export default Dropzone;