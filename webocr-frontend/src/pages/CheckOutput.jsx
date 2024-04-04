import Navbar from "../components/Navbar.jsx";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { Annotorious } from "@recogito/annotorious";
import '../common/AnnoMod.css'

import "@recogito/annotorious/dist/annotorious.min.css";

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

function CheckOutput() {
  const [selectedBoxId, setSelectedBoxId] = useState("");
  const imgEl = useRef();
  const [textBoxes, setTextBoxes] = useState([
    {
      id: "#203170be-17d2-4aea-af37-e386bd13e521",
      content: "text",
    },
  ]);
  const [anno, setAnno] = useState();
  useEffect(() => {
    let annotorious = null;

    if (imgEl.current) {
      annotorious = new Annotorious({
        image: imgEl.current,
        widgets: [],
        allowEmpty: true,
        disableEditor: true,
        readOnly: true,
      });

      annotorious.on("mouseEnterAnnotation", function (annotation, element) {
        element.childNodes.forEach((child) => {
          child.style.fill = "rgba(25,48,96,.1)";
          child.style.stroke = "transparent";
        });
        setSelectedBoxId(annotation.id);
      });

      annotorious.on("mouseLeaveAnnotation", function (annotation, element) {
        element.childNodes.forEach((child) => {
          child.style.fill = "transparent";
          child.style.stroke = "#000000b3";
        });
        setSelectedBoxId("");
      });

      // todo: write endpoint call to get annotations

      annotorious.addAnnotation({
        "@context": "http://www.w3.org/ns/anno.jsonld",
        type: "Annotation",
        body: [],
        target: {
          source: "http://localhost:5173/boxtest.png",
          selector: {
            type: "FragmentSelector",
            conformsTo: "http://www.w3.org/TR/media-frags/",
            value: "xywh=pixel:50,50,800,150",
          },
        },
        id: "#203170be-17d2-4aea-af37-e386bd13e521",
      });
    }
    setAnno(annotorious);
    return () => annotorious.destroy();
  }, []);

  const handleEdit = (textBoxId, content) => {
    // todo: write endpoint call to create scan error

    const txtBoxes = [...textBoxes];
    const txtBox = txtBoxes.find((box) => box.id === textBoxId);
    txtBox.content = content;
    setTextBoxes(txtBoxes);
  }

  return (
    <>
      <header>
        <Navbar></Navbar>
      </header>
      <main className="flex flex-col items-center pb-16">
        <FirstNoteHero className="py-16 w-full">
          <h1 className="text-5xl font-bold">
            Sprawdź i popraw zeskanowany tekst
          </h1>
          <p className="max-w-3xl text-center mt-4 text-md">
            Twoja notatka została zeskanowana i przetworzona. Jeżeli to
            potrzebne, zaznacz na zdjęciu części tekstu i innych elementów.
          </p>
        </FirstNoteHero>
        <div className="bound-container border border-[#D1D5DB] mt-8 flex flex-row w-[90%]">
          <img src="boxtest.png" alt="Example" ref={imgEl} />
          <div className="border border-[#D1D5DB] p-8 w-1/2">
            {textBoxes.map((textBox) => (
              <div className="text">
                <div
                  key={textBox.id}
                  className={`w-fit px-4 border border-2 ${selectedBoxId === textBox.id ? "border-black" : "border-transparent"}`}
                  contentEditable="true"
                  onMouseOver={() => {
                    anno.selectAnnotation(textBox.id);
                    setSelectedBoxId(textBox.id);
                  }}
                  onMouseOut={() => {
                    anno.cancelSelected();
                    setSelectedBoxId("");
                  }}
                  onBlur={(e) => handleEdit(textBox.id, e.target.innerText)}
                  >
                  {textBox.content}
                </div>
              </div>
            ))}
          </div>
        </div>

        <NextButton className="mt-16 w-1/3">Przejdź dalej &gt;</NextButton>
      </main>
    </>
  );
}

export default CheckOutput;
