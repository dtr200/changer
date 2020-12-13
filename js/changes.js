window.addEventListener('DOMContentLoaded', function () {
	const myData = [
		//Search
		{
			'container': '#site-branding .wrap',
			'containerPosition': 0,
			'element': '#search-box',
			'before': '.wrap .header-right',
			'beforePosition': 0,
			'clone': false
		},
		{
			'container': '.widget.woocommerce.widget_product_search',
			'containerPosition': 0,
			'element': '#yith_woocommerce_ajax_search-3',
			'before': '',
			'clone': false
		},
		{
			'container': 'form#yith-ajaxsearchform div',
			'containerPosition': 0,
			'element': '',
			'before': '',
			'create': 'button',
			'id': 'yith-searchsubmit-wm',
			'class': '',
			'attribute': ['type'],
			'attributeValue': ['submit']
		},
		{
			'container': '#site-branding', //mobile search
			'containerPosition': 0,
			'element': '#yith_woocommerce_ajax_search-3',
			'before': '',
			'clone': true
		},
		{
			'container': '.wrap .main-header', //Phone number
			'containerPosition': 0,
			'element': '',
			'before': '',
			'create': 'div',
			'class': ['phoneWmPlace'],
			'insertHTML':
				`<span class="wmOpeningBox">
						<span>пн-вс</span>
						<span class="wmOpeningHours">9:00 - 21:00</span>
					</span>
				<span>+7 (926) 402-83-18</span>`
		},
		{
			'container': '#site-branding .wrap', //Mobile header
			'containerPosition': 0,
			'element': '',
			'before': '#site-detail',
			'beforePosition': 0,
			'create': 'div',
			'class': ['mobile-header-wmj'],
			'insertHTML': [{
				'element': ['#site-detail', '.wrap .header-right'],
				'clone': true,
				'before': '',
				//'container': ''
			}]
		},
		{
			'container': '.wrap .header-right', //Callback box
			'containerPosition': 0,
			'element': '',
			'before': '.wrap .header-right .cart-box',
			'beforePosition': 0,
			'create': 'div',
			'class': ['callmebox'],
			'insertHTML':
				`<div class="callmebox-back">
					<a href="tel:+79264028318">
						<img src="/wp-content/uploads/2020/03/whitecall.png" alt="Позвонить"></img>
					</a>
				</div>`
		},
		{
			'container': '#main', //Subcategory separator
			'containerPosition': 0,
			'element': '',
			'before': '',
			'beforePosition': '',
			'create': 'ul',
			'class': ['products', 'columns-3', 'wm-subcategory-items'],
			'insertHTML': '',
			'categoryLi': 'li.type-product',
			'separate': true,
			'checkUL': 'body.product-template-default'
		},
		{
			'ul': '#main > ul',
			'location': false, //add className to ul based on url search tail
			'class': ['brandlist-wmj'],
			'filtredClass': [],
			'checkUL': 'body.product-template-default',
			'contains': 'wm-subcategory-items'
		},
		{
			'ul': '#main > ul',
			'location': true, //add className to ul based on url search tail
			'class': [],
			'filtredClass': ['brandlist-filtred', 'filtred-wmj'],
			'checkUL': 'body.product-template-default',
			'contains': 'wm-subcategory-items'
		},
		{
			'classElement': 'ul.wm-subcategory-items', //Add class with conditions
			'exist': ['body.home', 'body.product-template-default'],
			'class': ['subcat-wmj']
		},
		{
			'container': '#main', //
			'containerPosition': 0,
			'element': '',
			'before': '#main ul.products',
			'beforePosition': 0,
			'create': 'div',
			'class': ['sorting-wmj'],
			'check': ['form.woocommerce-ordering'],
			'checkLimit': 0,
			'insertHTML': [{
				'container': 'div.sorting-wmj',
				'containerPosition': 0,
				'element': '',
				'clone': false,
				'before': '',
				'create': 'img',
				'class': ['mobile-filter-img-wmj'],
				'attribute': ['src', 'alt'],
				'attributeValue': ['/wp-content/uploads/2020/03/sliders22.png', 'Фильтры']
			},
			{
				'container': 'div.sorting-wmj',
				'containerPosition': 0,
				'element': '',
				'clone': false,
				'before': '',
				'create': 'div',
				'class': ['sorting-inner-wmj'],
				'insertHTML': [{
					'container': 'div.sorting-inner-wmj',
					'containerPosition': 0,
					'element': '',
					'clone': false,
					'create': 'p',
					'class': ['sorting-wmj-txt'],
					'innerText': 'Сортировать:',
					'event': {
						'type': 'click',
						'container': '.mobile-filter-img-wmj',
						'eventFor': '.wpfWoofiltersWidget',
						'toggleClass': 'hide-wmj'
					}
				}, {
					'container': 'div.sorting-inner-wmj',
					'containerPosition': 0,
					'element': ['form.woocommerce-ordering'],
					'clone': false,
					'create': '',
				}]
			}]
		},
		{
			'container': '.ad-banner-one-wrap .wpfWoofiltersWidget',
			'containerPosition': 0,
			'addClass': true,
			'class': ['hide-wmj'],
			'check': ['.ad-banner-one-wrap .wpfWoofiltersWidget'],
			'checkLimit': 0
		},
		{
			'container': '#main',
			'containerPosition': 0,
			'element': '.ad-banner-one-wrap .wpfWoofiltersWidget',
			'before': '#main ul.products',
			'beforePosition': 0,
			'clone': false,
			'check': ['form.woocommerce-ordering', '.ad-banner-one-wrap .wpfWoofiltersWidget'],
			'checkLimit': 0
		},
		{
			'container': '#main',
			'containerPosition': 0,
			'element': 'nav.woocommerce-pagination',
			'clone': false,
			'check': ['nav.woocommerce-pagination'],
			'checkLimit': 0
		},
		/** Remove breadcrumbs from main & support pages */
		{
			'container': '#primary > div.breadcrumb > span',
			'containerPosition': 0,
			'addClass': true,
			'class': ['main-breadcrumb-j'],
			'check': ['body.home'],
			'checkLimit': 0
		},
		{
			'container': '#main header div.breadcrumb',
			'containerPosition': 0,
			'addClass': true,
			'class': ['main-breadcrumb-j'],
			'check': ['.page-template-default'],
			'checkLimit': 0
		},
		{
			'container': '#primary div.breadcrumb span:first-child',
			'containerPosition': 0,
			'addText': true,
			'content': ''
		},
		{
			'container': 'footer .copyright',
			'containerPosition': 0,
			'deleteNum': [2, 2, 3],
			'footer': true
		}
	];

	let main = new Changer();
	main.render(myData);
});