async function service(param) {
	try {
		let url = 'https://541.ir/fronttest/fronttest.php';
		let method = 'POST';

		let response = await fetch(url, {
			method,
			body: JSON.stringify({ param }),
		});

		if (response.status === 200) {
			let data = await response.json();
			return data;
		}
	} catch (err) {
		console.log(err);
	}
}

// (async () => {
// 	let data = await service('main');

// })();

// Init =>
let data = {
	id: 1,
	title: 'فایل 1',
	publisher: 'سایت رزومیتو',
	extension: 'docx',
	editor: 'آفیس ورد (Office Word)',
	categories:
		"<a href='http://resumito.net/blog/category/job-interview'>مصاحبه و  استخدام</a>, <a href='http://resumito.net/blog/category/job-success'>موفقیت شغلی</a>",
	post: "<a href='http://resumito.net/blog/%D9%86%D8%AD%D9%88%D9%87-%D9%86%D9%88%D8%B4%D8%AA%D9%86-%D8%B1%D8%B2%D9%88%D9%85%D9%87-%DA%A9%D8%A7%D8%B1%DB%8C'>نحوه نوشتن رزومه کاری</a>",
	edit: 'ندارد',
	print: 'دارد',
	size: '0.11',
	description: 'فایل اول',
	price: '10000',
	discounted: '1000',
	items: {
		'فایل 1': 1,
		'فایل 2': 2,
	},
};

function commaFormatted(amount) {
	return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getHTML(data) {
	let table = `
		<div class="table-row">
			<div class="table-cell header-title">${data.title}</div>
		</div>

		<div class="table-row">
			<div class="table-head">ناشر</div>
			<div class="table-cell">${data.publisher}</div>
			<div class="table-head">قابلیت ویرایش</div>
			<div class="table-cell">${data.edit}</div>
		</div>

		<div class="table-row">
			<div class="table-head">پسوند فایل</div>
			<div class="table-cell">${data.extension}</div>
			<div class="table-head">قابلیت پرینت</div>
			<div class="table-cell">${data.print}</div>
		</div>

		<div class="table-row">
			<div class="table-head">نرم افزار ویرایش</div>
			<div class="table-cell">${data.editor}</div>
			<div class="table-head">حجم فایل</div>
			<div class="table-cell">${data.size} مگابایت</div>
		</div>

		<div class="table-row">
			<div class="table-head head-100">دسته بندی</div>
			<div class="table-cell">${data.categories}</div>
		</div>

		<div class="table-row">
			<div class="table-head head-100">مقاله آموزشی</div>
			<div class="table-cell">${data.post}</div>
		</div>

		<div class="table-row">
			<div class="table-head head-100">توضیحات</div>
			<div class="table-cell description">
				<ul>
					<li>فایل مورد نظر بدون هر گونه تگ تبلیغاتی می باشد.</li>
					<li>
						پس از دانلود فایل، آن را از حالت فشرده خارج کرده و سپس با استفاده از نسخه های جدید نرم
						افزار (Office Word) باز کرده و ویرایش نمایید.
					</li>
					<li>این فایل امکان ذخیره به صورت فایل PDF را نیز دارد.</li>
				</ul>
			</div>
		</div>
	`;

	let price = `
		<p class="real-price">
			<del class="price">${commaFormatted(data.price)}</del>
			<span class="unit">تومان</span>
		</p>

		<p class="discounted-price">
			<span class="price">${commaFormatted(data.discounted)}</span>
			<span class="unit">تومان</span>
		</p>
	`;

	return { table, price };
}

function render() {
	let { table, price } = getHTML(data);

	document.querySelector('.current-file-info .table').insertAdjacentHTML('afterbegin', table);
	document.querySelector('.sale .pay-container .price-container').insertAdjacentHTML('afterbegin', price);
}

document.addEventListener('DOMContentLoaded', () => {
	render();

	document.querySelector('.docx-icon').addEventListener('click', () => {});
	document.querySelector('.psd-icon').addEventListener('click', () => {});
});
