import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import {
  MutableRefObject,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import mapboxgl, { LngLatLike } from "mapbox-gl";
import { Feature, ListData } from "../../utils/types";
import ListingItem from "../ListingItem/ListingItem";
import React from "react";
import { getListData } from "../../utils/getListData";
import { Spinner } from "../Spinner/Spinner";

export default function Example() {
  let [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-md h-2 bg-primary w-48 fixed left-[calc(50%-96px)]"
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

export const ItemDrawer = ({ onClose }: ItemDrawerProps) => {
  const [zoom, setZoom] = useState(14);
  const [listData, setListData] = useState<Feature[]>([]);

  async function getData() {
    const listDataFetch = await getListData();
    setListData(listDataFetch);
  }
  useEffect(() => {
    getData();
  }, []);
  // const { userLocation, lng, lat } = useMap(map, setZoom);

  // jsx for styling the drawer
  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col h-full pt-4">
        <div className="px-3 pb-4 shadow-sm">
          <div className="fixed top-3 left-1/4">
            <button
              onClick={onClose}
              className="rounded-md h-2 bg-primary w-48 fixed left-[calc(50%-96px)]"
            ></button>
          </div>
        </div>

        <div className="flex-1 overflow-y-scroll">
          {!listData ? (
            <div className="flex items-center justify-center pt-12">
              <Spinner height={73} />
            </div>
          ) : (
            <>
              <ul className="px-3 text-left">
                {
                  <div id="listings" className="listings">
                    {listData.length === 0 && (
                      <div className="flex text-center items-center w-full h-[73.5vh] rounded-md">
                        <Spinner />
                      </div>
                    )}
                    {listData.length > 0 &&
                      listData.map((listData, i) => (
                        <ListingItem
                          onClose={onClose}
                          key={i}
                          i={i}
                          feature={listData}
                        />
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
};

// function to close the drawer
function Modal({ onClose, children }: ModalProps) {
  return (
    <Dialog className="fixed inset-0 z-10" onClose={onClose} open={true}>
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
          className="z-0 flex flex-col w-full h-full bg-BG rounded-t-lg shadow-xl"
        >
          {children}
        </motion.div>
      </div>
    </Dialog>
  );
}
