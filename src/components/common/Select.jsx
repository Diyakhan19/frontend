import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Select = (props) => {
  const { values, onChange, label } = props;

  const [selected, setSelected] = useState(label ? label : "");

  const onSelect = (label, value) => {
    setSelected(label);
    onChange(value);
  };

  return (
    <Menu as="div" className="relative inline-block text-left w-full">
      <div>
        <Menu.Button
          className={`bg-white inline-flex h-[40px] w-full justify-between gap-x-1.5 rounded-md px-3 py-2 text-sm font-medium border-[1px] border-borderCol text-gray-500 shadow-sm`}
        >
          <p>{selected || "Select"}</p>
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute h-auto max-h-[260px] overflow-auto hideScrollbar right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {Array.isArray(values) && values.length !== 0 ? (
              values.map((item, indx) => (
                <Menu.Item key={item.value}>
                  {({ active }) => (
                    <div
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm cursor-pointer"
                      )}
                      onClick={() => {
                        onSelect(item.label, item.value);
                      }}
                      key={item.value}
                    >
                      {item.label}
                    </div>
                  )}
                </Menu.Item>
              ))
            ) : (
              <div className="text-gray-700 h-[100px] flex items-center justify-center px-4 py-2 text-sm cursor-pointer">
                No items
              </div>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Select;
