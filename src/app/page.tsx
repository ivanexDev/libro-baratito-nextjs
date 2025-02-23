import homePageImage from "../../public/home-image.png"
import Image from "next/image";
import ButtonLink from "@/components/ButtonLink";

export default function Home() {
  return (
    <section className="flex justify-center items-center h-full w-full max-md:fixed max-md:inset-0 max-md:bg-white max-md:z-20">
      <div className="flex flex-col justify-center items-center w-full">
        <h2 className="font-bold max-md:text-4xl text-6xl text-gray-800">Bienvenido</h2>
        <p className="text-2xl max-w-[548px] text-center max-md:text-base">Monitorea el precio de tus libros favorios y aprovecha las ofertas.</p>
        <Image className="max-md:w-[80%]" src={homePageImage} width={600} height={480} alt="Imagen del home"></Image>
        <div className="flex flex-col gap-5 mt-[76px]">
          <ButtonLink label="Empezar" className="w-full min-w-[480px] max-md:min-w-0" href="/sign-up" />
          <ButtonLink label="Ya tengo una cuenta" className="w-full min-w-[480px] max-md:min-w-0" color="secondary" href="/sign-in" />
        </div>
      </div>
    </section>
  );
}
