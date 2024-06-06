'use client';

import dynamic from "next/dynamic";
import AudioMotionVisualizer from './components/AudioMotionVisualizer';
import { ConstructorOptions } from "audiomotion-analyzer";

const Viewer = dynamic(
  () => import("@samvera/clover-iiif").then((Clover) => Clover.Viewer),
  {
    ssr: false
  }
);

const vizOptions: ConstructorOptions = {
  ledBars: true,
  mode: 10,
  showPeaks: false,
  fillAlpha: 0,
  lineWidth: 2,
  reflexAlpha: 1,
  reflexRatio: 0.5
};

const Page = () => {
  const iiifContent =
    `${process.env.NEXT_PUBLIC_BASE_URL}/manifest.json`;
  const options = {
    audioVisualizer: {
      component: AudioMotionVisualizer,
      props: vizOptions
    },
    showIIIFBadge: false,
    informationPanel: {
      open: true,
      vtt: {
        autoScroll: { enabled: true, settings: { behavior: "smooth", block: "center" } },
      },
      renderAbout: true,
      renderAnnotation: true,
      renderToggle: true
    }
  };
  return <Viewer iiifContent={iiifContent} options={options} />;
};

export default Page;
