import CourtCardOwner from './CourtCardOwner';
import EstadoVacioCanchas from './EstadoVacioCanchas';

const court = {
    id: 1,
    name: "El Padel",
    location: "Recoleta",
    image: "https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=800&q=80",
    status: "Publicada",
    price: 5000,
    rating: 5,
};

const CourtGridOwner = () => {
    const courts = [court, court];

    if(!courts.length) return <EstadoVacioCanchas />

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courts.map((court, index) => (
                <CourtCardOwner key={index} court={court} />
            ))}
        </div>
    )
}

export default CourtGridOwner