import CourtCardOwner from './CourtCardOwner';
import EstadoVacioCanchas from './EstadoVacioCanchas';

const CourtGridOwner = ({courts}) => {

    if(!courts.length) return <EstadoVacioCanchas />

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courts.map((court) => (
                <CourtCardOwner key={court._id} court={court} />
            ))}
        </div>
    )
}

export default CourtGridOwner