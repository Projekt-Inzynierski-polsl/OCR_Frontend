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
                
                <NextButton className="mt-16 w-1/3"> Przejdź dalej &gt;</NextButton>
            </main>

        </>
    )
}

export default FirstNote;