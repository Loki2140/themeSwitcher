import React, { useState, useEffect, useContext, useCallback } from "react";
import styled from "@emotion/styled";
import { LayoutContext } from "../LayoutContext";
import Cookies from "js-cookie";
import SunIcon from "../icons/SunIcon";
import MoonIcon from "../icons/MoonIcon";

const Switcher = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 2fr 2fr;
  cursor: pointer;
  div {
    height: 24px;
    width: 24px;
    padding: 0 5px;
    svg {
      fill: var(--header-primary);
      text-align: center;
    }
  }
  @media (max-width: 767px) {
    flex-basis: 0;
    flex-direction: column;
    margin: 30px;
    div {
      height: 35px;
      width: 35px;
      padding: 0 5px;
    }
  }
`;

const ActiveThemeSelector = styled.div`
  position: absolute;
  top: 0;
  z-index: 1;
  border: 2px solid var(--header-secondary);
  transition: border 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  padding: 0 0;
  margin: 0 0;
  &:hover {
    border: 2px solid var(--header-primary);
  }
  &.auto {
    border-radius: 30px;
    width: 100%;
    left: 0;
  }
  &.light {
    border-radius: 50%;
    width: 50% !important;
    left: 50% !important;
  }

  &.dark {
    border-radius: 50%;
    width: 50% !important;
    left: 0 !important;
  }
  @media (max-width: 767px) {
  }
`;

enum Theme {
  auto,
  dark,
  light
}

export const ThemeSwitcher: React.FC = (props: any) => {
  const { setModeTheme } = useContext(LayoutContext);
  const [currentTheme, setCurrentTheme] = useState<number>(Theme.auto);

  useEffect(() => {
    if (document.cookie.match(/^(.*;)?\s*modeTheme\s*=\s*[^;]+(.*)?$/)) {
      const currentTheme = Number(Cookies.get("modeTheme"));
      setCurrentTheme(currentTheme);
      setModeTheme(Theme[currentTheme]);
    }
  }, []);

  const changeThemeMode = useCallback(
    (e: React.SyntheticEvent<HTMLDivElement>) => {
      const newIndex = currentTheme + 1 > 2 ? 0 : currentTheme + 1;
      setCurrentTheme(newIndex);
      setModeTheme(Theme[newIndex]);
      Cookies.set("modeTheme", newIndex.toString(), { expires: 1 });
    },
    [currentTheme, setModeTheme]
  );

  return (
    <Switcher onClick={changeThemeMode} className={Theme[currentTheme]}>
      <div>
        <MoonIcon />
      </div>
      <div>
        <SunIcon />
      </div>
      <ActiveThemeSelector className={Theme[currentTheme]} />
    </Switcher>
  );
};
