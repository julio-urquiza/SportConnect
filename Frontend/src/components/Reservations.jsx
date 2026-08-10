import ReserveCardOwner from "./ReserveCardOwner.jsx"

export default function Reservations({ reserves }) {
    return (
        <div className="mx-auto max-w-2xl space-y-6">
{/* 
            <h2 className="mb-3 font-bold text-sm text-zinc-400">
                {day.date}
            </h2> */}

            <div className="space-y-3">
                {reserves.map((reserve) => (
                    <ReserveCardOwner key={reserve._id} reserve={reserve}/>
                ))}
            </div>

        </div>
    );
}