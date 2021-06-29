//Déclaration
let cart = JSON.parse(localStorage.getItem("panier"));
// console.log(cart);

// DISPLAY ARTICLES
let list = document.getElementById("article-list");

//BUTTON DELETE
const deleteArticle = el => {
	if (el.classList.contains("delete1")) {
		el.parentElement.parentElement.remove();
		// localStorage.removeItem("panier");
	}
};

//BUTTON DELETE LOCALSTORAGE

//BUTTON DELETE CLICK
list.addEventListener("click", e => {
	e.preventDefault();
	deleteArticle(e.target);
	deleteArticleLocalstorage(e.target.parentElement.previousElementSibling.textContent);
});

/************ LOCALSTORAGE REMOVE */
const deleteArticleLocalstorage = name => {
	const cart = JSON.parse(localStorage.getItem("panier"));
	cart.forEach((teddy, index) => {
		if ((teddy.name = name)) {
			cart.splice(index, 1);
		}
	});
	localStorage.setItem("panier", JSON.stringify(cart));

	//DOWNLOAD PAGE AFTER REMOVE
	// showAlert("L'article a été bien supprimé", "info");
	window.location.href = "cart.html";
};

//SI LE PANIER EST VIDE

if (cart === null) {
	console.log("vide");
	const emptyCart = `
	<div>
	<div> Le panier est vide </div>
	</div>
	`;
	list.innerHTML = emptyCart;
} else {
	let notEmpty = [];
	// console.log("Pas vide");

	for (i = 0; i < cart.length; i++) {
		// console.log(cart.length);
		// console.log(cart);

		console.log(cart[i].id);

		notEmpty =
			notEmpty +
			`
		<tr>
		<td> ${cart[i].quantity}  </td>
		<td>${cart[i].name} </td>
		<td>${(cart[i].price / 100).toFixed(2).replace(".", ",")} € </td>
		<td>${cart[i].color}</td>
		<td> <a href="#" class="btn btn-danger btn-sm delete1">X</a></td>
		</tr>
		`;
	}

	if (i == cart.length) {
		list.innerHTML = notEmpty;
	}
}

//BUTTON CLEAR CART
const deleteCart = document.createElement("button");
deleteCart.className = "clearCart btn btn-warning mt-4 ";
deleteCart.textContent = "vider le panier ";
list.appendChild(deleteCart);

const clearCart = document.querySelector(".clearCart");
clearCart.addEventListener("click", () => {
	if (confirm(` Souhaitez-vous vider votre panier?`)) {
		localStorage.removeItem("panier");
		window.location.href = "cart.html";
		showAlert(" Votre panier a été vidé", "success text-center");
	} else {
		window.location.href = "#";
		showAlert("Votre produit n'a pas été vidé", "danger text-center");
	}
});

//ShowAlert function
function showAlert(message, className) {
	const div = document.createElement("div");
	div.className = ` alert alert-${className}`;
	div.appendChild(document.createTextNode(message));
	const validate = document.getElementById("btn_validate");
	validate.appendChild(div);
	setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

/**** CALCUL */
//CALCUL DU PRIX TOTAL
let priceCart = [];
for (let i = 0; i < cart.length; i++) {
	priceCartTotal = cart[i].price * cart[i].quantity;
	priceCart.push(priceCartTotal);
}

//Sum with REDUCER
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const priceCartTotalCalcul = priceCart.reduce(reducer, 0) / 100;

//INTEGRATION DES CALCULS
const productTotalAmt = document.getElementById("product_total_amt");
productTotalAmt.innerHTML = parseInt(priceCartTotalCalcul);

const shippingCharge = document.getElementById("shipping_charge");
shippingCharge.innerHTML = (parseInt(productTotalAmt.innerHTML) * 5) / 100;

const totalCartAmt = document.getElementById("total_cart_amt");
totalCartAmt.innerHTML = (parseInt(productTotalAmt.innerHTML) * 105) / 100;
const totalPrice = totalCartAmt.innerHTML;

//Calcul Discount Code
const discountCode = document.getElementById("discount_code1");
const errorTrw = document.getElementById("error_trw");
document.getElementById("discount_code").addEventListener("click", () => {
	let totalCartAmtCurr = totalCartAmt.innerHTML;

	if (discountCode.value === "soul31") {
		let new_totalCartAmtCurr = totalCartAmtCurr - 15;
		totalCartAmt.innerHTML = new_totalCartAmtCurr;
		errorTrw.innerHTML = "Prise en compte du code soul31";
		showAlert("Bravo, Le code promo est valide", "success");
		discountCode.value = "";
		discountCode.style.boxShadow = "0 0 5px 1px green";
		discountCode.style.display = "none";
		document.getElementById("discount_code").style.display = "none";
	} else {
		errorTrw.innerHTML = "Invalide";
		showAlert("Merci d'entrer un code promo valide", "danger");
	}
});
/**** END CALCUL */

// ENTER THE DETAILS
// CLASS BOOK
class Book {
	constructor(firstName, lastName, email, address, cp, country) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.address = address;
		this.cp = cp;
		this.country = country;
	}
}

