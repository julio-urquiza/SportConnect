import CourtCardOwner from './CourtCardOwner';
import EstadoVacioCanchas from './EstadoVacioCanchas';

const CourtGridOwner = ({courts, onUpdate, onDelete}) => {

    if(!courts.length) return <EstadoVacioCanchas />

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courts.map((court) => (
                <CourtCardOwner key={court._id} court={court} onUpdate={onUpdate} onDelete={onDelete}/>
            ))}
        </div>
    )
}

export default CourtGridOwner