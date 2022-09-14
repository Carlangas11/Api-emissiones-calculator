import { IMeasureUnit } from "../interfaces";

export const measureUnits: IMeasureUnit[] = [
    {
        magnitud: "Longitud",
        si: "m",
        equivalencias: [
            {
                name: "km",
                value: 1000,
                alias: ["kilometro", "kilometros"]
            },
            {
                name: "dm",
                value: 0.1,
                alias: ["decimetro", "decimetros"]
            },
            {
                name: "cm",
                value: 0.01,
                alias: ["centimetro", "centimetros"]
            },
            {
                name: "mm",
                value: 0.001,
                alias: ["milimetro", "milimetros"]
            },
            {
                name: "in",
                value: 0.0254,
                alias: ["pulgada", "pulgadas"]
            },
            {
                name: "ft",
                value: 0.3048,
                alias: ["pie", "pies"]
            },
            {
                name: "yd",
                value: 0.9144,
                alias: ["yarda", "yardas"]
            },
        ],
    },
    {
        magnitud: "Área",
        si: "m2",
        equivalencias: [
            {
                name: "km2",
                value: 1000000,
                alias: ["kilometro cuadrado", "kilometros cuadrados", "km2", "km^2", "km²", "km cuadrado", "km cuadrados"],
            },
            {
                name: "ha",
                value: 10000,
                alias: ["hectarea", "hectareas", "hectárea", "hectáreas", ]
            },
            {
                name: "a",
                value: 100,
                alias: ["are", "ares"]
            },
            {
                name: "dm2",
                value: 0.01,
                alias: ["decimetro cuadrado", "decimetros cuadrados"]
            },
            {
                name: "cm2",
                value: 0.0001,
                alias: ["centimetro cuadrado", "centimetros cuadrados", "centimetro cuadrada", "centimetros cuadradas"]
            },
            {
                name: "mm2",
                value: 0.000001,
                alias: ["milimetro cuadrado", "milimetros cuadrados", "milimetro cuadrados"]
            },
            {
                name: "in2",
                value: 0.00064516,
                alias: ["pulgada cuadrada", "pulgadas cuadradas", "pulgada cuadrado", "pulgadas cuadrados"]
            },
            {
                name: "ft2",
                value: 0.09290304,
                alias: ["pie cuadrado", "pies cuadrados", "pie cuadrada", "pies cuadrada"]
            },
            {
                name: "yd2",
                value: 0.83612736,
                alias: ["yarda cuadrada", "yardas cuadradas", "yardas cuadrado", "yarda cuadrado"]
            },
        ],
    },
    {
        magnitud: "Volumen",
        si: "m3",
        equivalencias: [
            {
                name: "km3",
                value: 1000000000000,
                alias: ["kilometro cubico", "kilometros cubicos"]
            },
            {
                name: "hm3",
                value: 1000000000,
                alias: ["hectometro cubico", "hectometros cubicos"]
            },
            {
                name: "dam3",
                value: 1000000,
                alias: ["decametro cubico", "decametros cubicos"]
            },
            {
                name: "dm3",
                value: 0.001,
                alias: ["decimetro cubico", "decimetros cubicos", "decilitro", "decilitros"]
            },
            {
                name: "cm3",
                value: 0.000001,
                alias: ["centimetro cubico", "centimetros cubicos", "cc"]
            },
            {
                name: "mm3",
                value: 0.000000001,
                alias: ["milimetro cubico", "milimetros cubicos"]
            },
            {
                name: "in3",
                value: 0.000016387064,
                alias: ["pulgada cubica", "pulgadas cubicas", "pulgada cubico", "pulgadas cubicos"]
            },
            {
                name: "ft3",
                value: 0.028316846592,
                alias: ["pie cubico", "pies cubicos", "pie cubica", "pies cubicas"]
            },
            {
                name: "yd3",
                value: 0.764554857984,
                alias: ["yarda cubica", "yardas cubicas", "yarda cubico", "yardas cubicos"]
            },
            {
                name: "l",
                value: 0.001,
                alias: ["litro", "litros", "lt", "lts", "lts."]
            },
            {
                name: "ml",
                value: 0.000001,
                alias: ["mililitro", "mililitros", "ml", "mls", "mls."]
            },
        ],
    },
    {
        magnitud: "Masa",
        si: "kg",
        equivalencias: [
            {
                name: "t",
                value: 1000,
                alias: ["tonelada", "toneladas", "ton", "tons", "tonelada métrica", "toneladas métricas", "ton métrica", "tons métricas"]
            },
            {
                name: "g",
                value: 0.001,
                alias: ["gramo", "gramos", "gr", "grs", "grs.", "gr.", "gramos.", "gramo."]
            },
            {
                name: "mg",
                value: 0.000001,
                alias: ["miligramo", "miligramos", "mg", "mgs", "mgs.", "mg.", "miligramos.", "miligramo."]
            },
            {
                name: "lb",
                value: 0.45359237,
                alias: ["libra", "libras", "lb", "lbs", "lbs.", "lb.", "libras.", "libra."]
            },
            {
                name: "oz",
                value: 0.028349523125,
                alias: ["onzas", "onza", "oz", "ozs", "ozs.", "oz.", "onzas.", "onza."]
            },
        ],
    },
    {
        magnitud: "Tiempo",
        si: "s",
        equivalencias: [
            {
                name: "min",
                value: 60,
                alias: ["minuto", "minutos", "min.", "minutos.", "minuto.", "minutos."]
            },
            {
                name: "h",
                value: 3600,
                alias: ["hora", "horas", "h.", "horas.", "hora."]
            },
            {
                name: "d",
                value: 86400,
                alias: ["dia", "dias", "d.", "dias.", "dia."]
            },
            {
                name: "a",
                value: 31536000,
                alias: ["año", "años", "a.", "años.", "año."]
            },
        ],
    },
    {
        magnitud: "Velocidad",
        si: "m/s",
        equivalencias: [
            {
                name: "km/h",
                value: 3.6,
                alias: ["kilometro por hora", "kilometros por hora", "km/h", "km/h."]
            },
            {
                name: "km/s",
                value: 1000,
                alias: ["kilometro por segundo", "kilometros por segundo", "km/s", "km/s."]
            },
            {
                name: "m/h",
                value: 0.0002777777777777778,
                alias: ["metro por hora", "metros por hora", "m/h", "m/h."]
            },
            {
                name: "m/min",
                value: 0.016666666666666666,
                alias: ["metro por minuto", "metros por minuto", "m/min", "m/min."]
            },
            {
                name: "ft/s",
                value: 0.3048,
                alias: ["pie por segundo", "pies por segundo", "ft/s", "ft/s.", "pie/s", "pies/s", "pie/s.", "pies/s."]
            },
            {
                name: "ft/min",
                value: 18.288,
                alias: ["pie por minuto", "pies por minuto", "ft/min", "ft/min.", "pie/min", "pies/min", "pie/min.", "pies/min."]
            },
            {
                name: "ft/h",
                value: 1097.28,
                alias: ["pie por hora", "pies por hora", "ft/h", "ft/h.", "pie/h", "pies/h", "pie/h.", "pies/h."]
            },
            {
                name: "knot",
                value: 1.9438444924406047,
                alias: ["nudo", "nudos", "knot", "knots", "knot.", "knots.", "nudo.", "nudos."]
            },
        ],
    },
    {
        magnitud: "Energia Electrica",
        si: "kWh",
        equivalencias: [
            {
                name: "Wh",
                value: 0.001,
                alias: ["watt hora", "watt horas", "Wh", "Wh."]
            },
            {
                name: "J",
                value: 0.0000002777777777777778,
                alias: ["joule", "joules", "J", "J."]
            },
            {
                name: "mWh",
                value: 0.000001,
                alias: ["milivatios hora", "milivatios horas", "mWh", "mWh.", "milivatios/hora", "milivatios/horas", "milivatios/h", "milivatios/h.", "megaWatt hora", "megaWatt horas", "mW/h", "mW/h.", "megaWatt/hora", "megaWatt/horas", "megaWatt/h", "megaWatt/h."]
            },
        ],
    },
    {
        magnitud: "Transporte Carga",
        si: "tonKm",
        equivalencias: [
            {
                name: "tonKm",
                value: 1,
                alias: ["tonelada kilometro", "toneladas kilometro", "tonelada kilometros", "toneladas kilometros", "tonKm", "tonKm.", "ton-km", "ton-km.", "km-ton", "km-ton.", "t-km", "t-km.", "km-t", "km-t."]
            },
        ],
    },
    {
        magnitud: "Transporte Pasajeros",
        si: "kmPass",
        equivalencias: [
            {
                name: "kmPass",
                value: 1,
                alias: ["kilometro pasajero", "kilometros pasajero", "kilometro pasajeros", "kilometros pasajeros", "kmPass", "kmPass.", "km-pass", "km-pass.", "pass-km", "pass-km.", "persona-km", "persona-km.", "km-persona", "km-persona."]
            },
        ],
    }

    
];