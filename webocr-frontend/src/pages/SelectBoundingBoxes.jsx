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

function SelectBoundingBoxes() {
  const [selectedTab, setSelectedTab] = useState("notatka");
  const imgEl = useRef();
  const [loaderActive, setLoaderActive] = useState(false);
  const [anno, setAnno] = useState();
  const { state } = useLocation();
  const { noteId, image } = state;
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
    anno.getAnnotations().forEach((bbox) => {
      console.log(bbox.target.selector.value);
      console.log(bbox.annoType);
    });
    setLoaderActive(true);
    // get output from API
    navigate("/check-output", { state: { output: [] } })
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
  }

  

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
            <div className="bound-container border border-[#D1D5DB] w-60% mt-8">
              <img src={img} alt="Example" ref={imgEl} />
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
