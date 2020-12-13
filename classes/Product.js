// Изменения для страниц товаров

class Product extends Changer {
	constructor() {
		super();
		this.eventFor = '';
		this.photoArray = '';
		this.activePhotoClass = '';
		this.circleArray = '';
		this.activeCircleClass = '';
		this.galleryWrapper = '';
		this.currentPhoto = '';
		this.currentPhotoWidth = '';
		this.currentPhotoOffset = '';
		this.currentContainerWidth = '';
		this.selectedCircle = '';
		this.requiredOffset = '';
		this.findClass = '';
		this.toggleClass = '';
		this.skip = '';
		this.checkValue = '';
	};

	// добавляет клик на стрелки навигации галереи товаров
	addClickListener(ev) {
		this.container = document.querySelector(ev.container);
		this.photoArray = ev.photoArray;
		this.activePhotoClass = ev.activePhotoClass;
		this.circleArray = ev.circleArray;
		this.activeCircleClass = ev.activeCircleClass;
		this.galleryWrapper = document.querySelector(ev.galleryWrapper);

		//Привязал контекст этого обьекта к колбеку ивента
		if (ev.flag == 'back')
			this.container.addEventListener(ev.type, this.backGalleryEvent.bind(this));
		else
			this.container.addEventListener(ev.type, this.forwardGalleryEvent.bind(this));
	}

	// добавляет события enter/leave на галерею
	addEnterLeaveListener(ev) {
		this.container = document.querySelector(ev.container);
		this.findClass = ev.findClass;
		this.toggleClass = ev.toggleClass;
		let navShow = this.navigationOn.bind(this),
			navHide = this.navigationOff.bind(this);

		if (ev.type == 'mouseenter')
			this.container.addEventListener(ev.type, navShow);
		else
			this.container.addEventListener(ev.type, navHide);
	}

	// активирует стрелки навигации при наведении на галерею товара
	navigationOn(e) {
		Array.prototype.forEach.call(e.target.querySelectorAll(this.findClass),
			(i) => i.classList.add(this.toggleClass));
	}

	// убирает стрелки навигации
	navigationOff(e) {
		Array.prototype.forEach.call(e.target.querySelectorAll(this.findClass),
			(i) => i.classList.remove(this.toggleClass));
	}

	// пролистывает галерею назад
	backGalleryEvent() {
		this.currentImage();
		this.currentCircle();
		let isNotFirst = this.selectedCircle.parentNode.previousSibling;
		if (isNotFirst == null) {
			let numberOfPhoto = document.querySelectorAll(this.circleArray).length - 1,
				offset = -(this.currentPhotoWidth * numberOfPhoto),
				lastChild = this.currentPhoto.parentNode.childNodes.length - 2;
			this.removeActivity();
			this.selectedCircle.parentNode.parentNode.lastChild.childNodes[0].classList.add(this.activeCircleClass);
			this.currentPhoto.parentNode.childNodes[lastChild].classList.add(this.activePhotoClass);
			this.galleryWrapper.style.cssText = `width: ${this.currentContainerWidth}%;
		transition-duration: 0.5s; transform: translate3d(${offset}px, 0px, 0px);`
		}
		else {
			this.removeActivity();
			this.currentPhoto.previousSibling.classList.add(this.activePhotoClass);
			this.selectedCircle.parentNode.previousSibling.childNodes[0].classList.add(this.activeCircleClass);
			this.requiredOffset = +this.currentPhotoOffset + +this.currentPhotoWidth;
			this.galleryWrapperStyle();
		}
	}

	// листает галерею вперед
	forwardGalleryEvent() {
		this.currentImage();
		this.currentCircle();
		let isNotLast = this.selectedCircle.parentNode.nextSibling;
		if (isNotLast == null) {
			this.removeActivity();
			this.selectedCircle.parentNode.parentNode.firstChild.childNodes[0].classList.add(this.activeCircleClass);
			this.currentPhoto.parentNode.childNodes[1].classList.add(this.activePhotoClass);
			this.galleryWrapper.style.cssText = `width: ${this.currentContainerWidth}%; 
	transition-duration: 0.5s; transform: translate3d(0px, 0px, 0px);`
		}
		else {
			this.removeActivity();
			this.currentPhoto.nextSibling.classList.add(this.activePhotoClass);
			this.selectedCircle.parentNode.nextSibling.childNodes[0].classList.add(this.activeCircleClass);
			this.requiredOffset = +this.currentPhotoOffset - +this.currentPhotoWidth;
			this.galleryWrapperStyle();
		}
	}

