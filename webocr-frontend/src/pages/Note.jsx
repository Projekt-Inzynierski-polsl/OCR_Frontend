import styled from 'styled-components';
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const NoteBody = styled.div`
    font-family: 'Space Grotesk';
`

const BreadcrumbFolder = styled.span`
    display: flex;
    flex-direction: row;
    gap: 8px;
    color: #9CA3AF;
    align-items: center;
`

const NoteHeader = styled.h1`
    outline: none;
`

function Note() {
    return (
        <>
            <Navbar></Navbar>
            <main className="grid grid-cols-[385px_1fr]">
                <Sidebar></Sidebar>
                <NoteBody className="pl-16 pt-8">
                    <div className="notebody__top flex flex-row items-center justify-between mr-16">
                        <BreadcrumbPage>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbPage>
                                        <BreadcrumbFolder>
                                            <img src="/folder.png" alt=""/>
                                            <p>Przyroda</p>
                                        </BreadcrumbFolder>
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Testowy dokument o mitochondriach</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </BreadcrumbPage>
                        <div className="actions flex flex-row gap-4">
                            <button className="action flex flex-row gap-2 font-bold text-md hover:bg-neutral-200 p-3 items-center">
                                <img src="/download.png" alt=""/>
                                Eksportuj
                            </button>
                            <button className="action flex flex-row gap-2 font-bold text-md hover:bg-neutral-200 items-center p-2">
                                <img src="/share.png" alt=""/>
                                Udostępnij
                            </button>
                        </div>
                    </div>
                    <div className="notebody__text mt-8">
                        <NoteHeader className="font-bold text-4xl" contentEditable="true" spellCheck="false" placeholder="Nowa notatka">Testowy dokument o mitochodnirach</NoteHeader>
                        <div className="notebody__content focus:outline-none mt-8 mr-16" contentEditable="true">
                            Mitochondria, znane jako odgrywają kluczową rolę w energetyce komórkowej. W kontekście śląskiego węgla kamiennego, organelle te stają się centralnym elementem fascynującej historii losowości i determinizmu, splatającej się z geopolityką, technologią i ludzkimi dziejami. Zagłębie Górnośląskie, bogate w złoża węgla kamiennego, kształtowało  losy regionu od wieków. Eksploatacja rozpoczęła się na dużą skalę w XIX wieku, napędzając industrializację i urbanizację. Wraz z wydobyciem  węgla wydobywano również skały płonne, zawierające mitochondria. W dwudziestoleciu międzywojennym nastąpił rozkwit badań nad mitochondriami. Naukowcy z różnych krajów, w tym ze Śląska, odkrywali ich strukturę, funkcje i znaczenie dla życia. Jednakże, niepewność  polityczna i nadchodząca wojna przerwały te pionierskie badania. Podczas II wojny światowej Górny Śląsk znalazł się pod okupacją niemiecką. Górnictwo kontynuowano, ale w sposób rabunkowy, bez dbałości o środowisko i ludzi. Badania naukowe zostały wstrzymane, a wiele cennych materiałów badawczych uległo zniszczeniu. Po zakończeniu wojny Górny Śląsk znalazł się w granicach Polski Ludowej.  Nowe władze stawiały na odbudowę przemysłu i intensyfikację wydobycia węgla. Wznowiono również badania naukowe, w tym nad mitochondriami.  Jednakże, centralnie planowana gospodarka i ograniczenia technologiczne  hamowały postęp. Mitochondria w śląskim węglu kamiennym podlegały losowemu rozkładowi.  Ich ilość i rozmieszczenie zależało od wielu czynników, takich jak geologia złoża, sposób wydobycia i przeróbki węgla. Determinizm odgrywał również rolę, ponieważ geny mitochondriów determinowały ich funkcje i cechy.
                        </div>
                    </div>
                </NoteBody>
            </main>
        </>
    )
}

export default Note;


