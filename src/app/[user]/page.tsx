import BookCard from "@/components/BookCard"
import PlusButton from "@/components/PlusButton"
import { books } from "@/db/db"


export default async function Page({params,}: {params: Promise<{ user: string }>}){
    const userName = (await params).user
    console.log(userName)
    return(
      <section className="flex h-full justify-center">
        <div className="mt-5">
          <div className="flex justify-between">
        <h2 className="font-bold text-4xl mb-9">Mis Libros</h2>
        <PlusButton/>
          </div>
        <div className="flex gap-3">
          {books.map((book,index) =>{
            return <BookCard key={index} {...book}/>
          })}
        </div>
        </div>

      </section>)
  }