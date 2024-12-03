export const getCropPositions = (...args) => {
  const dir = args.shift();
  if (dir === "r") return getCropPositionsR(...args);
  if (dir === "l") return getCropPositionsL(...args);
  if (dir === "t") return getCropPositionsT(...args);
  if (dir === "b") return getCropPositionsB(...args);
  if (dir === "tl") return getCropPositionsTL(...args);
  if (dir === "tr") return getCropPositionsTR(...args);
  if (dir === "bl") return getCropPositionsBL(...args);
  if (dir === "br") return getCropPositionsBR(...args);
};

const minSize = 32;

const getRatioProportion = (ratio, width, height) =>
  ratio === "original"
    ? width / height
    : ratio === "free"
    ? 0
    : ratio.split(":").reduce((a, b) => a / b);

const getCropPositionsR = (...args) => {
  const [ratio, startX, startY, clientX, clientY, wrapper, crop, el] = args;
  const { offsetWidth: width, offsetHeight: height } = wrapper;
  let { x, y, w, h } = crop;
  const proportion = getRatioProportion(ratio, width, height);

  if (proportion === 0) {
    w += clientX - startX;
    if (w + x > width) w = width - x;
    if (w < minSize) w = minSize;
  } else {
    //
  }

  return { x, y, w, h };
};

const getCropPositionsL = (...args) => {
  const [ratio, startX, startY, clientX, clientY, wrapper, crop, el] = args;
  const { offsetWidth: width, offsetHeight: height } = wrapper;
  let { x, y, w, h } = crop;
  const proportion = getRatioProportion(ratio, width, height);

  if (proportion === 0) {
    const right = width - crop.w - crop.x;
    x += clientX - startX;
    if (x < 0) x = 0;
    w = width - x - right;
    if (w < minSize) {
      w = minSize;
      x = width - right - minSize;
    }
  } else {
    //
  }

  return { x, y, w, h };
};

const getCropPositionsT = (...args) => {
  const [ratio, startX, startY, clientX, clientY, wrapper, crop, el] = args;
  const { offsetWidth: width, offsetHeight: height } = wrapper;
  let { x, y, w, h } = crop;
  const proportion = getRatioProportion(ratio, width, height);

  if (proportion === 0) {
    const bottom = height - h - y;
    y += clientY - startY;
    if (y < 0) y = 0;
    h = height - y - bottom;
    if (h < minSize) {
      h = minSize;
      y = height - bottom - minSize;
    }
  } else {
    //
  }

  return { x, y, w, h };
};

const getCropPositionsB = (...args) => {
  const [ratio, startX, startY, clientX, clientY, wrapper, crop, el] = args;
  const { offsetWidth: width, offsetHeight: height } = wrapper;
  let { x, y, w, h } = crop;
  const proportion = getRatioProportion(ratio, width, height);

  if (proportion === 0) {
    h += clientY - startY;
    if (h + y > height) h = height - y;
    if (h < minSize) h = minSize;
  } else {
    //
  }

  return { x, y, w, h };
};

const getCropPositionsTL = (...args) => {
  const [ratio, startX, startY, clientX, clientY, wrapper, crop, el] = args;
  const { offsetWidth: width, offsetHeight: height } = wrapper;
  let { x, y, w, h } = crop;
  const proportion = getRatioProportion(ratio, width, height);

  if (proportion === 0) {
    const right = width - crop.w - crop.x;
    x += clientX - startX;
    if (x < 0) x = 0;
    w = width - x - right;
    if (w < minSize) {
      w = minSize;
      x = width - right - minSize;
    }

    const bottom = height - h - y;
    y += clientY - startY;
    if (y < 0) y = 0;
    h = height - y - bottom;
    if (h < minSize) {
      h = minSize;
      y = height - bottom - minSize;
    }
  } else {
    //
  }

  return { x, y, w, h };
};

const getCropPositionsTR = (...args) => {
  const [ratio, startX, startY, clientX, clientY, wrapper, crop, el] = args;
  const { offsetWidth: width, offsetHeight: height } = wrapper;
  let { x, y, w, h } = crop;
  const proportion = getRatioProportion(ratio, width, height);

  if (proportion === 0) {
    w += clientX - startX;
    if (w + x > width) w = width - x;
    if (w < minSize) w = minSize;

    const bottom = height - h - y;
    y += clientY - startY;
    if (y < 0) y = 0;
    h = height - y - bottom;
    if (h < minSize) {
      h = minSize;
      y = height - bottom - minSize;
    }
  } else {
    //
  }

  return { x, y, w, h };
};

