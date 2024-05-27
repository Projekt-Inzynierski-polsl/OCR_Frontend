import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import React, { Fragment, useState } from "react";
import {filesize} from "filesize";

const DropzoneHeader = styled.h2`
  color: #00844e;
  font-weight: bold;
  font-family: "Lexend Deca";
`;

const DropzoneHint = styled.p`
  color: #374151;
  margin-top: 12px;
  font-size: 0.875rem;
  line-height: 1.25rem;
`;

const AcceptedFiles = styled.div`
  border: 1px solid #d1d5db;
  padding: 2.5rem;
  border-radius: 10px;
  margin-top: 32px;
`;

function Dropzone({handleDrop}) {
  const onDrop = useCallback(acceptedFiles => {
    handleDrop(acceptedFiles);
  }, [])

    const {
        acceptedFiles,
        fileRejections,
        getRootProps,
        getInputProps
      } = useDropzone({
        onDrop,
        accept: {
          'image/*': ['.jpeg', '.png']
        }
      });
    
      
  return (
    <>
    { fileRejections.length > 0 && 
        <h2 className="mt-4 text-red-700 font-bold">Wrzucone pliki są niepoprawne. Wrzuć pliki .jpg lub .png o rozmiarze maksymalnie 10 MB.</h2>
    }
      <form className="p-16 mt-4 border border-neutral-200 w-1/3 flex flex-col items-center justify-center">
        
        <div {...getRootProps()} className="flex flex-col items-center">
          <input {...getInputProps()} />
          <img src="/upload-cloud.png" alt="" className="mb-4" />
          <div className="flex flex-row gap-2">
              <DropzoneHeader className="text-xl">
                Kliknij, by wrzucić zdjęcie
              </DropzoneHeader>
              <p className="text-xl">lub przeciągnij i upuść</p>
            </div>
          <DropzoneHint>
            Dopuszczalne formaty JPG i PNG, maksymalnie 10 MB
          </DropzoneHint>
        </div>
      </form>
      { acceptedFiles.length > 0 && acceptedFiles.map(file => (
        <AcceptedFiles className="w-1/3" key={file.name}>
        <div className="info-container flex flex-row items-center gap-4">
            <img src="/image_icon.png" alt=""/>
            <span className="flex flex-col">
            <p className="font-bold text-lg">{file.name}</p>
            <p className="text-sm">{filesize(file.size)}</p>
        </span>
        </div>
        </AcceptedFiles>
      ))}
    </>
  );
}

export default Dropzone;
