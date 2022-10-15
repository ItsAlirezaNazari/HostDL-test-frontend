(async () => {
	// init
	await render('main');

	document.querySelector('.file-types').addEventListener('click', async function (event) {
		let param;

		if (event.target.classList.contains('docx-icon')) param = 'docx';
		else if (event.target.classList.contains('psd-icon')) param = 'psd';
		else return;

		await render(param);
	});

	document.querySelector('.other-files').addEventListener('click', async function (event) {
		if (event.target.classList.contains('other-file') && !event.target.classList.contains('more-files')) {
			let id = event.target.dataset.id;
			await renderAFileData(id);
		}
	});
})();
