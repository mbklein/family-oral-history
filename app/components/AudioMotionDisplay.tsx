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
  const [annotationPanel, setAnnotationPanel] = useState<boolean>(false);
  const playerRef = useRef<HTMLVideoElement>(null);
  const { useViewerDispatch } = hooks;
  const [analyzer, setAnalyzer] = useState<AudioMotionAnalyzer | null>(null);
  const dispatch = useViewerDispatch();
  
  useEffect(() => {
    if (!playerRef.current) return;

    if (!analyzer) {
      const newAnalyzer = new AudioMotionAnalyzer(
        document.getElementById("audio-motion-display") as HTMLDivElement,
        {
          source: playerRef.current,
          ...defaultProps,
          ...props
        }
      );
      setAnalyzer(newAnalyzer);
      dispatch({
        type: "updateActivePlayer",
        player: playerRef.current
      });
    }
  }, [analyzer, dispatch, id, annotationBody, playerRef, props, hooks]);
  
  return (
    <div id="audio-motion-container">
      <div id="audio-motion-display"></div>
      <audio
        id="audio-motion-audio"
        ref={playerRef}
        src={annotationBody.id}
        controls
      ></audio>
    </div>
  );
}