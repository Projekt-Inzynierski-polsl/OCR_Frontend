import React, { Fragment, useEffect, useState } from "react";
import { FallingLines } from "react-loader-spinner";

export const Loader = ({ className }) => {
  return (
    <Fragment>
    <h1 className="mt-32 text-5xl text-center lg:text-left font-bold mb-4">Trwa przetwarzanie...</h1>
    <p className="mt-4 text-xl mb-6 text-center lg:text-left">Twoja notatka jest teraz analizowana przez naszą sieć. Za chwilę będziesz mógł sprawdzić poprawność skanowania.</p>
    <FallingLines
      color="#4fa94d"
      width="168"
      visible={true}
      ariaLabel="falling-circles-loading"
    />
  </Fragment>
  )
};

export default Loader;
