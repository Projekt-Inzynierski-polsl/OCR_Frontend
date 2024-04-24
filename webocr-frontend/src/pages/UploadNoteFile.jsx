import Navbar from "../components/Navbar.jsx";
import styled from "styled-components";
import Dropzone from "../components/Dropzone.jsx";


const FirstNoteHero = styled.div`
  background-color: #bfe6ce;
  color: #374151;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

import React, { Fragment, useState } from "react";
import api from "../APIService.js";
const NextButton = styled.button`
  background-color: #004423;
  color: #e9f7ee;
  font-family: "Space Grotesk";
  font-weight: bold;
  padding: 12px 96px;
  border-radius: 16px;
`;
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

function UploadNoteFile() {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const navigate = useNavigate();
  const { state } = useLocation();
  const { noteId } = state;

  const handleClick = () => {
    if (uploadedFiles.length > 0) {
      const formData = new FormData();
      uploadedFiles.forEach((file) => {
        formData.append("files", file);
      });
      api
        .post(`http://localhost:8051/api/note/${noteId}/file`, formData, {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        })
        .then((response) => {
          // todo: write response
        });
      navigate("/select-boxes", { state: { noteId: noteId, image: formData.get("files") } });
    }
  };

  return (
    <>
      <header>
        <Navbar></Navbar>
      </header>
      <main className="flex flex-col items-center">
        <Fragment>
          <FirstNoteHero className="py-16 w-full">
            <h1 className="text-5xl font-bold">Dodaj pierwszą notatkę</h1>
            <p className="max-w-3xl text-center mt-4 text-md">
              Przekonaj się, jak łatwe i przyjemne jest korzystanie z webOCR.
              Zacznijmy od utworzenia pierwszej notatki. Przeciągnij i upuść lub
              wybierz plik do wrzucenia, a system z użyciem AI rozpozna i
              zapisze tekst, który się tam znajduje.
            </p>
          </FirstNoteHero>
          <Dropzone handleDrop={setUploadedFiles}></Dropzone>

          <NextButton
            className="mt-16 w-1/3"
            onClick={handleClick}
            disabled={uploadedFiles.length > 0 ? false : true}
          >
            Przejdź dalej &gt;
          </NextButton>
        </Fragment>
      </main>
    </>
  );
}

export default UploadNoteFile;
