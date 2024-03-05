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
  mode: 6,
  showPeaks: false,
};

const Page = () => {
  const iiifContent = "/manifest.json";
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
      renderAbout: false,
      renderToggle: true
    }
  };
  return <Viewer iiifContent={iiifContent} options={options} />;
};

export default Page;
