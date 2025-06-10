'use client';

import dynamic from "next/dynamic";
import { ConstructorOptions } from "audiomotion-analyzer";

const Viewer = dynamic(
  () => import("@samvera/clover-iiif").then((Clover) => Clover.Viewer),
  {
    ssr: false
  }
);

const Page = () => {
  const iiifContent =
    `${process.env.NEXT_PUBLIC_BASE_URL}/manifest.json`;
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
      defaultTab:
        `${process.env.NEXT_PUBLIC_BASE_URL}/manifest.json/volume-1/side-1/annotation-vtt-page`
    }
  };
  return (
    <>
      <Viewer iiifContent={iiifContent} options={options} />
    </>
  );
};

export default Page;
