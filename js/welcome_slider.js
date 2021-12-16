class Slider {
    constructor(images, buttons, pages, number_images, duration = 5000) {
        this.images = images;
        this.buttons = buttons;
        this.pages = pages;
        this.number_images = number_images;
        this.index = 0;
        this.indexTemp = 0;
        this.duration = duration;
        this.animate = true;
        this.posX1 = 0;
        this.posX2 = 0;
        this.posInitial;
        this.posFinal;
        this.threshold = 100;
        this.mouse_down = false;
        this.mouse_move;
        this.sizeImages = 1000;
    }

    __addAciveClass(index) {
        this.images[index].classList.add('welcome_slider_image_active');
        this.pages[index].classList.add('welcome_slider_rectangles_rec_active');
    }

    __removeActiveClass(index) {
        this.images[index].classList.remove('welcome_slider_image_active');
        this.pages[index].classList.remove('welcome_slider_rectangles_rec_active');
    }

    __setIndex(number) {
        if (number >= this.images.length)
            this.index = 0;
        else if (number < 0)
            this.index = this.images.length - 1;
        else
            this.index = number;
    }
    /**
     * Зацыкливание картинок, когда индекс картинки равен количеству кратинок 
     * происходит обнуление индекса
     * @param {индекс текущего изображения} number 
     */
    __setTempIndex(number) {
        if (number >= this.images.length)
            this.indexTemp = 0;
        else if (number < 0)
            this.indexTemp = this.images.length - 1;
        else
            this.indexTemp = number;
    }
    /**
     * Изменение номера изображения
     */
    changeNumberImages() {
        this.number_images.textContent = '0' + (this.index + 1);
        // console.log(this.index);
    }

    changePage(number) {
        this.__removeActiveClass(this.index);
        if (number => 0 && number < this.images.length) {
            this.__setIndex(number);
            this.__addAciveClass(this.index);
        }
        this.changeNumberImages();
    }

    startSlideShow() {
        this.interval = setInterval(this.nextSlide.bind(this), this.duration);
    }

    stopSlidShow() {
        clearInterval(this.interval);
    }

    nextSlide() {
        this.__removeActiveClass(this.index);
        this.__setIndex(this.index + 1);
        this.__addAciveClass(this.index);
        this.changeNumberImages();
    }

    prevSlide() {
        this.__removeActiveClass(this.index);
        this.__setIndex(this.index - 1);
        this.__addAciveClass(this.index);
        this.changeNumberImages();
    }

    controllerClick(event) {
        let target = event.target.dataset.target;
        if (target) {
            if (target.toLowerCase() === 'next') {
                this.nextSlide();
            } else if (target.toLowerCase() === 'prev') {
                this.prevSlide();
            } else if (target >= '0' && target <= '9') {
                this.changePage(Number.parseInt(target));
            }
        }
    }

    controllerHover(element) {
        this.animate = !this.animate;
        this.mouse_leave = true;
        if (this.animate) {
            if (this.mouse_down) {
                this.controllerSwiper(element);
            }
            this.startSlideShow();

        } else {
            this.stopSlidShow();
        }
    }

    controllerSwiper(element) {
        element = element || window.event;
        element.preventDefault();
        if (element.type === 'mouseleave') {
        }

        if (element.type === 'mousedown') {
            this.posInitial = this.images[this.index].offsetLeft;
            this.posX1 = element.clientX;
            this.mouse_down = true;
            //console.log(element);
        } else if (element.type === 'mousemove' && this.mouse_down && element.type != 'mouseleave') {
            this.posX2 = this.posX1 - element.clientX;
            this.posX1 = element.clientX;
            this.images[this.index].style.left = (this.images[this.index].offsetLeft - this.posX2) + "px";
            //Проверка. Swiper работает только ести курсор мышки на картинах
            if (element.target.className === 'welcome_slider_image welcome_slider_image_active') {
                //вычисляем куда двигается мышка "вправо" или  "влево"
                if (this.images[this.index].offsetLeft - this.posX2 < 0) {
                    //обнуляем значения style текущей страницы и предыдущей
                    //this.images[this.index].style.zIndex = '';
                    this.__setTempIndex(this.index - 1);
                    this.images[this.indexTemp].style.left = 0 + "px";
                    //this.images[this.indexTemp].style.zIndex = '';
                    this.images[this.indexTemp].style.display = '';

                    //картинки находятся одна под другой, только у одной свойство css display=block, у остальных display=none
                    //this.images[this.index].style.zIndex = '2';
                    //определяем следующую страницу indexTemp, функция используется для зацыкливания 0 1 2 3 4 0 1 2 3 4 0 ...
                    this.__setTempIndex(this.index + 1);
                    //this.images[this.indexTemp].style.zIndex = '1';
                    //для отображения следующей картинки небходимо её сделать видимой и присвовить через style display=block                    
                    this.images[this.indexTemp].style.display = 'block';
                    //смещаем следующую страницу относительно движения текущей
                    this.images[this.indexTemp].style.left = (this.sizeImages + this.images[this.index].offsetLeft - this.posX2) + "px";

                } else if (this.images[this.index].offsetLeft - this.posX2 > 0) {

                    //this.images[this.index].style.zIndex = '';
                    this.__setTempIndex(this.index + 1);
                    this.images[this.indexTemp].style.left = 0 + "px";
                    //this.images[this.indexTemp].style.zIndex = '';
                    this.images[this.indexTemp].style.display = '';

                    //this.images[this.index].style.zIndex = '2';
                    this.__setTempIndex(this.index - 1);
                    //this.images[this.indexTemp].style.zIndex = '1';
                    this.images[this.indexTemp].style.display = 'block';
                    this.images[this.indexTemp].style.left = (this.images[this.index].offsetLeft - this.posX2 - this.sizeImages) + "px";
                }
            }


            this.mouse_move = true;
        } else if (element.type === 'mouseup' || element.type === 'mouseleave' && this.mouse_down && this.mouse_move) {

            this.posFinal = this.images[this.index].offsetLeft;
            if (this.posFinal - this.posInitial < -this.threshold) {

                //this.images[this.index].style.zIndex = '';
                this.__setTempIndex(this.index + 1);
                //this.images[this.indexTemp].style.zIndex = '';
                this.images[this.indexTemp].style.display = '';

                this.images[this.index].style.left = '0px';

                this.nextSlide();

            } else if (this.posFinal - this.posInitial > this.threshold) {

                //this.images[this.index].style.zIndex = '';
                this.__setTempIndex(this.index - 1);
                //this.images[this.indexTemp].style.zIndex = '';
                this.images[this.indexTemp].style.display = '';

                this.images[this.index].style.left = '0px';

                this.prevSlide();
            } else {
                this.images[this.index].style.left = (this.posInitial) + "px";
                this.images[this.index].style.left = '0px';
            }
            this.images[this.index].style.left = '0px';
            this.posX1 = 0;
            this.posX2 = 0;
            this.mouse_down = false;
            this.mouse_move = false;
        } else if (element.type === 'mouseup') {
            this.mouse_down = false;
            this.images[this.index].style.left = '0px';
            this.posX1 = 0;
            this.posX2 = 0;
            this.mouse_down = false;
            this.mouse_move = false;
        }


    }

    /*
        dragStart(e) {
            this.stopSlidShow();
            e = e || window.event;
            e.preventDefault();
            this.posInitial = this.images[this.index].offsetLeft;
    
            if (e.type == 'touchstart') {
                this.posX1 = e.touches[0].clientX;
            } else {
                this.posX1 = e.clientX;
                console.log(this.posX1);
                document.onmouseup = this.dragEnd;
                document.onmousemove = this.dragAction;
            }
        }
    
        dragAction(e) {
            e = e || window.event;
            console.log(this.posX1);
            if (e.type == 'touchmove') {
                this.posX2 = this.posX1 - e.touches[0].clientX;
                this.posX1 = e.touches[0].clientX;
            } else {
    
                this.posX2 = this.posX1 - e.clientX;
                this.posX1 = e.clientX;
            }
    
            console.log(this.images[this.index]);
            this.images[this.index].style.left = (this.images[this.index].offsetLeft - this.posX2) + "px";
            console.log(this.images[this.index]);
    
        }
    
        dragEnd(e) {

            this.posFinal = this.images[this.index].offsetLeft;
            if (this.posFinal - this.posInitial < -this.threshold) {
                this.nextSlide()
            } else if (this.posFinal - this.posInitial > this.threshold) {
                this.prevSlide()
            } else {
                this.images[this.index].style.left = (this.posInitial) + "px";
            }
            this.posX1 = 0;
            this.posX2 = 0;
            document.onmouseup = null;
            document.onmousemove = null;
            //this.startSlideShow()
        }
    
        */
}