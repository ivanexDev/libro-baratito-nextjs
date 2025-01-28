import Button from "./components/Button";
import homePageImage from "../../public/home-image.png"
import Image from "next/image";


export default function Home() {
  return (
    <section className="flex justify-center items-center flex-col h-full">
      <h2 className="font-bold text-6xl">Bienvenido</h2>
      <p className="text-2xl max-w-[548px] text-center">Monitorea el precio de tus libros favorios y aprovecha las ofertas.</p>
      <Image src={homePageImage} width={600} height={480} alt="Imagen del home"></Image>
      <div className="flex flex-col gap-5 mt-[76px]">
      <Button label="Empezar" style="w-[480px]"/>
      <Button label="Ya tengo una cuenta" style="w-[480px]" color="secondary"/>
      </div>

    </section>
  );
}
