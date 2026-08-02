const DIA_A_NUMERO = {
  lunes: 1,
  martes: 2,
  miercoles: 3,
  jueves: 4,
  viernes: 5,
  sabado: 6,
  domingo: 0,
};

function horasRedondas(inicio, fin) {
  const [horaInicio] = inicio.split(':').map(Number);
  const [horaFin] = fin.split(':').map(Number);
  const horas = [];
  let hora = horaInicio;

  while (hora !== horaFin) {
    horas.push(hora);
    hora = (hora + 1) % 24;
    if (hora === horaInicio) {
      break;
    }
  }

  return horas;
}

export function formatearHorariosDisponibles(horariosDisponibles) {
  if (!Array.isArray(horariosDisponibles)) {
    return [];
  }

  return horariosDisponibles.map((item) => {
    const dia = String(item.dia || '').toLowerCase();
    return {
      ...item,
      diaNumero: DIA_A_NUMERO[dia] ?? null,
      horas: horasRedondas(item.inicio, item.fin),
    };
  });
}



