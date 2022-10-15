async function service(param) {
	try {
		let url = 'https://541.ir/fronttest/fronttest.php';
		let method = 'POST';
		const params = new URLSearchParams();
		params.append('param', param);

		let response = await fetch(url, {
			method,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			},
			body: params,
		});

		if (response.status === 200) {
			let data = await response.json();
			return data;
		}
	} catch (err) {
		console.log(err);
	}
}

function toAscii(str) {
	var escapable = /[\\\"\x00-\x1f\x7f-\uffff]/g,
	meta = {    // table of character substitutions
		 '\b': '\\b',
		 '\t': '\\t',
		 '\n': '\\n',
		 '\f': '\\f',
		 '\r': '\\r',
		 '"' : '\\"',
		 '\\': '\\\\'
	};

	function quote(string) {

	// If the string contains no control characters, no quote characters, and no
	// backslash characters, then we can safely slap some quotes around it.
	// Otherwise we must also replace the offending characters with safe escape
	// sequences.

		escapable.lastIndex = 0;
		return escapable.test(string) ?
			'"' + string.replace(escapable, function (a) {
				var c = meta[a];
				return typeof c === 'string' ? c :
						'\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
			}) + '"' :
			'"' + string + '"';
	}

return quote(str);
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

	document.querySelector('.current-file-info .table').innerHTML = table;
	document.querySelector('.sale .price-container').innerHTML = price;
	document.querySelector('.files .other-files').innerHTML = otherFiles;
}

async function renderAFileData(param) {
	let data = await service(param);
	let table = getTable(data);
	let price = getPrice(data);

	document.querySelector('.current-file-info .table').innerHTML = table;
	document.querySelector('.sale .price-container').innerHTML = price;
}
