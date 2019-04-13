function slideInit(selector, config) {
    /*轮播*/
    var transitionDuration = config.duration || 300;
    var autoplay = config.autoplay || false;
    var autoplayDelay = config.autoplayDelay || 4000;
    var slideContainer = document.querySelector(selector)

    var slideWrapper = slideContainer.querySelector(".slide-wrapper")
    var slideBlockList = slideContainer.querySelectorAll(".slide-block")
    var nextBtn = slideContainer.querySelector(".slide-next")
    var prevBtn = slideContainer.querySelector(".slide-prev")
    var slideWidth = slideContainer.clientWidth

    var activeIndex = 1;

    slideWrapper.appendChild(slideBlockList[0].cloneNode(true))
    slideWrapper.insertBefore(slideBlockList[slideBlockList.length - 1].cloneNode(true), slideBlockList[0])

    updateTranslate(activeIndex, 0);

    /*更新translate的位移*/
    function updateTranslate(activeIndex, transitionDuration) {
        console.log(transitionDuration)
        var translateDistance = -slideWidth * activeIndex
        slideWrapper.style.transitionDuration = transitionDuration + "ms";
        slideWrapper.style.transform = "translate(" + translateDistance + "px)"
    }

    /*上一项*/
    function prevItem() {
        activeIndex--;
        if (activeIndex < 0) {
            activeIndex = slideBlockList.length;
            updateTranslate(activeIndex, 0);
            setTimeout(() => {
                activeIndex--;
                updateTranslate(activeIndex, transitionDuration);
            }, 0)
        } else {
            updateTranslate(activeIndex, transitionDuration);
        }
    }
    /*下一项*/
    function nextItem() {
        activeIndex++;
        if (activeIndex > slideBlockList.length + 1) {
            activeIndex = 1;
            updateTranslate(activeIndex, 0);
            setTimeout(() => {
                activeIndex++;
                updateTranslate(activeIndex, transitionDuration);
            }, 0)
        } else {
            updateTranslate(activeIndex, transitionDuration);
        }
    }

    nextBtn.addEventListener("click", nextItem)
    prevBtn.addEventListener("click", prevItem)
    var timer
    if (autoplay) {
        timer = setInterval(nextItem, autoplayDelay)
    }
    //clearInterval(timer)
}