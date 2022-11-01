class Events extends HTMLElement {
  connectedCallback() {
    this.innerHTML = ` <div>
          <h1>OCT 17 FAMILY DAY</h1>
          October 17, 2022|1:00PM
        </div>`;
  }
}
const productContainers = [...document.querySelectorAll(".slider-container")];
const nxtBtn = [...document.querySelectorAll(".nxt-btn")];
const preBtn = [...document.querySelectorAll(".pre-btn")];

productContainers.forEach((item, i) => {
  let containerDimensions = item.getBoundingClientRect();
  let containerWidth = containerDimensions.width;

  nxtBtn[i].addEventListener("click", () => {
    item.scrollLeft += containerWidth;
  });

  preBtn[i].addEventListener("click", () => {
    item.scrollLeft -= containerWidth;
  });
});

class News extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<div>
        <h3>Image</h3>
        Description
      </div>`;
  }
}

customElements.define("news-tag", News);

customElements.define("events-tag", Events);

const buttons = document.querySelectorAll("[data-carousel-button]");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const offset = button.dataset.carouselButton === "next" ? 1 : -1;
    const slides = button
      .closest("[data-carousel]")
      .querySelector("[data-slides]");

    const activeSlide = slides.querySelector("[data-active]");
    let newIndex = [...slides.children].indexOf(activeSlide) + offset;
    if (newIndex < 0) newIndex = slides.children.length - 1;
    if (newIndex >= slides.children.length) newIndex = 0;

    slides.children[newIndex].dataset.active = true;
    delete activeSlide.dataset.active;
  });
});
