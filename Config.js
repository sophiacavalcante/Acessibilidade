import React, {
  createContext,
  useContext,
  useState,
} from 'react';

const ConfigContext = createContext();

export function ConfigProvider({ children }) {
  const [fontSize, setFontSize] =
    useState(16);

  const [altoContraste, setAltoContraste] =
    useState(false);

  const [modoDaltonico, setModoDaltonico] =
    useState(false);

  return (
    <ConfigContext.Provider
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
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  return useContext(ConfigContext);
}