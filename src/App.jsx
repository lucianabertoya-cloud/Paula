import React, { useState, useEffect, useRef } from "react";

// ─── PERFIL DE USUARIO ───────────────────────────────────────────────────────
const PERFIL = {
  nombre: "Vos",
  edad: 41, peso: 61, altura: 1.63,
  condiciones: ["Colesterol moderado", "Inflamación intestinal (en estudio)"],
  gusta: ["Pollo", "Carne roja", "Pescado", "Legumbres", "Huevos", "Lácteos"],
  noGusta: ["Pepino", "Ketchup", "Coles/Repollo", "Anchoas", "Picante"],
  notas_medicas: "Evitar grasas saturadas en exceso (colesterol). Priorizar alimentos anti-inflamatorios: cúrcuma, jengibre, omega-3, aceite de oliva, frutas rojas. Evitar ultraprocesados, fritos y harinas blancas en exceso.",
};

// ─── CICLO MENSTRUAL ──────────────────────────────────────────────────────────
const FASES_CICLO = {
  menstruacion: {
    nombre: "Menstruación", dias: "1-5", emoji: "🔴", color: "#e57373",
    descripcion: "Tu cuerpo está trabajando duro. Priorizá el descanso y el movimiento suave.",
    ejercicio: {
      recomendado: ["Yoga suave o yin yoga", "Caminata tranquila 20-30 min", "Stretching y movilidad", "Pilates de bajo impacto", "Natación suave"],
      evitar: ["HIIT intenso", "Pesos muy pesados", "Abdominales profundos (agravan los cólicos)", "Ejercicios invertidos si hay dolor fuerte"],
      intensidad: "Baja — escuchá tu cuerpo. Si hay dolor fuerte, descansá sin culpa.",
    },
    nutricion: ["Hierro: lentejas, carne roja magra, espinaca", "Magnesio: nueces, chocolate negro 70%, avena", "Omega-3 anti-inflamatorio: salmón, sardinas", "Vitamina C para absorber el hierro: mandarina, pimiento rojo", "Evitá: sal en exceso (retención), alcohol, cafeína en exceso"],
    cuidados: ["Calor local en el abdomen para los cólicos", "Ibuprofeno si el dolor es fuerte (con comida)", "Hidratate más de lo habitual", "Dormí lo que necesites — el sueño es reparador", "Baño tibio con sales de magnesio"],
    suplementos: ["Magnesio (400mg) por la noche", "Omega-3 (reduce inflamación)", "Vitamina D (ya la tomás) — continuá"],
  },
  folicular: {
    nombre: "Fase Folicular", dias: "6-13", emoji: "🌱", color: "#81c784",
    descripcion: "Energía en ascenso. Es el mejor momento para entrenar fuerte y probar cosas nuevas.",
    ejercicio: {
      recomendado: ["Fuerza con progresión de cargas", "HIIT y cardio intenso", "Clases grupales, baile", "Ejercicios nuevos o desafiantes", "Running"],
      evitar: ["Nada en particular — ¡aprovechá esta energía!"],
      intensidad: "Alta — tu cuerpo está en su pico de recuperación y fuerza.",
    },
    nutricion: ["Proteína alta: pollo, huevos, pescado", "Carbohidratos complejos para energía: quinoa, arroz jazmín", "Vegetales frescos y coloridos", "Semillas de lino y zapallo (fitoestrógenos naturales)", "Probióticos: kéfir laktosefrei"],
    cuidados: ["Aprovechá para aprender ejercicios nuevos", "Establecé nuevos récords personales", "Planificá las comidas de la semana", "Tu piel está más luminosa — buen momento para fotos de progreso 😄"],
    suplementos: ["Vitamina D — continuá", "Omega-3 para seguir con el antiinflamatorio"],
  },
  ovulacion: {
    nombre: "Ovulación", dias: "14-16", emoji: "✨", color: "#ffd54f",
    descripcion: "Tu pico de energía y fuerza. ¡Aprovechalo al máximo!",
    ejercicio: {
      recomendado: ["Levantamiento de pesas máximo", "Sprints e intervalos", "Clases de alta intensidad", "Competencias o desafíos personales", "Todo lo que requiera coordinación y potencia"],
      evitar: ["Ojo con la laxitud articular — las articulaciones están más flexibles y propensas a lesiones. Calentá bien."],
      intensidad: "Máxima — es tu momento de más fuerza y resistencia del mes.",
    },
    nutricion: ["Antioxidantes: arándanos, frutas rojas, tomate", "Fibra: verduras de hoja verde, legumbres", "Zinc: semillas de zapallo, carne roja", "Hidratación extra — podés sentir más calor corporal"],
    cuidados: ["Calentá bien antes de entrenar — más riesgo de lesiones ligamentarias", "Usá rodilleras o muñequeras si hacés pesos altos", "Hidratate más de lo normal", "Es normal sentirte más social y con más energía"],
    suplementos: ["Vitamina D — continuá", "Zinc si lo tenés indicado"],
  },
  lutea: {
    nombre: "Fase Lútea", dias: "17-28", emoji: "🌙", color: "#ce93d8",
    descripcion: "La energía baja gradualmente. Priorizá la recuperación y el bienestar.",
    ejercicio: {
      recomendado: ["Fuerza moderada", "Yoga y pilates", "Caminatas largas", "Natación", "Entrenamientos más cortos pero consistentes"],
      evitar: ["HIIT muy intenso en los últimos días", "Ignorar el cansancio — escuchá tu cuerpo"],
      intensidad: "Moderada — mantené la rutina pero sin exigirte al máximo.",
    },
    nutricion: ["Magnesio para el PMS: nueces, avena, chocolate negro", "Carbohidratos complejos para el humor: batata, arroz", "Calcio: yogur kéfir, sardinas", "Evitá azúcar refinada (empeora los síntomas)", "Infusiones: manzanilla, jengibre con limón"],
    cuidados: ["Normal sentir más cansancio y cambios de humor", "Priorizar el sueño (8h mínimo)", "Técnicas de manejo del estrés: respiración, meditación", "No te exijas perfección en el entrenamiento", "Calor local si empezás a sentir molestias premenstruales"],
    suplementos: ["Magnesio (400mg) por la noche — especialmente última semana", "Vitamina B6 puede ayudar con el PMS", "Omega-3 anti-inflamatorio"],
  },
};

// ─── VIDEOS HEYGEN (Paula explicando cada ejercicio) ─────────────────────────
const HEYGEN_VIDEOS = {
  "Mountain climbers": "https://app.heygen.com/embeds/dd8b050de2b34b1496b9bd609086d289",
  // Más videos se van agregando acá
};

const GUIAS = {
  "Press con mancuernas": { musculo:"Pecho · Hombros · Tríceps", emoji:"🏋️", pasos:["Acostada boca arriba, rodillas dobladas, pies apoyados","Mancuernas a los lados del pecho, codos a 45°","Empujá hacia arriba sin bloquear los codos","Bajá LENTO 3 segundos hasta sentir estiramiento del pecho","No rebotes abajo — el movimiento lento es el que trabaja"], errores:["No arquees la espalda — core activo","No cierres los codos hacia el cuerpo","No bloquees los codos arriba"] },
  "Remo con banda elástica": { musculo:"Espalda · Bíceps · Postura", emoji:"💪", pasos:["Sentada, piernas extendidas, banda en los pies","Espalda recta, pecho afuera — nunca encorvada","Tirá los codos hacia atrás juntando los omóplatos","Imaginá aplastar una naranja entre los omóplatos","Volvé lento sin dejar caer los hombros"], errores:["No uses inercia del torso","No encorves la espalda","La vuelta también cuenta — no sueltes rápido"] },
  "Elevaciones laterales": { musculo:"Hombros laterales (deltoides)", emoji:"🙆", pasos:["De pie, mancuernas a los lados, codos levemente doblados","Subí los brazos lateralmente hasta altura de hombros — no más","Imaginá vaciar agua de una jarra al subir (pulgares levemente abajo)","Bajá LENTO — 3 segundos de bajada para máximo trabajo","Peso liviano — este músculo se lastima fácil"], errores:["No subas por encima del hombro (lesiona manguito)","No uses impulso del cuerpo","Siempre peso liviano en este ejercicio"] },
  "Curl de bíceps": { musculo:"Bíceps", emoji:"💪", pasos:["De pie o sentada, codos PEGADOS al cuerpo","Palmas hacia adelante, espalda recta","Doblá los codos llevando las mancuernas hacia los hombros","Apretá el bíceps arriba 1 segundo","Bajá LENTO 3 segundos — no dejes caer el peso"], errores:["No balancees el torso — si lo hacés, el peso es muy pesado","No muevas los codos del cuerpo","No bloquees los codos abajo"] },
  "Fondos en silla (tríceps)": { musculo:"Tríceps · Hombros", emoji:"🪑", pasos:["Sentada al borde de la silla, manos en el borde","Deslizá las caderas fuera, piernas extendidas o dobladas","Doblá los codos hacia ATRÁS (no hacia los lados) bajando el cuerpo","Bajá hasta 90° de codos — no más","Empujá con los tríceps para subir"], errores:["No dejes que los hombros suban a las orejas","No bajes demasiado — lesiona el hombro","Los codos van hacia atrás, nunca hacia afuera"] },
  "Plancha frontal": { musculo:"Core · Abdomen · Glúteos · Espalda", emoji:"🧘", pasos:["Apoyate en antebrazos y puntas de pies (o rodillas)","Cuerpo en línea recta — sin subir ni bajar la cadera","Contraé el abdomen hacia adentro como aplastando la panza","Apretá glúteos y cuádriceps al mismo tiempo","Respirá normal — nunca aguantes el aire"], errores:["No levantes la cadera — hace trampa","No dejes caer la cadera — lesiona la espalda baja","Mirá el piso, no hacia adelante"] },
  "Plancha lateral": { musculo:"Oblicuos · Core lateral · Cadera", emoji:"↔️", pasos:["Recostada de lado, antebrazo en el piso — codo bajo el hombro","Pies apilados o escalonados para más estabilidad","Levantá las caderas formando línea recta cabeza-pies","Mantenés la cadera arriba — no la dejes caer","Mirá hacia adelante, no al piso"], errores:["No dejes caer la cadera — es el error más común","No rotar el torso al piso","Empezá con rodilla apoyada si es difícil"] },
  "Dead bug": { musculo:"Core profundo · Estabilidad lumbar", emoji:"🐛", pasos:["Acostada boca arriba, espalda baja PEGADA al piso siempre","Brazos al techo, rodillas dobladas 90° en el aire","Extendé un brazo atrás Y la pierna contraria abajo simultáneamente","Volvé lento al centro sin despegar la espalda baja","Alternás lados — derecha+izquierda = 1 repetición"], errores:["Si la espalda se despega del piso, ese es tu límite","No aguantes el aire — respirá mientras bajás","Movimiento lento y controlado siempre"] },
  "Bicicleta abdominal": { musculo:"Recto abdominal · Oblicuos", emoji:"🚴", pasos:["Acostada, manos detrás de la cabeza — sin jalar del cuello","Rodillas dobladas, pies en el aire","Llevá el codo derecho hacia la rodilla izquierda girando el torso","Al mismo tiempo extendé la pierna derecha","Alternás lento — la velocidad no importa, la calidad sí"], errores:["No jales el cuello — los codos hacia atrás","No hagas el movimiento rápido","Lumbares pegadas al piso siempre"] },
  "Mountain climbers": { musculo:"Core · Cardio · Hombros", emoji:"⛰️", pasos:["Plancha alta — manos bajo los hombros, brazos extendidos","Core apretado, cadera baja a la altura de los hombros","Llevá una rodilla al pecho y volvé alternando piernas","Velocidad moderada si es primera vez","No es una carrera — la postura importa más que la velocidad"], errores:["No levantes la cadera — debe quedar baja","No adelantes los hombros","Si te cansás, reducí velocidad no rango"] },
  "Sentadillas con peso corporal": { musculo:"Cuádriceps · Glúteos · Isquiotibiales", emoji:"🏋️", pasos:["Pies al ancho de hombros, puntas levemente afuera","Brazos al frente para equilibrio, pecho arriba","Bajá como si fueras a sentarte — cadera hacia atrás y abajo","Rodillas siguen la dirección de los dedos — no colapsen adentro","Bajá hasta muslos paralelos al piso o más"], errores:["No dejes que las rodillas colapsen adentro","No inclines demasiado el torso adelante","No despegues los talones del piso"] },
  "Estocadas alternadas": { musculo:"Glúteos · Cuádriceps · Equilibrio", emoji:"🦵", pasos:["De pie, pies juntos, manos en caderas o al frente","Dá un paso largo hacia adelante con una pierna","Bajá la rodilla trasera casi hasta el piso (sin golpear)","Rodilla delantera a 90° — no pase los dedos del pie","Empujá con el talón delantero para volver y alternás"], errores:["No dejes que la rodilla delantera pase la punta del pie","No golpees la rodilla trasera en el piso","Torso recto durante todo el movimiento"] },
  "Peso muerto rumano": { musculo:"Isquiotibiales · Glúteos · Espalda baja", emoji:"⚡", pasos:["De pie, mancuernas frente a los muslos, espalda RECTA","Inclinación desde la CADERA (bisagra), no desde la espalda","Bajá las mancuernas rozando las piernas hasta sentir estiramiento","Empujá las caderas hacia adelante para volver","Las mancuernas rozan las piernas durante TODO el movimiento"], errores:["NUNCA redondees la espalda — es la lesión más común","No dobles demasiado las rodillas (no es sentadilla)","Las mancuernas siempre cerca del cuerpo"] },
  "Puente de glúteos": { musculo:"Glúteos · Core · Isquiotibiales", emoji:"🍑", pasos:["Acostada boca arriba, rodillas dobladas, pies cerca de los glúteos","Brazos a los lados, palmas al piso","Empujá los talones y apretá los glúteos para levantar la cadera","Formá línea recta de hombros a rodillas","Apretá los glúteos arriba 2 segundos — no la espalda"], errores:["No arquees la espalda baja — el trabajo es de los glúteos","No dejes que las rodillas caigan adentro o afuera","Empujá con los talones, no con los dedos"] },
  "Abducción de cadera": { musculo:"Glúteos medios · Cadera", emoji:"↕️", pasos:["Acostada de lado, cuerpo en línea recta","Pierna de abajo doblada para estabilidad","Levantá la pierna de arriba hacia el techo — máximo 45°","Mantenés la cadera estable — no rotar","Bajá lento controlando el movimiento"], errores:["No rotar la pierna hacia arriba — punta neutra","No subas más de 45°","No dejes que la cadera ruede hacia atrás"] },
  "Elevaciones de pantorrilla": { musculo:"Pantorrillas (gastrocnemio · sóleo)", emoji:"🦶", pasos:["De pie, pies al ancho de cadera, podés apoyarte en una pared","Subí en puntas de pie lo más alto posible","Mantenés 1 segundo arriba apretando las pantorrillas","Bajá MUY lento — 4 segundos de bajada","En un escalón para mayor rango si es posible"], errores:["No bajes rápido — la bajada lenta es el secreto","No uses solo los dedos — toda la planta","No dobles las rodillas"] },
  "Burpees modificados": { musculo:"Cuerpo completo · Cardio", emoji:"🔥", pasos:["De pie, bajá las manos al piso con rodillas dobladas","Llevá los pies atrás UNO A LA VEZ (sin saltar) — posición plancha","Hacé una plancha corta o una flexión si podés","Volvé los pies hacia adelante uno a la vez","Parate y subí los brazos — sin salto en versión modificada"], errores:["No saltes si hay dolor en rodillas","Core apretado en posición de plancha","Ritmo constante es mejor que rápido con mala técnica"] },
  "Sentadilla + press": { musculo:"Piernas · Glúteos · Hombros · Core", emoji:"🏆", pasos:["De pie, mancuernas a altura de hombros, palmas al frente","Hacé la sentadilla completa con buena técnica","Al subir, empujá las mancuernas hacia arriba fluidamente","Bajá las mancuernas al volver a la sentadilla","Es un movimiento continuo — sentadilla y press juntos"], errores:["No hagas el press antes de terminar de subir","Peso liviano para no comprometer la forma","No bloquees los codos arriba"] },
  "Remo + extensión": { musculo:"Espalda · Tríceps · Core", emoji:"💪", pasos:["De pie inclinada 45°, espalda recta, mancuerna en una mano","Tirá el codo hacia el techo (remo) llegando a la cadera","Desde ahí extendé el brazo hacia atrás (tríceps)","Volvé el brazo doblado y bajá al inicio","Remo + extensión = 1 repetición completa"], errores:["No rotar el torso para tirar","Espalda recta en todo momento","Peso liviano para coordinar los dos movimientos"] },
  "Jump squat (bajo impacto opcional)": { musculo:"Cuádriceps · Glúteos · Cardio", emoji:"⚡", pasos:["BAJO IMPACTO: sentadilla normal + elevación en puntas al subir","Versión normal: sentadilla y al subir saltás explosivo","Al caer aterrizás SUAVE con rodillas dobladas — nunca rígidas","El aterrizaje silencioso protege las articulaciones","Durante menstruación o dolor: SOLO versión bajo impacto"], errores:["NUNCA aterrices con rodillas rectas — lesión garantizada","En días de ciclo de riesgo: versión sin salto siempre","No hacer si hay dolor de rodillas"] },
  "Plancha con toque de hombro": { musculo:"Core · Hombros · Estabilidad", emoji:"🎯", pasos:["Plancha alta — manos bajo hombros, pies separados más de lo normal","Tocá el hombro opuesto con una mano","La cadera NO debe rotar ni subir — ese es el trabajo del core","Alternás lados lentamente","Calidad sobre velocidad siempre"], errores:["Si la cadera rota, separás más los pies o bajás las rodillas","No aguantes el aire — respirá en cada toque","Mirá el piso, no adelante"] },
  "Caminata rápida o bici": { musculo:"Cardiovascular · Piernas · Resistencia", emoji:"🚶", pasos:["Ritmo donde puedas hablar pero con esfuerzo (zona 2)","Brazos en movimiento activo","Espalda recta, core activo, no arrastres los pies","Bici: resistencia moderada, 70-90 RPM","Primeros 5 min de calentamiento — no empieces a tope"], errores:["No camines mirando el teléfono — postura","No empieces fuerte — calentá primero","Hidratate antes, durante y después"] },
};

