export const getCropPoints = (...args) => {
  const dir = args.shift();
  if (dir === "r") return getCropPointsR(...args);
  if (dir === "l") return getCropPointsL(...args);
  if (dir === "t") return getCropPointsT(...args);
  if (dir === "b") return getCropPointsB(...args);
  if (dir === "tl") return getCropPointsTL(...args);
  if (dir === "tr") return getCropPointsTR(...args);
  if (dir === "bl") return getCropPointsBL(...args);
  if (dir === "br") return getCropPointsBR(...args);
};

const minSize = 32;

const getRatioProportion = (ratio, width, height) =>
  ratio === "original"
    ? width / height
    : ratio === "free"
    ? 0
    : ratio.split(":").reduce((a, b) => a / b);

const getDefaultCrop = (el) => ({
  x: el.offsetLeft,
  y: el.offsetTop,
  w: el.offsetWidth,
  h: el.offsetHeight,
});

const getCropPointsR = (...args) => {
  const [ratio, startX, clientX, width, height, crop, el] = args.filter(
    (_, i) => i !== 2 && i !== 4
  );
  let { x, y, w, h } = crop;
  const proportion = getRatioProportion(ratio, width, height);

  if (proportion === 0) {
    w += clientX - startX;
    if (w + x > width) w = width - x;
    if (w < minSize) w = minSize;
  } else {
    const difW = clientX - startX;
    const difH = Math.round(difW / proportion);
    w += difW;
    h += difH;
    y -= difH / 2;
    if (
      y < 0 ||
      h + y > height ||
      w + x > width ||
      w < minSize ||
      h < minSize
    ) {
      return getDefaultCrop(el);
    }
  }

  return { x, y, w, h };
};

const getCropPointsL = (...args) => {
  const [ratio, startX, clientX, width, height, crop, el] = args.filter(
    (_, i) => i !== 2 && i !== 4
  );
  const proportion = getRatioProportion(ratio, width, height);
  let { x, y, w, h } = crop;

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
    const difW = clientX - startX;
    const difH = Math.round(difW / proportion);
    w -= difW;
    h -= difH;
    x += difW;
    y += difH / 2;
    if (y < 0 || x < 0 || h + y > height || w < minSize || h < minSize) {
      return getDefaultCrop(el);
    }
  }

  return { x, y, w, h };
};

const getCropPointsT = (...args) => {
  const [ratio, startY, clientY, width, height, crop, el] = args.filter(
    (_, i) => i !== 1 && i !== 3
  );
  const proportion = getRatioProportion(ratio, width, height);
  let { x, y, w, h } = crop;

  const bottom = height - h - y;
  if (proportion === 0) {
    y += clientY - startY;
    if (y < 0) y = 0;
    h = height - y - bottom;
    if (h < minSize) {
      h = minSize;
      y = height - bottom - minSize;
    }
  } else {
    const difH = clientY - startY;
    const difW = Math.round(difH * proportion);
    h -= difH;
    w -= difW;
    x += difW / 2;
    y += difH;
    if (y < 0 || x < 0 || w + x > width || w < minSize || h < minSize) {
      return getDefaultCrop(el);
    }
  }

  return { x, y, w, h };
};

const getCropPointsB = (...args) => {
  const [ratio, startY, clientY, width, height, crop, el] = args.filter(
    (_, i) => i !== 1 && i !== 3
  );
  const proportion = getRatioProportion(ratio, width, height);
  let { x, y, w, h } = crop;

  if (proportion === 0) {
    h += clientY - startY;
    if (h + y > height) h = height - y;
    if (h < minSize) h = minSize;
  } else {
    const difH = clientY - startY;
    const difW = Math.round(difH * proportion);
    h += difH;
    w += difW;
    x -= difW / 2;
    if (
      h + y > height ||
      x < 0 ||
      w + x > width ||
      w < minSize ||
      h < minSize
    ) {
      return getDefaultCrop(el);
    }
  }

  return { x, y, w, h };
};

const getCropPointsTL = (...args) => {
  const [ratio, startX, startY, clientX, clientY, width, height, crop, el] =
    args;
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
    if (proportion >= 1) {
      const difW = clientX - startX;
      const difH = Math.round(difW / proportion);
      w -= difW;
      h -= difH;
      x += difW;
      y += difH;
    } else {
      const difH = clientY - startY;
      const difW = Math.round(difH * proportion);
      w -= difW;
      h -= difH;
      x += difW;
      y += difH;
    }
    if (x < 0 || y < 0 || w < minSize || h < minSize) {
      return getDefaultCrop(el);
    }
  }

  return { x, y, w, h };
};

const getCropPointsTR = (...args) => {
  const [ratio, startX, startY, clientX, clientY, width, height, crop, el] =
    args;
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
    if (proportion > 1) {
      const difW = clientX - startX;
      const difH = Math.round(difW / proportion);
      w += difW;
      h += difH;
      y -= difH;
    } else {
      const difH = clientY - startY;
      const difW = Math.round(difH * proportion);
      w -= difW;
      h -= difH;
      y += difH;
    }
    if (w + x > width || y < 0 || w < minSize || h < minSize) {
      return getDefaultCrop(el);
    }
  }

  return { x, y, w, h };
};

const getCropPointsBL = (...args) => {
  const [ratio, startX, startY, clientX, clientY, width, height, crop, el] =
    args;
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
    if (proportion >= 1) {
      const difW = clientX - startX;
      const difH = Math.round(difW / proportion);
      w -= difW;
      h -= difH;
      x += difW;
    } else {
      const difH = clientY - startY;
      const difW = Math.round(difH * proportion);
      w += difW;
      h += difH;
      x -= difW;
    }
    if (h + y > height || x < 0 || w < minSize || h < minSize) {
      return getDefaultCrop(el);
    }
  }

  return { x, y, w, h };
};

const getCropPointsBR = (...args) => {
  const [ratio, startX, startY, clientX, clientY, width, height, crop, el] =
    args;
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
    if (proportion >= 1) {
      const difW = clientX - startX;
      const difH = Math.round(difW / proportion);
      w += difW;
      h += difH;
    } else {
      const difH = clientY - startY;
      const difW = Math.round(difH * proportion);
      w += difW;
      h += difH;
    }
    if (h + y > height || w + x > width || w < minSize || h < minSize) {
      return getDefaultCrop(el);
    }
  }

  return { x, y, w, h };
};

export const degree2Rad = (degree) => {
  return (degree * Math.PI) / 180;
};
