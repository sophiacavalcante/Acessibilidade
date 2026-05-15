import React, { createContext, useState } from 'react';

export const AccessibilityContext = createContext();

export function AccessibilityProvider({ children }) {

  const [fontSize, setFontSize] = useState(16);

  const [altoContraste, setAltoContraste] = useState(false);

  const [modoDaltonico, setModoDaltonico] = useState(false);

  return (

    <AccessibilityContext.Provider
      value={{
        fontSize,
        setFontSize,

        altoContraste,
        setAltoContraste,

        modoDaltonico,
        setModoDaltonico,
      }}
    >

      {children}

    </AccessibilityContext.Provider>

  );
}