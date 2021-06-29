//LANCER L' URL
const siteUrl = new URL(window.location.href);
const id = siteUrl.searchParams.get("id");
const url = "http://localhost:3000/api/teddies/";
// console.log(id);

// FETCH FONCTION

const myFetch = () => {
	fetch(url + id)
		.then(res => res.json())
		.then(teddy => {
			// console.log(teddy);
			addArticleToList(teddy);
		})
		.catch(err => console.log(`Veuillez vérifier vos paramétres : ${err}`));
};
myFetch();

//ADD ARTICLE TO LIST
const addArticleToList = teddy => {
	const container1 = document.createElement("div");
	container1.className = "container-fluid";

	const row = document.createElement("div");
	row.className = "row";
	container1.appendChild(row);

	const col = document.createElement("div");
	col.className = "col-md-10 col-11 mx-auto";
	row.appendChild(col);

	const gx3 = document.createElement("div");
	gx3.className = "row mt-5 gx-3";
	col.appendChild(gx3);

	//LEFT SIDE
	const leftSide = document.createElement("div");
	leftSide.className = " col-lg-8 col-md-12 col-11 mx-auto main-cart mb-lg-0 mb-md-5 shadow";
	gx3.appendChild(leftSide);

	//PRIMO CARD
	const card = document.createElement("div");
	card.className = "card p-4";
	leftSide.appendChild(card);

	const rowCard = document.createElement("div");
	rowCard.className = "row";
	card.appendChild(rowCard);

	// ROW CARD IMAGE
	const rowCardImage = document.createElement("div");
	rowCardImage.className =
		" col-md-5 col-11 mx-auto bg-light d-flex justify-content-center align-items-center shadow product_img";
	rowCard.appendChild(rowCardImage);

	const image = document.createElement("img");
	image.className = "img-fluid";
	image.alt = "Une peluche en ours";
	image.src = `${teddy.imageUrl}`;
	rowCardImage.appendChild(image);

	// ROW CARD IMAGE DETAILS
	const rowCardDetails = document.createElement("div");
	rowCardDetails.className = " col-md-7 col-11 mx-auto px-4 mt-2";
	rowCard.appendChild(rowCardDetails);

	//FIRST ROWCARD DETAILS ROW
	const rowCardDetailsRow = document.createElement("div");
	rowCardDetailsRow.className = "row";
	rowCardDetails.appendChild(rowCardDetailsRow);

	//PRODUCT NAME
	const cardTitle = document.createElement("div");
	cardTitle.className = "col-6 card-title";
	rowCardDetailsRow.appendChild(cardTitle);

	//Trois Card-Title
	const headerSecondary = document.createElement("h2");
	headerSecondary.className = "mb-4 product_name";
	headerSecondary.innerHTML = ` ${teddy.name}  `;
	cardTitle.appendChild(headerSecondary);

	const description = document.createElement("p");
	description.className = " mb-2 ";
	description.innerHTML = `${teddy.description}`;
	cardTitle.appendChild(description);

	const colorChoice = document.createElement("form");
	colorChoice.innerHTML = `
    <label id="colorChoice" class=" font-italic" for="choice">
    Choissisez votre couleur
    </label>
    <select name="choice" id="choice" class="mb-3 bg-light"></select> `;
	cardTitle.appendChild(colorChoice);

	//QUANTITY
	const cardQuantity = document.createElement("div");
	cardQuantity.className = "col-6 ";
	rowCardDetailsRow.appendChild(cardQuantity);

	const ul = document.createElement("ul");
	ul.className = " pagination justify-content-end set_quantity ";
	ul.innerHTML = ` 
    <li class="page-item"> <button class="page-link" id="page" > <i class="fas fa-minus"></i> </button> </li>
    
<li class="page-item"> <input type="text" name="" class="page-link" value=1 id="textbox1" /> </li>

<li class="page-item"> <button class="page-link" id="page1"> <i class="fas fa-plus"></i> </button> </li>
`;
	cardQuantity.appendChild(ul);

	//SECOND ROWCARD DETAILS ROW
	const rowCardDetailsRow1 = document.createElement("div");
	rowCardDetailsRow1.className = "row";
	rowCardDetails.appendChild(rowCardDetailsRow1);

	//RETURN HOME AND ADD TO THE CART
	//BUTTON RETURN HOME
	const returnHome = document.createElement("div");
	returnHome.className = "col-8 d-flex justify-content-between text-uppercase px-3 remove_wish ";
	returnHome.innerHTML = `  
	<a href="./index.html">
		<p> <i class="fas fa-undo-alt"></i> Retour aux produits	</p>
	</a>
	<a href="#" id="button">
		<p> <i class="fas fa-heart "></i> ajouter au panier </p>
		<div id="btn_validate"> </div>
	</a>
	`;

	rowCardDetailsRow1.appendChild(returnHome);

	//BUTTON ADD TO THE CART
	const returnCart = document.createElement("div");
	returnCart.className = "col-4 d-flex justify-content-end price_money";
	returnCart.innerHTML = `
<h3> <span id="itemval1">${(teddy.price / 100).toFixed(2).replace(".", ",")}</span>€</h3>
`;
	rowCardDetailsRow1.appendChild(returnCart);

	//LIAISON
	const main = document.querySelector("main");
	main.appendChild(container1);
	// console.log(teddy);

	//CODAGE

	// CHOIX DES COULEURS
	const select = document.getElementById("choice");
	const teddyColors = teddy.colors;
	for (let i = 0; i < teddyColors.length; i++) {
		select.innerHTML += `
			<option value="${teddyColors[i]}" > ${teddyColors[i]} </option>`;
		// console.log(teddyColors[i]);
	}

	//BUTTON CLICK MINUS AND PLUS
	document.getElementById("page").addEventListener("click", () => {
		const box1 = document.getElementById("textbox1");
		const itemval1 = document.getElementById("itemval1");
		if (box1.value <= 1) {
			box1.value = 1;
			alert("Veuillez commander au minimum un article");
		} else {
			box1.style.backgroundColor = "#fff";
			box1.style.color = "#000";
			box1.value = parseInt(box1.value) - 1;

			itemval1.innerHTML = (teddy.price * box1.value) / 100;
		}
	});
	document.getElementById("page1").addEventListener("click", () => {
		const box1 = document.getElementById("textbox1");
		const itemval1 = document.getElementById("itemval1");
		if (box1.value >= 5) {
			box1.value = 5;
			alert("Veuillez commander au maximum 5 articles");
			box1.style.backgroundColor = "red";
			box1.style.color = "#fff";
		} else {
			box1.value = parseInt(box1.value) + 1;
			itemval1.innerHTML = (teddy.price * box1.value) / 100;
		}
	});
	//SHOWALERT VALIDATION CART
	function showAlert(message, className) {
		const div = document.createElement("div");
		div.className = ` alert alert-${className}`;
		div.appendChild(document.createTextNode(message));
		const validate = document.getElementById("btn_validate");
		validate.appendChild(div);

		setTimeout(() => document.querySelector(".alert").remove(), 3000);
	}

	//BUTTON CLICK CART
	document.getElementById("button").addEventListener("click", () => {
		if (
			confirm(
				` Souhaitez-vous ajouter votre produit ${teddy.name} de couleur ${
					select.options[select.selectedIndex].text
				} au panier?`
			)
		) {
			window.location.href = "cart.html";
			// window.location.href = "#";

			showAlert("Le produit a été ajouté au panier", "success text-center");
			storageArticle(teddy);
		} else {
			window.location.href = "#";
			showAlert("Le produit n'a pas été ajouté au panier", "danger text-center");
		}

		// storageArticle(teddy); /*** ATTENTION JE L AI RAJOUTE A L IF */
	});

	//FIN CODAGE
};

//SEETING UP THE LOCALSTORAGE
const storageArticle = teddy => {
	//COMPILATION DATA BEFORE THE CLICK
	let select = document.getElementById("choice");
	const quantityArticles = document.getElementById("textbox1").value;

	let storeArticles;
	storeArticles = {
		id: teddy._id,
		image: teddy.imageUrl,
		name: teddy.name,
		color: select.options[select.selectedIndex].text,
		price: teddy.price * parseInt(quantityArticles),
		quantity: parseInt(quantityArticles)
	};
	console.log(storeArticles.id);

	//Creation user-cart in the localstorage
	//GET ARTICLES
	const teddies = JSON.parse(localStorage.getItem("panier")) || [];

	var productAlreadyInCart = false;
	function addProduct() {
		for (let i = 0; i < teddies.length; i++) {
			if (teddies[i].id === storeArticles.id) {
				console.log("ok");
				console.log(productAlreadyInCart);
				productAlreadyInCart = true;
				teddies[i].quantity += storeArticles.quantity;
			}
		}
		if (productAlreadyInCart === false) {
			teddies.push(storeArticles);
		}
		localStorage.setItem("panier", JSON.stringify(teddies));
	}
	addProduct();
};
