import { Coord } from "@turf/turf";

export const getUserLocation = async () => {
  try {
    let userCoordinates: Coord = [];
    navigator.geolocation.getCurrentPosition((position) => {
      userCoordinates = [position.coords.longitude, position.coords.latitude];
    });
    console.log("User-Coordinates:", userCoordinates);
    return userCoordinates;
  } catch (err) {
    console.error(err);
  }
};
