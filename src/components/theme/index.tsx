import { useEffect, type ReactNode } from "react";
import { THEME } from "./theme";

export interface ThemeProps {
  children: React.ReactNode;
}

export const Theme = ({ children }: Readonly<ThemeProps>): ReactNode => {
  useEffect(() => {
    const stylesheet = new CSSStyleSheet();

    stylesheet.insertRule(
      `:root { ${Object.entries(THEME)
        .map(([key, value]) => `--${key}: ${value};`)
        .join(" ")} } `,
    );

    document.adoptedStyleSheets = [...document.adoptedStyleSheets, stylesheet];

    return () => {
      document.adoptedStyleSheets = document.adoptedStyleSheets.filter((i) => i !== stylesheet);
    };
  }, []);

  return children;
};
