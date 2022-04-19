const shoppingItems = document.querySelector(".shopping-items");

const getAllItems = () => {
  axios.get("/items").then((res) => {
    const items = res.data;

    displayItems(items);
  });
};

const displayItems = (arr) => {
  shoppingItems.innerHTML = ``;
  console.log(arr);
  return arr.map((item) => creatItemCard(item));
};

const creatItemCard = (item) => {
  const itemCard = document.createElement("div");
  const button = document.createElement("button");
  button.setAttribute(`id`, `${item.grocery_items_id}`);
  button.textContent = "add to cart";
  button.addEventListener("click", addToCart);
  itemCard.classList.add("item-card");

  //   itemCard.id= item.grocery_items_id
  itemCard.innerHTML = `<img src=${item.item_image} class="item_cover"/>
<h3>${item.item_name}</h3>
<h2>${item.item_catogary}</h2>
<h2>${item.item_price} $</h2>
`;
  itemCard.appendChild(button);
  // const addButton =document.getElementById(item.grocery_items_id)
  // console.log(addButton)
  // itemCard.button.addEventListener('click', addToCart)
  shoppingItems.appendChild(itemCard);
};

const addToCart = (e) => {
  console.log(e.target);
  axios.put(`/items/${e.target.id}`)
  .then(res => console.log(1, res))
        .catch(err => console.log(err))
};

getAllItems();
