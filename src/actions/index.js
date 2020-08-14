import { SHOW_POPOVER } from "../constants/action-types";

export function openPopover(payload) {
  return { type: SHOW_POPOVER, payload };
}
