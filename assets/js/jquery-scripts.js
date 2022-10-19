// Helpers
function service(param) {
	return $.ajax('https://541.ir/fronttest/fronttest.php', {
		method: 'POST',
		data: { param },
		error: function (err) {
			console.log(err);
		},
	});
}

function commaFormatted(amount) {
	return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function getTable(data) {
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

	return table;
}

function getOtherFiles(data) {
	let otherFiles = `
		<a href="#" class="more">
			<div class="thumb">
				<img src="./assets/images/resume.png" alt="فایل دیگر" class="other-file more-files" />

				<i class="more-icon">
					<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
						<rect fill="none" height="256" width="256" />
						<path
							d="M156,128a28,28,0,1,1-28-28A28.1,28.1,0,0,1,156,128ZM48,100a28,28,0,1,0,28,28A28.1,28.1,0,0,0,48,100Zm160,0a28,28,0,1,0,28,28A28.1,28.1,0,0,0,208,100Z"
						/>
					</svg>
				</i>
			</div>
		</a>

		<a href="#">
			<div class="thumb">
				<img src="./assets/images/resume.png" alt="فایل دیگر" class="other-file" data-id="${data.items[0]}" />
			</div>
		</a>

		<a href="#">
			<div class="thumb">
				<img src="./assets/images/resume.png" alt="فایل دیگر" class="other-file" data-id="${data.items[1]}" />
			</div>
		</a>
	`;

	return otherFiles;
}

function getPrice(data) {
	let price = `
		<p class="real-price ${data.discounted ? 'discounted' : ''}">
			<del class="price">${commaFormatted(data.price)}</del>
			<span class="unit">تومان</span>
		</p>
	`;

	if (data.discounted)
		price += `
			<p class="discounted-price">
				<span class="price">${commaFormatted(data.discounted)}</span>
				<span class="unit">تومان</span>
			</p>
		`;

	return price;
}

function getHTML(data) {
	let table = getTable(data);

	let otherFiles = getOtherFiles(data);

	let price = getPrice(data);

	return { table, price, otherFiles };
}

async function render(param) {
	let data = await service(param);

	data = data.item_data ? data.item_data : data;
	data.items = param === 'psd' ? [3, 4] : [1, 2];

	let { table, price, otherFiles } = getHTML(data);

	// document.querySelector('.current-file-info .table').innerHTML = table;
	// document.querySelector('.sale .price-container').innerHTML = price;
	// document.querySelector('.files .other-files').innerHTML = otherFiles;

   $('.current-file-info .table').html(table);
   $('.sale .price-container').html(price);
   $('.files .other-files').html(otherFiles);
}

async function renderAFileData(param) {
	let data = await service(param);
	let table = getTable(data);
	let price = getPrice(data);

	// document.querySelector('.current-file-info .table').innerHTML = table;
	// document.querySelector('.sale .price-container').innerHTML = price;

   $('.current-file-info .table').html(table);
   $('.sale .price-container').html(price);
}


// Main
$(document).ready(async function () {
   await render('main');

   $('.file-types').on('click', async function (event) {
		let param;

		if ($(event.target).hasClass('docx-icon')) param = 'docx';
		else if ($(event.target).hasClass('psd-icon')) param = 'psd';
		else return;

		await render(param);
	});

	$('.other-files').on('click', async function (event) {
		if ($(event.target).hasClass('other-file') && !$(event.target).hasClass('more-files')) {
			let id = $(event.target).data('id');
			await renderAFileData(id);
		}
	});
});
