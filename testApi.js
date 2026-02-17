const URL = "http://localhost:3000";
import fs from "fs";
import FormData from "form-data";
import fetch from "node-fetch";

async function get(route) {
  const response = await fetch(`${URL}/${route}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const responseData = await response.json();
  console.log(responseData, response.status);
}

async function post(route, data) {
  const response = await fetch(`${URL}/${route}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();
  console.log(responseData, response.status);
}

async function put(route, data) {
  const response = await fetch(`${URL}/${route}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();
  console.log(responseData, response.status);
}

async function deleteReq(route) {
  const response = await fetch(`${URL}/${route}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  const responseData = await response.json();
  console.log(responseData, response.status);
}



const productUpdateData = {
  name: "T-Shirt update",
  price: 999,
  images: ["img1.jpg"],
};

const productData = {
  name: "T-Shirt new",
  price: 999,
  images: ["img1.jpg"],
};

async function testApi() {
  await post("api/products", productData)
  await get("api/products");
  await get("api/products/69943b32ec3692337f744280")
  await put("api/products/69943b32ec3692337f744280", productUpdateData)
  await get("api/products/69943b32ec3692337f744280")
  await deleteReq("api/products/69943b32ec3692337f744280")
  await get("api/products/69943b32ec3692337f744280")
}

testApi();
