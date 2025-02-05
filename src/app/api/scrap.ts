"use server"

import axios from "axios";
import * as cheerio from "cheerio";
import { createBook } from "../actions";


export async function goScrap(url: string) {

  try {
    // Descargar HTML de la página
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Extraer datos
    const title = $(".tituloProducto").text().trim();
    const currentPrice = $(".precio").text().trim();
    const imageUrl = $('#imgPortada').attr("src") || $('#imgPortada').attr("data-src") || "";

    const completeBook = {
      title,
      currentPrice,
      imageUrl,
      url
    }

    // Guardar en la base de datos
    createBook(title, url, imageUrl)

    console.log("Added book",completeBook)

    return completeBook;

  } catch (error) {
    console.error("Error en el scraping:", error);
  }
}