	// добавляет события или создает звезды рейтинга
	changer(current) {
		if (current.event) {
			current.type == 'click' ? this.addClickListener(current) :
				current.type == 'mouseenter' || current.type == 'mouseleave' ?
					this.addEnterLeaveListener(current) : false;
		}
		if (current.stars)
			this.createStars(current);
	}

	// текущее фото
	currentImage() {
		let currentGallery = document.querySelectorAll(this.photoArray);
		for (let i of currentGallery) {
			if (i.classList.contains(this.activePhotoClass))
				this.currentPhoto = i
		}
		this.imageWidth();
	}

	// ширина текущего фото
	imageWidth() {
		this.currentPhotoWidth = this.currentPhoto.parentNode.parentNode.offsetWidth;
		this.imageOffset();
	}

	// смещение текущего фото
	imageOffset() {
		this.currentPhotoOffset = this.galleryWrapper.getAttribute('style').match(/(translate3d).(.?[0-9]+)/)[2];
		this.containerWidth();
	}

	// ширина контейнера фото
	containerWidth() {
		this.currentContainerWidth = this.galleryWrapper.getAttribute('style').match(/(width:) ([0-9]+)/)[2];
	}

	// текущая активная точка товара (под галереей)
	currentCircle() {
		let circles = document.querySelectorAll(this.circleArray);
		for (let i of circles) {
			if (i.classList.contains(this.activeCircleClass))
				this.selectedCircle = i
		}
	}

	// убирает текущую активную точку галереи
	removeActivity() {
		this.currentPhoto.classList.remove(this.activePhotoClass);
		this.selectedCircle.classList.remove(this.activeCircleClass);
	}

	// добавляет стиль смены фото
	galleryWrapperStyle() {
		this.galleryWrapper.style.cssText = `width: ${this.currentContainerWidth}%; 
			transition-duration: 0.5s; transform: translate3d(${this.requiredOffset}px, 0px, 0px);`
	}

	// создает звезды рейтинга
	createStars(current) {
		this.skip = current.checkElement.checkSkip;
		this.checkValue = current.checkElement.checkValue;
		this.element = document.createElement(current.create);
		current.class.forEach(el => this.element.classList.add(el));
		current.attribute.forEach((el, i) => this.element.setAttribute(el, current.attributeValue[i]));
		this.element.innerHTML = current.insertHTML;
		let checkLI = document.querySelectorAll(current.checkElement.checkLI[0]),
			li;
		checkLI.length ? li = checkLI : li = document.querySelectorAll(current.checkElement.checkLI[1]);
		this.addStars(li);
	}

	// добавляет звезды рейтинга
	addStars(li) {
		for (let e of li) {
			let cloned = this.element.cloneNode(true),
				price, a;
			if (e.querySelector(this.skip[0])) continue;
			a = e.getElementsByTagName('a')[0];
			price = a.querySelector(this.checkValue[0]);
			a.insertBefore(cloned, price);
		}
	}

	// запускает скрипт
	productRender(data) {
		data.forEach(el => {
			if (el.check) {
				if (super.checker(el.check, el.checkLimit, el.checkOR)) {
					if (el.checkNot) {
						if (!super.checker(el.checkNot, el.checkLimit)) {
							el.product ? this.changer(el) : super.placeChanger(el);
						}
					} else if (el.checkLength) {
						if (super.checker(el.checkLength, el.checkLengthLimit))
							el.product ? this.changer(el) : super.placeChanger(el);
					} else
						el.product ? this.changer(el) : super.placeChanger(el);
				}
			} else if (el.checkNot && !el.check) {
				if (!super.checker(el.checkNot, el.checkLimit))
					el.product ? this.changer(el) : super.placeChanger(el);
			} else
				el.product ? this.changer(el) : super.placeChanger(el);
		});
	}
};