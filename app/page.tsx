/// <reference types="vite/client" />
import React from "react";
import AudioMotionDisplay from "./components/AudioMotionDisplay";
import { Viewer } from "@samvera/clover-iiif";

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
  showScaleY: false
};

const customDisplays = [
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

const Page = () => {
  const options = {
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
      renderToggle: false
    },
    showTitle: false
  };

  return (
    <>
      <Viewer
        iiifContent={`${import.meta.env.VITE_BASE_URL}/collection.json`}
        options={options}
        customDisplays={customDisplays}
      />
    </>
  );
};

export default Page;
