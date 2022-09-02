/* This example requires Tailwind CSS v2.0+ */
import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon, XIcon } from "@heroicons/react/outline";

interface DialogProps {
  itemId: string;
  handleItem: Function;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  message: string;
  label: string;
}

export default function ConfirmDialog({
  itemId,
  handleItem,
  open,
  setOpen,
  message,
  label,
}: DialogProps) {
  return (
    <div className="relative">
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="absolute bottom-0 z-50"
          onClose={() => setOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-primary bg-opacity-30 transition-opacity " />
          </Transition.Child>
          <div className="z-10 inset-0 overflow-y-auto">
            <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative bg-BG rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden border-BG-text border-2 transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
                  <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                    <button
                      type="button"
                      className="bg-BG rounded-md text-primary-variant hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                    </button>
                  </div>
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <div className="mt-2">
                        <p className="text-base">{message}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex mt-5 gap-2 sm:mt-4 sm:flex justify-center">
                    <button
                      type="button"
                      className="w-auto mt-3 inline-flex justify-center rounded-md border border-BG-text px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="w-auto mt-3 inline-flex justify-center rounded-md border border-transparent px-4 py-2 bg-error text-base font-medium text-error-text hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => handleItem(itemId)}
                    >
                      {label}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
