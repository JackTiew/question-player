"use client";

import React, { useRef } from "react";

const ProgressBar = (props) => {
  const {
    currentTime,
    duration,
    onProgressBarClick,
    togglePlayPause,
    isPlaying,
    chapters,
    onChapterClick,
  } = props;

  const progressBarRef = useRef(null);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div>
      <div
        ref={progressBarRef}
        onClick={(event) => onProgressBarClick(event, progressBarRef.current)}
        className="w-full h-[3px] bg-[#FFFFFF33] cursor-pointer"
      >
        <div
          className={`absolute h-[3px] bg-[#FFFFFF66]`}
          style={{
            width: `${(currentTime / duration) * 100}%`,
          }}
        />
        {chapters.map((chapter, index) => (
          <div
            key={index}
            title={chapter.title}
            onClick={(e) => {
              e.stopPropagation();
              onChapterClick(chapter.start, index);
            }}
            className="absolute h-[3px] w-[2px] bg-white cursor-pointer"
            style={{
              left: `${(chapter.start / duration) * 100}%`,
            }}
          />
        ))}
      </div>
      <div className="mt-[10px] flex items-center">
        <button onClick={togglePlayPause} className="w-[40px]">
          {isPlaying ? "||" : ">"}
        </button>
        <span>
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
