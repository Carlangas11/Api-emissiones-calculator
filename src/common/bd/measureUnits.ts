import { IMeasureUnit } from "../interfaces";

export const measureUnits: IMeasureUnit[] = [
    {
        magnitud: "longitud",
        si: "m",
        equivalencias: [
            {
                name: "km",
                value: 1000,
                alias: ["kilometro", "kilometros", "Km" , "Kms", "Kilometro", "Kilometros", "km", "kms"]
            },
            {
                name: "dm",
                value: 0.1,
                alias: ["decimetro", "decimetros", "Dm", "Dms", "Decimetro", "Decimetros", "dm", "dms"]
            },
            {
                name: "cm",
                value: 0.01,
                alias: ["centimetro", "centimetros", "Cm", "Cms", "Centimetro", "Centimetros", "cm", "cms"]
            },
            {
                name: "mm",
                value: 0.001,
                alias: ["milimetro", "milimetros", "Mm", "Mms", "Milimetro", "Milimetros", "mm", "mms"]
            },
            {
                name: "in",
                value: 0.0254,
                alias: ["pulgada", "pulgadas", "In", "Ins", "Pulgada", "Pulgadas", "in", "ins"]
            },
            {
                name: "ft",
                value: 0.3048,
                alias: ["pie", "pies", "Ft", "Fts", "Pie", "Pies", "ft", "fts"]
            },
            {
                name: "yd",
                value: 0.9144,
                alias: ["yarda", "yardas", "Yd", "Yds", "Yarda", "Yardas", "yd", "yds"]
            },
        ],
    },
    {
        magnitud: "area",
        si: "m2",
        equivalencias: [
            {
                name: "km2",
                value: 1000000,
                alias: ["kilometro cuadrado", "kilometros cuadrados", "km2", "km^2", "km²", "km cuadrado", "km cuadrados", "Km2", "Km^2", "Km²", "Km cuadrado", "Km cuadrados", "Kilometro cuadrado", "Kilometros cuadrados", "Kilometro Cuadrado", "Kilometros Cuadrados"],
            },
            {
                name: "ha",
                value: 10000,
                alias: ["hectarea", "hectareas", "hectárea", "hectáreas", "Ha", "Hectarea", "Hectareas", "Hectárea", "Hectáreas"],
            },
            {
                name: "a",
                value: 100,
                alias: ["are", "ares", "A", "Are", "Ares"],
            },
            {
                name: "dm2",
                value: 0.01,
                alias: ["decimetro cuadrado", "decimetros cuadrados", "dm2", "dm^2", "dm²", "dm cuadrado", "dm cuadrados", "Dm2", "Dm^2", "Dm²", "Dm cuadrado", "Dm cuadrados", "Decimetro cuadrado", "Decimetros cuadrados", "Decimetro Cuadrado", "Decimetros Cuadrados"],
            },
            {
                name: "cm2",
                value: 0.0001,
                alias: ["centimetro cuadrado", "centimetros cuadrados", "centimetro cuadrada", "centimetros cuadradas", "cm2", "cm^2", "cm²", "cm cuadrado", "cm cuadrados", "cm cuadrada", "cm cuadradas", "Cm2", "Cm^2", "Cm²", "Cm cuadrado", "Cm cuadrados", "Cm cuadrada", "Cm cuadradas", "Centimetro cuadrado", "Centimetros cuadrados", "Centimetro Cuadrado", "Centimetros Cuadrados", "Centimetro cuadrada", "Centimetros cuadradas", "Centimetro Cuadrada", "Centimetros Cuadradas"],
            },
            {
                name: "mm2",
                value: 0.000001,
                alias: ["milimetro cuadrado", "milimetros cuadrados", "milimetro cuadrados", "milimetros cuadrados", "mm2", "mm^2", "mm²", "mm cuadrado", "mm cuadrados", "mm cuadrada", "mm cuadradas", "Mm2", "Mm^2", "Mm²", "Mm cuadrado", "Mm cuadrados", "Mm cuadrada", "Mm cuadradas", "Milimetro cuadrado", "Milimetros cuadrados", "Milimetro Cuadrado", "Milimetros Cuadrados", "Milimetro cuadrada", "Milimetros cuadradas", "Milimetro Cuadrada", "Milimetros Cuadradas"],
            },
            {
                name: "in2",
                value: 0.00064516,
                alias: ["pulgada cuadrada", "pulgadas cuadradas", "pulgada cuadrado", "pulgadas cuadrados", "in2", "in^2", "in²", "in cuadrada", "in cuadradas", "in cuadrado", "in cuadrados", "In2", "In^2", "In²", "In cuadrada", "In cuadradas", "In cuadrado", "In cuadrados", "Pulgada cuadrada", "Pulgadas cuadradas", "Pulgada Cuadrada", "Pulgadas Cuadradas", "Pulgada cuadrado", "Pulgadas cuadrados", "Pulgada Cuadrado", "Pulgadas Cuadrados"],
            },
            {
                name: "ft2",
                value: 0.09290304,
                alias: ["pie cuadrado", "pies cuadrados", "pie cuadrada", "pies cuadrada", "ft2", "ft^2", "ft²", "ft cuadrado", "ft cuadrados", "ft cuadrada", "ft cuadradas", "Ft2", "Ft^2", "Ft²", "Ft cuadrado", "Ft cuadrados", "Ft cuadrada", "Ft cuadradas", "Pie cuadrado", "Pies cuadrados", "Pie Cuadrado", "Pies Cuadrados", "Pie cuadrada", "Pies cuadrada", "Pie Cuadrada", "Pies Cuadrada"],
            },
            {
                name: "yd2",
                value: 0.83612736,
                alias: ["yarda cuadrada", "yardas cuadradas", "yardas cuadrado", "yarda cuadrado", "yd2", "yd^2", "yd²", "yd cuadrada", "yd cuadradas", "yd cuadrado", "yd cuadrados", "Yd2", "Yd^2", "Yd²", "Yd cuadrada", "Yd cuadradas", "Yd cuadrado", "Yd cuadrados", "Yarda cuadrada", "Yardas cuadradas", "Yarda Cuadrada", "Yardas Cuadradas", "Yarda cuadrado", "Yardas cuadrado", "Yarda Cuadrado", "Yardas Cuadrado"],
            },
        ],
    },
    {
        magnitud: "volumen",
        si: "m3",
        equivalencias: [
            {
                name: "km3",
                value: 1000000000000,
                alias: ["kilometro cubico", "kilometros cubicos", "km3", "km^3", "km³", "km cubico", "km cubicos", "Km3", "Km^3", "Km³", "Km cubico", "Km cubicos", "Kilometro cubico", "Kilometros cubicos", "Kilometro Cubico", "Kilometros Cubicos"],
            },
            {
                name: "hm3",
                value: 1000000000,
                alias: ["hectometro cubico", "hectometros cubicos", "hm3", "hm^3", "hm³", "hm cubico", "hm cubicos", "Hm3", "Hm^3", "Hm³", "Hm cubico", "Hm cubicos", "Hectometro cubico", "Hectometros cubicos", "Hectometro Cubico", "Hectometros Cubicos"],
            },
            {
                name: "dam3",
                value: 1000000,
                alias: ["decametro cubico", "decametros cubicos", "dam3", "dam^3", "dam³", "dam cubico", "dam cubicos", "Dam3", "Dam^3", "Dam³", "Dam cubico", "Dam cubicos", "Decametro cubico", "Decametros cubicos", "Decametro Cubico", "Decametros Cubicos"],
            },
            {
                name: "dm3",
                value: 0.001,
                alias: ["decimetro cubico", "decimetros cubicos", "decilitro", "decilitros", "dm3", "dm^3", "dm³", "dm cubico", "dm cubicos", "dm litro", "dm litros", "Dm3", "Dm^3", "Dm³", "Dm cubico", "Dm cubicos", "Dm litro", "Dm litros", "Decimetro cubico", "Decimetros cubicos", "Decimetro Cubico", "Decimetros Cubicos", "Decilitro", "Decilitros"],
            },
            {
                name: "cm3",
                value: 0.000001,
                alias: ["centimetro cubico", "centimetros cubicos", "cc", "centilitro", "centilitros", "cm3", "cm^3", "cm³", "cm cubico", "cm cubicos", "cm litro", "cm litros", "Cm3", "Cm^3", "Cm³", "Cm cubico", "Cm cubicos", "Cm litro", "Cm litros", "Centimetro cubico", "Centimetros cubicos", "Centimetro Cubico", "Centimetros Cubicos", "Cc", "Centilitro", "Centilitros"],
            },
            {
                name: "mm3",
                value: 0.000000001,
                alias: ["milimetro cubico", "milimetros cubicos", "ml", "mililitro", "mililitros", "mm3", "mm^3", "mm³", "mm cubico", "mm cubicos", "mm litro", "mm litros", "Mm3", "Mm^3", "Mm³", "Mm cubico", "Mm cubicos", "Mm litro", "Mm litros", "Milimetro cubico", "Milimetros cubicos", "Milimetro Cubico", "Milimetros Cubicos", "Ml", "Mililitro", "Mililitros"],
            },
            {
                name: "in3",
                value: 0.000016387064,
                alias: ["pulgada cubica", "pulgadas cubicas", "pulgada cubico", "pulgadas cubicos", "in3", "in^3", "in³", "in cubica", "in cubicas", "in cubico", "in cubicos", "In3", "In^3", "In³", "In cubica", "In cubicas", "In cubico", "In cubicos", "Pulgada cubica", "Pulgadas cubicas", "Pulgada Cubica", "Pulgadas Cubicas", "Pulgada cubico", "Pulgadas cubicos", "Pulgada Cubico", "Pulgadas Cubicos"],
            },
            {
                name: "ft3",
                value: 0.028316846592,
                alias: ["pie cubico", "pies cubicos", "pie cubica", "pies cubicas", "ft3", "ft^3", "ft³", "ft cubico", "ft cubicos", "ft cubica", "ft cubicas", "Ft3", "Ft^3", "Ft³", "Ft cubico", "Ft cubicos", "Ft cubica", "Ft cubicas", "Pie cubico", "Pies cubicos", "Pie Cubico", "Pies Cubicos", "Pie cubica", "Pies cubicas", "Pie Cubica", "Pies Cubicas"],
            },
            {
                name: "yd3",
                value: 0.764554857984,
                alias: ["yarda cubica", "yardas cubicas", "yarda cubico", "yardas cubicos", "yd3", "yd^3", "yd³", "yd cubico", "yd cubicos", "yd cubica", "yd cubicas", "Yd3", "Yd^3", "Yd³", "Yd cubico", "Yd cubicos", "Yd cubica", "Yd cubicas", "Yarda cubica", "Yardas cubicas", "Yarda Cubica", "Yardas Cubicas", "Yarda cubico", "Yardas cubicos", "Yarda Cubico", "Yardas Cubico"],
            },
            {
                name: "l",
                value: 0.001,
                alias: ["litro", "litros", "lt", "lts", "lts.", "l", "L", "Litro", "Litros", "Lt", "Lts", "Lts.", "L"],
            },
            {
                name: "ml",
                value: 0.000001,
                alias: ["mililitro", "mililitros", "ml", "mls", "mls.", "Ml", "Mls", "Mls.", "Mililitro", "Mililitros"],
            },
        ],
    },
    {
        magnitud: "masa",
        si: "kg",
        equivalencias: [
            {
                name: "t",
                value: 1000,
                alias: ["tonelada", "toneladas", "ton", "tons", "tonelada métrica", "toneladas métricas", "ton métrica", "tons métricas", "t", "t."]
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
        magnitud: "tiempo",
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
        magnitud: "velocidad",
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
        magnitud: "energia electrica",
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
                alias: ["milivatios hora", "milivatios horas","mWh", "mWh.", "milivatios/hora", "milivatios/horas", "milivatios/h", "milivatios/h.", "megaWatt hora", "megaWatt horas", "mW/h", "mW/h."]
            },
            {
                name: "MWh",
                value: 1000,
                alias: ["megavatios hora", "megavatios horas", "MWh", "MWh.", "megavatios/hora", "megavatios/horas", "megavatios/h", "megavatios/h.", "megaWatt/hora", "megaWatt/horas", "megaWatt/h", "megaWatt/h."]
            },
            {
                name: "GWh",
                value: 1000000,
                alias: ["gigavatios hora", "gigavatios horas", "GWh", "GWh.", "gigavatios/hora", "gigavatios/horas", "gigavatios/h", "gigavatios/h.", "gigaWatt/hora", "gigaWatt/horas", "gigaWatt/h", "gigaWatt/h."]
            }
        ],
    },
    {
        magnitud: "transporte carga",
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
        magnitud: "transporte pasajeros",
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