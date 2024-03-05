/* eslint-disable react/display-name */

import AudioMotionAnalyzer, { ConstructorOptions } from "audiomotion-analyzer";
import React, { useCallback, useState, forwardRef } from "react";
import { AudioVisualizerBase } from "@samvera/clover-iiif"


const defaultProps: ConstructorOptions = {
  showScaleX: false,
  showScaleY: false
}

const AudioMotionVisualizer = forwardRef<HTMLVideoElement, ConstructorOptions>(
  (props, ref) => {
    const castRef = ref as React.RefObject<HTMLVideoElement>;
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [analyzer, updateAnalyzer] = useState(
      null as unknown as AudioMotionAnalyzer
    );

    const audioVisualizer = useCallback(() => {
      if (analyzer) analyzer.destroy();
      const source = castRef.current as HTMLMediaElement;
      const newAnalyzer = new AudioMotionAnalyzer(
        containerRef.current as HTMLElement,
        { ...defaultProps, ...props, source }
      );
      updateAnalyzer(newAnalyzer);
    }, [analyzer, containerRef, props, castRef]);

    React.useEffect(() => {
      if (!castRef || !castRef.current) return;
      castRef.current.onplay = audioVisualizer;
    }, [audioVisualizer, castRef]);

    return (
      <div
        id="audio-visualizer"
        ref={containerRef}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: "0"
        }}
      />
    );
  }
);

export default AudioMotionVisualizer as AudioVisualizerBase;
