import { createContext, useCallback, useContext, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorageState"
const ThemeContext = createContext();
//eslint-disable-next-line
export function ThemeSwitch({ children }) {
      const [theme, setTheme] = useLocalStorage({ key: "theme", initialValue: window.matchMedia("(prefers-color-scheme: dark-mode)").matches })
      const setToLight = useCallback(() => { setTheme("light-mode") }, [setTheme])
      const setToDark = useCallback(() => { setTheme("dark-mode") }, [setTheme])
      const switchTheme = () => {
            if (theme === "light-mode") {
                  setToDark();
            }
            else {
                  setToLight();
            }
      }
      useEffect(function () {
            if (theme === "light-mode") {
                  document.documentElement.classList.remove("dark-mode");
                  document.documentElement.classList.add("light-mode");
            }
            else {
                  document.documentElement.classList.add("dark-mode");
                  document.documentElement.classList.remove("light-mode");
            }
      }, [theme])
      const values = { theme, setToDark, setToLight, switchTheme }

      return <ThemeContext.Provider value={values}>
            {children}
      </ThemeContext.Provider>
}

export function useThemeSwitch() {
      const themeSwitchContext = useContext(ThemeContext);
      if (ThemeContext === undefined) {
            throw Error("out of themeSwitchContext.")
      }
      return themeSwitchContext;
}