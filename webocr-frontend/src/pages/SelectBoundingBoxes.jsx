import Navbar from "../components/Navbar.jsx";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { Annotorious } from "@recogito/annotorious";
import "../common/AnnoMod.css";
import "@recogito/annotorious/dist/annotorious.min.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
const FirstNoteHero = styled.div`
  background-color: #bfe6ce;
  color: #374151;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
import Loader from "../components/Loader.jsx";
const NextButton = styled.button`
  background-color: #004423;
  color: #e9f7ee;
  font-family: "Space Grotesk";
  font-weight: bold;
  padding: 12px 96px;
  border-radius: 16px;
`;
import { useNavigate, useLocation } from "react-router-dom";
import api from "../APIService.js";
import Cookies from "js-cookie";
function SelectBoundingBoxes() {
  const [selectedTab, setSelectedTab] = useState("notatka");
  const imgEl = useRef();
  const [loaderActive, setLoaderActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [anno, setAnno] = useState();
  const { state } = useLocation();
  const { folderId, title, image, data } = state;
  const navigate = useNavigate();

  const formatter = (annotation) => {
    return "text";
  };

  useEffect(() => {
    let annotorious = null;

    if (imgEl.current) {
      annotorious = new Annotorious({
        image: imgEl.current,
        widgets: [],
        allowEmpty: true,
        disableEditor: true,
      });

      annotorious.on("createAnnotation", function (annotation) {
        annotation.annoType = "text";
        annotorious.formatters = [formatter];
      });
    }
    setAnno(annotorious);
    handleImage();
    return () => annotorious.destroy();
  }, []);

  const handleContinue = () => {
    const bboxData = []
    const bboxObj = {
      "boundingBoxes": bboxData
    }
    anno.getAnnotations().forEach((bbox) => {
      const value = bbox.target.selector.value.replace("xywh=pixel:", "").split(",");
      bboxData.push({
        coords: {
          x1: parseInt(value[0]),
          y1: parseInt(value[1]),
          x2: parseInt(value[0]) + parseInt(value[2]),
          y2: parseInt(value[1]) + parseInt(value[3]),
        }
      })
    });
    bboxObj.boundingBoxes = bboxData;
    if (bboxData.length !== 0) {
      data.append("boundingBoxes", JSON.stringify(bboxObj))
    setLoaderActive(true);
    api
      .post(`http://ocr-api:8080/api/noteFile`, data, {
        headers: {
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      })
      .then((response) => {
        navigate("/check-output", { state: { output: response.data, image: image, fileId: response.data.id, folderId: folderId, title: title} })
      })
      .catch((error) => {
        setLoaderActive(false);
      });
    }
    else {
      setErrorMessage("Nie zaznaczono żadnych obszarów.")
    }


    
      
  };

  const handleTabChange = (value) => {
    setSelectedTab(value);
    const newAnno = anno;
    newAnno.off("createAnnotation");
    newAnno.on("createAnnotation", function (annotation) {
      if (value === "notatka") {
        annotation.annoType = "text";
      } else {
        annotation.annoType = "img";
      }
    });
    newAnno.formatters = [
      (annotation) => {
        if (annotation.underlying.annoType) {
          if (annotation.underlying.annoType === "text") {
            return "text";
          } else {
            return "img";
          }
        } else {
          if (value === "notatka") {
            return "text";
          } else {
            return "img";
          }
        }
      },
    ];

    setAnno(newAnno);
  };

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
        {loaderActive ? (
          <Loader />
        ) : (
          <>
            <FirstNoteHero className="py-16 w-full">
              <h1 className="text-5xl font-bold">
                Zaznacz, co chcesz zachować
              </h1>
              <p className="max-w-3xl text-center mt-4 text-md">
                Twoja notatka została zeskanowana i przetworzona. Jeżeli to
                potrzebne, zaznacz na zdjęciu części tekstu i innych elementów.
              </p>
            </FirstNoteHero>
            <p className="text-xl mt-8 text-red-700 font-bold">{errorMessage}</p>
            <div className="bound-container border border-[#D1D5DB] w-4/5 mt-8">
              <img src={img} ref={imgEl} />
              <Tabs
                className="float-right mx-8 mt-2"
                value={selectedTab}
                onValueChange={handleTabChange}
              >
                <TabsList>
                  <TabsTrigger
                    className="data-[state=active]:bg-[#e9f7ee]"
                    value="notatka"
                  >
                    Notatka
                  </TabsTrigger>
                  <TabsTrigger
                    className="data-[state=active]:bg-[#e9f7ee]"
                    value="obrazek"
                  >
                    Obrazek
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="notatka"></TabsContent>
                <TabsContent value="obrazek"></TabsContent>
              </Tabs>
            </div>
            <NextButton className="mt-16 w-1/3" onClick={handleContinue}>
              Przejdź dalej &gt;
            </NextButton>
          </>
        )}
      </main>
    </>
  );
}

export default SelectBoundingBoxes;