// ─── RUTINA ───────────────────────────────────────────────────────────────────
const RUTINA = [
  { dia: "Lunes", tipo: "Fuerza · Tren Superior", ejercicios: [
    { nombre: "Press con mancuernas", series: "3×12", descanso: "60s", tip: "Espalda apoyada, codos a 45°" },
    { nombre: "Remo con banda elástica", series: "3×15", descanso: "60s", tip: "Omóplatos juntos al tirar" },
    { nombre: "Elevaciones laterales", series: "3×12", descanso: "45s", tip: "Codos levemente flexionados" },
    { nombre: "Curl de bíceps", series: "3×12", descanso: "45s", tip: "No balancees el torso" },
    { nombre: "Fondos en silla (tríceps)", series: "3×10", descanso: "45s", tip: "Codos hacia atrás, no hacia afuera" },
    { nombre: "Plancha frontal", series: "3×40s", descanso: "30s", tip: "Cadera alineada, no la subas" },
  ]},
  { dia: "Martes", tipo: "Cardio + Core", ejercicios: [
    { nombre: "Caminata rápida o bici", series: "30 min", descanso: "–", tip: "Ritmo que te permita hablar con esfuerzo" },
    { nombre: "Plancha lateral", series: "3×30s/lado", descanso: "30s", tip: "Cadera arriba, no la dejes caer" },
    { nombre: "Dead bug", series: "3×10", descanso: "30s", tip: "Zona lumbar pegada al piso siempre" },
    { nombre: "Bicicleta abdominal", series: "3×20", descanso: "30s", tip: "Lento y controlado, no jalés el cuello" },
    { nombre: "Mountain climbers", series: "3×20", descanso: "45s", tip: "Cadera baja, core activo" },
  ]},
  { dia: "Miércoles", tipo: "Descanso activo 🧘", ejercicios: [
    { nombre: "Yoga o stretching", series: "30 min", descanso: "–", tip: "Respiración profunda, sin dolor" },
  ]},
  { dia: "Jueves", tipo: "Fuerza · Tren Inferior", ejercicios: [
    { nombre: "Sentadillas con peso corporal", series: "4×15", descanso: "60s", tip: "Rodillas no pasan los pies, espalda recta" },
    { nombre: "Estocadas alternadas", series: "3×12/lado", descanso: "60s", tip: "Rodilla trasera casi toca el piso" },
    { nombre: "Peso muerto rumano", series: "3×12", descanso: "60s", tip: "Bisagra de cadera, espalda neutra" },
    { nombre: "Puente de glúteos", series: "4×15", descanso: "45s", tip: "Aprieta glúteos arriba, no lumbar" },
    { nombre: "Abducción de cadera", series: "3×15/lado", descanso: "30s", tip: "Movimiento controlado, sin balanceo" },
    { nombre: "Elevaciones de pantorrilla", series: "3×20", descanso: "30s", tip: "Subí lento, bajá más lento aún" },
  ]},
  { dia: "Viernes", tipo: "Full Body + HIIT suave", ejercicios: [
    { nombre: "Burpees modificados", series: "3×8", descanso: "60s", tip: "Sin salto si molestan las rodillas" },
    { nombre: "Sentadilla + press", series: "3×12", descanso: "60s", tip: "Coordiná el press al subir" },
    { nombre: "Remo + extensión", series: "3×12", descanso: "60s", tip: "Core firme durante todo el movimiento" },
    { nombre: "Jump squat (bajo impacto opcional)", series: "3×10", descanso: "60s", tip: "Aterrizá suave, rodillas flexionadas" },
    { nombre: "Plancha con toque de hombro", series: "3×10/lado", descanso: "45s", tip: "Cadera quieta al levantar la mano" },
  ]},
  { dia: "Sábado", tipo: "Cardio libre 🚴", ejercicios: [
    { nombre: "Actividad que disfrutes", series: "45 min", descanso: "–", tip: "Bailar, nadar, caminar, bici al aire libre" },
  ]},
  { dia: "Domingo", tipo: "Descanso total 💤", ejercicios: [
    { nombre: "Recuperación y autocuidado", series: "–", descanso: "–", tip: "Stretching suave, buena comida, hidratación" },
  ]},
];

// ─── MENÚ PERSONALIZADO con cantidades exactas en gramos ──────────────────────
const MENU = [
  { dia: "Lunes / Jueves", comidas: [
    { m: "Desayuno", d: "Avena con kéfir laktosefrei, arándanos y nueces", kcal: 320, prot: 12, detalle: [
      "• Avena arrollada: 50g (½ taza)",
      "• Kéfir laktosefrei: 150ml",
      "• Heidelbeeren (arándanos): 80g (puñado generoso)",
      "• Nueces: 15g (3 nueces medianas)",
      "• Canela: 1 cdita — sin límite de calorías",
    ]},
    { m: "Almuerzo", d: "Bowl de quinoa con pechuga grillada, espinaca y tomate", kcal: 430, prot: 38, detalle: [
      "• Quinoa cocida: 120g (½ taza)",
      "• Pechuga de pollo grillada: 150g",
      "• Espinaca fresca: 80g (puñado grande)",
      "• Tomate perita: 1 unidad (100g)",
      "• Aceite de oliva: 1 cda (10ml)",
      "• Limón, sal y pimienta: a gusto",
    ]},
    { m: "Merienda", d: "Yogur griego + almendras + mandarina", kcal: 175, prot: 14, detalle: [
      "• Yogur griego natural 0% grasa: 150g",
      "• Almendras: 15g (10 unidades)",
      "• Mandarina: 1 unidad mediana (100g)",
    ]},
    { m: "Cena", d: "Salmón al horno con cúrcuma, espárragos y arroz jazmín", kcal: 440, prot: 36, detalle: [
      "• Lachs (salmón): 150g",
      "• Arroz jazmín cocido: 80g (⅓ taza)",
      "• Spargel (espárragos): 150g (6-8 tallos)",
      "• Aceite de oliva: 1 cdita (5ml)",
      "• Cúrcuma: ½ cdita · Limón: ½ unidad",
    ]},
  ]},
  { dia: "Martes / Viernes", comidas: [
    { m: "Desayuno", d: "Tostadas integrales con Avocado, huevo pochado y tomate", kcal: 350, prot: 16, detalle: [
      "• Pan integral: 2 rebanadas (60g)",
      "• Avocado: ½ unidad (75g)",
      "• Huevos: 2 unidades (pochados)",
      "• Tomate perita: ½ unidad (50g)",
      "• Limón y sal: a gusto",
    ]},
    { m: "Almuerzo", d: "Ensalada pollo, rúcula, zanahoria, garbanzos", kcal: 400, prot: 35, detalle: [
      "• Pechuga de pollo cocida: 130g",
      "• Rúcula: 60g (2 puñados)",
      "• Zanahoria rallada: 80g (1 zanahoria chica)",
      "• Garbanzos cocidos: 80g (3 cdas)",
      "• Aceite de oliva: 1 cda (10ml) · Limón: a gusto",
    ]},
    { m: "Merienda", d: "Manzana + chocolate negro 70%", kcal: 145, prot: 2, detalle: [
      "• Apfel (manzana): 1 unidad mediana (150g)",
      "• Chocolate negro 70%: 1 cuadradito (10g)",
    ]},
    { m: "Cena", d: "Tortilla de claras con espinaca, champiñones y ricota", kcal: 370, prot: 28, detalle: [
      "• Claras de huevo: 4 unidades (120ml)",
      "• Espinaca: 80g",
      "• Champignons: 100g (5-6 champiñones)",
      "• Ricota light: 50g (2 cdas)",
      "• Aceite de oliva: 1 cdita (5ml)",
    ]},
  ]},
  { dia: "Miércoles / Sábado", comidas: [
    { m: "Desayuno", d: "Smoothie: banana, espinaca, proteína, leche de avena", kcal: 310, prot: 22, detalle: [
      "• Banane (banana): 1 unidad mediana (100g)",
      "• Espinaca fresca: 30g (puñado)",
      "• Proteína de suero (whey): 25g (1 scoop)",
      "• Leche de avena: 200ml",
      "• Jengibre fresco rallado: ½ cdita",
    ]},
    { m: "Almuerzo", d: "Lentejas guisadas con zanahoria, cebolla y cúrcuma", kcal: 420, prot: 22, detalle: [
      "• Lentejas cocidas: 150g (¾ taza)",
      "• Zanahoria: 80g (1 mediana)",
      "• Cebolla: ½ unidad (50g)",
      "• Aceite de oliva: 1 cdita · Cúrcuma: ½ cdita",
      "• Ensalada verde: hojas a gusto (sin límite)",
    ]},
    { m: "Merienda", d: "Hummus casero con bastones de zanahoria", kcal: 155, prot: 8, detalle: [
      "• Hummus: 80g (4 cdas)",
      "• Zanahoria en bastones: 120g (2 medianas)",
      "• Apio: 2 tallos (opcional)",
    ]},
    { m: "Cena", d: "Kabeljau a la plancha con Zucchini y puré de Süßkartoffel", kcal: 390, prot: 34, detalle: [
      "• Kabeljau (bacalao): 160g",
      "• Zucchini: 150g (1 mediano)",
      "• Süßkartoffel (batata): 100g cocida",
      "• Aceite de oliva: 1 cdita · Limón: ½ unidad",
    ]},
  ]},
  { dia: "Domingo", comidas: [
    { m: "Desayuno", d: "Pancakes de avena y banana con miel y frutas rojas", kcal: 370, prot: 14, detalle: [
      "• Avena arrollada: 60g",
      "• Banana: 1 unidad mediana (100g)",
      "• Huevo: 1 unidad",
      "• Leche de avena: 50ml",
      "• Miel: 1 cdita (7g)",
      "• Beeren-Mix (frutas rojas): 80g",
    ]},
    { m: "Almuerzo", d: "Pollo al horno con berenjena, zucchini y arroz jazmín", kcal: 470, prot: 40, detalle: [
      "• Pechuga de pollo: 180g",
      "• Berenjena: 100g (½ mediana)",
      "• Zucchini: 100g (½ mediano)",
      "• Arroz jazmín cocido: 80g (⅓ taza)",
      "• Aceite de oliva: 1 cda · Tomillo: a gusto",
    ]},
    { m: "Merienda", d: "Infusión de jengibre + galletas de avena", kcal: 130, prot: 4, detalle: [
      "• Infusión de jengibre con limón: 250ml",
      "• Galletas de avena caseras: 2 unidades (30g)",
    ]},
    { m: "Cena", d: "Sopa de verduras con lentejas rojas y pan integral", kcal: 310, prot: 18, detalle: [
      "• Lentejas rojas: 60g (crudas) / 120g cocidas",
      "• Caldo de pollo casero: 400ml",
      "• Verduras mixtas (zanahoria, apio): 150g",
      "• Pan integral: 1 rebanada (30g)",
    ]},
  ]},
];

// ─── LISTA DE COMPRAS SÁBADO ───────────────────────────────────────────────────
const COMPRAS_BASE = {
  proteinas: ["Pechuga de pollo (600g)", "Lachs -salmón- (400g)", "Kabeljau (bacalao alemán) (400g)", "Huevos (12u)", "Yogur griego x3", "Ricota light"],
  verduras: ["Blattspinat -espinaca- (500g)", "Tomaten -tomates- (500g)", "Möhren -zanahoria- (1kg)", "Zucchini (2u)", "Aubergine -berenjena- (1u)", "Spargel -espárragos-", "Champignons (500g)", "Paprika -morrón- (3u)", "Süßkartoffel -batata- (2u)"],
  frutas: ["Banane (6u)", "Apfel -manzana- (6u)", "Mandarine (6u)", "Heidelbeeren -arándanos- (300g)", "Avocado (3u)", "Beeren-Mix -frutas rojas- (300g)"],
  cereales: ["Avena arrollada (500g)", "Arroz jazmín (500g)", "Quinoa (300g)", "Pan integral (1 bolsa)"],
  legumbres: ["Lentejas (500g)", "Garbanzos (400g)"],
  otros: ["Aceite de oliva extra virgen", "Cúrcuma en polvo", "Jengibre fresco", "Almendras (100g)", "Nueces (100g)", "Chocolate negro 70% (1 barra)", "Leche de avena (1L)"],
};

// ─── AGUA: 10 recordatorios 8am-10pm ─────────────────────────────────────────
const RECORDATORIOS_AGUA = [
  { hora: "08:00", mensaje: "¡Buenos días! Empezá el día con un vaso de agua 💧" },
  { hora: "09:30", mensaje: "Ya van 1.5 horas activa — ¿tomaste agua? 💧" },
  { hora: "11:00", mensaje: "Mitad de la mañana, recargá energía con agua 💧" },
  { hora: "12:30", mensaje: "Antes del almuerzo, tomá un vaso de agua 💧" },
  { hora: "14:00", mensaje: "Post almuerzo — hidratate 💧" },
  { hora: "15:30", mensaje: "Tarde activa, no te olvides del agua 💧" },
  { hora: "17:00", mensaje: "Antes de la merienda, un vaso de agua primero 💧" },
  { hora: "18:30", mensaje: "¿Ya llegaste a 1.5L? ¡Seguí! 💧" },
  { hora: "20:00", mensaje: "Cena se acerca, hidratate antes 💧" },
  { hora: "21:30", mensaje: "Último vaso del día, cerrá bien la hidratación 💧" },
];

const DIAS = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];

// ─── BASE DE DATOS DE CALORÍAS (funciona sin internet) ───────────────────────
const KCAL_DB = [
  // Café y bebidas
  { n: "Café solo", k: 5 }, { n: "Café con leche entera", k: 60 }, { n: "Café con leche descremada", k: 35 },
  { n: "Café descafeinado solo", k: 3 }, { n: "Café descafeinado con leche deslactosada", k: 30 },
  { n: "Café con leche deslactosada", k: 45 }, { n: "Cappuccino", k: 80 }, { n: "Latte", k: 120 },
  { n: "Té negro solo", k: 2 }, { n: "Té con leche", k: 30 }, { n: "Jugo naranja natural 200ml", k: 85 },
  { n: "Jugo de manzana 200ml", k: 90 }, { n: "Agua con gas", k: 0 }, { n: "Cerveza 330ml", k: 145 },
  { n: "Vino tinto 150ml", k: 125 }, { n: "Vino blanco 150ml", k: 115 }, { n: "Coca cola 330ml", k: 140 },
  { n: "Leche entera 200ml", k: 130 }, { n: "Leche descremada 200ml", k: 70 }, { n: "Kéfir 150ml", k: 85 },
  // Panadería / desayuno
  { n: "Medialuna", k: 180 }, { n: "Medialuna chica", k: 130 }, { n: "Tostada pan integral", k: 70 },
  { n: "Croissant", k: 230 }, { n: "Galleta de avena", k: 65 }, { n: "Galletitas x3", k: 90 },
  { n: "Barra de cereal", k: 130 }, { n: "Porridge / avena cocida 50g", k: 180 },
  // Frutas
  { n: "Manzana mediana", k: 80 }, { n: "Banana mediana", k: 95 }, { n: "Mandarina", k: 45 },
  { n: "Naranja mediana", k: 65 }, { n: "Pera mediana", k: 85 }, { n: "Uvas 100g", k: 70 },
  { n: "Fresas / frutillas 100g", k: 32 }, { n: "Arándanos 80g", k: 45 }, { n: "Kiwi", k: 42 },
  // Lácteos / huevos
  { n: "Yogur griego 150g", k: 130 }, { n: "Yogur natural 150g", k: 90 }, { n: "Queso fresco 30g", k: 75 },
  { n: "Queso cheddar 30g", k: 120 }, { n: "Huevo entero", k: 75 }, { n: "Clara de huevo", k: 17 },
  { n: "Ricota light 50g", k: 65 }, { n: "Chocolate negro 70% 10g", k: 60 },
  // Condimentos y extras
  { n: "Miel 1 cucharada", k: 60 }, { n: "Miel 1 cucharadita", k: 25 }, { n: "Miel cucharada mediana", k: 45 },
  { n: "Aceite de oliva 1 cda", k: 90 }, { n: "Aceite de oliva 1 cdita", k: 40 },
  { n: "Manteca 1 cda", k: 100 }, { n: "Mermelada 1 cda", k: 50 },
  { n: "Azúcar 1 cda", k: 48 }, { n: "Sal", k: 0 }, { n: "Canela", k: 6 },
  { n: "Salsa de soja 1 cda", k: 10 }, { n: "Salsa de soja 1 cdita", k: 3 },
  { n: "Sriracha 1 cda", k: 15 }, { n: "Sriracha 1 cdita", k: 5 },
  { n: "Mayonesa 1 cda", k: 90 }, { n: "Mayonesa light 1 cda", k: 45 },
  { n: "Mostaza 1 cda", k: 10 }, { n: "Mostaza 1 cdita", k: 3 },
  { n: "Queso feta 30g", k: 75 }, { n: "Queso feta desmenuzado 1 cda", k: 25 },
  { n: "Queso cottage 100g", k: 98 }, { n: "Queso cottage 50g", k: 49 },
  { n: "Gin tonic", k: 170 }, { n: "Gin solo 50ml", k: 115 },
  { n: "Mate amargo", k: 2 }, { n: "Mate con azúcar", k: 20 }, { n: "Mate con edulcorante", k: 2 },
  { n: "Té solo", k: 2 }, { n: "Té con leche", k: 30 }, { n: "Té con azúcar", k: 20 }, { n: "Té verde", k: 2 },
  { n: "Avellanas 10 unidades", k: 88 }, { n: "Avellanas 30g", k: 188 }, { n: "Avellanas puñado", k: 130 },
  { n: "Almendras 10 unidades", k: 87 }, { n: "Almendras 30g", k: 174 }, { n: "Almendras puñado", k: 120 },
  { n: "Pistachos 10 unidades", k: 40 }, { n: "Pistachos 30g", k: 170 }, { n: "Pistachos puñado", k: 110 },
  // Snacks / dulces
  { n: "Helado 1 bola", k: 130 }, { n: "Helado 2 bolas", k: 260 }, { n: "Helado 2 bolas con cucurucho", k: 330 },
  { n: "Cucurucho solo", k: 70 }, { n: "Alfajor", k: 280 }, { n: "Porción de torta", k: 350 },
  { n: "Brownie", k: 240 }, { n: "Chips / papas fritas 30g", k: 155 }, { n: "Palomitas de maíz 30g", k: 110 },
  { n: "Nueces 15g", k: 98 }, { n: "Almendras 15g", k: 87 }, { n: "Maní 20g", k: 113 },
  // Comidas
  { n: "Pizza porción", k: 285 }, { n: "Pizza 2 porciones", k: 570 }, { n: "Hamburguesa simple", k: 430 },
  { n: "Ensalada mixta sin aderezo", k: 40 }, { n: "Sopa de verduras 300ml", k: 80 },
  { n: "Arroz blanco cocido 100g", k: 130 }, { n: "Pasta cocida 100g", k: 131 },
  { n: "Pechuga de pollo 100g", k: 165 }, { n: "Salmón 100g", k: 208 }, { n: "Atún en lata 100g", k: 116 },
  { n: "Lentejas cocidas 100g", k: 116 }, { n: "Garbanzos cocidos 100g", k: 164 },
  { n: "Patata / papa cocida 100g", k: 86 }, { n: "Batata / Süßkartoffel 100g", k: 86 },
  { n: "Aguacate / Avocado medio", k: 160 }, { n: "Hummus 80g", k: 190 },
  // Restaurante / fast food
  { n: "Sushi 6 piezas", k: 250 }, { n: "Döner kebab", k: 520 }, { n: "Burrito mediano", k: 480 },
  { n: "Bowl de pollo restaurante", k: 420 }, { n: "Schnitzel con papas", k: 680 },
  { n: "Ensalada césar con pollo", k: 360 }, { n: "Tostada de aguacate restaurante", k: 280 },
];

