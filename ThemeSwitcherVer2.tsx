import React, { useState, useEffect, useContext, useCallback } from "react";
import styled from "@emotion/styled";
import { LayoutContext } from "../LayoutContext";
import Cookies from "js-cookie";
import YinYangIcon from "../icons/YinYangIcon";
import SunIcon from "../icons/SunIcon";
import MoonIcon from "../icons/MoonIcon";

const Switcher = styled.div`
  position: absolute;
  left: 50%;
  margin: 10px 0;
  margin-left: -50px;
  padding: 10px 2px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  @media (max-width: 950px) {
    left: 40%;
  }
  @media (max-width: 767px) {
    left: 60%;
  }

  button {
    position: relative;
    padding: 0;
    border: 0;
    margin: 0;
    background: none;
    width: 32px;
    height: 32px;
    svg {
      transform: scale(1.4);
      -ms-transform: scale(1.4);
      -webkit-transform: scale(1.4);
    }
    &.active::after,
    &:active::after,
    &:hover::after {
      left: 5px;
      right: 5px;
    }

    &::after {
      content: "";
      position: absolute;
      left: 50%;
      right: 50%;
      bottom: 0;
      background-color: var(--header-secondary);
      height: 2px;
      transition: left 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55),
        right 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
  }
`;

export const ThemeSwitcher: React.FC = (props: any) => {
  const { modeTheme, setModeTheme } = useContext(LayoutContext);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, [modeTheme]);

  const changeThemeMode = useCallback(
    (e: React.SyntheticEvent<HTMLButtonElement>) => {
      const curentTheme = e.currentTarget.value;
      setModeTheme(curentTheme);
      if (curentTheme === "auto") {
        return Cookies.remove("modeTheme");
      }
      Cookies.set("modeTheme", curentTheme.toString(), { expires: 1 });
    },
    [setModeTheme]
  );

  return (
    <>
      {mounted && (
        <Switcher>
          <button
            className={modeTheme === "light" ? "active" : ""}
            name="color-scheme"
            value="light"
            aria-label="Light"
            onClick={changeThemeMode}
          >
            <SunIcon />
          </button>
          <button
            className={modeTheme === "auto" ? "active" : ""}
            name="color-scheme"
            value="auto"
            aria-label="System"
            onClick={changeThemeMode}
          >
            <YinYangIcon />
          </button>
          <button
            className={modeTheme === "dark" ? "active" : ""}
            name="color-scheme"
            value="dark"
            aria-label="Dark"
            onClick={changeThemeMode}
          >
            <MoonIcon />
          </button>
        </Switcher>
      )}
    </>
  );
};
