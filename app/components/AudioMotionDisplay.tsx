import AudioMotionAnalyzer, { ConstructorOptions } from "audiomotion-analyzer";
import { LabeledIIIFExternalWebResource, ViewerContextStore } from "@samvera/clover-iiif";
import { useEffect, useRef, useState } from "react";

type AudioMotionProps = {
  id: string;
  annotationBody: LabeledIIIFExternalWebResource;
  hooks: {
    useViewerState: () => ViewerContextStore;
    useViewerDispatch: () => (value: unknown) => void;
  };
}

const defaultProps: ConstructorOptions = {
  showScaleX: false,
  showScaleY: false
};

export default function AudioMotionDisplay({id, annotationBody, hooks, ...props}: AudioMotionProps) {
  const playerRef = useRef<HTMLAudioElement>(null);
  const analyzerRef = useRef<AudioMotionAnalyzer | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { useViewerDispatch } = hooks;
  const dispatch = useViewerDispatch();
  
  useEffect(() => {
    if (!playerRef.current || !containerRef.current || analyzerRef.current) return;

    const newAnalyzer = new AudioMotionAnalyzer(
      document.getElementById("audio-motion-display") as HTMLDivElement,
      {
        source: playerRef.current,
        ...defaultProps,
        ...props
      }
    );
    analyzerRef.current = newAnalyzer;

    dispatch({
      type: "updateActivePlayer",
      player: playerRef.current
    });

  }, [analyzerRef, containerRef, dispatch, id, annotationBody, playerRef, props, hooks]);
  
  return (
    <div id="audio-motion-container" ref={containerRef}>
      <div id="audio-motion-display"></div>
      <audio
        id="audio-motion-audio"
        ref={playerRef}
        src={annotationBody.id}
        controls
        controlsList="nodownload"
      ></audio>
    </div>
  );
}