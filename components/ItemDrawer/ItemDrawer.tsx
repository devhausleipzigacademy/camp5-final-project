import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";
import Image from "next/image";
import flyToStore from "../../utils/flyToStore";
import createPopUp from "../../utils/createPopUp";
import addMarkers from "../../utils/addMarkers";
import mapboxgl, { LngLatLike } from "mapbox-gl";
import { stores } from "../../assets/data";
import useMap from "../../hooks/useMap";
import getDistance from "../../utils/getDistance";
import { Coord } from "@turf/turf";
import { Feature } from "../../utils/types";
import getUserLocation from "../../utils/getUserLocation";

export default function Example() {
  let [open, setOpen] = useState(true);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-md h-2 bg-primary w-48 fixed left-1/4"
      ></button>

      <AnimatePresence>
        {open && <ItemDrawer onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

interface ItemDrawerProps {
  onClose: () => void;
}
interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

mapboxgl.accessToken =
  "pk.eyJ1IjoiYXJvbjE4IiwiYSI6ImNsMzRibG9xYjB3ZjUzaW13d2s3bzVjcGkifQ.QGlBNyR336mJ2rFfFprAPg";

function ItemDrawer({ onClose }: ItemDrawerProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map: React.MutableRefObject<mapboxgl.Map | null> = useRef(null);
  const [zoom, setZoom] = useState(14);

  // const { userLocation, lng, lat } = useMap(map, setZoom);

  const userLocation = getUserLocation();

  let users = [
    { id: 1, name: "user1" },
    { id: 2, name: "user2" },
    { id: 3, name: "user3" },
  ];

  // jsx for styling the drawer
  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col h-full pt-4">
        <div className="px-3 pb-4 shadow-sm">
          <div className="absolute inset-y-0 right-0 mb-2">
            <button
              onClick={onClose}
              className="rounded-md h-2 bg-primary w-48 fixed left-1/4"
            ></button>
          </div>
        </div>

        <div className="flex-1 overflow-y-scroll">
          {!stores.features ? (
            <div className="flex items-center justify-center pt-12">
              {/* <Spinner /> */}
            </div>
          ) : (
            <>
              <ul className="px-3 text-left">
                {
                  <div id="listings" className="listings">
                    {stores.features.length &&
                      stores.features.map((feature, i) => (
                        <div
                          key={i}
                          id={`listing-${i}`}
                          className="item"
                          onClick={() => {
                            setTimeout(
                              () => flyToStore(feature as Feature, map),
                              300
                            );
                            createPopUp(
                              feature as Feature,
                              userLocation as Coord,
                              map
                            );
                            const activeItem =
                              document.getElementsByClassName("active");
                            if (activeItem[0]) {
                              activeItem[0].classList.remove("active");
                            }
                            //@ts-ignore
                            const thisElement = document.getElementById(
                              `listing-${i}`
                            );
                            (thisElement as HTMLElement).classList.add(
                              "active"
                            );
                          }}
                        >
                          <div className="flex gap-2 items-center">
                            <Image
                              src={feature.properties.productImage}
                              alt=""
                              layout="intrinsic"
                              // sizes="100vw"
                              height={50}
                              width={50}
                              objectFit="cover"
                            />
                            <div className="flex w-full justify-between">
                              <a href="#" className="title" id={`link-${i}`}>
                                <div className="flex-col">
                                  <div>{feature.properties.title}</div>
                                  <div>
                                    {getDistance(
                                      feature as Feature,
                                      userLocation as Coord
                                    )}
                                  </div>
                                </div>
                              </a>
                              <Image
                                src={feature.properties.ownerImage}
                                alt=""
                                layout="intrinsic"
                                // sizes="100vw"
                                height={50}
                                width={50}
                                objectFit="cover"
                                className="rounded-full"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                }
              </ul>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}

// function to close the drawer
function Modal({ onClose, children }: ModalProps) {
  return (
    <Dialog className="fixed inset-0 z-10 bg-BG" onClose={onClose} open={true}>
      <div className="flex flex-col justify-center h-full px-1 pt-4 text-center sm:block sm:p-0">
        <Dialog.Overlay
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 0.4, ease: [0.36, 0.66, 0.04, 1] },
          }}
          exit={{
            opacity: 0,
            transition: { duration: 0.3, ease: [0.36, 0.66, 0.04, 1] },
          }}
          className="fixed inset-0 bg-black/40"
        />

        <motion.div
          initial={{ y: "100%" }}
          animate={{
            y: 0,
            transition: { duration: 0.4, ease: [0.36, 0.66, 0.04, 1] },
          }}
          exit={{
            y: "100%",
            transition: { duration: 0.3, ease: [0.36, 0.66, 0.04, 1] },
          }}
          className="z-0 flex flex-col w-full h-full bg-white rounded-t-lg shadow-xl"
        >
          {children}
        </motion.div>
      </div>
    </Dialog>
  );
}
