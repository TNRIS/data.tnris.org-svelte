
//////////BEGIN LAYER FUNCTIONS///////////////////////////////////////////////////////
// these functions generate mapbox layers dynamically based on the data passed      //
// to the function. The selected data in the collections view will change           //
// based on the area type a user has selected (quad, qquad, county etc)             //
//////////////////////////////////////////////////////////////////////////////////////

export const generateCollectionAreasLayer = (layerId: string, selections) => {
  return {
    id: `${layerId}`,
    source: `${layerId}`,
    type: "fill",
    paint: {
      "fill-color": [
        "case",
        [
          "boolean",
          [
            "in",
            ["get", "area_type_id"],
            ["literal", selections.map((v) => v.value)],
          ],
          false,
        ],
        "#888",
        "#fff",
      ],
      "fill-opacity": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        0.8,
        0.4,
      ],
      "fill-outline-color": "#444",
    },
  };
};

//////////END LAYER FUNCTIONS/////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////