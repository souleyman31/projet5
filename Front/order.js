const responseId = localStorage.getItem(`responseId`);
// console.log(`Voici la réponse : ${responseId}`);

//RECOVERY PRICE TOTAL
const totalPrice = localStorage.getItem("totalPrice");
// console.log(totalPrice);

//HTML Injonction
const command = document.getElementById("command");
command.innerHTML = `
<h1 class="py-4 text-center font-weight-bold text-secondary bg-warning mb-3">
					Récapitulatif de votre commande
				</h1>
				<div class="command border text-center bg-light p-5 h3">
					<p class="text-danger">Merci pour votre commande !!!</p>
					<p>
						Votre commande numéro
						<span class="commandNumber font-weight-bold">${responseId} </span> a bien été pris
						en compte. <br />
						Le montant de votre commande est de
						<span class="commandPrice font-weight-bold">${totalPrice} </span>
						<span class="font-weight-bold">€</span>
						<br />
						<span>Au plaisir de vous revoir !!! </span> <br>
						<button class ="btn btn-primary p-3 m-5"> <a href="index.html" class="text-light"> Retour à l'accueil </a> </button>
					</p>
				</div>
`;
const removeAfter = key => {
	localStorage.removeItem(key);
};
removeAfter("totalPrice");
removeAfter("articles");
removeAfter("responseId");
removeAfter("teddies");
removeAfter("panier");
