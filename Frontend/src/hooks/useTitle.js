import { useEffect } from "react"


const useTitulo = (titulo) => {

    useEffect(() => {
      document.title = `SportConnect - ${titulo}`
    }, [titulo])
    
}

export default useTitulo