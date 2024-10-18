// Función para obtener la elección de la máquina
function opcionMaquina() {
    const opciones = ["Piedra", "Papel", "Tijera"];
    const opcionRandom = Math.floor(Math.random() * 3);
    return opciones[opcionRandom];
}

// Función para determinar el resultado de la partida
function determinarGanador(jugadaJugador, jugadaMaquina) {
    if (jugadaJugador === jugadaMaquina) {
        return "Empate";
    }
    if (
        (jugadaJugador === "Piedra" && jugadaMaquina === "Tijera") ||
        (jugadaJugador === "Tijera" && jugadaMaquina === "Papel") ||
        (jugadaJugador === "Papel" && jugadaMaquina === "Piedra")
    ) {
        return "Ganado";
    }
    return "Perdido";
}

// Función para actualizar las estadísticas en localStorage
function actualizarEstadisticas(resultado) {
    const estadisticas = JSON.parse(localStorage.getItem("estadisticas")) || {
        jugadas: 0,
        victorias: 0,
        perdidas: 0,
        empates: 0,
    };
    
    estadisticas.jugadas++;
    if (resultado === "Ganado") estadisticas.victorias++;
    if (resultado === "Perdido") estadisticas.perdidas++;
    if (resultado === "Empate") estadisticas.empates++;

    // Calcular el porcentaje de victorias
    estadisticas.porcentajeVictoria = ((estadisticas.victorias / estadisticas.jugadas) * 100).toFixed(2);

    // Guardar estadísticas actualizadas
    localStorage.setItem("estadisticas", JSON.stringify(estadisticas));
    return estadisticas;
}

// Función para actualizar el historial de las últimas 10 partidas
function updatehistorial(jugadaJugador, jugadaMaquina, resultado) {
    const historial = JSON.parse(localStorage.getItem("historial")) || [];

    // Añadir nueva partida al inicio del historial
    historial.unshift({
        jugador: jugadaJugador,
        maquina: jugadaMaquina,
        resultado: resultado
    });

    // Mantener solo las últimas 10 partidas
    if (historial.length > 10) {
        historial.pop();
    }

    // Guardar el historial actualizado
    localStorage.setItem("historial", JSON.stringify(historial));
    return historial;
}

// Función para mostrar las estadísticas
function verEstadisticas() {
    const estadisticas = JSON.parse(localStorage.getItem("estadisticas")) || {
        jugadas: 0,
        victorias: 0,
        perdidas: 0,
        empates: 0,
        porcentajeVictoria: "0.00"
    };

    console.log("Partidas jugadas:", estadisticas.jugadas);
    console.log("Partidas ganadas:", estadisticas.victorias);
    console.log("Partidas perdidas:", estadisticas.perdidas);
    console.log("Partidas empatadas:", estadisticas.empates);
    console.log("Porcentaje de victorias:", estadisticas.porcentajeVictoria + "%");
}

// Función para mostrar el historial de partidas
function verHistorial() {
    const historial = JSON.parse(localStorage.getItem("historial")) || [];

    if (historial.length === 0) {
        console.log("No hay historial de partidas.");
    } else {
        console.log("Últimas 10 partidas:");
        historial.forEach((juego, index) => {
            console.log(
                `${index + 1}. Jugador: ${juego.jugador}, Máquina: ${juego.maquina}, Resultado: ${juego.resultado}`
            );
        });
    }
}

// Función para reiniciar el juego 
function reiniciarJuego() {
    localStorage.removeItem("estadisticas");
    localStorage.removeItem("historial");
    console.log("Sesión reiniciada. Todas las estadísticas y el historial han sido borrados.");
}

// Función para jugar una partida
function jugar(jugadaJugador) {
    const opcionValida = ["Piedra", "Papel", "Tijera"];
    if (!opcionValida.includes(jugadaJugador)) {
        console.log("Elección inválida. Por favor elige 'Piedra', 'Papel' o 'Tijera'.");
        return;
    }

    const jugadaMaquina = opcionMaquina();
    const resultado = determinarGanador(jugadaJugador, jugadaMaquina);

    // Mostrar el resultado de la ronda
    console.log(`Tú: ${jugadaJugador}, Máquina: ${jugadaMaquina}. Resultado: ${resultado}`);

    // Actualizar estadísticas y el historial
    actualizarEstadisticas(resultado);
    updatehistorial(jugadaJugador, jugadaMaquina, resultado);

    // Mostrar estadísticas después de cada partida
    verEstadisticas();
}

// Función para iniciar el juego y cargar datos previos
function iniciarJuego() {
    console.log("Bienvenido al juego de Piedra, Papel o Tijera.");
    const previousestadisticas = JSON.parse(localStorage.getItem("estadisticas"));
    const previoushistorial = JSON.parse(localStorage.getItem("historial"));

    if (previousestadisticas) {
        console.log("Cargando estadísticas previas...");
        verEstadisticas();
    }

    if (previoushistorial) {
        console.log("Historial guardado disponible.");
    }

    console.log("\nPara jugar, usa: jugar('Piedra'), jugar('Papel') o jugar('Tijera')");
    console.log("Para ver las estadisticas, usa: verEstadisticas()");
    console.log("Para ver el historial, usa: verHistorial()");
    console.log("Para reiniciar el juego, usa: reiniciarJuego()");
}

// Iniciar el juego
iniciarJuego();

