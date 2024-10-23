import mongoose from "mongoose";

// Cloudinary image schema
const cloudinaryImageSchema = new mongoose.Schema({
  public_id: { type: String, required: true },
  secure_url: { type: String, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  format: { type: String, required: true },
  resource_type: { type: String, required: true, enum: ['image', 'video', 'raw', 'auto'] },
});

// Características internas y externas
export const caracteristicasInternas = [
  "Admite mascotas",
  "Armarios Empotrados",
  "Baño en habitación principal",
  "Citófono / Intercomunicador",
  "Depósito",
  "Gas domiciliario",
  "Suelo de cerámica / mármol",
  "Zona de lavandería",
  "Aire acondicionado",
  "Balcón",
  "Biblioteca/Estudio",
  "Clósets",
  "Despensa",
  "Hall de alcobas",
  "Trifamiliar",
  "Alarma",
  "Baño auxiliar",
  "Calentador",
  "Cocina integral",
  "Doble Ventana",
  "Reformado",
  "Unifamiliar"
];

export const caracteristicasExternas = [
  "Acceso pavimentado",
  "Barbacoa / Parrilla / Quincho",
  "Cancha de futbol",
  "Circuito cerrado de TV",
  "Cochera / Garaje",
  "Gimnasio",
  "Oficina de negocios",
  "Patio",
  "Portería / Recepción",
  "Sistema de riego",
  "Trans. público cercano",
  "Vivienda unifamiliar",
  "Zona infantil",
  "Zonas verdes",
  "Árboles frutales",
  "Bosque nativos",
  "Centros comerciales",
  "Club House",
  "Colegios / Universidades",
  "Jardín",
  "Parqueadero visitantes",
  "Piscina",
  "Pozo de agua natural",
  "Sobre vía principal",
  "Urbanización Cerrada",
  "Zona campestre",
  "Zona residencial",
  "Área Social",
  "Cancha de baloncesto",
  "Cerca zona urbana",
  "Club Social",
  "Garaje",
  "Kiosko",
  "Parques cercanos",
  "Playas",
  "Salón Comunal",
  "Terraza",
  "Vigilancia",
  "Zona comercial",
  "Zonas deportivas"
];

const propertySchema = new mongoose.Schema({
  title:{ type: String, required: true  },
  pais: { type: String, required: true },
  departamento: { type: String, required: true },
  ciudad: { type: String, required: true },
  zona: { type: String, required: true },
  areaConstruida: { type: Number, required: true },
  areaTerreno: { type: Number, required: true },
  areaPrivada: { type: Number, required: true },
  alcobas: { type: Number, required: true },
  costo: { type: Number, required: true },
  banos: { type: Number, required: true },
  garaje: { type: Number, required: true },
  estrato: { type: Number, required: true },
  piso: { type: Number, required: true },
  tipoInmueble: { type: String, required: true },
  tipoNegocio: { type: String, required: true },
  estado: { type: String, required: true },
  valorAdministracion: { type: Number, required: true },
  anioConstruccion: { type: Number, required: true },
  caracteristicas_internas: [{ type: String, enum: caracteristicasInternas }],
  caracteristicas_externas: [{ type: String, enum: caracteristicasExternas }],
  description:{ type: String, required: true},
  images: { type: [cloudinaryImageSchema], default: [] },
  imageLimit: { type: Number, default: 15 }
}, {
  timestamps: true,
});

// Export the model
export default mongoose.model("Property", propertySchema);