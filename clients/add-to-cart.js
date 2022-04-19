const addToCart = document.querySelector(".cart-items");

const getAllCartItems = () => {
  axios.get("http://localhost:5050/cart").then((res) => {
    const itemsCart = res.data;

    displayItems(itemsCart);
  });
};

const displayItems = (arr) => {
  addToCart.innerHTML = ``;
  console.log(arr);
  return arr.map((item) => creatItemCard(item));
};

const creatItemCard = (item) => {
  const itemCard = document.createElement("div");
  const button = document.createElement("button");
  button.setAttribute(`id`, `${item.grocery_items_id}`);
  button.textContent = "remove item";

  button.addEventListener("click", removeFromCart);
  itemCard.classList.add("item-card");

  itemCard.innerHTML = `<img src=${item.item_image} class="item_cover"/>
    <h3>${item.item_name}</h3>
    <h2>${item.item_catogary}</h2>
    <h2>${item.item_price} $</h2>
    `;

  itemCard.appendChild(button);

  addToCart.appendChild(itemCard);
};

const removeFromCart = (e) => {
    console.log(e.target);
    axios.put(`http://localhost:5050/cart/${e.target.id}`)
        . then((res) =>{ 
          const itemsCart = res.data;

          displayItems(itemsCart);
        })
        .catch((err) => console.log(err));

};

getAllCartItems();
