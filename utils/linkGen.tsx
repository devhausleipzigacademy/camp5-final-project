import { useRouter } from "next/router";
import { Feature } from "./types";

export default function LinkGen(marker: Feature) {
  const router = useRouter();
  router.push({
    pathname: "/item",
    query: {
      title: marker.properties.title,
      identifier: marker.properties.id,
      // distance: distanceNo,
      owner: marker.properties.owner,
    },
  });
}
