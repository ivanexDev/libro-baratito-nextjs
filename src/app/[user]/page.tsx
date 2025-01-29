export default async function Page({params,}: {params: Promise<{ user: string }>}){
    const userName = (await params).user
    return <div>Usuario: {userName}</div>
  }