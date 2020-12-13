// Изменения для всего шаблона

class Changer {
	constructor() {
		this.current = '';
		this.container = '';
		this.element = '';
		this.listenerElement = '';
		this.beforeElement = '';
		this.beforePosition = '';
		this.cloning = '';
		this.createdElement = '';
		this.check = '';
		this.id = '';
		this.htmlClass = '';
		this.filtredClass = '';
		this.categoryLi = '';
		this.ul = '';
		this.event = '';
		this.contains = '';
		this.deleteNum = '';
		this.insert = '';
		this.currentElement = '';
		this.attribute = '';
		this.attributeValue = '';
		this.innerText = '';
	};

	// собирает переданные данные, выбирает по какому пути идти
	placeChanger(el) {
		this.current = el;
		this.container = document.querySelectorAll(el.container)[el.containerPosition];
		this.element = el.element;
		this.beforeElement = el.before;
		this.beforePosition = el.beforePosition;
		this.cloning = el.clone;
		this.id = el.id;
		this.htmlClass = el.class;
		this.filtredClass = el.filtredClass;
		this.categoryLi = el.categoryLi;
		this.ul = el.ul;
		this.event = el.event;
		this.contains = el.contains;
		this.deleteNum = el.deleteNum;
		this.insert = el.insertHTML;
		this.attribute = el.attribute;
		this.attributeValue = el.attributeValue;
		this.innerText = el.innerText;

		// делает второй экземпляр
		if (el.element) {
			this.clone();
		};

		// создает новый элемент
		if (el.create) {
			this.createdElement = document.createElement(el.create);
			this.setHTML();
			if (el.create == 'ul') {
				this.check = document.querySelector(el.checkUL);
				!this.check ? this.createCategory() : false;
			}
			this.paste(this.createdElement);
			el.event ? this.addClickListener() : false;
		};

		// добавляет класс к ul в зависимости какая текущая страница
		if (el.ul) {
			if (location.search && el.location)
				this.addClassNameToUl(el.filtredClass);
			if (!location.search && !el.location)
				this.addClassNameToUl(el.class);
		}

		// добавляет класс к ul если на странице отсутствуют элементы из el.exist
		if (!el.element && !el.create && el.classElement) {
			if (!el.exist.every(el => document.querySelector(el))) {
				this.createdElement = document.querySelector(el.classElement);
				this.setHTML();
			}
		}

		// добавляет класс элементу
		if (el.addClass) {
			this.createdElement = this.container;
			this.setHTML();
		}

		// добавляет текст
		if (el.addText) {
			this.container.nextSibling.textContent = el.content;
		}

		// коррекция футера
		if (el.footer) {
			this.removeFooter();
		}
	};

	// копирует переданный элемент или сохраняет в this.currentElement и вызывает this.paste
	clone() {
		this.currentElement = document.querySelector(this.element);
		this.cloning ? this.currentElement = this.currentElement.cloneNode(true) : false;
		this.paste(this.currentElement);
	}

	// вставляет элемент
	paste(element) {
		this.beforeElement ?
			this.container.insertBefore(element, document.querySelectorAll(this.beforeElement)[this.beforePosition]) :
			this.container.append(element);

		if (this.current)
			this.insert ? this.insertHTML() : false;
	};

	// устанавливает атрибуты, добавляет текст
	setHTML() {
		this.id ? this.createdElement.id = this.id :
			this.htmlClass ? this.htmlClass.forEach(el =>
				this.createdElement.classList.add(el)) : false;

		this.attribute ? this.attribute.forEach((elem, i) =>
			this.createdElement.setAttribute(elem, this.attributeValue[i])) : false;

		this.innerText ? this.createdElement.innerText = this.innerText : false;
	};

	// вставляет HTML
	insertHTML() {
		if (typeof this.insert == 'object') {
			this.insert.forEach(outerObject => {

				if (outerObject.element) {
					outerObject.element.forEach(innerClass => {
						if (outerObject.container) {
							this.current = null;
							this.element = innerClass;
							this.container = document.querySelector(outerObject.container);
							this.cloning = outerObject.clone;
							this.beforeElement = outerObject.before;
							this.beforePosition = outerObject.beforePosition;
							this.clone();
						} else {
							this.current = null;
							this.element = innerClass;
							this.container = this.createdElement;
							this.cloning = outerObject.clone;
							this.beforeElement = outerObject.before;
							this.beforePosition = outerObject.beforePosition;
							this.clone();
						}
					})
				}

				if (outerObject.create) {
					this.placeChanger(outerObject);
				}
			})

		} else {
			this.createdElement.innerHTML = this.insert;
		}
	};

	// разделяет один ul на несколько
	createCategory() {
		Array.from(document.querySelectorAll(this.categoryLi))
			.forEach(el => this.createdElement.append(el));
	};

	// добавляет класс к определенным UL
	addClassNameToUl(className) {
		let ul = document.querySelectorAll(this.ul);

		for (let i of ul) {
			let contains = i.classList.contains(this.contains);
			if (!contains)
				i.classList.add(className[0]);
			if (contains && this.filtredClass.length > 1)
				i.classList.add(className[1]);
		}
	};

	// добавляет переключатель класса
	addClickListener() {
		const container = document.querySelector(this.event.container);
		const callback = this.toggleClass.bind(this.current);
		container.addEventListener(this.event.type, callback);
	};

	// переключатель класса
	toggleClass() {
		console.log(document.querySelector(this.event.eventFor))
		this.listenerElement = document.querySelector(this.event.eventFor);
		this.listenerElement.classList.toggle(this.event.toggleClass);
	}

	// проверяет необходимость скрипта на текущей странице
	checker(list, limit, orList) {
		if (orList)
			return orList.find(el => document.querySelectorAll(el).length > limit);
		else
			return list.every(el => document.querySelectorAll(el).length > limit);
	};

	// коррекция футера
	removeFooter() {
		this.deleteNum.forEach(i => {
			let p = this.container.childNodes[i];
			p.parentNode.removeChild(p);
		})
	};

	// запускает скрипт
	render(data) {
		data.forEach(el => {
			// проверка необходимости скрипта на текущей странице
			if (el.check)
				this.checker(el.check, el.checkLimit) ? this.placeChanger(el) : false;
			else
				this.placeChanger(el);
		});
	};
};