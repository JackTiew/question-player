"use client";

import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import ProgressBar from "./ProgressBar";
import Modal from "./Modal";

const VideoPlayer = (props) => {
  const { source } = props;
  const playerRef = useRef(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const chapters = [
    { start: 5, title: "Chapter Test 1" },
    { start: 10, title: "Chapter Test 2" },
    { start: 60, title: "Chapter 1" },
    { start: 120, title: "Chapter 2" },
    { start: 180, title: "Chapter 3" },
    { start: 240, title: "Chapter 4" },
    { start: 300, title: "Chapter 5" },
    { start: 360, title: "Chapter 6" },
    { start: 420, title: "Chapter 7" },
    { start: 480, title: "Chapter 8" },
    { start: 540, title: "Chapter 9" },
    { start: 600, title: "Chapter 10" },
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleProgress = (progress) => {
    setCurrentTime(progress.playedSeconds);

    const currentChapterStart = chapters[currentChapterIndex].start;
    if (progress.playedSeconds >= currentChapterStart) {
      setIsPlaying(false);
      setIsModalVisible(true);

      if (currentChapterIndex < chapters.length - 1) {
        setCurrentChapterIndex(currentChapterIndex + 1);
      }
    }
  };

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  const handleChapterClick = (start, index) => {
    if (playerRef.current) {
      playerRef.current.seekTo(start, "seconds");
      setIsPlaying(true);
      setCurrentChapterIndex(index);
    }
  };

  const handleProgressBarClick = (event, progressBar) => {
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = event.clientX - rect.left;
    const clickPercentage = clickPosition / rect.width;
    const newTime = clickPercentage * duration;
    if (playerRef.current) {
      playerRef.current.seekTo(newTime, "seconds");
      setIsPlaying(true);

      const newChapterIndex = chapters.findIndex(
        (chapter, index) =>
          newTime >= chapter.start &&
          (index === chapters.length - 1 || newTime < chapters[index + 1].start)
      );
      setCurrentChapterIndex(newChapterIndex);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setIsPlaying(true);
  };

  return (
    <div className="relative w-[800px] h-[600px]">
      {isClient && (
        <>
          <ReactPlayer
            ref={playerRef}
            url={source}
            width="100%"
            height="100%"
            onProgress={handleProgress}
            onDuration={handleDuration}
            controls={false}
            playing={isPlaying}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
          <div
            className="absolute top-0 left-0 w-full h-full bg-transparent cursor-default"
            onClick={togglePlayPause}
          />
        </>
      )}
      <ProgressBar
        currentTime={currentTime}
        duration={duration}
        onProgressBarClick={handleProgressBarClick}
        togglePlayPause={togglePlayPause}
        isPlaying={isPlaying}
        chapters={chapters}
        onChapterClick={handleChapterClick}
      />
      <Modal
        isVisible={isModalVisible}
        onClose={closeModal}
        chapterTitle={chapters[currentChapterIndex]?.title}
      />
    </div>
  );
};

export default VideoPlayer;