//CLASS UI
class UI {
	static displayArticles() {
		const teddies = Store.getArticles();
		teddies.forEach(teddy => UI.addArticleToList(teddy));
	}
	static addArticleToList(teddy) {
		const list = document.getElementById("book-list");
		const row = document.createElement("tr");
		row.innerHTML = `
		<td>${teddy.firstName} </td>
		<td>${teddy.lastName} </td>
		<td>${teddy.email} </td>
		<td>${teddy.address} </td>
		<td>${teddy.cp} </td>
		<td>${teddy.country} </td>
		<td> <a href="#" class="btn btn-danger btn-sm delete"> X </a> </td>
		`;
		list.appendChild(row);
	}
	static deleteArticle(el) {
		if (el.classList.contains("delete")) {
			el.parentElement.parentElement.remove();
		}
	}
	static showAlert(message, className) {
		const div = document.createElement("div");
		div.className = `alert alert-${className}`;
		div.appendChild(document.createTextNode(message));
		const container = document.querySelector(".container");
		const form = document.getElementById("book-form");
		form.prepend(div);
		setTimeout(() => document.querySelector(".alert").remove(), 2000);
	}
	static showAlert1(message, className) {
		const div = document.createElement("div");
		div.className = `alert alert-${className}`;
		div.appendChild(document.createTextNode(message));
		const container = document.querySelector(".container");
		const form = document.getElementById("book-form");
		form.prepend(div);
		setTimeout(() => document.querySelector(".alert").remove(), 5000);
	}

	static clearFields() {
		document.getElementById("firstName").value = "";
		document.getElementById("lastName").value = "";
		document.getElementById("email").value = "";
		document.getElementById("address").value = "";
		document.getElementById("cp").value = "";
		document.getElementById("country").value = "";
	}
}

class Store {
	static getArticles() {
		let teddies;
		if (localStorage.getItem("teddies") === null) {
			teddies = [];
		} else {
			teddies = JSON.parse(localStorage.getItem("teddies"));
		}
		return teddies;
	}
	static addArticle(teddy) {
		const teddies = Store.getArticles();
		teddies.push(teddy);
		localStorage.setItem("teddies", JSON.stringify(teddies));
	}
	static removeArticle(country) {
		const teddies = Store.getArticles();
		teddies.forEach((teddy, index) => {
			if ((teddy.country = country)) {
				teddies.splice(index, 1);
			}
		});
		localStorage.setItem("teddies", JSON.stringify(teddies));
	}
}

//ADD DOM
document.addEventListener("DOMContentLoaded", UI.displayArticles());

