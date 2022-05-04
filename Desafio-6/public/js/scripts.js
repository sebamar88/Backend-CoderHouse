const socket = io();

const getLocalTime = (date) => {
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    seconds: "numeric",
    hour12: false,
  };
  return date.toLocaleString("es-ES", options);
};

const $ = (element) => document.querySelector(element);

/** Form "add Product" */
const form = $("#addProduct");
const title = $("#title");
const thumbnail = $("#thumbnail");
const price = $("#price");

/** Chat constants */
const messages = $("#messages");
const chatForm = $("#form");
const input = $("#input");
const email = $("#email");
const content = $("#chatContent");

const sendProductByPost = (data) => {
  const dataString = JSON.stringify(data);
  fetch("/api/products", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: dataString,
  });
  console.log(data);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = {
    title: title.value,
    price: price.value,
    thumbnail: thumbnail.value,
  };

  if (thumbnail.value && title.value && price.value) {
    socket.emit("add product", formData);
    sendProductByPost(formData);
    form.reset();
  }
});

(async () => {
  const products = await fetch("/api/products");
  const data = await products.json();
  const productsContainer = $("#products");
  data.forEach((product) => {
    const child = `
    <tr>
        <td>${product.title}</td>
        <td>${product.price}</td>
        <td>
            <img src="${product.thumbnail}" alt="${product.title}" />
        </td>
    </tr>
    `;
    productsContainer.innerHTML += child;
  });
})();

socket.on("add product", function (msg) {
  const products = $("#products");
  const child = `
    <tr>
        <td>${msg.title}</td>
        <td>${msg.price}</td>
        <td>
            <img src="${msg.thumbnail}" alt="${msg.title}" />
        </td>
    </tr>
    `;
  products.innerHTML += child;
});

/** Chat  */

chatForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = {
    email: email.value,
    message: input.value,
  };

  if (input.value) {
    socket.emit("chat message", formData);
    input.value = "";
    content.style.display = "block";
  }
});

socket.on("chat message", function (msg) {
  const time = new Date();

  const message = `
    <li><span class="email">${
      msg.email
    }</span>  <span class="time">[${getLocalTime(
    time
  )}]</span> : <span class="messageText">
        ${msg.message}
    </span></li>
    `;
  messages.innerHTML += message;

  window.scrollTo(0, document.body.scrollHeight);
});
