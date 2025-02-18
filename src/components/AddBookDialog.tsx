import React, { ChangeEvent, useContext, useState } from "react";
import Button from "./Button";
import { X } from "lucide-react";
import { goScrap } from "@/app/api/scrap";
import { Book, validateUrl } from "@/models";
import { BookContext } from "./BooksContainer";

interface AddBookDialogProps {
  handleDialog: (state: boolean) => void;
  value: boolean;
}

const AddBookDialog = ({ handleDialog, value }: AddBookDialogProps) => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState<{
    message: null | string;
    isError: boolean;
  }>({ message: null, isError: false });

  const { updateBookList } = useContext(BookContext);

  const handleSubmit = async () => {
    try {

      if(!validateUrl(url)){
        setError({message: "URL inválida. Por favor, ingresa una URL de Buscalibre.com válida.", isError: true});
        return;
      }



      const newBook = await goScrap(url); // Llama al Server Action

      if (newBook) {
        updateBookList(newBook);
      }
      handleDialog(false);
    } catch (error: any) {
      // Maneja el error, por ejemplo, mostrando un mensaje al usuario
      console.error("Error al agregar libro:", error);

      setError({message: error.message, isError: true})
    } finally {
      setUrl('')
      setError({message: null, isError: false});

    }
  };

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    setUrl(e.target.value);
  }

  return (
    <>
      <div
        className={`fixed z-[100] w-[600px] min-h-[200px] h-min inset-0 m-auto bg-white rounded-xl transition-all duration-300 ease-in-out
          ${
            value
              ? "scale-100 opacity-100 pointer-events-auto"
              : "scale-0 opacity-0 pointer-events-none"
          }
          `}
      >
        <div className="border-b border-b-gray-800 py-2 px-4 w-full flex justify-between items-center">
          <h4 className="text-lg font-bold">Añadir Libro</h4>
          <button
            className="bg-white hover:bg-gray-600/20 rounded-md p-2 transition-colors duration-200"
            onClick={() => {
              handleDialog(false);
            }}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex w-full h-full p-8 flex-col gap-4">
          <h3 className="text-4xl font-bold text-center">Añadir Libro</h3>

          <p className="text-center">
            Añade una url de buscalibre.com de tu libro favorito{" "}
          </p>

          <div className="flex flex-col">
            <label htmlFor="url">Url del libro (buscalibre.com):</label>

            <input
              name="url"
              className="input"
              type="text"
              placeholder="https://www.buscalibre.cl/libro-mientras-yub..."
              value={url}
              onChange={handleChange}
            />
          </div>

          <span className="text-red-500">{error.isError && error.message}</span>

          <Button onClick={handleSubmit} label="Agregar" />
        </div>
      </div>

      <div
        onClick={() => handleDialog(false)}
        className={`
        fixed inset-0 bg-black bg-opacity-50 content-normal transition-opacity duration-300 ease-in-out
          ${
            value
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
        `}
      ></div>
    </>
  );
};

export default AddBookDialog;
