import type { Dispatch, SetStateAction } from "react";
import { CheckboxIcon, BoxIcon } from "@radix-ui/react-icons";

type ToggleProps = {
  inspecting: Boolean;
  setInspecting: Dispatch<SetStateAction<boolean>>;
  hideButton: boolean;
};

export default function Toggles({
  inspecting,
  setInspecting,
  hideButton,
}: ToggleProps) {
  return (
    <div className={"absolute left-1/2 z-10 m-auto -translate-x-1/2 pt-10"}>
      {hideButton && (
        <button
          className="flex items-center rounded-xl bg-white px-10 py-4 font-bold shadow-md"
          onClick={() => {
            setInspecting(!inspecting);
          }}
        >
          <p className="text-xl">Inspector mode</p>
          {inspecting && (
            <CheckboxIcon className="ml-2" width="24px" height="24px" />
          )}
          {!inspecting && (
            <BoxIcon className="ml-2" width="20px" height="20px" />
          )}
        </button>
      )}
    </div>
  );
}
