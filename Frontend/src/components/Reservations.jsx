import { Clock, User } from "lucide-react";

const reservations = [
  {
    date: "VIERNES, 12 DE JUNIO",
    reserves: [
      {
        id: 1,
        user: "Lucas M.",
        court: "Padel Palermo Norte",
        hour: "10:00",
        price: 13000,
        status: "Confirmada",
      },
      {
        id: 2,
        user: "Sofía R.",
        court: "Padel Palermo Norte",
        hour: "14:00",
        price: 13000,
        status: "Confirmada",
      },
    ],
  },
  {
    date: "SÁBADO, 13 DE JUNIO",
    reserves: [
      {
        id: 3,
        user: "Tomás K.",
        court: "Padel Palermo Norte",
        hour: "16:00",
        price: 13000,
        status: "Confirmada",
      },
    ],
  },
];

export default function Reservations() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {reservations.map((day) => (
        <section key={day.date}>

          <h2 className="mb-3 font-bold text-sm text-zinc-400">
            {day.date}
          </h2>

          <div className="space-y-3">
            {day.reserves.map((reserve) => (
              <div
                key={reserve.id}
                className="flex items-center gap-4 rounded-2xl border border-zinc-700 bg-[#00001A]/60 p-4"
              >

                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-orange-500/30 bg-orange-500/10">
                  <Clock className="h-5 w-5 text-orange-500" />
                </div>

                <div className="min-w-0 flex-1">

                  <div className="mb-1 flex items-center gap-2">
                    <User className="h-4 w-4 text-zinc-400" />
                    <span className="font-medium text-white">
                      {reserve.user}
                    </span>
                  </div>

                  <p className="truncate text-sm text-zinc-400">
                    {reserve.court} · {reserve.hour}
                  </p>

                </div>

                <div className="text-right">
                  <p className="font-bold text-orange-500">
                    ${reserve.price.toLocaleString("es-AR")}
                  </p>

                  <p className="text-xs text-green-400">
                    {reserve.status}
                  </p>
                </div>

              </div>
            ))}
          </div>

        </section>
      ))}
    </div>
  );
}