const getCropPositionsBL = (...args) => {
  const [ratio, startX, startY, clientX, clientY, wrapper, crop, el] = args;
  const { offsetWidth: width, offsetHeight: height } = wrapper;
  let { x, y, w, h } = crop;
  const proportion = getRatioProportion(ratio, width, height);

  if (proportion === 0) {
    h += clientY - startY;
    if (h + y > height) h = height - y;
    if (h < minSize) h = minSize;

    const right = width - crop.w - crop.x;
    x += clientX - startX;
    if (x < 0) x = 0;
    w = width - x - right;
    if (w < minSize) {
      w = minSize;
      x = width - right - minSize;
    }
  } else {
    //
  }

  return { x, y, w, h };
};

const getCropPositionsBR = (...args) => {
  const [ratio, startX, startY, clientX, clientY, wrapper, crop, el] = args;
  const { offsetWidth: width, offsetHeight: height } = wrapper;
  let { x, y, w, h } = crop;
  const proportion = getRatioProportion(ratio, width, height);

  if (proportion === 0) {
    w += clientX - startX;
    if (w + x > width) w = width - x;
    if (w < minSize) w = minSize;

    h += clientY - startY;
    if (h + y > height) h = height - y;
    if (h < minSize) h = minSize;
  } else {
    //
  }

  return { x, y, w, h };
};

// if (ratioProportion === 0) {

// } else {
//   if (directionRef.current === "b") {
//     const difH = e.clientY - y2;
//     const difW = Math.round(difH * ratioProportion);
//     newH += difH;
//     newW += difW;
//     newX -= difW / 2;
//     if (newH + newY > wrpHeight) {
//       newH = wrpHeight - newY;
//       newW = Math.round(newH * ratioProportion);
//       newX = el.offsetLeft;
//     }
//     if (newW + newX > wrpWidth) {
//       newX = el.offsetLeft;
//       newW = wrpWidth - newX;
//       newH = Math.round(newW / ratioProportion);
//     }
//     if (newX < 0) {
//       newX = 0;
//     }
//     if (newW < minSize) {
//       newW = minSize;
//       newH = Math.round(newW / ratioProportion);
//       newX = el.offsetLeft;
//     }
//     if (newH < minSize) {
//       newH = minSize;
//       newW = Math.round(newH * ratioProportion);
//       newX = el.offsetLeft;
//     }
//   }
// }

// if (directionRef.current === "br") {
//   //
// }
// if (["r", "tr"].includes(directionRef.current)) {
//   newW += e.clientX - x2;
//   if (newW < 40) newW = 40;
//   if (newW + newX > wrpWidth) newW = wrpWidth - newX;
//   if (ratioProportion !== 0) newH = Math.round(newW / ratioProportion);
// }
// if (["b", "bl"].includes(directionRef.current)) {
//   newH += e.clientY - y2;
//   if (newH < 40) newH = 40;
//   if (newH + newY > wrpHeight) newH = wrpHeight - newY;
//   if (ratioProportion !== 0) newW = Math.round(newH * ratioProportion);
// }
// if (["l", "bl", "tl"].includes(directionRef.current)) {
//   const right = wrpWidth - crop.w - crop.x;
//   newX += e.clientX - x2;
//   if (newX < 0) newX = 0;
//   newW = wrpWidth - newX - right;
//   if (newW < 40) {
//     newW = 40;
//     newX = wrpWidth - right - 40;
//   }
// }
// if (["t", "tl", "tr"].includes(directionRef.current)) {
//   const bottom = wrpHeight - crop.h - crop.y;
//   newY += e.clientY - y2;
//   if (newY < 0) newY = 0;
//   newH = wrpHeight - newY - bottom;
//   if (newH < 40) {
//     newH = 40;
//     newY = wrpHeight - bottom - 40;
//   }
//   if (ratioProportion !== 0) {
//     newW = Math.round(newH * ratioProportion);
//     newY = wrpHeight - newH - bottom;
//   }
// }

// if (newH + newY > wrpHeight) {
//   newH = wrpHeight - newY;
//   if (ratioProportion !== 0) newW = Math.round(newH * ratioProportion);
// }

// if (newW + newX > wrpWidth) {
//   newW = wrpWidth - newX;
//   if (ratioProportion !== 0) newH = Math.round(newW / ratioProportion);
// }
