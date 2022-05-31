const filterMarkers = (event: React.MouseEvent<HTMLButtonElement>) => {
  if (!initialMapData) {
    return;
  } else if ((event.target as HTMLButtonElement).value === "Free") {
    // DEACTIVATE
    if (selectedFilter === "Swap") {
      setSelectedFilter("all"); // swap comes back in
      setMapData(initialMapData);
      resetAndSetMarkers(initialMapData);
      setActivateFree("secondary");
      // ACTIVATE
    } else if (selectedFilter === "all") {
      const filteredMarkersArr: Feature[] = initialMapData?.features.filter(
        (feature) => feature.type === "SWAP"
      );
      setSelectedFilter("Swap");
      const updatedMapData: MapData = {
        ...initialMapData,
        features: filteredMarkersArr,
      };
      setMapData(() => updatedMapData);
      resetAndSetMarkers(updatedMapData);
      setActivateFree("primary");
      // DEACTIVATE BOTH
    } else if (activateFree === "secondary" && activateSwap === "primary") {
      setSelectedFilter("none");
      const filteredMarkersArr: Feature[] = [];
      const updatedMapData: MapData = {
        ...initialMapData,
        features: filteredMarkersArr,
      };
      resetAndSetMarkers(updatedMapData);
      setActivateFree("primary");
      // ACTIVATE after full deactivation
    } else if (selectedFilter === "none") {
      const filteredMarkersArr: Feature[] = initialMapData?.features.filter(
        (feature) => feature.type === "FREE"
      );
      setSelectedFilter("Free");
      const updatedMapData: MapData = {
        ...initialMapData,
        features: filteredMarkersArr,
      };
      setMapData(() => updatedMapData);
      resetAndSetMarkers(updatedMapData);
      setActivateFree("secondary");
    }
    console.log(mapRef, location);
  } else if ((event.target as HTMLButtonElement).value === "Swap") {
    // DEACTIVATE
    if (selectedFilter === "Free") {
      setSelectedFilter("all"); // free comes back in
      setMapData(initialMapData);
      resetAndSetMarkers(initialMapData);
      setActivateSwap("secondary");
      // ACTIVATE
    } else if (selectedFilter === "all") {
      const filteredMarkersArr: Feature[] = initialMapData?.features.filter(
        (feature) => feature.type === "FREE"
      );
      setSelectedFilter("Free");
      const updatedMapData: MapData = {
        ...initialMapData,
        features: filteredMarkersArr,
      };
      setMapData(() => updatedMapData);
      resetAndSetMarkers(updatedMapData);
      setActivateSwap("primary");
      // DEACTIVATE BOTH
    } else if (activateFree === "primary" && activateSwap === "secondary") {
      setSelectedFilter("none");
      const filteredMarkersArr: Feature[] = [];
      const updatedMapData: MapData = {
        ...initialMapData,
        features: filteredMarkersArr,
      };
      resetAndSetMarkers(updatedMapData);
      setActivateSwap("primary");
      // ACTIVATE after full deactivation
    } else if (selectedFilter === "none") {
      const filteredMarkersArr: Feature[] = initialMapData?.features.filter(
        (feature) => feature.type === "SWAP"
      );
      setSelectedFilter("Swap");
      const updatedMapData: MapData = {
        ...initialMapData,
        features: filteredMarkersArr,
      };
      setMapData(() => updatedMapData);
      resetAndSetMarkers(updatedMapData);
      setActivateSwap("secondary");
    }
    console.log(mapRef, location);
  }
  console.log();
};
