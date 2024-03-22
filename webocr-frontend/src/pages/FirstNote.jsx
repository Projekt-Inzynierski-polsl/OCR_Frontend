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
`

const AcceptedFiles = styled.div`
    border: 1px solid #D1D5DB;
    padding: 2.5rem;
    border-radius: 10px;
    margin-top: 32px;
`

const NextButton = styled.button`
  background-color: #004423;
  color: #e9f7ee;
  font-family: "Space Grotesk";
  font-weight: bold;
  padding: 12px 96px;
  border-radius: 16px;
`;
function FirstNote() {
    return (
        <>
            <header>
                <Navbar></Navbar>
            </header>
            <main className="flex flex-col items-center">
                <FirstNoteHero className="py-16 w-full">
                    <h1 className="text-5xl font-bold">Dodaj pierwszą notatkę</h1>
                    <p className="max-w-3xl text-center mt-4 text-md">Przekonaj się, jak łatwe i przyjemne jest korzystanie z webOCR. Zacznijmy od utworzenia pierwszej notatki. Przeciągnij i upuść lub wybierz plik do wrzucenia, a system z użyciem AI rozpozna i zapisze tekst, który się tam znajduje.</p>
                </FirstNoteHero>
                <Dropzone></Dropzone>
                <AcceptedFiles className="w-1/3">
                    <div className="info-container flex flex-row items-center gap-4">
                        <img src="/image_icon.png" alt=""/>
                        <span className="flex flex-col">
                        <p className="font-bold text-lg">notatka.jpg</p>
                        <p className="text-sm">200 KB</p>
                    </span>
                    </div>
                </AcceptedFiles>
                <NextButton className="mt-16 w-1/3"> Przejdź dalej &gt;</NextButton>
            </main>

        </>
    )
}

export default FirstNote;