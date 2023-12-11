export function getAccessToken() {
	const oldToken = localStorage.getItem("access_token");
	return oldToken;
}

export async function refreshToken() {
	const refresh_token = localStorage.getItem("refresh_token");
	if (refresh_token) {
		const response = await fetch("http://142.126.176.248:8000/api/token/refresher/", {
			"method": "POST",
			"headers": {
				"Content-Type": "application/json; charset=utf-8"
			},
			"body": JSON.stringify({
				refresh: refresh_token
			}),
		});

		const { access } = await response.json();

		console.log(access);

		localStorage.setItem("access_token", access);
	}
}

export async function login(email, password) {

	const response = await fetch("http://142.126.176.248:8000/api/token/", {
		"method": "POST",
		"headers": {
			"content-type": "application/json; charset=utf-8"
		},
		"body": JSON.stringify({
			email: email,
			password: password
		}),
	});

	const { refresh, access } = await response.json();

	localStorage.setItem("access_token", access);
	localStorage.setItem("refresh_token", refresh);

}

export function logout() {
	localStorage.removeItem("access_token");
	localStorage.removeItem("refresh_token");
}