function buscarKcal(texto) {
  if (!texto) return null;
  const t = texto.toLowerCase().trim();
  // Búsqueda exacta primero
  const exacto = KCAL_DB.find(x => x.n.toLowerCase() === t);
  if (exacto) return exacto.k;
  // Búsqueda por coincidencia de palabras clave
  const palabras = t.split(" ").filter(p => p.length > 2);
  let mejorMatch = null, mejorScore = 0;
  for (const item of KCAL_DB) {
    const itemL = item.n.toLowerCase();
    let score = 0;
    for (const p of palabras) { if (itemL.includes(p)) score++; }
    if (score > mejorScore) { mejorScore = score; mejorMatch = item; }
  }
  return mejorScore >= 1 ? mejorMatch.k : null;
}

// ─── Input aislado — no se re-renderiza, cursor no salta en iOS ──────────────
const StableInput = React.memo(React.forwardRef(function StableInput({ placeholder, onChange, style }, ref) {
  return (
    <input
      ref={ref}
      placeholder={placeholder}
      onChange={e => onChange(e.target.value)}
      style={{...style, caretColor: "#c9a96e"}}
      autoComplete="off"
      autoCorrect="off"
      spellCheck="false"
    />
  );
}), () => true); // nunca re-renderiza desde afuera
function ExtraForm({ onAgregar, placeholder = "Ej: café descafeinado con leche deslactosada...", naranja = false }) {
  const [kcal, setKcal] = useState("");
  const [calculando, setCalculando] = useState(false);
  const [sugerencias, setSugerencias] = useState([]);
  const [kcalAuto, setKcalAuto] = useState(null);
  const inputRef = useRef(null); // ← ref no controlada para evitar que cursor salte al final
  const color = naranja ? "#ff9500" : "#c9a96e";

  function onCambioNombre(val) {
    if (inputRef.current) inputRef.current._val = val;
    setKcalAuto(null);
    const local = buscarKcal(val);
    if (local) setKcalAuto(local);
    if (val.length >= 2) {
      const t = val.toLowerCase();
      const sug = KCAL_DB.filter(x => x.n.toLowerCase().includes(t)).slice(0, 5);
      setSugerencias(sug);
    } else {
      setSugerencias([]);
    }
  }

  function elegirSugerencia(item) {
    if (inputRef.current) inputRef.current._val = item.n;
    setKcal(String(item.k));
    setKcalAuto(item.k);
    setSugerencias([]);
  }

  async function agregar() {
    const nombre = (inputRef.current?.value || inputRef.current?._val || "").trim();
    if (!nombre || calculando) return;
    let kcalFinal = kcal || (kcalAuto ? String(kcalAuto) : null);
    if (!kcalFinal) {
      setCalculando(true);
      try {
        const res = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 60,
            system: "Sos nutricionista. Respondé SOLO con un número entero: calorías estimadas. Solo el número.",
            messages: [{ role: "user", content: `Calorías de: "${nombre}". Porción normal si no especifica.` }]
          })
        });
        const data = await res.json();
        const raw = data.content?.map(b => b.text || "").join("").trim();
        kcalFinal = raw.match(/\d+/)?.[0] || null;
      } catch { kcalFinal = null; }
      setCalculando(false);
    }
    onAgregar({ nombre, kcal: kcalFinal || "?" });
    if (inputRef.current) { inputRef.current.value = ""; inputRef.current._val = ""; }
    setKcal(""); setKcalAuto(null); setSugerencias([]);
  }

  const kcalMostrar = kcal || (kcalAuto ? String(kcalAuto) : "");

  return (
    <div style={{marginTop:8,position:"relative"}}>
      {/* Sugerencias */}
      {sugerencias.length > 0 && (
        <div style={{background:"#1a1535",border:`1px solid ${color}44`,borderRadius:10,marginBottom:6,overflow:"hidden"}}>
          {sugerencias.map((s,i) => (
            <button key={i} onClick={() => elegirSugerencia(s)} style={{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%",padding:"10px 12px",background:"none",border:"none",borderBottom:i<sugerencias.length-1?"1px solid rgba(255,255,255,0.06)":"none",color:"#f0ece8",fontFamily:"inherit",cursor:"pointer",textAlign:"left"}}>
              <span style={{fontSize:13}}>{s.n}</span>
              <span style={{fontSize:12,color:color,fontWeight:"bold",flexShrink:0,marginLeft:8}}>{s.k} kcal</span>
            </button>
          ))}
        </div>
      )}
      {/* Input estable — cursor no salta en iOS */}
      <StableInput
        ref={inputRef}
        placeholder={placeholder}
        onChange={val => { if (inputRef.current) inputRef.current._val = val; onCambioNombre(val); }}
        style={{width:"100%",padding:"11px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,0.15)",background:"rgba(255,255,255,0.07)",color:"#f0ece8",fontFamily:"inherit",fontSize:14,boxSizing:"border-box",marginBottom:7}}
      />
      {/* Fila kcal + botón */}
      <div style={{display:"flex",gap:8,alignItems:"center"}}>
        <input
          value={kcalMostrar}
          onChange={e => setKcal(e.target.value)}
          placeholder="kcal (opcional)"
          type="number"
          style={{width:110,padding:"9px 10px",borderRadius:10,border:`1px solid ${kcalMostrar?color:"rgba(255,255,255,0.12)"}`,background:kcalMostrar?`${color}18`:"rgba(255,255,255,0.06)",color:kcalMostrar?color:"#f0ece8",fontFamily:"inherit",fontSize:13,textAlign:"center"}}
        />
        <button
          onClick={agregar}
          disabled={calculando}
          style={{flex:1,padding:"10px",borderRadius:10,border:"none",background:color,color:"#1a1635",fontWeight:"bold",cursor:calculando?"not-allowed":"pointer",fontSize:14,fontFamily:"inherit"}}
        >
          {calculando ? "⏳ Calculando..." : `+ Agregar${kcalMostrar?" ("+kcalMostrar+" kcal)":""}`}
        </button>
      </div>
      {kcalAuto && !kcal && (
        <div style={{fontSize:11,color:color,marginTop:3,paddingLeft:2}}>
          ✓ Encontrado: <b>{kcalAuto} kcal</b>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("hoy");
  const [videoModal, setVideoModal] = useState(null);

  // ── Clave de storage con la fecha de hoy ─────────────────────────────────
  const fechaHoy = new Date().toISOString().slice(0, 10); // "2026-06-06"
  const STORAGE_KEY = `paula_dia_${fechaHoy}`;
  const HISTORIAL_KEY = "paula_historial";
  const CICLO_KEY = "paula_ciclo";
  const COMPRAS_KEY = "paula_compras";

  const regInicial = {
    ejercicio: false, agua: 0, sueno: "", peso: "",
    comidas: { desayuno: false, almuerzo: false, merienda: false, cena: false },
    extrasComida: {}, extraLibre: [],
    energia: 3, humor: 3, notas: "",
  };

  // ── Cargar datos guardados al iniciar ────────────────────────────────────
  function cargarStorage(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch { return fallback; }
  }

  const [reg, setReg] = useState(() => cargarStorage(STORAGE_KEY, regInicial));
  const [historial, setHistorial] = useState(() => cargarStorage(HISTORIAL_KEY, []));
  const [ciclo, setCiclo] = useState(() => cargarStorage(CICLO_KEY, { ultimaMenstruacion: "", duracionCiclo: 28, sintomas: [] }));
  const [comprasIA, setComprasIA] = useState(() => cargarStorage(COMPRAS_KEY, null));

  // ── Auto-guardar cada vez que cambia reg ─────────────────────────────────
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(reg)); } catch {}
  }, [reg]);

  useEffect(() => {
    try { localStorage.setItem(HISTORIAL_KEY, JSON.stringify(historial)); } catch {}
  }, [historial]);

  useEffect(() => {
    try { localStorage.setItem(CICLO_KEY, JSON.stringify(ciclo)); } catch {}
  }, [ciclo]);

  useEffect(() => {
    if (comprasIA) { try { localStorage.setItem(COMPRAS_KEY, JSON.stringify(comprasIA)); } catch {} }
  }, [comprasIA]);

  const [chat, setChat] = useState([
    { role: "assistant", text: "¡Hola! 💪 Ya tengo tu perfil completo: sé que te gusta el pollo, el pescado, las legumbres y más, que evitamos picante, pepino y coles, y que cuidamos el colesterol con alimentación anti-inflamatoria. ¡Preguntame lo que quieras o contame cómo va tu día!" }
  ]);
  const [inputChat, setInputChat] = useState("");
  const [cargando, setCargando] = useState(false);
  const [guardado, setGuardado] = useState(false);
  const [notifAgua, setNotifAgua] = useState(null);
  const [notifPermiso, setNotifPermiso] = useState("default");
  const [cargandoCompras, setCargandoCompras] = useState(false);
  const [analisisArchivo, setAnalisisArchivo] = useState(null);
  const [analisisNombre, setAnalisisNombre] = useState("");
  const [analisisResultado, setAnalisisResultado] = useState(null);
  const [cargandoAnalisis, setCargandoAnalisis] = useState(false);
  const [historialAnalisis, setHistorialAnalisis] = useState([]);
  const [faseActual, setFaseActual] = useState(null);
  const [diasCiclo, setDiasCiclo] = useState(null);
  const [diaExpandido, setDiaExpandido] = useState(null);
  const [vozActiva, setVozActiva] = useState(false);
  const [ultimoMensajeVoz, setUltimoMensajeVoz] = useState("");
  const [clima, setClima] = useState(null);
  const fileInputRef = useRef(null);
  const chatEndRef = useRef(null);
  const regRef = useRef(reg);
  useEffect(() => { regRef.current = reg; }, [reg]);

  const hoy = new Date();
  const diaHoy = DIAS[hoy.getDay()];
  const rutinaHoy = RUTINA.find(r => r.dia === diaHoy);
  const esSabado = hoy.getDay() === 6;
  const agua_l = (reg.agua * 0.25).toFixed(2);
  const agua_pct = Math.min(100, (agua_l / 2.5) * 100);
  const sueno_pct = Math.min(100, ((parseFloat(reg.sueno) || 0) / 8) * 100);

  // ── ElevenLabs TTS — Voz "Lucía" argentina ───────────────────────────────
  const EL_API_KEY = "0732b3adb3c2bfb7b53bddc0973d75c2b1873991180d429b3a05a715376fc884";
  const EL_VOICE_ID = "ChvF2eSRaJsHDVJhdmbG"; // Lucía — Warm, Expressive, Argentino

  async function hablar(texto) {
    if (!texto?.trim()) return;
    setVozActiva(true);
    setUltimoMensajeVoz(texto);
    try {
      const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${EL_VOICE_ID}/stream`, {
        method: "POST",
        headers: {
          "xi-api-key": EL_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: texto,
          model_id: "eleven_multilingual_v2",
          voice_settings: { stability: 0.45, similarity_boost: 0.82, style: 0.35, use_speaker_boost: true }
        })
      });
      if (!res.ok) throw new Error("ElevenLabs error");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.onended = () => { setVozActiva(false); URL.revokeObjectURL(url); };
      audio.onerror = () => setVozActiva(false);
      // Stop any previous audio
      if (window._paulaAudio) { window._paulaAudio.pause(); window._paulaAudio = null; }
      window._paulaAudio = audio;
      await audio.play();
    } catch {
      // Fallback to browser TTS if ElevenLabs fails
      window.speechSynthesis?.cancel();
      const utter = new SpeechSynthesisUtterance(texto);
      utter.lang = "es-AR"; utter.rate = 0.88; utter.pitch = 1.15;
      const v = window.speechSynthesis?.getVoices().find(v => v.lang.startsWith("es"));
      if (v) utter.voice = v;
      utter.onend = () => setVozActiva(false);
      window.speechSynthesis?.speak(utter);
    }
  }

  function pararVoz() {
    if (window._paulaAudio) { window._paulaAudio.pause(); window._paulaAudio = null; }
    window.speechSynthesis?.cancel();
    setVozActiva(false);
  }

  // ── Frases motivadoras con humor argentino ────────────────────────────────
  const FRASES_MOTIVACION = [
    "Acordate: dentro de 3 meses, cuando te pongas ese jean que guardaste, te vas a acordar de este momento. ¡Vale la pena!",
    "Tu versión de diciembre te está mirando ahora mismo y te está mandando fuerzas. ¡No la decepciones!",
    "Che, ¿sabés qué? Cada vaso de agua que tomás es una pequeña victoria. Y las pequeñas victorias hacen el gran cambio.",
    "Meta a largo plazo: bajar 5 kilos y tonificar. Meta de hoy: ser un poquito mejor que ayer. Eso es todo lo que necesitás.",
    "La constancia le gana a la perfección siempre. No hace falta que sea perfecto, hace falta que sea consistente.",
    "Imaginate en 6 meses: más fuerte, más liviana, con más energía. Ese futuro se construye hoy, con estas decisiones.",
    "Cada vez que elegís el agua en lugar de otra cosa, cada vez que hacés los ejercicios aunque no tengas ganas... eso se acumula. Y se nota.",
    "Tu cuerpo tiene memoria. Todo lo que hacés hoy lo está procesando, adaptando y mejorando. Confiá en el proceso.",
  ];

  const FRASES_HUMOR = [
    "Mirá, el gym no va a venir a buscarte. Pero vos sí podés ir a buscarlo... ¡y conquistarlo!",
    "El agua no sabe a nada, sí. Pero tampoco tiene calorías, colesterol ni dramas. Tomala.",
    "Sé que el sillón es muy cómodo. Yo también lo sé. Pero el sillón no te va a hacer entrar en ese jean.",
    "Las sentadillas no matan. Lo digo en serio. Ya sobreviviste muchas cosas peores.",
    "Comer bien no es un castigo, es un privilegio. Aunque a veces no parezca cuando ves una pizza.",
  ];

  function fraseMot() { return FRASES_MOTIVACION[Math.floor(Math.random() * FRASES_MOTIVACION.length)]; }
  function fraseHum() { return FRASES_HUMOR[Math.floor(Math.random() * FRASES_HUMOR.length)]; }

  // ── Calcular fase del ciclo ────────────────────────────────────────────────
  useEffect(() => {
    if (!ciclo.ultimaMenstruacion) return;
    const inicio = new Date(ciclo.ultimaMenstruacion);
    const hoyDate = new Date();
    const diff = Math.floor((hoyDate - inicio) / (1000 * 60 * 60 * 24));
    const diaDelCiclo = (diff % ciclo.duracionCiclo) + 1;
    setDiasCiclo(diaDelCiclo);
    if (diaDelCiclo <= 5) setFaseActual("menstruacion");
    else if (diaDelCiclo <= 13) setFaseActual("folicular");
    else if (diaDelCiclo <= 16) setFaseActual("ovulacion");
    else setFaseActual("lutea");
  }, [ciclo]);

  const SINTOMAS_OPCIONES = ["Cólicos", "Dolor de cabeza", "Hinchazón", "Cansancio", "Cambios de humor", "Antojos", "Acné", "Sensibilidad en senos", "Náuseas", "Insomnio"];

  function construirMensajeVoz(r) {
    const ahora = new Date();
    const hora = ahora.getHours();
    const aguaL = parseFloat((r.agua * 0.25).toFixed(1));
    const comidasFaltantes = Object.entries(r.comidas).filter(([,v]) => !v).map(([k]) => k);
    const faltaAgua = aguaL < 2.5;
    const faltaEjercicio = !r.ejercicio;
    const todoCompleto = !faltaEjercicio && !faltaAgua && comidasFaltantes.length === 0;

    if (todoCompleto) {
      return `¡Lucianaaa! ¡Pará, pará, pará! ¿Sos un ejemplo o qué? Cumpliste con el entrenamiento, tomaste toda el agua y registraste todas tus comidas. Esto es exactamente lo que te va a llevar a esos 5 kilos menos que querés. ${fraseMot()} ¡Orgullo total!`;
    }

    const saludo = hora < 19 ? "¡Buenas tardes, Luciana!" : "¡Buenas noches, Luciana!";
    let msg = `${saludo} Soy tu coach y vengo a ver cómo andamos. `;

    if (faltaEjercicio) msg += `El entrenamiento de hoy todavía no está tildado. Che, el gym no va a venir a buscarte... pero igual hay tiempo. ${fraseHum()} `;
    if (faltaAgua) msg += `Con el agua llevás ${aguaL} litros, te faltan ${(2.5 - aguaL).toFixed(1)} litros. Andá a buscar un vaso ahora mismo, no en cinco minutos, ¡ahora! `;
    if (comidasFaltantes.length > 0) msg += `Las comidas pendientes son: ${comidasFaltantes.join(", ")}. Comer bien es parte del plan, no es opcional. `;

    msg += fraseMot();
    return msg;
  }

  // ── Sistema de notificaciones + voz por horario ───────────────────────────
  useEffect(() => {
    if ("Notification" in window) setNotifPermiso(Notification.permission);

    const intervalo = setInterval(() => {
      const ahora = new Date();
      const h = ahora.getHours();
      const m = ahora.getMinutes();
      const horaActual = `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}`;
      const esTarde = h > 17 || (h === 17 && m >= 30);
      const r = regRef.current;

      // Recordatorios de agua (8am - 5:30pm) → solo notificación silenciosa
      const rec = RECORDATORIOS_AGUA.find(rec => rec.hora === horaActual);
      if (rec && !esTarde) {
        setNotifAgua(rec.mensaje);
        setTimeout(() => setNotifAgua(null), 8000);
        if ("Notification" in window && Notification.permission === "granted") {
          new Notification("💧 Recordatorio de agua · Paula", { body: rec.mensaje });
        }
      }

      // Recordatorios de voz específicos tarde/noche con personalidad argentina
      const recordatoriosVoz = [
        { hora: "17:30", msg: () => construirMensajeVoz(r) },
        { hora: "19:00", msg: () => {
          const cenaPendiente = !r.comidas.cena;
          if (cenaPendiente) return `Luciana, son las siete de la tarde y la cena no se hace sola. Preparate algo rico y sano, que te lo merecés. Acordate: proteína, verduras, nada de inventar a esta hora. ${fraseHum()}`;
          return `¡Luciana! Ya cenaste, eso es un diez. Ahora un vasito de agua y a descansar la mente. ${fraseMot()}`;
        }},
        { hora: "20:30", msg: () => {
          const aguaL = parseFloat((r.agua * 0.25).toFixed(1));
          if (aguaL < 2.5) return `Ey, Luciana. Último aviso de hidratación del día. Llevás ${aguaL} litros y el objetivo son dos y medio. Hacete un favor: tomá un vaso grande ahora. Tu piel, tu digestión y tus músculos te lo agradecen. En serio.`;
          return `¡Luciana, rompiste con el agua hoy! ${aguaL} litros, meta cumplida. Eso es constancia pura. ${fraseMot()}`;
        }},
        { hora: "21:30", msg: () => {
          const aguaL = parseFloat((r.agua * 0.25).toFixed(1));
          const todo = !Object.values(r.comidas).includes(false) && r.ejercicio && aguaL >= 2.5;
          if (todo) return `Luciana, qué día hiciste. Entrenamiento, agua, comidas... todo. Esto no es suerte, esto es disciplina. Y la disciplina es lo que en 3 meses te va a poner donde querés estar. Dormí bien, que mañana hay más. ¡Buenas noches, campeona!`;
          const diasPlazo = 90;
          return `Luciana, cerramos el día. Hoy no salió todo perfecto, y está bien. La clave es mañana volver a intentarlo. Recordá: la meta son 5 kilos menos y un cuerpo más fuerte. Eso no pasa en un día, pero sí pasa con días como hoy, donde lo intentaste. Buenas noches, y a descansar que el cuerpo también trabaja mientras dormís.`;
        }},
        { hora: "22:43", msg: () => {
          // Solo domingos (0) a jueves (4)
          const diaSemana = new Date().getDay();
          if (diaSemana >= 5) return null; // Viernes y sábado no
          const msgs = [
            "Luciana, son las diez y cuarenta y tres. ¡A dormir! El sueño es parte del entrenamiento, no es opcional. Tu cuerpo quema grasa, repara músculo y regula hormonas mientras dormís. Apagá el teléfono, que mañana hay más.",
            "¡Lucianaaa! Las diez y cuarenta y tres. ¿Seguís despierta? Che, el descanso es sagrado. Ocho horas de sueño equivalen a una hora de gym extra. En serio, lo dice la ciencia. A la cama.",
            "Hora de dormir, Luciana. Son las diez cuarenta y tres y mañana tenés un día lleno por delante. Tu versión descansada rinde mucho más que tu versión con sueño. Dulces sueños, campeona.",
            "¡Stop! Son las diez y cuarenta y tres. El teléfono se apaga, los ojos se cierran, y tu cuerpo hace su magia. Dormir bien es parte de bajar esos 5 kilos. No te lo saltes. Buenas noches.",
          ];
          return msgs[new Date().getDate() % msgs.length];
        }},
      ];

      const recVoz = recordatoriosVoz.find(rv => rv.hora === horaActual);
      if (recVoz) {
        const texto = recVoz.msg();
        if (!texto) return; // viernes/sábado no hay recordatorio de dormir
        hablar(texto);
        if ("Notification" in window && Notification.permission === "granted") {
          new Notification("🎙️ Tu Coach", { body: texto.slice(0, 120) });
        }
      }

    }, 60000);
    return () => clearInterval(intervalo);
  }, []);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chat]);

  // ── Clima con Open-Meteo (sin API key) ────────────────────────────────────
  useEffect(() => {
    const WEATHER_CODES = {
      0:"Despejado ☀️", 1:"Mayormente despejado 🌤️", 2:"Parcialmente nublado ⛅", 3:"Nublado ☁️",
      45:"Neblina 🌫️", 48:"Neblina con escarcha 🌫️", 51:"Llovizna ligera 🌦️", 53:"Llovizna 🌧️",
      55:"Llovizna intensa 🌧️", 61:"Lluvia ligera 🌧️", 63:"Lluvia 🌧️", 65:"Lluvia intensa 🌧️",
      71:"Nieve ligera ❄️", 73:"Nieve ❄️", 75:"Nieve intensa ❄️", 80:"Chubascos ligeros 🌦️",
      81:"Chubascos 🌧️", 82:"Chubascos intensos ⛈️", 95:"Tormenta ⛈️", 99:"Tormenta con granizo ⛈️",
    };
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(async pos => {
      try {
        const { latitude: lat, longitude: lon } = pos.coords;
        // Obtener ciudad con geocoding inverso
        const geoRes = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
        const geoData = await geoRes.json();
        const ciudad = geoData.address?.city || geoData.address?.town || geoData.address?.village || geoData.address?.state || "";
        // Obtener clima
        const climaRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=auto`);
        const climaData = await climaRes.json();
        const c = climaData.current;
        setClima({
          ciudad,
          temp: Math.round(c.temperature_2m),
          sensacion: Math.round(c.apparent_temperature),
          desc: WEATHER_CODES[c.weather_code] || "–",
          viento: Math.round(c.wind_speed_10m),
        });
      } catch {}
    }, () => {}, { timeout: 8000 });
  }, []);

  async function pedirPermiso() {
    if ("Notification" in window) {
      const p = await Notification.requestPermission();
      setNotifPermiso(p);
    }
  }

  // ── Chat con coach ─────────────────────────────────────────────────────────
  async function enviarChat() {
    if (!inputChat.trim() || cargando) return;
    const msg = inputChat.trim();
    setInputChat("");
    setChat(prev => [...prev, { role: "user", text: msg }]);
    setCargando(true);

    const ctx = `Perfil: mujer 41 años, 61kg, 1.63m. Objetivo: bajar 5-6kg y tonificar. 1450 kcal/día, 2.5L agua, 8h sueño.
Condiciones: ${PERFIL.condiciones.join(", ")}. Le gusta: ${PERFIL.gusta.join(", ")}. No le gusta/evita: ${PERFIL.noGusta.join(", ")}.
Notas médicas: ${PERFIL.notas_medicas}
Hoy (${diaHoy}): ${rutinaHoy?.tipo}. Ejercicio: ${reg.ejercicio?"✅":"❌"}, Agua: ${agua_l}L, Sueño: ${reg.sueno||"?"}h, Comidas: ${Object.values(reg.comidas).filter(Boolean).length}/4, Energía: ${reg.energia}/5.`;

    const histChat = chat.slice(-8).map(m => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.text }));

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `Sos personal trainer, chef nutricionista y médica integrativa. Hablás en español rioplatense, sos cálida y directa. Contexto: ${ctx}. Respondé en 2-4 oraciones. Si mencionan síntomas físicos o médicos, respondé como médica integrativa con recomendaciones prácticas y sugerí consultar un profesional si es necesario. Celebrá logros, motivá, dá consejos específicos. Emojis con moderación.`,
          messages: [...histChat, { role: "user", content: msg }]
        })
      });
      const data = await res.json();
      const texto = data.content?.map(b => b.text || "").join("") || "Error al responder, intentá de nuevo.";
      setChat(prev => [...prev, { role: "assistant", text: texto }]);
    } catch {
      setChat(prev => [...prev, { role: "assistant", text: "Error de conexión, intentá de nuevo 🙏" }]);
    }
    setCargando(false);
  }

  // ── Generar lista de compras con IA ───────────────────────────────────────
  async function generarCompras() {
    setCargandoCompras(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `Sos una chef nutricionista. Respondé SOLO en JSON válido, sin texto adicional ni backticks.`,
          messages: [{
            role: "user",
            content: `Generá una lista de compras DETALLADA para la semana completa (lunes a domingo) para una mujer de 41 años, 61kg. Objetivo: bajar peso y tonificar. 1450 kcal/día.
Le gusta: pollo, carne roja (moderada), pescado, legumbres, huevos, lácteos. NO le gusta: pepino, ketchup, coles/repollo, anchoas, picante, kiwi. Arroz preferido: arroz jazmín. Colesterol moderado, anti-inflamatorio. Vive en Alemania: usar productos disponibles en REWE, Edeka, Lidl, Aldi. Nombres alemanes donde corresponda.
Suplemento actual: Vitamina D.
IMPORTANTE:
- En la lista de compras especificá tipo exacto de yogur (ej: "Yogur griego natural descremado 0% grasa - 500g") y cantidades en gramos/unidades para TODO.
- El menú debe incluir desayuno, almuerzo y cena para cada día (no merienda separada, incluirla en cena o almuerzo).
- Para cada comida incluí instrucciones breves de cómo cocinarla (2-3 pasos simples).
Devolvé SOLO este JSON:
{
  "plan_semana": [
    {
      "dia": "Lunes",
      "desayuno": {"plato":"...","como_cocinar":"...","kcal":0,"prot_g":0},
      "almuerzo": {"plato":"...","como_cocinar":"...","kcal":0,"prot_g":0},
      "cena": {"plato":"...","como_cocinar":"...","kcal":0,"prot_g":0},
      "total_kcal":0
    }
  ],
  "lista_compras": {
    "proteinas": [{"item":"...","cantidad":"...","nota":"..."}],
    "verduras_y_frutas": [{"item":"...","cantidad":"...","nota":"..."}],
    "lacteos_y_huevos": [{"item":"...","cantidad":"...","nota":"..."}],
    "cereales_y_legumbres": [{"item":"...","cantidad":"...","nota":"..."}],
    "aceites_condimentos": [{"item":"...","cantidad":"...","nota":"..."}]
  }
}`
          }]
        })
      });
      const data = await res.json();
      const raw = data.content?.map(b => b.text || "").join("") || "{}";
      const clean = raw.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setComprasIA(parsed);
    } catch (e) {
      setComprasIA({ error: "No pude generar el plan. Intentá de nuevo." });
    }
    setCargandoCompras(false);
  }

  // ── Analizar resultados de salud con IA ───────────────────────────────────
  async function analizarEstudios() {
    if (!analisisArchivo) return;
    setCargandoAnalisis(true);
    setAnalisisResultado(null);
    try {
      const base64 = await new Promise((res, rej) => {
        const r = new FileReader();
        r.onload = () => res(r.result.split(",")[1]);
        r.onerror = () => rej(new Error("Error al leer archivo"));
        r.readAsDataURL(analisisArchivo);
      });
      const isImage = analisisArchivo.type.startsWith("image/");
      const isPdf = analisisArchivo.type === "application/pdf";
      let contentBlocks = [];
      if (isImage) {
        contentBlocks = [
          { type: "image", source: { type: "base64", media_type: analisisArchivo.type, data: base64 } },
          { type: "text", text: `Analizá estos resultados de salud para una mujer de 41 años, 61kg, 1.63m. Ya toma Vitamina D. Condiciones conocidas: colesterol moderado, posible inflamación intestinal. Devolvé SOLO JSON válido sin texto ni backticks con esta estructura exacta: {"resumen":"string","valores":[{"nombre":"string","valor":"string","referencia":"string","estado":"normal|alto|bajo|atención"}],"suplementos":[{"nombre":"string","dosis":"string","horario":"string","con_comida":true,"razon":"string","prioridad":"alta|media|baja"}],"alertas":["string"],"recomendaciones":["string"],"nota_profesional":"string"}` }
        ];
      } else if (isPdf) {
        contentBlocks = [
          { type: "document", source: { type: "base64", media_type: "application/pdf", data: base64 } },
          { type: "text", text: `Analizá estos resultados de salud para una mujer de 41 años, 61kg, 1.63m. Ya toma Vitamina D. Condiciones conocidas: colesterol moderado, posible inflamación intestinal. Devolvé SOLO JSON válido sin texto ni backticks con esta estructura exacta: {"resumen":"string","valores":[{"nombre":"string","valor":"string","referencia":"string","estado":"normal|alto|bajo|atención"}],"suplementos":[{"nombre":"string","dosis":"string","horario":"string","con_comida":true,"razon":"string","prioridad":"alta|media|baja"}],"alertas":["string"],"recomendaciones":["string"],"nota_profesional":"string"}` }
        ];
      }
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: "Sos médica integrativa especialista en análisis clínicos y suplementación. Respondé SOLO en JSON válido, sin texto adicional, sin backticks, sin explicaciones previas.",
          messages: [{ role: "user", content: contentBlocks }]
        })
      });
      const data = await res.json();
      const raw = data.content?.map(b => b.text || "").join("") || "{}";
      const clean = raw.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      const entrada = { fecha: new Date().toLocaleDateString("es-AR"), nombre: analisisNombre || analisisArchivo.name, ...parsed };
      setAnalisisResultado(entrada);
      setHistorialAnalisis(prev => [entrada, ...prev.slice(0, 4)]);
    } catch (e) {
      setAnalisisResultado({ error: "No pude leer el archivo. Asegurate de subir una imagen clara (JPG/PNG) o un PDF." });
    }
    setCargandoAnalisis(false);
  }

  function guardarDia() {
    const entrada = { fecha: hoy.toLocaleDateString("es-AR"), dia: diaHoy, ...reg };
    setHistorial(prev => {
      const sinHoy = prev.filter(h => h.fecha !== entrada.fecha);
      return [entrada, ...sinHoy].slice(0, 14);
    });
    setGuardado(true);
    setTimeout(() => setGuardado(false), 2500);
  }

  function resetearDia() {
    if (window.confirm("¿Resetear todos los datos de hoy?")) {
      setReg(regInicial);
      try { localStorage.removeItem(STORAGE_KEY); } catch {}
    }
  }

  // ── Estilos base ──────────────────────────────────────────────────────────
  const card = { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 16, padding: 16, marginBottom: 14 };
  const oro = "#c9a96e";
  const tabs = [
    { id: "hoy", label: "Hoy", e: "📋" },
    { id: "plan", label: "Plan", e: "📅" },
    { id: "agua", label: "Agua", e: "💧" },
    { id: "compras", label: "Compras", e: "🛒" },
    { id: "chat", label: "Coach", e: "💬" },
    { id: "ciclo", label: "Ciclo", e: "🌸" },
    { id: "salud", label: "Salud", e: "🩺" },
    { id: "progreso", label: "Progreso", e: "📈" },
  ];

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(160deg,#0d0b1e 0%,#1a1535 50%,#0d1a2e 100%)", fontFamily:"'Palatino Linotype','Book Antiqua',Georgia,serif", color:"#f0ece8", display:"flex", flexDirection:"column", maxWidth:480, margin:"0 auto" }}>

      {/* Notificación agua flotante */}
      {notifAgua && (
        <div style={{ position:"fixed", top:16, left:"50%", transform:"translateX(-50%)", zIndex:999, background:"linear-gradient(135deg,#1a3a5c,#0d4a7a)", border:`1px solid ${oro}`, borderRadius:14, padding:"12px 20px", fontSize:13, maxWidth:340, boxShadow:"0 8px 32px rgba(0,0,0,0.5)", animation:"slideDown 0.4s ease" }}>
          {notifAgua}
        </div>
      )}

      {/* Header */}
      <div style={{ padding:"18px 20px 14px", background:"rgba(255,255,255,0.04)", borderBottom:"1px solid rgba(255,255,255,0.08)" }}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start"}}>
          <div style={{flex:1}}>
            <div style={{ fontSize:10, letterSpacing:4, color:oro, textTransform:"uppercase", marginBottom:3 }}>La Coach de Luciana</div>
            <div style={{ fontSize:24, fontWeight:"bold" }}>¡Hola Luciana! Hoy es <span style={{color:oro}}>{diaHoy}</span></div>
            <div style={{ fontSize:12, color:"rgba(255,255,255,0.4)", marginTop:2 }}>{hoy.toLocaleDateString("es-AR",{day:"numeric",month:"long",year:"numeric"})}</div>
          </div>
          {/* Widget de clima */}
          {clima ? (
            <div style={{background:"rgba(79,172,254,0.1)",border:"1px solid rgba(79,172,254,0.2)",borderRadius:12,padding:"8px 12px",textAlign:"right",flexShrink:0,marginLeft:10}}>
              <div style={{fontSize:22,fontWeight:"bold",color:"#4facfe",lineHeight:1}}>{clima.temp}°C</div>
              <div style={{fontSize:10,color:"rgba(255,255,255,0.6)",marginTop:2,maxWidth:90}}>{clima.desc}</div>
              {clima.ciudad && <div style={{fontSize:9,color:"rgba(255,255,255,0.35)",marginTop:1}}>{clima.ciudad}</div>}
              <div style={{fontSize:9,color:"rgba(255,255,255,0.3)",marginTop:1}}>Sensación {clima.sensacion}°</div>
            </div>
          ) : (
            <div style={{background:"rgba(255,255,255,0.05)",borderRadius:12,padding:"8px 12px",textAlign:"center",flexShrink:0,marginLeft:10}}>
              <div style={{fontSize:18}}>🌡️</div>
              <div style={{fontSize:9,color:"rgba(255,255,255,0.3)",marginTop:2}}>Cargando...</div>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display:"flex", background:"rgba(0,0,0,0.3)", borderBottom:"1px solid rgba(255,255,255,0.07)", overflowX:"auto" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ flex:"0 0 auto", minWidth:64, padding:"10px 6px", background:"none", border:"none", color: tab===t.id ? oro : "rgba(255,255,255,0.4)", fontSize:10, cursor:"pointer", letterSpacing:0.3, borderBottom: tab===t.id ? `2px solid ${oro}` : "2px solid transparent", transition:"all 0.2s" }}>
            <div style={{fontSize:17}}>{t.e}</div><div>{t.label}</div>
          </button>
        ))}
      </div>

      {/* ═══ CONTENIDO ═══════════════════════════════════════════════════════ */}
      <div style={{ flex:1, overflowY:"auto", padding:"16px 14px 90px" }}>

        {/* ── HOY ─────────────────────────────────────────────────────────── */}
        {tab === "hoy" && (
          <div>
            {/* Alerta de ciclo si aplica */}
            {faseActual && (() => {
              const fase = FASES_CICLO[faseActual];
              const esRiesgo = faseActual === "menstruacion" || (faseActual === "lutea" && diasCiclo >= 24);
              const esOvulacion = faseActual === "ovulacion";
              if (!esRiesgo && !esOvulacion) return null;
              return (
                <div style={{...card, background: esRiesgo ? "rgba(229,115,115,0.1)" : "rgba(255,213,79,0.08)", border: `1px solid ${esRiesgo ? "rgba(229,115,115,0.4)" : "rgba(255,213,79,0.35)"}`, padding:"14px 16px"}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                    <span style={{fontSize:22}}>{esRiesgo ? "⚠️" : "✨"}</span>
                    <div>
                      <div style={{fontWeight:"bold",fontSize:14,color: esRiesgo ? "#e57373" : "#ffd54f"}}>
                        {esRiesgo ? `Alerta: Día ${diasCiclo} · ${fase.nombre}` : `Ovulación · Máxima energía hoy`}
                      </div>
                      <div style={{fontSize:11,color:"rgba(255,255,255,0.5)",marginTop:1}}>
                        {esRiesgo ? "Mayor riesgo de lesiones — entrenamiento adaptado" : "Pico de fuerza y coordinación"}
                      </div>
                    </div>
                  </div>
                  {esRiesgo && (
                    <div style={{fontSize:12,lineHeight:1.7,color:"rgba(255,255,255,0.7)"}}>
                      🔴 <b>Los estrógenos bajos aflojan los ligamentos.</b> Hoy tus articulaciones (rodillas, tobillos, hombros) son más vulnerables. Seguí estas reglas:
                      <div style={{marginTop:8,display:"flex",flexDirection:"column",gap:4}}>
                        {["Calentá el doble de lo habitual — mínimo 10 min", "Reducí el peso un 20-30% en todos los ejercicios", "Movimientos lentos y controlados, sin rebotes", "Nada de ejercicios explosivos ni saltos hoy", "Si sentís dolor articular, parás — sin negociar"].map((r,i) => (
                          <div key={i} style={{background:"rgba(229,115,115,0.1)",borderRadius:8,padding:"6px 10px",fontSize:12}}>⚠️ {r}</div>
                        ))}
                      </div>
                    </div>
                  )}
                  {esOvulacion && (
                    <div style={{fontSize:12,lineHeight:1.7,color:"rgba(255,255,255,0.7)"}}>
                      ✨ <b>Máximo rendimiento pero cuidado con la laxitud.</b> Las articulaciones también están más flexibles durante la ovulación.
                      <div style={{marginTop:8,display:"flex",flexDirection:"column",gap:4}}>
                        {["Calentá bien antes de levantar pesos altos", "Usá rodilleras si hacés sentadillas pesadas", "Aprovechá para romper récords personales de fuerza"].map((r,i) => (
                          <div key={i} style={{background:"rgba(255,213,79,0.08)",borderRadius:8,padding:"6px 10px",fontSize:12}}>💡 {r}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Rutina */}
            <div style={{...card, background:"rgba(201,169,110,0.1)", border:`1px solid rgba(201,169,110,0.28)`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
                <div style={{fontSize:10,letterSpacing:3,color:oro,textTransform:"uppercase"}}>Rutina de hoy</div>
                {faseActual && (
                  <div style={{fontSize:10,color:FASES_CICLO[faseActual].color,background:`${FASES_CICLO[faseActual].color}18`,padding:"2px 8px",borderRadius:20}}>
                    {FASES_CICLO[faseActual].emoji} {FASES_CICLO[faseActual].nombre}
                  </div>
                )}
              </div>
              <div style={{fontSize:20,fontWeight:"bold",marginBottom:10}}>{rutinaHoy?.tipo}</div>

              {/* Intensidad adaptada al ciclo */}
              {faseActual && (() => {
                const fase = FASES_CICLO[faseActual];
                const esRiesgo = faseActual === "menstruacion" || (faseActual === "lutea" && diasCiclo >= 24);
                const intensidadColor = faseActual === "folicular" ? "#81c784" : faseActual === "ovulacion" ? "#ffd54f" : esRiesgo ? "#e57373" : "#ce93d8";
                return (
                  <div style={{background:`${intensidadColor}15`,border:`1px solid ${intensidadColor}30`,borderRadius:10,padding:"8px 12px",marginBottom:12,fontSize:12,color:"rgba(255,255,255,0.8)"}}>
                    {esRiesgo ? "🔴" : faseActual === "folicular" ? "🟢" : faseActual === "ovulacion" ? "⚡" : "🟣"} <b>Intensidad recomendada:</b> {fase.ejercicio.intensidad}
                  </div>
                );
              })()}

              {rutinaHoy?.ejercicios.map((e,i) => {
                const esRiesgo = faseActual === "menstruacion" || (faseActual === "lutea" && diasCiclo >= 24);
                const ejerciciosRiesgo = ["Burpees modificados","Jump squat (bajo impacto opcional)","Mountain climbers","Estocadas alternadas","Peso muerto rumano","Sentadillas con peso corporal"];
                const esEjercicioRiesgo = esRiesgo && ejerciciosRiesgo.includes(e.nombre);
                return (
                  <div key={i} style={{borderBottom:"1px solid rgba(255,255,255,0.07)",paddingBottom:8,marginBottom:8,background:esEjercicioRiesgo?"rgba(229,115,115,0.05)":"transparent",borderRadius:esEjercicioRiesgo?8:0,padding:esEjercicioRiesgo?"8px":undefined}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <div style={{flex:1}}>
                        <span style={{fontWeight:"bold",fontSize:14}}>{e.nombre}</span>
                        {esEjercicioRiesgo && <span style={{fontSize:10,color:"#e57373",marginLeft:6,background:"rgba(229,115,115,0.15)",padding:"1px 6px",borderRadius:10}}>⚠️ reducir peso</span>}
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:8}}>
                        <span style={{color:esEjercicioRiesgo?"#e57373":oro,fontSize:12,fontWeight:"bold"}}>{e.series}</span>
                        {GUIAS[e.nombre] && (
                          <button onClick={() => setVideoModal(e)} style={{background:"rgba(255,80,80,0.18)",border:"1px solid rgba(255,80,80,0.4)",borderRadius:6,padding:"3px 8px",color:"#ff6b6b",fontSize:11,cursor:"pointer"}}>📖 Guía</button>
                        )}
                      </div>
                    </div>
                    <div style={{fontSize:11,color:"rgba(255,255,255,0.45)",marginTop:3}}>💡 {e.tip}</div>
                    {esEjercicioRiesgo && (
                      <div style={{fontSize:11,color:"#e57373",marginTop:4,fontStyle:"italic"}}>
                        🩸 Hoy: movimiento lento, peso reducido 20-30%, priorizá la técnica sobre la carga.
                      </div>
                    )}
                  </div>
                );
              })}
              <button onClick={() => setReg(r => ({...r, ejercicio: !r.ejercicio}))} style={{marginTop:8,width:"100%",padding:"10px",borderRadius:10,background:reg.ejercicio?oro:"rgba(255,255,255,0.07)",color:reg.ejercicio?"#1a1635":"#f0ece8",border:"none",fontFamily:"inherit",fontSize:14,fontWeight:"bold",cursor:"pointer",transition:"all 0.3s"}}>
                {reg.ejercicio ? "✅ Entrenamiento completado" : "Marcar como completado"}
              </button>
            </div>

            {/* Agua */}
            <div style={card}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <span style={{fontWeight:"bold"}}>💧 Agua</span>
                <span style={{color:"#4facfe",fontWeight:"bold"}}>{agua_l}L / 2.5L</span>
              </div>
              <div style={{height:7,background:"rgba(255,255,255,0.1)",borderRadius:99,marginBottom:12,overflow:"hidden"}}>
                <div style={{height:"100%",width:`${agua_pct}%`,background:"linear-gradient(90deg,#4facfe,#00f2fe)",borderRadius:99,transition:"width 0.4s"}}/>
              </div>
              <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
                {[1,2,3,4,5,6,7,8,9,10].map(v => (
                  <button key={v} onClick={() => setReg(r=>({...r,agua:v}))} style={{width:34,height:34,borderRadius:8,border:"1px solid rgba(255,255,255,0.15)",background:reg.agua>=v?"linear-gradient(135deg,#4facfe,#00f2fe)":"rgba(255,255,255,0.05)",color:"#f0ece8",fontSize:12,cursor:"pointer",fontWeight:"bold"}}>{v}</button>
                ))}
              </div>
              <div style={{fontSize:10,color:"rgba(255,255,255,0.35)",marginTop:5}}>Vasos de 250ml · Objetivo: 10 vasos</div>
            </div>

            {/* Sueño */}
            <div style={card}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                <span style={{fontWeight:"bold"}}>😴 Sueño anoche</span>
                <span style={{color:"#a18cd1",fontWeight:"bold"}}>{reg.sueno||"?"}h / 8h</span>
              </div>
              <div style={{height:7,background:"rgba(255,255,255,0.1)",borderRadius:99,marginBottom:12,overflow:"hidden"}}>
                <div style={{height:"100%",width:`${sueno_pct}%`,background:"linear-gradient(90deg,#a18cd1,#fbc2eb)",borderRadius:99,transition:"width 0.4s"}}/>
              </div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                {["5","5.5","6","6.5","7","7.5","8","8.5","9"].map(h => (
                  <button key={h} onClick={() => setReg(r=>({...r,sueno:h}))} style={{padding:"5px 10px",borderRadius:8,border:"1px solid rgba(255,255,255,0.15)",background:reg.sueno===h?"linear-gradient(135deg,#a18cd1,#fbc2eb)":"rgba(255,255,255,0.05)",color:"#f0ece8",fontSize:12,cursor:"pointer"}}>{h}h</button>
                ))}
              </div>
            </div>

            {/* Comidas */}
            <div style={card}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                <span style={{fontWeight:"bold"}}>🥗 Comidas</span>
                <span style={{fontSize:11,color:oro}}>
                  {Object.values(reg.comidas).filter(Boolean).length}/4 · {
                    Object.values(reg.extrasComida||{}).flat().reduce((sum, e) => sum + (parseInt(e.kcal)||0), 0) +
                    (reg.extraLibre?.reduce((s,e)=>s+(parseInt(e.kcal)||0),0)||0)
                  } kcal extras
                </span>
              </div>
              {["desayuno","almuerzo","merienda","cena"].map(c => {
                const extras = reg.extrasComida?.[c] || [];
                const [abierto, setAbierto] = [reg.extraAbierto===c, (v)=>setReg(r=>({...r,extraAbierto:v?c:null}))];
                return (
                  <div key={c} style={{marginBottom:8}}>
                    {/* Fila principal */}
                    <div style={{display:"flex",alignItems:"center",gap:8,borderRadius:10,border:"1px solid rgba(255,255,255,0.09)",background:reg.comidas[c]?"rgba(201,169,110,0.15)":"rgba(255,255,255,0.03)",overflow:"hidden"}}>
                      <button onClick={() => setReg(r=>({...r,comidas:{...r.comidas,[c]:!r.comidas[c]}}))} style={{display:"flex",alignItems:"center",gap:10,flex:1,padding:"9px 12px",background:"none",border:"none",cursor:"pointer",color:"#f0ece8",fontFamily:"inherit",textAlign:"left",fontSize:14}}>
                        <span style={{fontSize:18}}>{reg.comidas[c]?"✅":"⬜"}</span>
                        <span style={{textTransform:"capitalize",fontWeight:reg.comidas[c]?"bold":"normal"}}>{c}</span>
                        {extras.length > 0 && <span style={{fontSize:10,color:oro,background:"rgba(201,169,110,0.2)",padding:"1px 7px",borderRadius:20}}>+{extras.length} extra</span>}
                      </button>
                      <button onClick={() => setAbierto(!abierto)} style={{padding:"9px 12px",background:"none",border:"none",borderLeft:"1px solid rgba(255,255,255,0.08)",color:abierto?oro:"rgba(255,255,255,0.35)",cursor:"pointer",fontSize:16}}>
                        {abierto ? "▲" : "＋"}
                      </button>
                    </div>

                    {/* Panel de extras */}
                    {abierto && (
                      <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderTop:"none",borderRadius:"0 0 10px 10px",padding:"10px 12px"}}>
                        <div style={{fontSize:11,color:"rgba(255,255,255,0.4)",marginBottom:8}}>¿Agregaste algo extra en {c}?</div>
                        {/* Extras ya agregados */}
                        {extras.map((ex,i) => (
                          <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"5px 8px",background:"rgba(201,169,110,0.1)",borderRadius:8,marginBottom:5}}>
                            <span style={{fontSize:12}}>{ex.nombre}</span>
                            <div style={{display:"flex",alignItems:"center",gap:8}}>
                              <span style={{fontSize:11,color:oro}}>{ex.kcal} kcal</span>
                              <button onClick={() => setReg(r=>({...r,extrasComida:{...r.extrasComida,[c]:r.extrasComida[c].filter((_,j)=>j!==i)}}))} style={{background:"none",border:"none",color:"rgba(255,100,100,0.7)",cursor:"pointer",fontSize:14}}>✕</button>
                            </div>
                          </div>
                        ))}
                        {/* Form para nuevo extra */}
                        <ExtraForm onAgregar={(extra) => setReg(r=>({...r, extrasComida:{...r.extrasComida,[c]:[...(r.extrasComida?.[c]||[]),extra]}}))} />
                        {/* Sugerencias rápidas */}
                        <div style={{marginTop:8}}>
                          <div style={{fontSize:10,color:"rgba(255,255,255,0.3)",marginBottom:5}}>Rápidos:</div>
                          <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                            {[
                              {nombre:"Café con leche",kcal:45},{nombre:"Café solo",kcal:5},{nombre:"Medialuna",kcal:180},
                              {nombre:"Fruta",kcal:70},{nombre:"Galletitas x3",kcal:120},{nombre:"Vaso de vino",kcal:125},
                              {nombre:"Cerveza",kcal:150},{nombre:"Jugo natural",kcal:90},{nombre:"Barra de cereal",kcal:130},
                              {nombre:"Yogur",kcal:80},{nombre:"Puñado de nueces",kcal:180},{nombre:"Chocolate",kcal:150},
                            ].map(s => (
                              <button key={s.nombre} onClick={() => setReg(r=>({...r,extrasComida:{...r.extrasComida,[c]:[...(r.extrasComida?.[c]||[]),s]}}))}
                                style={{padding:"4px 10px",borderRadius:20,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.04)",color:"rgba(255,255,255,0.7)",cursor:"pointer",fontSize:11}}>
                                {s.nombre} <span style={{color:oro}}>{s.kcal}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Campo libre — comidas fuera de plan */}
              <div style={{marginTop:10,borderTop:"1px solid rgba(255,255,255,0.07)",paddingTop:10}}>
                <div style={{fontSize:12,color:"rgba(255,255,255,0.5)",marginBottom:8}}>🍽️ Comida fuera del plan (restaurant, antojo, etc.)</div>
                {(reg.extraLibre||[]).map((ex,i) => (
                  <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"5px 8px",background:"rgba(255,150,50,0.08)",borderRadius:8,marginBottom:5,border:"1px solid rgba(255,150,50,0.2)"}}>
                    <span style={{fontSize:12}}>{ex.nombre}</span>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <span style={{fontSize:11,color:"#ff9500"}}>{ex.kcal} kcal</span>
                      <button onClick={() => setReg(r=>({...r,extraLibre:r.extraLibre.filter((_,j)=>j!==i)}))} style={{background:"none",border:"none",color:"rgba(255,100,100,0.7)",cursor:"pointer",fontSize:14}}>✕</button>
                    </div>
                  </div>
                ))}
                <ExtraForm placeholder="Ej: pizza 2 porciones, helado, etc." onAgregar={(extra) => setReg(r=>({...r,extraLibre:[...(r.extraLibre||[]),extra]}))} naranja />
              </div>

              {/* Resumen calórico del día */}
              {(() => {
                const extrasTotal = Object.values(reg.extrasComida||{}).flat().reduce((s,e)=>s+(parseInt(e.kcal)||0),0) + (reg.extraLibre?.reduce((s,e)=>s+(parseInt(e.kcal)||0),0)||0);
                const base = 1450;
                const total = base + extrasTotal;
                const pct = Math.min(100, (total/2000)*100);
                if (extrasTotal === 0) return null;
                return (
                  <div style={{marginTop:12,padding:"10px 12px",background:"rgba(246,211,101,0.08)",borderRadius:10,border:"1px solid rgba(246,211,101,0.2)"}}>
                    <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:6}}>
                      <span style={{color:"rgba(255,255,255,0.6)"}}>Plan base: <b style={{color:"#f0ece8"}}>1.450 kcal</b></span>
                      <span style={{color:"rgba(255,255,255,0.6)"}}>Extras: <b style={{color:"#ff9500"}}>+{extrasTotal} kcal</b></span>
                    </div>
                    <div style={{height:6,background:"rgba(255,255,255,0.1)",borderRadius:99,overflow:"hidden"}}>
                      <div style={{height:"100%",width:`${pct}%`,background:total>1700?"linear-gradient(90deg,#ff6b6b,#ff9500)":"linear-gradient(90deg,#f6d365,#fda085)",borderRadius:99,transition:"width 0.4s"}}/>
                    </div>
                    <div style={{fontSize:12,marginTop:5,textAlign:"center",color:total>1700?"#ff6b6b":"#f6d365",fontWeight:"bold"}}>
                      Total estimado: {total} kcal {total > 1700 ? "⚠️ Por encima del objetivo" : "✅ Dentro del rango"}
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Energía/Humor/Peso */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
              {[{k:"energia",l:"⚡ Energía",c:"#f6d365"},{k:"humor",l:"😊 Humor",c:"#f093fb"}].map(({k,l,c}) => (
                <div key={k} style={card}>
                  <div style={{fontWeight:"bold",fontSize:13,marginBottom:8}}>{l}</div>
                  <div style={{display:"flex",gap:4}}>
                    {[1,2,3,4,5].map(v => (
                      <button key={v} onClick={() => setReg(r=>({...r,[k]:v}))} style={{flex:1,aspectRatio:"1",borderRadius:6,border:"none",background:reg[k]>=v?c:"rgba(255,255,255,0.07)",cursor:"pointer",opacity:reg[k]>=v?1:0.3,transition:"all 0.2s"}}/>
                    ))}
                  </div>
                  <div style={{fontSize:10,color:"rgba(255,255,255,0.35)",marginTop:5,textAlign:"center"}}>{reg[k]}/5</div>
                </div>
              ))}
            </div>
            <div style={card}>
              <div style={{fontWeight:"bold",marginBottom:8}}>⚖️ Peso hoy</div>
              <input type="number" step="0.1" placeholder="ej: 61.2 kg" value={reg.peso} onChange={e=>setReg(r=>({...r,peso:e.target.value}))} style={{width:"100%",padding:"10px",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"#f0ece8",fontFamily:"inherit",fontSize:15,boxSizing:"border-box",caretColor:"#c9a96e"}}/>
            </div>
            <div style={card}>
              <div style={{fontWeight:"bold",marginBottom:8}}>📝 Nota del día</div>
              <textarea placeholder="¿Cómo te sentiste? ¿Algo especial?" value={reg.notas} onChange={e=>setReg(r=>({...r,notas:e.target.value}))} rows={3} style={{width:"100%",padding:"10px",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"#f0ece8",fontFamily:"inherit",fontSize:14,resize:"none",boxSizing:"border-box",caretColor:"#c9a96e"}}/>
            </div>
            <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:6}}>
              <div style={{flex:1,fontSize:11,color:"rgba(255,255,255,0.35)",display:"flex",alignItems:"center",gap:5}}>
                <span style={{width:6,height:6,borderRadius:"50%",background:"#4caf81",display:"inline-block"}}/>
                Guardado automático activado
              </div>
              <button onClick={resetearDia} style={{fontSize:11,color:"rgba(255,100,100,0.6)",background:"none",border:"1px solid rgba(255,100,100,0.2)",borderRadius:8,padding:"4px 10px",cursor:"pointer",fontFamily:"inherit"}}>
                🔄 Resetear día
              </button>
            </div>
            <button onClick={guardarDia} style={{width:"100%",padding:"14px",borderRadius:12,border:"none",background:guardado?"#4caf81":`linear-gradient(135deg,${oro},#e8c99e)`,color:"#1a1635",fontFamily:"inherit",fontSize:16,fontWeight:"bold",cursor:"pointer",transition:"all 0.3s"}}>
              {guardado ? "✅ ¡Guardado en historial!" : "Cerrar día y guardar en historial"}
            </button>
          </div>
        )}

        {/* ── PLAN ────────────────────────────────────────────────────────── */}
        {tab === "plan" && (
          <div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:14}}>
              {[{l:"Calorías",v:"~1.450 kcal",c:"#f6d365"},{l:"Agua",v:"2.5 L",c:"#4facfe"},{l:"Sueño",v:"8 h",c:"#a18cd1"}].map(s => (
                <div key={s.l} style={{...card,textAlign:"center",padding:12}}>
                  <div style={{color:s.c,fontSize:15,fontWeight:"bold"}}>{s.v}</div>
                  <div style={{fontSize:10,color:"rgba(255,255,255,0.45)",marginTop:2}}>{s.l}</div>
                </div>
              ))}
            </div>
            {/* Nota médica */}
            <div style={{...card,background:"rgba(255,200,100,0.07)",border:"1px solid rgba(255,200,100,0.2)"}}>
              <div style={{fontSize:10,letterSpacing:2,color:"#f6d365",textTransform:"uppercase",marginBottom:5}}>🩺 Notas de salud</div>
              <div style={{fontSize:12,color:"rgba(255,255,255,0.65)",lineHeight:1.6}}>{PERFIL.notas_medicas}</div>
            </div>
            <div style={{fontSize:10,letterSpacing:3,color:oro,textTransform:"uppercase",marginBottom:8}}>Rutina Semanal</div>
            {RUTINA.map((r,i) => {
              const abierto = diaExpandido === r.dia;
              const esHoy = r.dia === diaHoy;
              const calentamientos = {
                "Lunes":    ["5 min caminata activa o saltos suaves", "Rotación de hombros x10 c/lado", "Círculos de brazos hacia adelante y atrás x10", "Apertura de pecho con banda o sin x10", "Plancha isométrica 20s x2"],
                "Martes":   ["5 min caminata rápida", "Rotación de cadera x10 c/lado", "Gato-vaca en cuadrupedia x10", "Puente de glúteos activo x10", "Mountain climbers lentos x10"],
                "Miércoles":["Respiración profunda 2 min", "Stretching de cuello y hombros 3 min", "Apertura de cadera en mariposa 2 min", "Postura del niño 1 min"],
                "Jueves":   ["5 min caminata o trote suave", "Círculos de rodilla x10 c/lado", "Sentadilla sin peso x10 lenta", "Estocada estática 20s c/lado", "Rotación de cadera en posición cuadrada x10"],
                "Viernes":  ["3 min saltos de cuerda o jumping jacks", "Rotación de tronco x10 c/lado", "Apertura dinámica de cadera x10", "Plancha 20s + flexión de rodilla alternada x8"],
                "Sábado":   ["Calentá con lo que elijas — 5 min suave antes de la actividad principal"],
                "Domingo":  ["No hay calentamiento requerido — día de descanso total"],
              };
              const vueltaCalma = {
                "Lunes":    ["Estiramiento de pecho 30s", "Estiramiento de tríceps 30s c/lado", "Apertura de hombros en pared 30s", "Respiración profunda 2 min"],
                "Martes":   ["Postura del niño 1 min", "Estiramiento de oblicuos 30s c/lado", "Gato-vaca 1 min", "Respiración 2 min"],
                "Miércoles":["Stretching completo a gusto"],
                "Jueves":   ["Estiramiento de cuádriceps 30s c/lado", "Estiramiento de isquiotibiales 30s", "Postura de paloma 1 min c/lado", "Pantorrillas en pared 30s"],
                "Viernes":  ["Respiración profunda 2 min", "Estiramiento de cuerpo entero 3 min", "Rodillas al pecho acostada 1 min"],
                "Sábado":   ["Estiramiento post-actividad 5 min"],
                "Domingo":  [],
              };
              return (
                <div key={i} style={{marginBottom:10}}>
                  {/* Header del día — clickeable */}
                  <button onClick={() => setDiaExpandido(abierto ? null : r.dia)} style={{width:"100%",background:esHoy?"rgba(201,169,110,0.12)":"rgba(255,255,255,0.04)",border:esHoy?`1px solid rgba(201,169,110,0.35)`:"1px solid rgba(255,255,255,0.09)",borderRadius:abierto?"14px 14px 0 0":14,padding:"14px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",color:"#f0ece8",fontFamily:"inherit"}}>
                    <div style={{textAlign:"left"}}>
                      <div style={{fontWeight:"bold",fontSize:15}}>{r.dia}{esHoy?" ← hoy":""}</div>
                      <div style={{fontSize:12,color:"rgba(255,255,255,0.5)",marginTop:2}}>{r.tipo}</div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <div style={{fontSize:11,color:oro}}>{r.ejercicios.length} ejerc.</div>
                      <div style={{fontSize:14,color:oro,transition:"transform 0.3s",transform:abierto?"rotate(180deg)":"rotate(0deg)"}}>▾</div>
                    </div>
                  </button>

                  {/* Contenido expandido */}
                  {abierto && (
                    <div style={{background:"rgba(255,255,255,0.02)",border:esHoy?`1px solid rgba(201,169,110,0.25)`:"1px solid rgba(255,255,255,0.07)",borderTop:"none",borderRadius:"0 0 14px 14px",padding:"0 0 12px 0"}}>

                      {/* Calentamiento */}
                      {calentamientos[r.dia]?.length > 0 && (
                        <div style={{padding:"12px 16px",borderBottom:"1px solid rgba(255,255,255,0.07)"}}>
                          <div style={{fontSize:10,letterSpacing:2,color:"#ff9500",textTransform:"uppercase",marginBottom:8}}>🔥 Entrada en calor — 5-8 min</div>
                          {calentamientos[r.dia].map((c,j) => (
                            <div key={j} style={{fontSize:12,padding:"4px 0",color:"rgba(255,255,255,0.75)",display:"flex",gap:6,alignItems:"flex-start"}}>
                              <span style={{color:"#ff9500",flexShrink:0}}>→</span>{c}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Ejercicios */}
                      <div style={{padding:"12px 16px"}}>
                        <div style={{fontSize:10,letterSpacing:2,color:oro,textTransform:"uppercase",marginBottom:10}}>💪 Ejercicios</div>
                        {r.ejercicios.map((e,j) => (
                          <div key={j} style={{background:"rgba(255,255,255,0.04)",borderRadius:12,padding:"12px",marginBottom:10,border:"1px solid rgba(255,255,255,0.07)"}}>
                            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
                              <div style={{flex:1}}>
                                <div style={{fontWeight:"bold",fontSize:14}}>{e.nombre}</div>
                                <div style={{display:"flex",gap:12,marginTop:5,flexWrap:"wrap"}}>
                                  <span style={{fontSize:11,color:oro,background:"rgba(201,169,110,0.15)",padding:"2px 8px",borderRadius:20}}>📋 {e.series}</span>
                                  <span style={{fontSize:11,color:"#4facfe",background:"rgba(79,172,254,0.12)",padding:"2px 8px",borderRadius:20}}>⏱ Descanso: {e.descanso}</span>
                                </div>
                              </div>
                              {GUIAS[e.nombre] && (
                                <button onClick={() => setVideoModal(e)} style={{background:"rgba(255,80,80,0.2)",border:"1px solid rgba(255,80,80,0.4)",borderRadius:8,padding:"6px 10px",color:"#ff6b6b",fontSize:12,cursor:"pointer",flexShrink:0,marginLeft:8}}>
                                  📖 Ver guía
                                </button>
                              )}
                            </div>
                            <div style={{fontSize:11,color:"rgba(255,255,255,0.5)",lineHeight:1.6,borderLeft:"2px solid rgba(201,169,110,0.3)",paddingLeft:8,marginTop:4}}>
                              💡 {e.tip}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Vuelta a la calma */}
                      {vueltaCalma[r.dia]?.length > 0 && (
                        <div style={{padding:"0 16px 4px"}}>
                          <div style={{fontSize:10,letterSpacing:2,color:"#a18cd1",textTransform:"uppercase",marginBottom:8}}>🧘 Vuelta a la calma — 5 min</div>
                          {vueltaCalma[r.dia].map((c,j) => (
                            <div key={j} style={{fontSize:12,padding:"4px 0",color:"rgba(255,255,255,0.7)",display:"flex",gap:6}}>
                              <span style={{color:"#a18cd1",flexShrink:0}}>→</span>{c}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
            <div style={{fontSize:10,letterSpacing:3,color:oro,textTransform:"uppercase",margin:"16px 0 8px"}}>Menú Semanal</div>
            {MENU.map((m,i) => (
              <div key={i} style={card}>
                <div style={{fontWeight:"bold",color:oro,marginBottom:10}}>{m.dia}</div>
                {m.comidas.map((c,j) => (
                  <div key={j} style={{padding:"8px 0",borderBottom:j<m.comidas.length-1?"1px solid rgba(255,255,255,0.06)":"none"}}>
                    <div style={{display:"flex",justifyContent:"space-between",gap:8,alignItems:"flex-start"}}>
                      <div style={{flex:1}}>
                        <div style={{fontSize:10,color:"rgba(255,255,255,0.35)",textTransform:"uppercase",letterSpacing:1}}>{c.m}</div>
                        <div style={{fontSize:13,marginTop:2,fontWeight:"bold"}}>{c.d}</div>
                        {c.detalle && (
                          <div style={{marginTop:6,background:"rgba(255,255,255,0.03)",borderRadius:8,padding:"7px 10px"}}>
                            {c.detalle.map((d,k) => (
                              <div key={k} style={{fontSize:11,color:"rgba(255,255,255,0.6)",lineHeight:1.7}}>{d}</div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div style={{textAlign:"right",flexShrink:0}}>
                        <div style={{fontSize:11,color:"#f6d365"}}>{c.kcal} kcal</div>
                        <div style={{fontSize:10,color:"rgba(255,255,255,0.35)"}}>{c.prot}g prot</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* ── AGUA ────────────────────────────────────────────────────────── */}
        {tab === "agua" && (
          <div>
            <div style={{...card,background:"rgba(79,172,254,0.08)",border:"1px solid rgba(79,172,254,0.25)",textAlign:"center",padding:24}}>
              <div style={{fontSize:52,marginBottom:8}}>💧</div>
              <div style={{fontSize:36,fontWeight:"bold",color:"#4facfe"}}>{agua_l} L</div>
              <div style={{fontSize:14,color:"rgba(255,255,255,0.5)",marginBottom:16}}>de 2.5L objetivo</div>
              <div style={{height:10,background:"rgba(255,255,255,0.1)",borderRadius:99,overflow:"hidden",marginBottom:16}}>
                <div style={{height:"100%",width:`${agua_pct}%`,background:"linear-gradient(90deg,#4facfe,#00f2fe)",borderRadius:99,transition:"width 0.5s"}}/>
              </div>
              <div style={{fontSize:13,color:"rgba(255,255,255,0.6)"}}>{agua_pct < 100 ? `Faltan ${(2.5-parseFloat(agua_l)).toFixed(2)}L para llegar al objetivo` : "🎉 ¡Objetivo cumplido!"}</div>
            </div>

            {/* Permiso notificaciones */}
            {notifPermiso !== "granted" && (
              <div style={{...card,background:"rgba(255,200,80,0.08)",border:"1px solid rgba(255,200,80,0.25)"}}>
                <div style={{fontWeight:"bold",marginBottom:6}}>🔔 Activar recordatorios y voz</div>
                <div style={{fontSize:13,color:"rgba(255,255,255,0.6)",marginBottom:12}}>Activá los permisos para recibir notificaciones de 8am a 5:30pm, y mensajes de voz femenina de 5:30pm a 10pm.</div>
                <button onClick={pedirPermiso} style={{padding:"10px 20px",borderRadius:10,border:"none",background:`linear-gradient(135deg,${oro},#e8c99e)`,color:"#1a1635",fontFamily:"inherit",fontWeight:"bold",fontSize:14,cursor:"pointer"}}>Activar notificaciones</button>
              </div>
            )}
            {notifPermiso === "granted" && (
              <div style={{...card,background:"rgba(76,175,129,0.1)",border:"1px solid rgba(76,175,129,0.3)"}}>
                <div style={{color:"#4caf81",fontWeight:"bold"}}>✅ Notificaciones activas</div>
                <div style={{fontSize:12,color:"rgba(255,255,255,0.5)",marginTop:4}}>8am–5:30pm: notificaciones silenciosas · 5:30pm–10pm: voz femenina</div>
              </div>
            )}

            {/* Panel de voz */}
            <div style={{...card, background:"rgba(160,100,255,0.08)", border:"1px solid rgba(160,100,255,0.25)"}}>
              <div style={{fontSize:10,letterSpacing:3,color:"#b388ff",textTransform:"uppercase",marginBottom:8}}>🎙️ Voz femenina · Horarios</div>
              <div style={{fontSize:12,color:"rgba(255,255,255,0.6)",marginBottom:12,lineHeight:1.7}}>
                Después de las 5:30pm tu coach te habla con voz. Los horarios son:<br/>
                <span style={{color:"#b388ff"}}>17:30</span> · Resumen del día completo<br/>
                <span style={{color:"#b388ff"}}>19:00</span> · Recordatorio de cena<br/>
                <span style={{color:"#b388ff"}}>20:30</span> · Último aviso de agua<br/>
                <span style={{color:"#b388ff"}}>21:30</span> · Cierre del día y buenas noches
              </div>
              {vozActiva && (
                <div style={{display:"flex",alignItems:"center",gap:10,padding:"8px 12px",background:"rgba(179,136,255,0.15)",borderRadius:10,marginBottom:10}}>
                  <div style={{display:"flex",gap:3}}>
                    {[0,1,2,3].map(i => <div key={i} style={{width:3,borderRadius:3,background:"#b388ff",animation:`wave 0.8s ease-in-out ${i*0.15}s infinite`,height:16}}/>)}
                  </div>
                  <span style={{fontSize:12,color:"#b388ff"}}>Hablando...</span>
                  <button onClick={() => { pararVoz(); }} style={{marginLeft:"auto",background:"rgba(255,255,255,0.1)",border:"none",color:"#f0ece8",borderRadius:6,padding:"3px 8px",cursor:"pointer",fontSize:11}}>⏹ Parar</button>
                </div>
              )}
              {ultimoMensajeVoz && !vozActiva && (
                <div style={{fontSize:11,color:"rgba(255,255,255,0.4)",marginBottom:10,fontStyle:"italic",lineHeight:1.5}}>
                  Último mensaje: "{ultimoMensajeVoz.slice(0,80)}..."
                </div>
              )}
              <button onClick={() => hablar(construirMensajeVoz(reg))} style={{width:"100%",padding:"11px",borderRadius:10,border:"none",background:"linear-gradient(135deg,#7c4dff,#b388ff)",color:"#fff",fontFamily:"inherit",fontSize:14,fontWeight:"bold",cursor:"pointer"}}>
                🎙️ Escuchar resumen ahora
              </button>
            </div>

            {/* Horarios */}
            <div style={{fontSize:10,letterSpacing:3,color:oro,textTransform:"uppercase",marginBottom:10}}>Recordatorios del día</div>
            {RECORDATORIOS_AGUA.map((r,i) => {
              const [h,m] = r.hora.split(":").map(Number);
              const ahora = new Date();
              const pasado = ahora.getHours() > h || (ahora.getHours() === h && ahora.getMinutes() >= m);
              return (
                <div key={i} style={{...card,padding:"10px 14px",display:"flex",alignItems:"center",gap:12,background:pasado?"rgba(79,172,254,0.08)":"rgba(255,255,255,0.03)",border:pasado?"1px solid rgba(79,172,254,0.2)":"1px solid rgba(255,255,255,0.07)"}}>
                  <div style={{fontSize:22}}>{pasado?"✅":"⏰"}</div>
                  <div>
                    <div style={{fontWeight:"bold",color:pasado?"#4facfe":oro,fontSize:13}}>{r.hora} hs</div>
                    <div style={{fontSize:12,color:"rgba(255,255,255,0.5)"}}>{r.mensaje.replace(" 💧","")}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── COMPRAS ─────────────────────────────────────────────────────── */}
        {tab === "compras" && (
          <div>
            <div style={{...card,background:"rgba(201,169,110,0.08)",border:`1px solid rgba(201,169,110,0.25)`}}>
              <div style={{fontSize:10,letterSpacing:3,color:oro,textTransform:"uppercase",marginBottom:6}}>🛒 Plan de compras semanal</div>
              <div style={{fontSize:13,color:"rgba(255,255,255,0.6)",marginBottom:14,lineHeight:1.6}}>
                Tu lista se genera con IA cada sábado, personalizada para tu plan nutricional: sin pepino, sin coles, sin picante, anti-inflamatorio y bajo en colesterol.
              </div>
              <button onClick={generarCompras} disabled={cargandoCompras} style={{width:"100%",padding:"12px",borderRadius:10,border:"none",background:cargandoCompras?"rgba(255,255,255,0.1)":`linear-gradient(135deg,${oro},#e8c99e)`,color:cargandoCompras?"rgba(255,255,255,0.4)":"#1a1635",fontFamily:"inherit",fontSize:15,fontWeight:"bold",cursor:cargandoCompras?"not-allowed":"pointer",transition:"all 0.3s"}}>
                {cargandoCompras ? "⏳ Generando plan..." : "✨ Generar plan de esta semana"}
              </button>
            </div>

            {/* Lista base siempre visible */}
            {!comprasIA && (
              <div>
                <div style={{fontSize:10,letterSpacing:3,color:oro,textTransform:"uppercase",marginBottom:10}}>Lista base sugerida</div>
                {Object.entries(COMPRAS_BASE).map(([cat, items]) => (
                  <div key={cat} style={card}>
                    <div style={{fontWeight:"bold",textTransform:"capitalize",color:oro,marginBottom:8,fontSize:13}}>{cat.replace("_"," ")}</div>
                    {items.map((item,i) => <div key={i} style={{fontSize:13,padding:"4px 0",borderBottom:"1px solid rgba(255,255,255,0.05)",color:"rgba(255,255,255,0.8)"}}>• {item}</div>)}
                  </div>
                ))}
              </div>
            )}

            {/* Plan generado por IA */}
            {comprasIA?.error && <div style={{...card,color:"#ff6b6b"}}>{comprasIA.error}</div>}
            {comprasIA?.lista_compras && (
              <div>
                <div style={{fontSize:10,letterSpacing:3,color:oro,textTransform:"uppercase",margin:"16px 0 10px"}}>🛒 Lista personalizada</div>
                {Object.entries(comprasIA.lista_compras).map(([cat, items]) => (
                  <div key={cat} style={card}>
                    <div style={{fontWeight:"bold",textTransform:"capitalize",color:oro,marginBottom:10,fontSize:13}}>{cat.replace(/_/g," ")}</div>
                    {(items||[]).map((item,i) => (
                      <div key={i} style={{padding:"7px 0",borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
                          <span style={{fontSize:13,fontWeight:"bold"}}>• {item.item || item}</span>
                          {item.cantidad && <span style={{fontSize:12,color:oro,whiteSpace:"nowrap",flexShrink:0}}>{item.cantidad}</span>}
                        </div>
                        {item.nota && <div style={{fontSize:11,color:"rgba(255,255,255,0.4)",marginTop:2,paddingLeft:10}}>{item.nota}</div>}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
            {comprasIA?.plan_semana && (
              <div>
                <div style={{fontSize:10,letterSpacing:3,color:oro,textTransform:"uppercase",margin:"16px 0 10px"}}>📅 Menú + cómo cocinar</div>
                {comprasIA.plan_semana.map((d,i) => (
                  <div key={i} style={card}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                      <div style={{fontWeight:"bold",fontSize:16,color:oro}}>{d.dia}</div>
                      {d.total_kcal && <div style={{fontSize:12,color:"#f6d365",background:"rgba(246,211,101,0.1)",padding:"3px 10px",borderRadius:20}}>{d.total_kcal} kcal</div>}
                    </div>
                    {["desayuno","almuerzo","cena"].map(momento => d[momento] && (
                      <div key={momento} style={{marginBottom:12,background:"rgba(255,255,255,0.04)",borderRadius:10,padding:10}}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                          <span style={{fontSize:10,color:"rgba(255,255,255,0.4)",textTransform:"uppercase",letterSpacing:1}}>{momento}</span>
                          <div style={{display:"flex",gap:8}}>
                            {d[momento].kcal && <span style={{fontSize:10,color:"#f6d365"}}>{d[momento].kcal} kcal</span>}
                            {d[momento].prot_g && <span style={{fontSize:10,color:"#4facfe"}}>{d[momento].prot_g}g prot</span>}
                          </div>
                        </div>
                        <div style={{fontSize:14,fontWeight:"bold",marginBottom:6}}>{d[momento].plato}</div>
                        {d[momento].como_cocinar && (
                          <div style={{fontSize:12,color:"rgba(255,255,255,0.55)",lineHeight:1.6,borderLeft:"2px solid rgba(201,169,110,0.3)",paddingLeft:8}}>
                            👩‍🍳 {d[momento].como_cocinar}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── CHAT ────────────────────────────────────────────────────────── */}
        {tab === "chat" && (
          <div style={{display:"flex",flexDirection:"column",minHeight:"calc(100vh - 220px)"}}>
            <div style={{flex:1,paddingBottom:12}}>
              {chat.map((m,i) => (
                <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start",marginBottom:12}}>
                  <div style={{maxWidth:"83%",padding:"11px 14px",borderRadius:m.role==="user"?"16px 16px 4px 16px":"16px 16px 16px 4px",background:m.role==="user"?`linear-gradient(135deg,${oro},#e8c99e)`:"rgba(255,255,255,0.08)",color:m.role==="user"?"#1a1635":"#f0ece8",fontSize:14,lineHeight:1.55}}>
                    {m.text}
                  </div>
                </div>
              ))}
              {cargando && (
                <div style={{display:"flex",gap:6,padding:"10px 14px",background:"rgba(255,255,255,0.07)",borderRadius:"16px 16px 16px 4px",width:"fit-content"}}>
                  {[0,1,2].map(i => <div key={i} style={{width:8,height:8,borderRadius:"50%",background:oro,animation:`bounce 1.2s ease-in-out ${i*0.2}s infinite`}}/>)}
                </div>
              )}
              <div ref={chatEndRef}/>
            </div>
            <div style={{display:"flex",gap:8,paddingTop:12,borderTop:"1px solid rgba(255,255,255,0.09)",position:"sticky",bottom:0,background:"rgba(13,11,30,0.95)",paddingBottom:8}}>
              <input value={inputChat} onChange={e=>setInputChat(e.target.value)} onKeyDown={e=>e.key==="Enter"&&enviarChat()} placeholder="Contame cómo va tu día..." style={{flex:1,padding:"11px 14px",borderRadius:12,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"#f0ece8",fontFamily:"inherit",fontSize:14}}/>
              <button onClick={enviarChat} disabled={cargando||!inputChat.trim()} style={{padding:"11px 16px",borderRadius:12,border:"none",background:`linear-gradient(135deg,${oro},#e8c99e)`,color:"#1a1635",fontWeight:"bold",cursor:"pointer",fontSize:18,opacity:cargando||!inputChat.trim()?0.45:1}}>→</button>
            </div>
          </div>
        )}

        {/* ── CICLO ────────────────────────────────────────────────────────── */}
        {tab === "ciclo" && (
          <div>
            {/* Configurar ciclo */}
            <div style={{...card, background:"rgba(229,115,115,0.08)", border:"1px solid rgba(229,115,115,0.25)"}}>
              <div style={{fontSize:10,letterSpacing:3,color:"#e57373",textTransform:"uppercase",marginBottom:8}}>🌸 Tu ciclo menstrual</div>
              <div style={{fontSize:13,color:"rgba(255,255,255,0.6)",marginBottom:12}}>Ingresá el primer día de tu última menstruación para que calculemos tu fase actual.</div>
              <div style={{marginBottom:10}}>
                <div style={{fontSize:11,color:"rgba(255,255,255,0.4)",marginBottom:4}}>Primer día de tu última menstruación</div>
                <input type="date" value={ciclo.ultimaMenstruacion}
                  onChange={e => setCiclo(c => ({...c, ultimaMenstruacion: e.target.value}))}
                  style={{width:"100%",padding:"10px",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"#f0ece8",fontFamily:"inherit",fontSize:15,boxSizing:"border-box",caretColor:"#c9a96e"}}/>
              </div>
              <div style={{marginBottom:10}}>
                <div style={{fontSize:11,color:"rgba(255,255,255,0.4)",marginBottom:4}}>Duración de tu ciclo (días)</div>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                  {[25,26,27,28,29,30,31,32].map(d => (
                    <button key={d} onClick={() => setCiclo(c=>({...c,duracionCiclo:d}))} style={{padding:"6px 12px",borderRadius:8,border:"1px solid rgba(255,255,255,0.15)",background:ciclo.duracionCiclo===d?"#e57373":"rgba(255,255,255,0.05)",color:"#f0ece8",cursor:"pointer",fontSize:13,fontWeight:ciclo.duracionCiclo===d?"bold":"normal"}}>{d}</button>
                  ))}
                </div>
              </div>
            </div>

            {/* Fase actual */}
            {faseActual && diasCiclo && (() => {
              const fase = FASES_CICLO[faseActual];
              const proximaMenstruacion = ciclo.duracionCiclo - diasCiclo;
              return (
                <div>
                  {/* Banner fase */}
                  <div style={{...card, background:`${fase.color}18`, border:`1px solid ${fase.color}50`, textAlign:"center", padding:20}}>
                    <div style={{fontSize:40, marginBottom:6}}>{fase.emoji}</div>
                    <div style={{fontSize:22, fontWeight:"bold", color:fase.color}}>{fase.nombre}</div>
                    <div style={{fontSize:13, color:"rgba(255,255,255,0.5)", marginTop:2}}>Día {diasCiclo} de tu ciclo · Días {fase.dias}</div>
                    <div style={{fontSize:13, color:"rgba(255,255,255,0.7)", marginTop:10, lineHeight:1.6}}>{fase.descripcion}</div>
                    {faseActual !== "menstruacion" && (
                      <div style={{marginTop:10, fontSize:12, color:"rgba(255,255,255,0.4)"}}>
                        Próxima menstruación en ~<span style={{color:"#e57373",fontWeight:"bold"}}>{proximaMenstruacion} días</span>
                      </div>
                    )}
                  </div>

                  {/* Barra visual del ciclo */}
                  <div style={card}>
                    <div style={{fontSize:11,color:"rgba(255,255,255,0.4)",marginBottom:8,letterSpacing:1}}>TU CICLO DE {ciclo.duracionCiclo} DÍAS</div>
                    <div style={{display:"flex",borderRadius:10,overflow:"hidden",height:14,marginBottom:8}}>
                      {[
                        {f:"menstruacion",w:5,c:"#e57373"},
                        {f:"folicular",w:8,c:"#81c784"},
                        {f:"ovulacion",w:3,c:"#ffd54f"},
                        {f:"lutea",w:ciclo.duracionCiclo-16,c:"#ce93d8"},
                      ].map(({f,w,c}) => (
                        <div key={f} style={{flex:w,background:c,opacity:faseActual===f?1:0.35,transition:"opacity 0.3s"}}/>
                      ))}
                    </div>
                    <div style={{display:"flex",justifyContent:"space-between",fontSize:9,color:"rgba(255,255,255,0.4)"}}>
                      <span>🔴 Mens.</span><span>🌱 Folicular</span><span>✨ Ovul.</span><span>🌙 Lútea</span>
                    </div>
                    <div style={{marginTop:10,fontSize:12,color:"rgba(255,255,255,0.5)",textAlign:"center"}}>
                      Estás en el día <span style={{color:fase.color,fontWeight:"bold"}}>{diasCiclo}</span>
                    </div>
                  </div>

                  {/* Ejercicio adaptado */}
                  <div style={card}>
                    <div style={{fontSize:10,letterSpacing:3,color:fase.color,textTransform:"uppercase",marginBottom:10}}>🏋️ Ejercicio esta fase</div>
                    <div style={{fontSize:12,color:"rgba(255,255,255,0.5)",marginBottom:10,fontStyle:"italic",background:`${fase.color}11`,padding:"8px 10px",borderRadius:8}}>{fase.ejercicio.intensidad}</div>
                    <div style={{fontWeight:"bold",fontSize:12,color:"#4caf81",marginBottom:6}}>✅ Recomendado</div>
                    {fase.ejercicio.recomendado.map((e,i) => (
                      <div key={i} style={{fontSize:13,padding:"4px 0",borderBottom:"1px solid rgba(255,255,255,0.05)",color:"rgba(255,255,255,0.8)"}}>• {e}</div>
                    ))}
                    <div style={{fontWeight:"bold",fontSize:12,color:"#ff6b6b",marginTop:10,marginBottom:6}}>⚠️ Evitar o reducir</div>
                    {fase.ejercicio.evitar.map((e,i) => (
                      <div key={i} style={{fontSize:13,padding:"4px 0",borderBottom:"1px solid rgba(255,255,255,0.05)",color:"rgba(255,255,255,0.7)"}}>• {e}</div>
                    ))}
                  </div>

                  {/* Nutrición */}
                  <div style={card}>
                    <div style={{fontSize:10,letterSpacing:3,color:fase.color,textTransform:"uppercase",marginBottom:10}}>🥗 Nutrición esta fase</div>
                    {fase.nutricion.map((n,i) => (
                      <div key={i} style={{fontSize:13,padding:"5px 0",borderBottom:"1px solid rgba(255,255,255,0.05)",lineHeight:1.5}}>• {n}</div>
                    ))}
                  </div>

                  {/* Cuidados */}
                  <div style={card}>
                    <div style={{fontSize:10,letterSpacing:3,color:fase.color,textTransform:"uppercase",marginBottom:10}}>💆 Cuidados y bienestar</div>
                    {fase.cuidados.map((c,i) => (
                      <div key={i} style={{fontSize:13,padding:"5px 0",borderBottom:"1px solid rgba(255,255,255,0.05)",lineHeight:1.5}}>• {c}</div>
                    ))}
                  </div>

                  {/* Suplementos */}
                  <div style={{...card,background:"rgba(206,147,216,0.08)",border:"1px solid rgba(206,147,216,0.25)"}}>
                    <div style={{fontSize:10,letterSpacing:3,color:"#ce93d8",textTransform:"uppercase",marginBottom:10}}>💊 Suplementos recomendados</div>
                    {fase.suplementos.map((s,i) => (
                      <div key={i} style={{fontSize:13,padding:"5px 0",borderBottom:"1px solid rgba(255,255,255,0.05)",color:"rgba(255,255,255,0.8)"}}>• {s}</div>
                    ))}
                  </div>

                  {/* Síntomas de hoy */}
                  <div style={card}>
                    <div style={{fontSize:10,letterSpacing:3,color:oro,textTransform:"uppercase",marginBottom:10}}>📝 Síntomas de hoy</div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                      {SINTOMAS_OPCIONES.map(s => (
                        <button key={s} onClick={() => setCiclo(c => ({...c, sintomas: c.sintomas.includes(s) ? c.sintomas.filter(x=>x!==s) : [...c.sintomas, s]}))}
                          style={{padding:"6px 12px",borderRadius:20,border:"1px solid rgba(255,255,255,0.15)",background:ciclo.sintomas.includes(s)?`${fase.color}33`:"rgba(255,255,255,0.05)",color:ciclo.sintomas.includes(s)?fase.color:"rgba(255,255,255,0.7)",cursor:"pointer",fontSize:12,fontWeight:ciclo.sintomas.includes(s)?"bold":"normal",transition:"all 0.2s"}}>
                          {s}
                        </button>
                      ))}
                    </div>
                    {ciclo.sintomas.length > 0 && (
                      <div style={{marginTop:10,fontSize:12,color:"rgba(255,255,255,0.5)"}}>
                        💡 Síntomas registrados: {ciclo.sintomas.join(", ")}
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* Si no ingresó fecha */}
            {!ciclo.ultimaMenstruacion && (
              <div style={{textAlign:"center",color:"rgba(255,255,255,0.25)",padding:"30px 20px"}}>
                <div style={{fontSize:40,marginBottom:12}}>🌸</div>
                <div>Ingresá la fecha de tu última menstruación arriba para ver tu fase actual y los consejos personalizados.</div>
              </div>
            )}
          </div>
        )}

        {/* ── SALUD ────────────────────────────────────────────────────────── */}
        {tab === "salud" && (
          <div>
            {/* Info médica */}
            <div style={{...card, background:"rgba(255,200,80,0.07)", border:"1px solid rgba(255,200,80,0.2)"}}>
              <div style={{fontSize:10,letterSpacing:3,color:"#f6d365",textTransform:"uppercase",marginBottom:6}}>🩺 Tu perfil de salud</div>
              <div style={{fontSize:13,color:"rgba(255,255,255,0.7)",lineHeight:1.7,marginBottom:8}}>
                <b>Condiciones:</b> Colesterol moderado · Inflamación intestinal (en estudio)<br/>
                <b>Suplemento actual:</b> Vitamina D
              </div>
              <div style={{fontSize:12,color:"rgba(255,255,255,0.5)",lineHeight:1.6,fontStyle:"italic"}}>
                ⚠️ Este análisis es orientativo. Siempre confirmá con tu médico de cabecera antes de iniciar cualquier suplemento.
              </div>
            </div>

            {/* Subir análisis */}
            <div style={{...card}}>
              <div style={{fontSize:10,letterSpacing:3,color:oro,textTransform:"uppercase",marginBottom:8}}>📎 Subir análisis clínicos</div>
              <div style={{fontSize:13,color:"rgba(255,255,255,0.6)",marginBottom:12,lineHeight:1.6}}>
                Subí una foto o PDF de tus resultados de sangre, perfil hormonal o cualquier estudio. La IA los analiza y te indica qué suplementos tomar, en qué dosis y cuándo.
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,application/pdf"
                style={{display:"none"}}
                onChange={e => {
                  if (e.target.files[0]) setAnalisisArchivo(e.target.files[0]);
                }}
              />
              <input
                type="text"
                placeholder="Nombre del análisis (ej: 'Sangre junio 2026')"
                value={analisisNombre}
                onChange={e => setAnalisisNombre(e.target.value)}
                style={{width:"100%",padding:"10px",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"#f0ece8",fontFamily:"inherit",fontSize:14,marginBottom:10}}
              />
              <button onClick={() => fileInputRef.current?.click()} style={{width:"100%",padding:"11px",borderRadius:10,border:`1px dashed rgba(201,169,110,0.4)`,background:"rgba(201,169,110,0.07)",color:oro,fontFamily:"inherit",fontSize:14,cursor:"pointer",marginBottom:10}}>
                {analisisArchivo ? `✅ ${analisisArchivo.name}` : "📂 Elegir archivo (JPG, PNG o PDF)"}
              </button>
              {analisisArchivo && (
                <button onClick={analizarEstudios} disabled={cargandoAnalisis} style={{width:"100%",padding:"12px",borderRadius:10,border:"none",background:cargandoAnalisis?"rgba(255,255,255,0.08)":`linear-gradient(135deg,${oro},#e8c99e)`,color:cargandoAnalisis?"rgba(255,255,255,0.4)":"#1a1635",fontFamily:"inherit",fontSize:15,fontWeight:"bold",cursor:cargandoAnalisis?"not-allowed":"pointer",transition:"all 0.3s"}}>
                  {cargandoAnalisis ? "🔬 Analizando resultados..." : "🔬 Analizar mis estudios"}
                </button>
              )}
            </div>

            {/* Resultado del análisis */}
            {analisisResultado?.error && (
              <div style={{...card, background:"rgba(255,100,100,0.08)", border:"1px solid rgba(255,100,100,0.25)"}}>
                <div style={{color:"#ff6b6b",fontSize:13}}>{analisisResultado.error}</div>
              </div>
            )}
            {analisisResultado?.resumen && (
              <div>
                {/* Resumen */}
                <div style={{...card, background:"rgba(76,175,129,0.08)", border:"1px solid rgba(76,175,129,0.25)"}}>
                  <div style={{fontSize:10,letterSpacing:3,color:"#4caf81",textTransform:"uppercase",marginBottom:6}}>📋 Resumen del análisis</div>
                  <div style={{fontSize:13,lineHeight:1.7,color:"rgba(255,255,255,0.8)"}}>{analisisResultado.resumen}</div>
                </div>

                {/* Alertas */}
                {analisisResultado.alertas?.length > 0 && (
                  <div style={{...card, background:"rgba(255,150,50,0.08)", border:"1px solid rgba(255,150,50,0.3)"}}>
                    <div style={{fontSize:10,letterSpacing:3,color:"#ff9500",textTransform:"uppercase",marginBottom:8}}>⚠️ Alertas</div>
                    {analisisResultado.alertas.map((a,i) => (
                      <div key={i} style={{fontSize:13,padding:"5px 0",borderBottom:"1px solid rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.8)"}}>• {a}</div>
                    ))}
                  </div>
                )}

                {/* Valores */}
                {analisisResultado.valores?.length > 0 && (
                  <div style={card}>
                    <div style={{fontSize:10,letterSpacing:3,color:oro,textTransform:"uppercase",marginBottom:10}}>🧪 Valores clave</div>
                    {analisisResultado.valores.map((v,i) => {
                      const colores = { normal:"#4caf81", alto:"#ff6b6b", bajo:"#4facfe", "atención":"#ff9500" };
                      const bg = { normal:"rgba(76,175,129,0.1)", alto:"rgba(255,107,107,0.1)", bajo:"rgba(79,172,254,0.1)", "atención":"rgba(255,149,0,0.1)" };
                      return (
                        <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 10px",borderRadius:8,marginBottom:5,background:bg[v.estado]||"rgba(255,255,255,0.04)"}}>
                          <div>
                            <div style={{fontSize:13,fontWeight:"bold"}}>{v.nombre}</div>
                            <div style={{fontSize:11,color:"rgba(255,255,255,0.4)"}}>Ref: {v.referencia}</div>
                          </div>
                          <div style={{textAlign:"right"}}>
                            <div style={{fontSize:14,fontWeight:"bold",color:colores[v.estado]||"#f0ece8"}}>{v.valor}</div>
                            <div style={{fontSize:10,color:colores[v.estado]||"rgba(255,255,255,0.4)",textTransform:"capitalize"}}>{v.estado}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Suplementos */}
                {analisisResultado.suplementos?.length > 0 && (
                  <div>
                    <div style={{fontSize:10,letterSpacing:3,color:oro,textTransform:"uppercase",marginBottom:10}}>💊 Suplementos recomendados</div>
                    {analisisResultado.suplementos.map((s,i) => {
                      const prioColor = { alta:"#ff6b6b", media:oro, baja:"#4caf81" };
                      return (
                        <div key={i} style={{...card, borderLeft:`3px solid ${prioColor[s.prioridad]||oro}`}}>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
                            <div style={{fontWeight:"bold",fontSize:15}}>{s.nombre}</div>
                            <div style={{fontSize:10,color:prioColor[s.prioridad],background:`${prioColor[s.prioridad]}22`,padding:"2px 8px",borderRadius:20,textTransform:"capitalize"}}>{s.prioridad}</div>
                          </div>
                          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:8}}>
                            <div style={{background:"rgba(255,255,255,0.05)",borderRadius:8,padding:8}}>
                              <div style={{fontSize:10,color:"rgba(255,255,255,0.4)"}}>DOSIS</div>
                              <div style={{fontSize:13,fontWeight:"bold",color:oro,marginTop:2}}>{s.dosis}</div>
                            </div>
                            <div style={{background:"rgba(255,255,255,0.05)",borderRadius:8,padding:8}}>
                              <div style={{fontSize:10,color:"rgba(255,255,255,0.4)"}}>HORARIO</div>
                              <div style={{fontSize:13,fontWeight:"bold",color:"#4facfe",marginTop:2}}>{s.horario}</div>
                            </div>
                          </div>
                          <div style={{fontSize:12,color:"rgba(255,255,255,0.6)",marginBottom:4}}>
                            {s.con_comida ? "🍽️ Tomar con comida" : "💧 Tomar con el estómago vacío"}
                          </div>
                          <div style={{fontSize:12,color:"rgba(255,255,255,0.5)",fontStyle:"italic"}}>{s.razon}</div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Recomendaciones */}
                {analisisResultado.recomendaciones?.length > 0 && (
                  <div style={card}>
                    <div style={{fontSize:10,letterSpacing:3,color:oro,textTransform:"uppercase",marginBottom:8}}>✅ Recomendaciones</div>
                    {analisisResultado.recomendaciones.map((r,i) => (
                      <div key={i} style={{fontSize:13,padding:"5px 0",borderBottom:"1px solid rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.8)",lineHeight:1.5}}>• {r}</div>
                    ))}
                  </div>
                )}

                {/* Nota profesional */}
                {analisisResultado.nota_profesional && (
                  <div style={{...card, background:"rgba(255,200,80,0.06)", border:"1px solid rgba(255,200,80,0.18)"}}>
                    <div style={{fontSize:10,letterSpacing:3,color:"#f6d365",textTransform:"uppercase",marginBottom:6}}>🔔 Nota importante</div>
                    <div style={{fontSize:12,color:"rgba(255,255,255,0.65)",lineHeight:1.6,fontStyle:"italic"}}>{analisisResultado.nota_profesional}</div>
                  </div>
                )}
              </div>
            )}

            {/* Historial de análisis */}
            {historialAnalisis.length > 1 && (
              <div>
                <div style={{fontSize:10,letterSpacing:3,color:oro,textTransform:"uppercase",margin:"16px 0 10px"}}>📂 Análisis anteriores</div>
                {historialAnalisis.slice(1).map((h,i) => (
                  <button key={i} onClick={() => setAnalisisResultado(h)} style={{...card, width:"100%", textAlign:"left", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                    <div>
                      <div style={{fontWeight:"bold",fontSize:13}}>{h.nombre}</div>
                      <div style={{fontSize:11,color:"rgba(255,255,255,0.4)",marginTop:2}}>{h.fecha}</div>
                    </div>
                    <div style={{color:oro,fontSize:16}}>→</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── PROGRESO ────────────────────────────────────────────────────── */}
        {tab === "progreso" && (
          <div>
            <div style={{fontSize:10,letterSpacing:3,color:oro,textTransform:"uppercase",marginBottom:12}}>Tu historial</div>
            {historial.length === 0 ? (
              <div style={{textAlign:"center",color:"rgba(255,255,255,0.25)",padding:"50px 20px"}}>
                <div style={{fontSize:42,marginBottom:12}}>📊</div>
                <div>Tu progreso aparecerá acá después de guardar tu primer día</div>
              </div>
            ) : historial.map((h,i) => (
              <div key={i} style={card}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
                  <div style={{fontWeight:"bold"}}>{h.dia}</div>
                  <div style={{fontSize:11,color:"rgba(255,255,255,0.35)"}}>{h.fecha}</div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:6}}>
                  {[
                    {l:"Ejercicio",v:h.ejercicio?"✅":"❌"},
                    {l:"Agua",v:`${(h.agua*0.25).toFixed(1)}L`,c:"#4facfe"},
                    {l:"Sueño",v:`${h.sueno||"?"}h`,c:"#a18cd1"},
                    {l:"Comidas",v:`${Object.values(h.comidas).filter(Boolean).length}/4`,c:oro},
                  ].map(({l,v,c}) => (
                    <div key={l} style={{background:"rgba(255,255,255,0.05)",borderRadius:8,padding:8,textAlign:"center"}}>
                      <div style={{fontSize:14,color:c||"#f0ece8",fontWeight:"bold"}}>{v}</div>
                      <div style={{fontSize:9,color:"rgba(255,255,255,0.35)",marginTop:2}}>{l}</div>
                    </div>
                  ))}
                </div>
                {h.peso && <div style={{marginTop:8,fontSize:12,color:"#f6d365"}}>⚖️ {h.peso} kg</div>}
                {h.notas && <div style={{marginTop:5,fontSize:12,color:"rgba(255,255,255,0.45)",fontStyle:"italic"}}>"{h.notas}"</div>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ═══ MODAL GUÍA DE EJERCICIO ═══════════════════════════════════════ */}
      {videoModal && (() => {
        const guia = GUIAS[videoModal.nombre];

        function hablarEjercicio() {
          const intro = `Luciana, te explico ${videoModal.nombre}. Trabajás ${guia?.musculo || "músculos importantes"}.`;
          const pasosTxt = (guia?.pasos || []).map((p,i) => `Paso ${i+1}: ${p}`).join(". ");
          const erroresTxt = guia?.errores?.length
            ? `Atención a los errores más comunes: ${guia.errores.map(e => e.replace(/^❌\s*/,'')).join(". ")}.`
            : "";
          const cierre = `Concentrte en la técnica, no en la velocidad. Si sentís dolor articular, parás. Vamos Luciana, podés!`;
          hablar(`${intro} ${pasosTxt}. ${erroresTxt} ${cierre}`);
        }

        // Auto-hablar al abrir
        setTimeout(() => hablarEjercicio(), 400);

        return (
          <div onClick={() => { pararVoz(); setVideoModal(null); }} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.9)",zIndex:1000,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
            <div onClick={e=>e.stopPropagation()} style={{background:"#1a1535",borderRadius:"20px 20px 0 0",width:"100%",maxWidth:480,maxHeight:"88vh",overflowY:"auto",border:`1px solid ${oro}`,borderBottom:"none"}}>

              {/* Header */}
              <div style={{position:"sticky",top:0,background:"#1a1535",padding:"16px 16px 12px",display:"flex",justifyContent:"space-between",alignItems:"flex-start",borderBottom:"1px solid rgba(255,255,255,0.1)",zIndex:1}}>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <span style={{fontSize:28}}>{guia?.emoji || "💪"}</span>
                    <div>
                      <div style={{fontWeight:"bold",fontSize:16}}>{videoModal.nombre}</div>
                      <div style={{fontSize:11,color:oro,marginTop:1}}>{guia?.musculo}</div>
                    </div>
                  </div>
                  <div style={{display:"flex",gap:8,marginTop:10,flexWrap:"wrap"}}>
                    <span style={{fontSize:11,color:oro,background:"rgba(201,169,110,0.15)",padding:"3px 10px",borderRadius:20}}>📋 {videoModal.series}</span>
                    <span style={{fontSize:11,color:"#4facfe",background:"rgba(79,172,254,0.12)",padding:"3px 10px",borderRadius:20}}>⏱ {videoModal.descanso}</span>
                  </div>
                </div>
                <button onClick={() => { pararVoz(); setVideoModal(null); }} style={{background:"rgba(255,255,255,0.1)",border:"none",color:"#f0ece8",borderRadius:10,padding:"8px 12px",cursor:"pointer",fontSize:16,flexShrink:0}}>✕</button>
              </div>

              {/* Controles de voz de Paula */}
              <div style={{margin:"14px 16px 0",background:"linear-gradient(135deg,rgba(124,77,255,0.15),rgba(179,136,255,0.08))",border:"1px solid rgba(179,136,255,0.3)",borderRadius:14,padding:"12px 14px"}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <div style={{fontSize:22}}>🎙️</div>
                    <div>
                      <div style={{fontWeight:"bold",fontSize:13,color:"#b388ff"}}>Paula te está explicando...</div>
                      <div style={{fontSize:11,color:"rgba(255,255,255,0.45)",marginTop:1}}>Voz argentina · Se reproduce al abrir</div>
                    </div>
                  </div>
                  <div style={{display:"flex",gap:8}}>
                    <button onClick={hablarEjercicio} style={{padding:"7px 12px",borderRadius:8,border:"none",background:"rgba(179,136,255,0.2)",color:"#b388ff",cursor:"pointer",fontSize:12,fontWeight:"bold"}}>
                      🔁 Repetir
                    </button>
                    <button onClick={() => pararVoz()} style={{padding:"7px 12px",borderRadius:8,border:"none",background:"rgba(255,255,255,0.08)",color:"rgba(255,255,255,0.6)",cursor:"pointer",fontSize:12}}>
                      ⏹ Parar
                    </button>
                  </div>
                </div>
              </div>

              <div style={{padding:"16px"}}>
                {/* Video de Paula si existe */}
                {HEYGEN_VIDEOS[videoModal.nombre] && (
                  <div style={{marginBottom:16}}>
                    <div style={{fontSize:10,letterSpacing:3,color:"#ff6b6b",textTransform:"uppercase",marginBottom:8}}>🎬 Paula te lo muestra</div>
                    <button
                      onClick={() => window.open(HEYGEN_VIDEOS[videoModal.nombre].replace("/embeds/","/videos/"), "_blank")}
                      style={{width:"100%",padding:"16px",borderRadius:14,border:"none",background:"linear-gradient(135deg,#e63946,#c1121f)",color:"#fff",fontFamily:"inherit",fontSize:15,fontWeight:"bold",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:8}}>
                      <span style={{fontSize:22}}>▶</span> Ver video de Paula
                    </button>
                    <div style={{fontSize:11,color:"rgba(255,255,255,0.35)",textAlign:"center"}}>
                      Se abre en Safari · Volvé con el botón ‹ atrás
                    </div>
                  </div>
                )}
                <div style={{marginBottom:16}}>
                  <div style={{fontSize:10,letterSpacing:3,color:oro,textTransform:"uppercase",marginBottom:10}}>✅ Cómo hacerlo paso a paso</div>
                  {(guia?.pasos || [videoModal.tip]).map((paso,i) => (
                    <div key={i} style={{display:"flex",gap:10,padding:"8px 10px",marginBottom:6,background:"rgba(255,255,255,0.04)",borderRadius:10,alignItems:"flex-start"}}>
                      <div style={{width:22,height:22,borderRadius:"50%",background:`linear-gradient(135deg,${oro},#e8c99e)`,color:"#1a1635",fontSize:11,fontWeight:"bold",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{i+1}</div>
                      <div style={{fontSize:13,color:"rgba(255,255,255,0.85)",lineHeight:1.5}}>{paso}</div>
                    </div>
                  ))}
                </div>

                {/* Errores comunes */}
                {guia?.errores && (
                  <div style={{marginBottom:16}}>
                    <div style={{fontSize:10,letterSpacing:3,color:"#e57373",textTransform:"uppercase",marginBottom:10}}>❌ Errores comunes</div>
                    {guia.errores.map((err,i) => (
                      <div key={i} style={{display:"flex",gap:8,padding:"7px 10px",marginBottom:5,background:"rgba(229,115,115,0.08)",borderRadius:8,border:"1px solid rgba(229,115,115,0.2)",alignItems:"flex-start"}}>
                        <span style={{fontSize:13,color:"rgba(255,255,255,0.75)",lineHeight:1.5}}>{err.replace(/^❌\s*/,'')}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tip de lesión */}
                <div style={{padding:"10px 14px",background:"rgba(255,149,0,0.08)",border:"1px solid rgba(255,149,0,0.25)",borderRadius:10,fontSize:12,color:"rgba(255,255,255,0.7)",lineHeight:1.6}}>
                  ⚠️ <b>Dolor articular = parás.</b> El dolor muscular (ardor, quemazón) es normal. El dolor en articulaciones (rodilla, hombro, codo) no lo es — parás y consultás.
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      <style>{`
        @keyframes bounce { 0%,100%{transform:translateY(0);opacity:.4} 50%{transform:translateY(-6px);opacity:1} }
        @keyframes slideDown { from{transform:translateX(-50%) translateY(-20px);opacity:0} to{transform:translateX(-50%) translateY(0);opacity:1} }
        @keyframes wave { 0%,100%{transform:scaleY(0.4)} 50%{transform:scaleY(1.2)} }
        *{-webkit-tap-highlight-color:transparent;box-sizing:border-box;}
        input, textarea { caret-color: #c9a96e !important; }
        input::placeholder,textarea::placeholder{color:rgba(240,236,232,0.28);}
        ::-webkit-scrollbar{width:0;}
      `}</style>
    </div>
  );
}
