window.onload = () => {
	const user = document.getElementById('userForm');
	const exercise = document.getElementById('exerciseForm');

	const notyf = new Notyf({
		duration: 5000,
		position: {
			x: 'right',
			y: 'top',
		},
	});

	user.addEventListener('submit', e => {
		e.preventDefault();

		if (user.checkValidity() === false) return;

		const body = new URLSearchParams({ username: user.username.value });

		axios
			.post(user.action, body)
			.then(res => {
				const data = res.data;
				const notification = notyf.success(
					`New User ${data.username} created! Click to copy ID`,
				);

				notification.on('click', ({ target, event }) => {
					// Copy the user id to the clipboard
					window.navigator.clipboard.writeText(data._id);
					notyf.success('User ID copied!');
				});
			})
			.catch(e => {
				notyf.error(e.response.data.error);
			});
	});

	exercise.addEventListener('submit', e => {
		e.preventDefault();

		if (exercise.checkValidity() === false) return;

		const body = new URLSearchParams({
			user: exercise.user.value,
			description: exercise.description.value,
			duration: exercise.duration.value,
			date: exercise.date.value,
		});

		axios
			.post(exercise.action, body)
			.then(res => {
				notyf.success(`New Exercise created!`);
			})
			.catch(e => {
				notyf.error(e.response.data.error);
			});
	});
};
