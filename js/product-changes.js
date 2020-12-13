window.addEventListener('DOMContentLoaded', function () {
	const productData = [
		{
			'container': 'aside#secondary',
			'containerPosition': 0,
			'addClass': true,
			'class': ['hide-wmj'],
			'check': ['body.product-template-default'],
			'checkLimit': 0
		},
		{ //H1 container & stars for mobile
			'container': '.product.type-product',
			'containerPosition': 0,
			'element': '',
			'before': '.woocommerce-tabs.wc-tabs-wrapper',
			'beforePosition': 0,
			'create': 'div',
			'class': ['priceBox-wm-j'],
			'check': ['body.product-template-default'],
			'checkLimit': 0,
			'insertHTML': [{
				'container': 'div.priceBox-wm-j',
				'containerPosition': 0,
				'element': ['.summary.entry-summary'],
				'clone': false,
				'before': '',
				'create': '',
				'class': ''
			}]
		},
		{
			'container': '.product.type-product', //H1 for mobile
			'containerPosition': 0,
			'element': '.summary.entry-summary > h1',
			'before': '.woocommerce-product-gallery',
			'beforePosition': 0,
			'clone': true,
			'check': ['body.product-template-default'],
			'checkLimit': 0
		},
		{ //share box
			'container': '.summary.entry-summary',
			'containerPosition': 0,
			'element': '',
			'before': '',
			'create': 'div',
			'class': ['share-box-wmj'],
			'check': ['body.product-template-default'],
			'checkLimit': 0,
			'insertHTML': [{
				'container': 'div.share-box-wmj',
				'containerPosition': 0,
				'element': '',
				'clone': false,
				'before': '',
				'create': 'div',
				'class': ['messengerbox-wmj'],
				'insertHTML': `<p class='messenger-box-head-wmj'>Узнайте больше о товаре:</p>
					<div class="messenger-box-inner-wmj">
						<a id="mainpage-vibercontainer" href="//add?number=79264028318" alt="Viber">
							<span class="mainpage-viber-inner">
							<img src="/wp-content/uploads/2020/03/vibico.png" alt="Viber">
							</span>
						</a>
						<a id="mainpage-wacontainer" href="https://wa.me/79264028318" alt="WhatsApp">
							<span class="mainpage-wa-inner">
							<img src="/wp-content/uploads/2020/03/whatico.png" alt="WhatsApp">
							</span>
						</a>
					</div>`,
			}, {
				'container': 'div.share-box-wmj',
				'containerPosition': 0,
				'element': '',
				'clone': false,
				'before': '',
				'create': 'p',
				'class': ['share-box-wmj-header'],
				'innerText': 'Сохранить этот мотор:',
			}, {
				'container': 'div.share-box-wmj',
				'containerPosition': 0,
				'element': '',
				'clone': false,
				'before': '',
				'create': 'script',
				'class': '',
				'attribute': ['src'],
				'attributeValue': ['https://yastatic.net/es5-shims/0.0.2/es5-shims.min.js']
			}, {
				'container': 'div.share-box-wmj',
				'containerPosition': 0,
				'element': '',
				'clone': false,
				'before': '',
				'create': 'script',
				'class': '',
				'attribute': ['src'],
				'attributeValue': ['https://yastatic.net/share2/share.js']
			}, {
				'container': 'div.share-box-wmj',
				'containerPosition': 0,
				'element': '',
				'clone': false,
				'before': '',
				'create': 'div',
				'class': ['ya-share2'],
				'attribute': ['data-services'],
				'attributeValue': ['vkontakte,facebook,odnoklassniki,twitter,viber,whatsapp,telegram']
			},]
		},
		{ //stars is not exist
			'container': '.summary.entry-summary',
			'containerPosition': 0,
			'element': '.comment-form-rating',
			'clone': true,
			'before': '.summary.entry-summary p.price',
			'beforePosition': 0,
			'check': ['body.product-template-default', '.comment-form-rating'],
			'checkLimit': 0,
			'checkNot': ['.woocommerce-product-rating'],
			'insertHTML': [{
				'container': '.comment-form-rating',
				'containerPosition': 0,
				'element': '',
				'clone': false,
				'before': '',
				'create': 'a',
				'class': ['woocommerce-review-link'],
				'attribute': ['href', 'rel'],
				'attributeValue': ['#reviews', 'nofollow'],
				'insertHTML': `<span>(Оставьте отзыв)</span>`
			}, {
				'container': '.product.type-product',
				'containerPosition': 0,
				'element': ['.comment-form-rating'],
				'clone': true,
				'before': '.woocommerce-product-gallery',
				'beforePosition': 0,
				'create': '',
				'class': ''
			}]
		},
		{ //stars is exist
			'container': '.summary.entry-summary',
			'containerPosition': 0,
			'element': '.woocommerce-product-rating',
			'clone': false,
			'before': '.summary.entry-summary p.price',
			'beforePosition': 0,
			'check': [
				'body.product-template-default',
				'.comment-form-rating',
				'.woocommerce-product-rating'
			],
			'checkLimit': 0,
			'insertHTML': [{
				'container': '.product.type-product',
				'containerPosition': 0,
				'element': ['.woocommerce-product-rating'],
				'clone': true,
				'before': '.woocommerce-product-gallery',
				'beforePosition': 0,
				'create': '',
				'class': ''
			}]
		},
		{ //Remove "your rate" from mobile
			'container': '.comment-form-rating label',
			'containerPosition': 0,
			'addClass': true,
			'class': ['hide-wmj'],
			'check': ['body.product-template-default'],
			'checkLimit': 0
		},
		{ //Remove "your rate" from desktop
			'container': '.comment-form-rating label',
			'containerPosition': 1,
			'addClass': true,
			'class': ['hide-wmj'],
			'check': ['body.product-template-default'],
			'checkLimit': 0,
			'checkNot': ['.woocommerce-product-rating'],
		},
		/* 	{
				'container': '.product.type-product', //stars is not exist for mobile
				'containerPosition': 0,
				'element': '.comment-form-rating',
				'before': '.woocommerce-product-gallery',
				'beforePosition': 0,
				'clone': true,
				'check': ['body.product-template-default', '.comment-form-rating'],
				'checkLimit': 0,
				'checkNot': ['.woocommerce-product-rating']
			}, 
		{
			'container': '.product.type-product', //stars is exist for mobile
			'containerPosition': 0,
			'element': '.woocommerce-product-rating',
			'before': '.woocommerce-product-gallery',
			'beforePosition': 0,
			'clone': true,
			'check': [
				'body.product-template-default',
				'.comment-form-rating',
				'.woocommerce-product-rating'
			],
			'checkLimit': 0
		}, */
		{ //back arrow
			'container': '.product.type-product .woocommerce-product-gallery',
			'containerPosition': 0,
			'element': '',
			'before': '.woocommerce-product-gallery .flex-viewport',
			'beforePosition': 0,
			'create': 'div',
			'class': ['loop-arrow-wmj', 'backarrow-wmj'],
			'check': ['body.product-template-default'],
			'checkLimit': 0,
			'checkLength': ['.flex-control-nav.flex-control-paging li'],
			'checkLengthLimit': 1,
			'insertHTML': [{
				'container': 'div.backarrow-wmj',
				'containerPosition': 0,
				'element': '',
				'clone': false,
				'before': '',
				'create': 'a',
				'class': ''
			}]
		},
		{ //forward arrow
			'container': '.product.type-product .woocommerce-product-gallery',
			'containerPosition': 0,
			'element': '',
			'before': '.woocommerce-product-gallery ol.flex-control-nav',
			'beforePosition': 0,
			'create': 'div',
			'class': ['loop-arrow-wmj', 'forwarrow-wmj'],
			'check': ['body.product-template-default'],
			'checkLimit': 0,
			'checkLength': ['.flex-control-nav.flex-control-paging li'],
			'checkLengthLimit': 1,
			'insertHTML': [{
				'container': 'div.forwarrow-wmj',
				'containerPosition': 0,
				'element': '',
				'clone': false,
				'before': '',
				'create': 'a',
				'class': ''
			}]
		},
		{
			'event': true,
			'type': 'click',
			'container': 'div.backarrow-wmj',
			'flag': 'back',
			'eventFor': '',
			'photoArray': '.woocommerce-product-gallery__wrapper div',
			'activePhotoClass': 'flex-active-slide',
			'circleArray': 'ol.flex-control-nav li a',
			'activeCircleClass': 'flex-active',
			'galleryWrapper': '.woocommerce-product-gallery__wrapper',
			'product': true,
			'check': ['body.product-template-default'],
			'checkLimit': 0,
			'checkLength': ['.flex-control-nav.flex-control-paging li'],
			'checkLengthLimit': 1
		},
		{
			'event': true,
			'type': 'click',
			'container': 'div.forwarrow-wmj',
			'flag': 'forward',
			'eventFor': '',
			'photoArray': '.woocommerce-product-gallery__wrapper div',
			'activePhotoClass': 'flex-active-slide',
			'circleArray': 'ol.flex-control-nav li a',
			'activeCircleClass': 'flex-active',
			'galleryWrapper': '.woocommerce-product-gallery__wrapper',
			'product': true,
			'check': ['body.product-template-default'],
			'checkLimit': 0,
			'checkLength': ['.flex-control-nav.flex-control-paging li'],
			'checkLengthLimit': 1
		},
		{
			'event': true,
			'type': 'mouseenter',
			'container': '.product.type-product .woocommerce-product-gallery',
			'findClass': '.loop-arrow-wmj',
			'toggleClass': 'visible-wmj',
			'product': true,
			'check': ['body.product-template-default'],
			'checkLimit': 0,
			'checkLength': ['.flex-control-nav.flex-control-paging li'],
			'checkLengthLimit': 1
		},
		{
			'event': true,
			'type': 'mouseleave',
			'container': '.product.type-product .woocommerce-product-gallery',
			'findClass': '.loop-arrow-wmj',
			'toggleClass': 'visible-wmj',
			'product': true,
			'check': ['body.product-template-default'],
			'checkLimit': 0,
			'checkLength': ['.flex-control-nav.flex-control-paging li'],
			'checkLengthLimit': 1
		},
		{
			'container': '', //
			'containerPosition': 0,
			'element': '',
			'before': '#main ul.products',
			'beforePosition': 0,
			'stars': true,
			'create': 'div',
			'class': ['star-rating-empty-wm'],
			'attribute': ['role'],
			'attributeValue': ['img'],
			'check': true,
			'checkOR': ['.wm-subcategory-items', 'section.related'],
			'checkLimit': 0,
			'checkElement': {
				'checkLI': ['.wm-subcategory-items li', 'section.related ul li'],
				'checkSkip': ['.star-rating'],
				'checkValue': ['.price']
			},
			'product': true,
			'insertHTML':
				`<span style='width:100%'><strong class="rating">0</strong></span>`
		}

	];

	let product = new Product();
	product.productRender(productData);
});