//ADD ARTICLES SUBMIT
document.getElementById("book-form").addEventListener("submit", e => {
	e.preventDefault();
	const firstName = document.getElementById("firstName").value;
	const lastName = document.getElementById("lastName").value;
	const email = document.getElementById("email").value;
	const address = document.getElementById("address").value;
	const cp = document.getElementById("cp").value;
	const country = document.getElementById("country").value;

	//THE REGEX
	let regexFirstName = /^[A-Za-z\s]{3,20}$/;
	let regexLastName = /^[A-Za-z\s]{3,20}$/;
	let regexEmail = /^[A-Za-z0-9._-]+@[A-Za-z0-9._-]{2,}\.[A-Za-z]{2,4}$/;
	let regexAddress = /^[A-Za-z0-9\s]{5,80}$/;
	let regexCp = /^[0-9]{5}$/;
	let regexCountry = /^[A-Za-z\s]{3,20}$/;

	if (
		!regexFirstName.test(firstName) ||
		!regexLastName.test(lastName) ||
		!regexEmail.test(email) ||
		!regexAddress.test(address) ||
		!regexCp.test(cp) ||
		!regexCountry.test(country)
	) {
		if (!regexFirstName.test(firstName)) {
			UI.showAlert1("Le prénom ne doit contenir ni chiffre ni symbole", "warning");
		}
		if (!regexLastName.test(lastName)) {
			UI.showAlert1("Le nom ne doit contenir ni chiffre ni symbole", "warning");
		}
		if (!regexEmail.test(email)) {
			UI.showAlert1("Veuillez saisir un email valide", "warning");
		}
		if (!regexAddress.test(address)) {
			UI.showAlert1("veuillez bien saisir votre adresse", "warning");
		}
		if (!regexCp.test(cp)) {
			UI.showAlert1("Le code postal ne doit contenir que 5 chiffres", "warning");
		}
		if (!regexCountry.test(country)) {
			UI.showAlert1("La ville ne doit pas contenir de symbole", "warning");
		}

		/*** */

		UI.showAlert("Veuillez bien remplir vos coordonnées", "danger");
		/**** */

		/*** */
	} else {
		const myBook = new Book(firstName, lastName, email, address, cp, country);
		UI.addArticleToList(myBook);
		console.log(myBook);
		Store.addArticle(myBook);
		UI.showAlert("Vos coordonnées sont validées", "success");
		UI.clearFields();

		/***** */
		//ENVOI DU PRIX TOTAL AU LOCALSTORAGE
		localStorage.setItem("totalPrice", totalPrice);
		const storagePrice = localStorage.getItem("totalPrice");
		console.log(storagePrice);

		//CREATION DE L OBJET CONTACT
		let contact = {
			firstName: firstName,
			lastName: lastName,
			address: address,
			country: country,
			email: email
		};

		//CREATION DU TABLEAU ARTICLES (ID DES OURSONS DU PANIER)

		let articles = [];
		for (let i = 0; i < cart.length; i++) {
			let articlesId = cart[i].id;
			articles.push(articlesId);
		}
		// console.log(articles);

		//CREATION D'UN OBJET REGROUPANT CONTACT ET ARTICLES
		let add = {
			contact,
			articles,
			totalPrice
		};
		/*** Envoi de l'objet add vers le serveur */
		const post = fetch("https://jsonplaceholder.typicode.com/users", {
			method: "POST",
			body: JSON.stringify(add),
			headers: {
				"Content-type": "application/json"
			}
		});
		// console.log(post);

		/**Pour voir le resultat du serveur dans la console */
		post.then(async response => {
			try {
				const contenu = await response.json();
				// console.log(contenu);
				if (response.ok) {
					console.log(`contenu de response : ${response.ok}`);
					console.log(contenu.articles[0]);
					/**mettre l'id dans le localstorage */
					localStorage.setItem("responseId", contenu.articles[0]);
					/**aller vers la page order.html */
					window.location = "order.html";
				} else {
					console.log(` reponse du serveur : ${response.status}`);
				}
			} catch (error) {
				console.log(` Erreur : ${error}`);
				alert(`Erreur qui vient du catch(ERROR): ${error}`);
			}
		});

		/**** */
	}
});

//DELETE
document.getElementById("book-list").addEventListener("click", e => {
	UI.deleteArticle(e.target);
	Store.removeArticle(e.target.parentElement.previousElementSibling.textContent);
	UI.showAlert("Coordonnées supprimées", "info");
});
