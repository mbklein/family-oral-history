'use client';

import dynamic from "next/dynamic";
import AudioMotionDisplay from "./components/AudioMotionDisplay";

const Viewer = dynamic(
  () => import("@samvera/clover-iiif").then((Clover) => Clover.Viewer),
  {
    ssr: false
  }
);

const displayProps = {
  ledBars: true,
  mode: 10,
  showPeaks: false,
  fillAlpha: 0,
  lineWidth: 2,
  reflexAlpha: 1,
  reflexRatio: 0.5,
  showScaleX: false,
  showScaleY: false,
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
      renderToggle: false,
    },
    showTitle: false,
  };

  return (
    <>
      <Viewer
        iiifContent={`${process.env.NEXT_PUBLIC_BASE_URL}/collection.json`}
        options={options}
        customDisplays={customDisplays}
        canvasIdCallback={console.log}
      />
    </>
  );
};

export default Page;
