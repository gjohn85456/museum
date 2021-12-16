const pictureInnerContainer = document.querySelectorAll('.picture-inner-container');

class Gallery {
    constructor(columns, numbers_paintings = 12) {
        this.numbers_paintings = numbers_paintings;
        this.columns = columns;
        this.index = 0;
        this.arr_painting = [];
    }

    __addPainting(index) {
        const lengthColumn = this.numbers_paintings / this.columns.length;
        for (let i = 0; i < lengthColumn; i++) {
            this.columns[index].innerHTML = this.columns[index].innerHTML + this.arr_painting[this.index];
            this.index++;
        }

    }
    //Функция для перемешивания элементов this.arr_painting массива
    __shuffle() {
        for (let i = this.arr_painting.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [this.arr_painting[i], this.arr_painting[j]] = [this.arr_painting[j], this.arr_painting[i]];
        }
    }
    __generationPaintings(numbers_paintings) {
        let img = '';
        for (let i = 1; i < numbers_paintings + 1; i++) {
            img = `<img class="gallery-img" src="assets/img/gallery/painting${i}.jpg" alt="painting${i}">`;
            this.arr_painting.push(img);
        }
        this.__shuffle();
    }

    generationGallery() {
        this.__generationPaintings(this.numbers_paintings);
        for (let i = 0; i < this.columns.length; i++) {
            this.__addPainting(i);

        }

    }
}

const gallery = new Gallery(pictureInnerContainer);
gallery.generationGallery();


