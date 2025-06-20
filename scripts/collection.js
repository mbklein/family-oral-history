async function buildCollection(baseUrl, rootDir) {
  const result = {
    "@context": "http://iiif.io/api/presentation/3/context.json",
    id: `${baseUrl}/collection`,
    type: "Collection",
    label: { en: ["Klein Family Oral History Recordings"] },
    summary: { en: ["Short summary of the Collection"] },

    items: [
      {
        id: `${baseUrl}/sam_klein.json`,
        type: "Manifest",
        label: { en: ["Sam Klein"] },
        thumbnail: [
          {
            id: `${baseUrl}/assets/img/sam_klein/thumbnail_01.jpg`,
            type: "Image",
            format: "image/jpeg"
          }
        ]
      },
      {
        id: `${baseUrl}/bea_bass.json`,
        type: "Manifest",
        label: { en: ["Beatty Bass"] },
        thumbnail: [
          {
            id: `${baseUrl}/assets/img/bea_bass/thumbnail_01.jpg`,
            type: "Image",
            format: "image/jpeg"
          }
        ]
      }
    ]
  };

  return JSON.stringify(result, null, 2);
}

export default buildCollection;