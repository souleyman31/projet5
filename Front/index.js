let url = "http://localhost:3000/api/teddies";

//FONCTION FETCH
const myFetch = () => {
	fetch(url)
		.then(res => res.json())
		.then(teddies => {
			// console.log(teddies);
			teddies.forEach(teddy => addArticles(teddy));
		});
	// .catch(err => alert("Attention, nous avons déploré une erreur de saisie"));
};
myFetch();

// window.onload = myFetch; //Execute le script immediatement apres le chargement de la page

const addArticles = teddy => {
	if (teddy != null) {
		const mainCard = document.getElementById("mainCard");
		const div = document.createElement("div");
		div.className = "card p-4";
		mainCard.appendChild(div);

		const row = document.createElement("div");
		row.className = "row";
		div.appendChild(row);

		const rowHr = document.createElement("hr");
		rowHr.className = "mt-4";
		row.appendChild(rowHr);

		const rowImage = document.createElement("div");
		rowImage.className =
			"col-md-5 col-11 mx-auto bg-light d-flex justify-content-center align-items-center shadow product_img ";
		const image = document.createElement("img");
		image.className = "img-fluid";
		image.alt = "Une peluche en ours";
		image.src = `${teddy.imageUrl}`;
		row.appendChild(rowImage);
		rowImage.appendChild(image);

		const rowDetails = document.createElement("div");
		rowDetails.className = " col-md-7 col-11 mx-auto px-4 mt-2 ";
		row.appendChild(rowDetails);

		//ROW DETAILS-1
		const rowDetailsChild1 = document.createElement("div");
		rowDetailsChild1.className = "row";
		rowDetails.appendChild(rowDetailsChild1);

		const rowArticleName = document.createElement("div");
		rowArticleName.className = "col-6 card-title";
		rowDetailsChild1.appendChild(rowArticleName);

		const headerSecondary = document.createElement("h2");
		headerSecondary.className = "mb-4";
		headerSecondary.innerHTML = `${teddy.name}`;
		rowArticleName.appendChild(headerSecondary);

		const paragraphe1 = document.createElement("p");
		paragraphe1.className = "mb-4";
		paragraphe1.innerHTML = ` ${(teddy.price / 100).toFixed(2).replace(".", ",")} € `;
		rowArticleName.appendChild(paragraphe1);

		const paragraphe2 = document.createElement("p");
		paragraphe2.className = "mb-4";
		paragraphe2.innerHTML = ` ${teddy.description}`;
		rowArticleName.appendChild(paragraphe2);

		// ROW DETAILS 2
		const rowDetailsChild2 = document.createElement("div");
		rowDetailsChild2.className = "row";
		rowDetails.appendChild(rowDetailsChild2);

		const rowCommand = document.createElement("div");
		rowCommand.className = "col-8 d-flex justify-content-between remove_wish";
		rowDetailsChild2.appendChild(rowCommand);

		rowCommand.innerHTML = `
		 <a href="./product.html?id=${teddy._id}" id="page2">
			<p class="px-4"> <span class="btn btn-primary"> Commander </span> </p>
		</a>`;

		//DEALS
		const deals = document.getElementById("deal");

		deals.innerHTML = `
		<strong>Deal de la semaine : </strong> <br /> Nous avons concocté, spécialement pour vous, une gamme de 5 Ours en péluche que vous pouvez retrouver dans plusieurs couleurs. Bon shopping et faîtes vous plaisir !!!
		`;
		let pageProduct = document.getElementById("page2");
		// console.log(pageProduct);
	} else {
		alert("produit introuvable");
	}
};
