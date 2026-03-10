/// <reference types="vite/client" />
import React from "react";
import AudioMotionDisplay from "./components/AudioMotionDisplay";
import Viewer, { useViewerState } from "@samvera/clover-iiif/viewer";

const sm = "(max-width: 767px)";

const displayProps = {
  ledBars: true,
  mode: 10,
  showPeaks: false,
  fillAlpha: 0,
  lineWidth: 2,
  minFreq: 20,
  maxFreq: 12000,
  reflexAlpha: 1,
  reflexRatio: 0.5,
  showScaleX: false,
  showScaleY: false,
  showAnalyzer: true
};

const initialCustomDisplays = [
  {
    display: {
      component: AudioMotionDisplay,
      componentProps: displayProps
    },
    target: {
      paintingFormat: ["audio/mpeg"]
    }
  }
];

const cloverOptions = {
  showIIIFBadge: false,
  informationPanel: {
    open: true,
    vtt: {
      autoScroll: {
        enabled: true,
        settings: { behavior: "smooth", block: "center" }
      }
    },
    defaultTab: "manifest-annotations",
    renderAbout: false,
    renderAnnotation: true,
    renderToggle: false
  },
  showTitle: false
};

const Content = ({ small }: { small: boolean }) => {
  let content;
  if (small) {
    content = (
      <>
        <div className={"viewer-main"}>
          <Viewer.InformationPanel />
          <Viewer.Painting />
        </div>
        <div className="viewer-navigator">
          <Viewer.Navigator />
        </div>
      </>
    );
  } else {
    content = (
      <div className={"viewer-main"}>
        <Viewer.Content />
      </div>
    );
  }
  return content;
};

const Page = () => {
  const mql = React.useMemo(() => window.matchMedia(sm), []);
  const [isSmallViewport, setIsSmallViewport] = React.useState(mql.matches);
  React.useEffect(() => {
    const handler = (e: MediaQueryListEvent) => setIsSmallViewport(e.matches);
    mql.addEventListener("change", handler);
    return () => {
      mql.removeEventListener("change", handler);
    };
  }, [mql]);

  const [customDisplays, setCustomDisplays] = React.useState(
    initialCustomDisplays
  );

  React.useEffect(() => {
    setCustomDisplays((prev) => {
      const newDisplays = [...prev];
      newDisplays[0].display.componentProps.showAnalyzer = !isSmallViewport;
      return newDisplays;
    });
  }, [isSmallViewport]);

  return (
    <div className="viewer-container">
      <Viewer.Root
        iiifContent={`${import.meta.env.VITE_BASE_URL}/collection.json`}
        options={{ ...cloverOptions, canvasHeight: "auto" }}
        customDisplays={customDisplays}
      >
        <Viewer.Header />
        <Content small={isSmallViewport} />
      </Viewer.Root>
    </div>
  );
};

export default Page;
