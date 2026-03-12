const DM_URL = "https://www.instagram.com/direct/inbox/";
const DM_URL_PREFIX = "https://www.instagram.com/direct/";
const DM_WINDOW_SIZE = {
  width: 420,
  height: 640
};
const DM_WINDOW_MARGIN = 24;

function calcBottomRightBounds(anchorWindow) {
  const leftBase = Number.isFinite(anchorWindow.left) ? anchorWindow.left : 0;
  const topBase = Number.isFinite(anchorWindow.top) ? anchorWindow.top : 0;
  const anchorWidth = Number.isFinite(anchorWindow.width) ? anchorWindow.width : 1280;
  const anchorHeight = Number.isFinite(anchorWindow.height) ? anchorWindow.height : 800;

  const left = Math.max(
    0,
    leftBase + anchorWidth - DM_WINDOW_SIZE.width - DM_WINDOW_MARGIN
  );
  const top = Math.max(
    0,
    topBase + anchorHeight - DM_WINDOW_SIZE.height - DM_WINDOW_MARGIN
  );

  return {
    width: DM_WINDOW_SIZE.width,
    height: DM_WINDOW_SIZE.height,
    left,
    top
  };
}

async function findDmPopupWindow() {
  const popupWindows = await chrome.windows.getAll({
    populate: true,
    windowTypes: ["popup"]
  });

  for (const win of popupWindows) {
    const hasDmTab = win.tabs?.some((tab) => tab.url?.startsWith(DM_URL_PREFIX));
    if (hasDmTab) return win;
  }

  return null;
}

async function openDmPopupWindow() {
  const anchorWindow = await chrome.windows.getLastFocused();
  const bounds = calcBottomRightBounds(anchorWindow);

  const created = await chrome.windows.create({
    url: DM_URL,
    type: "popup",
    width: bounds.width,
    height: bounds.height,
    left: bounds.left,
    top: bounds.top,
    focused: true
  });

  return { action: "opened", windowId: created.id };
}

async function toggleDmWindow() {
  const existing = await findDmPopupWindow();

  if (existing) {
    await chrome.windows.remove(existing.id);
    return { action: "closed", windowId: existing.id };
  }

  return openDmPopupWindow();
}

async function runToggle() {
  try {
    await toggleDmWindow();
  } catch (error) {
    console.error("Failed to toggle DM mini window:", error);
  }
}

chrome.action.onClicked.addListener(() => {
  runToggle();
});

chrome.commands.onCommand.addListener((command) => {
  if (command === "toggle-dm-mini-window") {
    runToggle();
  }
});
