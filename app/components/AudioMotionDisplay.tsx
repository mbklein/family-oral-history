import React from "react";
import AudioMotionAnalyzer, { ConstructorOptions } from "audiomotion-analyzer";
import {
  LabeledIIIFExternalWebResource,
  ViewerContextStore
} from "@samvera/clover-iiif";
import { useEffect, useRef } from "react";

type AudioMotionProps = {
  id: string;
  annotationBody: LabeledIIIFExternalWebResource;
  hooks: {
    useViewerState: () => ViewerContextStore;
    useViewerDispatch: () => (value: unknown) => void;
  };
};

const defaultProps: ConstructorOptions = {
  showScaleX: false,
  showScaleY: false
};

export default function AudioMotionDisplay({
  id,
  annotationBody,
  hooks,
  ...props
}: AudioMotionProps) {
  const playerRef = useRef<HTMLAudioElement>(null);
  const analyzerRef = useRef<AudioMotionAnalyzer | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const displayRef = useRef<HTMLDivElement>(null);
  const { useViewerDispatch } = hooks;
  const dispatch = useViewerDispatch();

  useEffect(() => {
    console.log("Entering useEffect for AudioMotionDisplay with id:", id);
    if (
      !playerRef.current ||
      !containerRef.current ||
      !displayRef.current ||
      analyzerRef.current
    )
      return;

    analyzerRef.current = new AudioMotionAnalyzer(displayRef.current, {
      source: playerRef.current,
      ...defaultProps,
      ...props
    });

    dispatch({
      type: "updateActivePlayer",
      player: playerRef.current
    });
  }, [dispatch, id, annotationBody, props, hooks]);

  return (
    <div id="audio-motion-container" ref={containerRef}>
      <div id="audio-motion-display" ref={displayRef}></div>
      <audio
        id="audio-motion-audio"
        ref={playerRef}
        src={annotationBody.id}
        controls
        controlsList="nodownload"
        onPlay={() => analyzerRef.current?.audioCtx.resume()}
      ></audio>
    </div>
  );
}
