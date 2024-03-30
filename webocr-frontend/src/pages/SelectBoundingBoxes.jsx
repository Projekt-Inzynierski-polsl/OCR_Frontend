import Navbar from "../components/Navbar.jsx";
import styled from "styled-components";
import { useEffect, useRef, useState } from 'react';
import { Annotorious } from '@recogito/annotorious';

import '@recogito/annotorious/dist/annotorious.min.css';

const FirstNoteHero = styled.div`
  background-color: #bfe6ce;
  color: #374151;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const NextButton = styled.button`
  background-color: #004423;
  color: #e9f7ee;
  font-family: "Space Grotesk";
  font-weight: bold;
  padding: 12px 96px;
  border-radius: 16px;
`;

function SelectBoundingBoxes() {
  const [selectedTab, setSelectedTab] = useState("notatka");
  const imgEl = useRef();
  const [ anno, setAnno ] = useState();
  const [createdAnnotations, setCreatedAnnotations] = useState([])
  useEffect(() => {
    let annotorious = null;

    if (imgEl.current) {
      annotorious = new Annotorious({
        image: imgEl.current,
        widgets: [],
        allowEmpty: true,
        disableEditor: true,
      });

      annotorious.on('createAnnotation', annotation => {
        console.log(annotation);
        setCreatedAnnotations([...createdAnnotations, {
          id: annotation.id,
          value: annotation.target.selector.value
        }])
        console.log(createdAnnotations);
      });
      
      // z nieznanych powodów, updateAnnotation usuwa boxa przy zmianie rozmiaru
      // dlatego musimy dodać go ponownie z innymi wartościami
      annotorious.on('updateAnnotation', (annotation) => {
        setCreatedAnnotations([...createdAnnotations, {
          id: annotation.id,
          value: annotation.target.selector.value
        }]);
      });

      annotorious.on('deleteAnnotation', annotation => {
        setCreatedAnnotations(createdAnnotations.filter(a => a.id !== annotation.id));
      });
    }
    setAnno(annotorious);
    return () => annotorious.destroy();
  }, []);

  const handleContinue = () => {
    console.log(createdAnnotations);
  }

  return (
    <>
      <header>
        <Navbar></Navbar>
      </header>
      <main className="flex flex-col items-center pb-16">
        <FirstNoteHero className="py-16 w-full">
          <h1 className="text-5xl font-bold">Zaznacz, co chcesz zachować</h1>
          <p className="max-w-3xl text-center mt-4 text-md">
            Twoja notatka została zeskanowana i przetworzona. Jeżeli to
            potrzebne, zaznacz na zdjęciu części tekstu i innych elementów.
          </p>
        </FirstNoteHero>
        <div className="bound-container border border-[#D1D5DB] w-60% mt-8">
          <img src="boxtest.png" alt="Example" ref={imgEl}/>
        </div>

        <NextButton className="mt-16 w-1/3"
          onClick={handleContinue}
        >
          Przejdź dalej &gt;
        </NextButton>
      </main>
    </>
  );
}

export default SelectBoundingBoxes;
