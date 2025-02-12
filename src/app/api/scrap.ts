"use server";

import axios from "axios";
import * as cheerio from "cheerio";
import { addPrice, createBook } from "../actions";
import { toNumber } from "@/utils/toNumber";

export async function goScrap(url: string) {
  try {
    // Descargar HTML de la página
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Extraer datos
    const book_title = $(".tituloProducto").first().text().trim();
    const image_url =
      $("#imgPortada").attr("src") || $("#imgPortada").attr("data-src") || "";
    const author = $(".link-underline").text().trim().split("\n")[0];
    const price = toNumber($(".precio").first().text().trim());

    const completeBook = {
      book_title,
      price,
      image_url,
      url,
      author,
    };

    // Guardar en la base de datos
    const bookdId = await createBook(book_title, url, image_url, author, price);

    console.log("Added book", completeBook);

    return {...completeBook,id: bookdId};
  } catch (error) {
    console.error("Error en el scraping:", error);
  }
}

export async function getPrice(url: string) {
  try {
    // Descargar HTML de la página
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Extraer precio
    const currentPrice = $(".precio").text().trim();

    console.log("currentPrice", currentPrice);

    const justNumber = toNumber(currentPrice);

    console.log({ justNumber });

    await addPrice(justNumber, url);
    return justNumber;
  } catch (error) {
    console.error("Error en el scraping:", error);
  }
}
