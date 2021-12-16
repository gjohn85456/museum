const images = document.querySelectorAll('.welcome_slider_image');
const buttons = document.querySelectorAll('.welcome_slider_button');
const pages = document.querySelectorAll('.welcome_slider_rectangles_rec');
const sliderBlock = document.querySelector('.welcome_right_part');
const logo = document.querySelector('.logo_content');
const number_images = document.querySelector('.welcome_slider_numbers_num_images');

const slider = new Slider(
    images,
    buttons,
    pages,
    number_images
);

sliderBlock.addEventListener('click', slider.controllerClick.bind(slider));
sliderBlock.addEventListener('mouseenter', slider.controllerHover.bind(slider));
sliderBlock.addEventListener('mouseleave', slider.controllerHover.bind(slider));


sliderBlock.addEventListener('mousedown', slider.controllerSwiper.bind(slider));
sliderBlock.addEventListener('mousemove', slider.controllerSwiper.bind(slider));
sliderBlock.addEventListener('mouseup', slider.controllerSwiper.bind(slider));
//sliderBlock.addEventListener('mouseleave', slider.controllerSwiper.bind(slider));

// sliderBlock.addEventListener('mousedown', slider.dragStart.bind(slider));
// sliderBlock.addEventListener('mouseup', slider.dragAction.bind(slider));



// sliderBlock.addEventListener('mouseup', slider.swiper.bind(slider));
// sliderBlock.addEventListener('mousemove', slider.swiper.bind(slider));



//sliderBlock.addEventListener('touchstart', slider.controllerSwiper.bind(slider));
//sliderBlock.onmousedown = slider.dragStart.bind(slider);

