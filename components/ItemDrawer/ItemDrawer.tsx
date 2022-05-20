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
import { stores } from "../../assets/data";
import { Feature } from "../../utils/types";
import ListingItem from "../ListingItem/ListingItem";

export default function Example() {
  let [open, setOpen] = useState(true);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-md h-2 bg-primary w-48 fixed left-1/4"
      ></button>

      <AnimatePresence>
        {open && <ItemDrawer ref={ref} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

interface ItemDrawerProps {
  onClose: () => void;
  ref: React.MutableRefObject<any | null>;
}
interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

mapboxgl.accessToken =
  "pk.eyJ1IjoiYXJvbjE4IiwiYSI6ImNsMzRibG9xYjB3ZjUzaW13d2s3bzVjcGkifQ.QGlBNyR336mJ2rFfFprAPg";

export function ItemDrawer({ onClose, ref }: ItemDrawerProps) {
  const [zoom, setZoom] = useState(14);

  // const { userLocation, lng, lat } = useMap(map, setZoom);

  // jsx for styling the drawer
  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col h-full pt-4">
        <div className="px-3 pb-4 shadow-sm">
          <div className="fixed top-3 left-1/4">
            <button
              onClick={onClose}
              className="rounded-md h-2 bg-primary w-48 fixed top-3 left-1/4"
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
                        <ListingItem
                          key={i}
                          i={i}
                          feature={feature as Feature}
                          map={ref}
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
}

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
