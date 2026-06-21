export default function createDay(fecha){
    const [anio, mes, dia]= fecha.split("-")
    const date = new Date(anio, mes -1, dia)
    const day = new Intl.DateTimeFormat("es-AR", {
        weekday: "long"
    }).format(date)
    return day.charAt(0).toUpperCase() + day.slice(1);
    
}