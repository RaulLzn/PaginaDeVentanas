const root = document.documentElement;
const body = document.body;
const pages = document.querySelectorAll(".page");
const tiles = document.querySelectorAll(".tile");

//Bind listener
for (let i = 0; i < tiles.length; i++) {
  const tile = tiles[i];
  const page = pages[i];
  tile.addEventListener("click", function() {
    animateArea(tile, page);
  });
  page.addEventListener("click", function() {
    animateArea(page, tile);
  });
}

// Animate with TweenLite
const animateArea = (fromHero, toHero) => {
  const clone = fromHero.cloneNode(true);
  const from = calculatePosition(fromHero);
  const to = calculatePosition(toHero);

  TweenLite.set([fromHero, toHero], {
    visibility: "hidden"
  });
  TweenLite.set(clone, {
    position: "absolute",
    margin: 0
  });

  body.appendChild(clone);

  const style = {
    x: to.left - from.left,
    y: to.top - from.top,
    width: to.width,
    height: to.height,
    autoRound: false,
    ease: Power1.easeOut,
    onComplete: () => {
      TweenLite.set(toHero, {
        visibility: "visible"
      });
      body.removeChild(clone);
    }
  };

  TweenLite.set(clone, from);
  TweenLite.to(clone, 0.3, style)
}

// Calculate the position
const calculatePosition = (element) => {
  const rect = element.getBoundingClientRect();
  const scrollTop = window.pageYOffset || root.scrollTop || body.scrollTop || 0;
  const scrollLeft = window.pageXOffset || root.scrollLeft || body.scrollLeft || 0;
  const clientTop = root.clientTop || body.clientTop || 0;
  const clientLeft = root.clientLeft || body.clientLeft || 0;
  return {
    top: Math.round(rect.top + scrollTop - clientTop),
    left: Math.round(rect.left + scrollLeft - clientLeft),
    height: rect.height,
    width: rect.width,
  };
}