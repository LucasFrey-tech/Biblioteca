import React from "react";
import Styles from "./styles.module.css";
export function ChaptersSideBar(chapters: string[]): React.JSX.Element {
  
  return (
    <div className="sidebar">
        <div className="sidebar-right">
            <div className="sidebar-toggle">
                <button className="toggle-button">Toggle Chapters</button>
            </div>
        </div>
        <div className="sidebar-content">
            {
                chapters.map((chapter, index) => (
                <div key={index} className="chapter-header">
                    <a href={`#chapter-${index + 1}`}>{chapter}</a>
                </div>
                ))
            }
        </div>
    </div>
  );
}