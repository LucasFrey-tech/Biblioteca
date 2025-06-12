import React, { useState } from "react";
import Styles from "./styles.module.css";
import { TiChevronLeft } from "react-icons/ti";

export function ChaptersSideBar(chapters: string[] ):React.JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <div className={`${Styles.sidebar} ${open ? Styles.open : ""}`}>
      <div className={Styles.sidebarToggle} onClick={() => setOpen((prev) => !prev)}>
        <TiChevronLeft style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.3s" }} />
      </div>
      <div className={`${Styles.sidebarContent} ${open ? Styles.open : ""}`}>
        {chapters.map((chapter, index) => (
          <div key={index} className={Styles.chapter}>
            <a className={Styles.chapterHeader} href={`#chapter-${index + 1}`}>{chapter}</a>
            <hr/>
          </div>
        ))}
      </div>
    </div>
  );
}