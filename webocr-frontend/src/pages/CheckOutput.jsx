import Navbar from "../components/Navbar.jsx";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { Annotorious } from "@recogito/annotorious";
import '../common/AnnoMod.css'
import api from "../APIService.js";
import Cookies from "js-cookie";
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

import { useNavigate, useLocation } from 'react-router-dom'

function CheckOutput() {
  const [selectedBoxId, setSelectedBoxId] = useState("");
  const imgEl = useRef();
  const navigate = useNavigate();
  const {state} = useLocation();
  const { output, image, fileId, folderId, title } = state;
  const [textBoxes, setTextBoxes] = useState([]);
  
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
      const txtBoxes = [...textBoxes];
      output.boundingBoxes.forEach((box) => {
        box.lines.forEach((line) => {
          let val = "xywh=pixel:";
          let lx = box.leftX + line.leftX;
          let ly = box.leftY + line.leftY;
          let rx = box.leftX + line.rightX;
          let ry = box.leftY + line.rightY;
          let w = rx-lx;
          let h = ry-ly;
          let lineId = Math.floor(Math.random() * 15000);
          val += lx + "," + ly + "," + w + "," + h
          annotorious.addAnnotation({
            "@context": "http://www.w3.org/ns/anno.jsonld",
            type: "Annotation",
            body: [],
            target: {
              source: "http://localhost:5173/boxtest.png",
              selector: {
                type: "FragmentSelector",
                conformsTo: "http://www.w3.org/TR/media-frags/",
                value: val,
              },
            },
            id: lineId,
          });
          
          txtBoxes.push({
            id: lineId,
            content: line.content,
          })
          
        });
      });
      setTextBoxes(txtBoxes.reverse());
    }
    handleImage();
    setAnno(annotorious);
    return () => annotorious.destroy();
  }, []);

  const handleEdit = (textBoxId, content) => {
    const txtBoxes = [...textBoxes];
    const txtBox = txtBoxes.find((box) => box.id === textBoxId);
    const coords = anno.getAnnotationById(txtBox.id).target.selector.value.replace("xywh=pixel:", "").split(",");

    api
      .post(`https://ocr-api:8080/api/ocrError`, {
        fileId: fileId,
        wrongContent: txtBox.content,
        correctContent: content,
        leftX: parseInt(coords[0]),
        leftY: parseInt(coords[1]),
        rightX: parseInt(coords[0]) + parseInt(coords[2]),
        rightY: parseInt(coords[1]) + parseInt(coords[3]),
      }, {
        headers: {
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      })
      .then((response) => {
        txtBox.content = content;
        setTextBoxes(txtBoxes);
      });
  }

  const handleNextStep = () => {
    let content = textBoxes.map((box) => box.content).join(" ");
    api
      .post(`https://ocr-api:8080/api/user/note`, {
        folderId: folderId,
        noteFileId: fileId,
        name: title,
        content: content,
        isPrivate: true,
        categoriesIds: [],  
      }, {
        headers: {
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      })
      .then((response) => {
        navigate(`/notes/${response.data}`, { state: { noteId: response.data } });
      });
    
  }

  const [img, setImg] = useState(null);

  const handleImage = () => {
    const selected = image;
    const imgUrl = URL.createObjectURL(selected);
    setImg(imgUrl);
  };

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
          <img src={img} ref={imgEl} />
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

        <NextButton className="mt-16 w-1/3" onClick={handleNextStep}>Przejdź dalej &gt;</NextButton>
      </main>
    </>
  );
}

export default CheckOutput;
