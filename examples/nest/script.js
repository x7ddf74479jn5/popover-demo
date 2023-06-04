const popoverContainers = document.querySelectorAll(".popover-container");
const withoutPopovers = document.querySelectorAll(
  ".navigation-list > li:not(.popover-container)"
);
const popovers = document.querySelectorAll(".popover");

popoverContainers.forEach((container) => {
  container.addEventListener("mouseenter", () => openPopoverOf(container));
  container.addEventListener("mouseleave", () => closePopoverOf(container));

  container.addEventListener("focusin", () => openPopoverOf(container));
  withoutPopovers.forEach((item) => {
    item.addEventListener("focusin", () => closePopoverAll());
  });
});

const openPopoverOf = (container) => {
  const popover = container.querySelector(".popover");
  if (popover == null) {
    return;
  }

  if (!popover.matches(":popover-open")) {
    popover.showPopover();
  }
};

const closePopoverOf = (container) => {
  const popover = container.querySelector(".popover");
  if (popover == null) {
    return;
  }

  if (popover.matches(":popover-open")) {
    popover.hidePopover();
  }
};

const closePopoverAll = () => {
  popovers.forEach((popover) => {
    if (popover.matches(":popover-open")) {
      popover?.hidePopover();
    }
  });
};
