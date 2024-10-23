import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useProperties } from "../../../../context/PropertyContex";
import { Button, Card, Input, Label } from "../../../../components/ui";
import { Textarea } from "../../../../components/ui/Textarea";

dayjs.extend(utc);

const COLORS = {
  PRIMARY: "#4CAF50",
  NEGRO: "#000000",
  GRIS: "#808080",
  BLANCO: "#FFFFFF",
  AZUL_CLARO: "#87CEEB",
  AZUL_OSCURO: "#1E3A8A",
};

const styles = {
  formContainer: {
    minHeight: '100vh',
    background: `linear-gradient(135deg, ${COLORS.BLANCO}, ${COLORS.GRIS}, ${COLORS.AZUL_CLARO}, ${COLORS.AZUL_OSCURO}, ${COLORS.NEGRO})`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
  },
  formCard: {
    maxWidth: '800px',
    width: '100%',
    padding: '2rem',
    background: COLORS.BLANCO,
    borderRadius: '10px',
    boxShadow: `0 4px 6px ${COLORS.NEGRO}33`,
  },
  formTitle: {
    textAlign: 'center',
    color: COLORS.AZUL_OSCURO,
    marginBottom: '2rem',
    fontSize: '2rem',
  },
  progressBar: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '2rem',
    background: COLORS.GRIS,
    borderRadius: '5px',
    overflow: 'hidden',
  },
  progressStep: {
    flex: 1,
    textAlign: 'center',
    padding: '1rem',
    color: COLORS.BLANCO,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  activeStep: {
    background: COLORS.PRIMARY,
    color: COLORS.BLANCO,
  },
  completedStep: {
    background: COLORS.AZUL_CLARO,
    color: COLORS.AZUL_OSCURO,
  },
  stepNumber: {
    display: 'inline-block',
    width: '24px',
    height: '24px',
    lineHeight: '24px',
    borderRadius: '50%',
    background: COLORS.BLANCO,
    color: COLORS.AZUL_OSCURO,
    marginRight: '0.5rem',
  },
  formSection: {
    display: 'none',
  },
  activeSection: {
    display: 'block',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
  },
  fullWidth: {
    gridColumn: '1 / -1',
  },
  formInput: {
    width: '100%',
    padding: '0.5rem',
    border: `1px solid ${COLORS.GRIS}`,
    borderRadius: '4px',
    transition: 'border-color 0.3s ease',
  },
  errorMessage: {
    color: '#e74c3c',
    fontSize: '0.8rem',
    marginTop: '0.25rem',
  },
  submitButton: {
    backgroundColor: COLORS.PRIMARY,
    color: COLORS.BLANCO,
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginTop: '2rem',
    width: '100%',
  },
};

export const PropertyForm = () => {
    const { createProperty, getProperty, updateProperty } = useProperties();
    const navigate = useNavigate();
    const params = useParams();
    const [imageError, setImageError] = useState("");
    const [serverError, setServerError] = useState("");
    const [activeStep, setActiveStep] = useState(0);
    const [selectedImages, setSelectedImages] = useState([]);
    const { control, handleSubmit, formState: { errors }, setValue, reset, watch } = useForm({
      defaultValues: {
        title: "",
        description: "",
        pais: "",
        departamento: "",
        ciudad: "",
        zona: "",
        areaConstruida: "",
        areaTerreno: "",
        areaPrivada: "",
        alcobas: "",
        banos: "",
        garaje: "",
        estrato: "",
        piso: "",
        tipoInmueble: "",
        tipoNegocio: "",
        estado: "",
        valorAdministracion: "",
        anioConstruccion: "",
        caracteristicas_internas: [],
        caracteristicas_externas: [],
        images: [],
        costo: "",
      }
    });
  
    const onSubmit = async (data) => {
      try {
        setServerError("");
        const formData = new FormData();
        setImageError("");
  
        if (selectedImages.length > 15) {
          setImageError("No puedes subir más de 15 imágenes.");
          return;
        }
  
        Object.keys(data).forEach((key) => {
          if (key === "images") {
            selectedImages.forEach((image, index) => {
              formData.append(`images`, image);
            });
          } else if (key === "anioConstruccion" || key === "costo") {
            formData.append(key, parseInt(data[key], 15));
          } else if (key === "caracteristicas_internas" || key === "caracteristicas_externas") {
            // Asegúrate de que estos campos sean arrays, incluso si están vacíos
            const caracteristicasArray = Array.isArray(data[key]) ? data[key] : [];
            formData.append(key, caracteristicasArray);
          } else {
            formData.append(key, data[key]);
          }
        });
  
        // Log de los datos que se están enviando al backend
        console.log('Datos enviados al backend:', Object.fromEntries(formData));
  
        if (params.id) {
          await updateProperty(params.id, formData);
        } else {
          await createProperty(formData);
        }
        navigate("/properties");
      } catch (error) {
        console.error("Error al procesar el formulario:", error);
        setServerError(error.response?.data?.message || "Hubo un error al procesar la solicitud. Por favor, intenta de nuevo.");
      }
    };
  
    useEffect(() => {
      const loadProperty = async () => {
        if (params.id) {
          try {
            const property = await getProperty(params.id);
            Object.keys(property).forEach((key) => {
              if (key === "images") {
                // Aquí manejaríamos las imágenes existentes si es necesario
              } else if (key === "caracteristicas_internas" || key === "caracteristicas_externas") {
                setValue(key, property[key] || []);
              } else if (key === "anioConstruccion" || key === "costo") {
                setValue(key, property[key]?.toString());
              } else {
                setValue(key, property[key]);
              }
            });
          } catch (error) {
            console.error("Error al cargar la propiedad:", error);
            setServerError("No se pudo cargar la propiedad. Por favor, intenta de nuevo.");
          }
        }
      };
      loadProperty();
    }, [params.id, setValue, getProperty]);
  
    const handleImageChange = (e) => {
      const files = Array.from(e.target.files);
      setSelectedImages(prevImages => [...prevImages, ...files].slice(0, 15));
      setValue('images', files);
    };
  
    const formSections = [
      { title: "Información Básica", fields: ["title", "description", "pais", "departamento", "ciudad", "zona"] },
      { title: "Detalles de la Propiedad", fields: ["areaConstruida", "areaTerreno", "areaPrivada", "alcobas", "banos", "garaje", "estrato", "piso"] },
      { title: "Información Adicional", fields: ["tipoInmueble", "tipoNegocio", "estado", "valorAdministracion", "anioConstruccion", "costo", "images"] },
    ];
  

  return (
    <div className="flex flex-col min-h-screen bg-gray-700">
    <main className='flex-1 p-6'>
        <div style={styles.formContainer}>
        <Card style={styles.formCard}>
            <h2 style={styles.formTitle}>{params.id ? "Editar Propiedad" : "Nueva Propiedad"}</h2>
            {serverError && <p style={{...styles.errorMessage, marginBottom: '1rem'}}>{serverError}</p>}
            <div style={styles.progressBar}>
            {formSections.map((section, index) => (
                <div
                key={index}
                style={{
                    ...styles.progressStep,
                    ...(index === activeStep ? styles.activeStep : {}),
                    ...(index < activeStep ? styles.completedStep : {}),
                }}
                onClick={() => setActiveStep(index)}
                >
                <span style={styles.stepNumber}>{index + 1}</span>
                {section.title}
                </div>
            ))}
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
            {formSections.map((section, sectionIndex) => (
                <div key={sectionIndex} style={{
                ...styles.formSection,
                ...(activeStep === sectionIndex ? styles.activeSection : {}),
                }}>
                <div style={styles.formGrid}>
                    {section.fields.map((field) => {
                     if (field === "description") {
                        return (
                        <div key={field} style={styles.fullWidth}>
                            <Label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                            <Controller
                            name={field}
                            control={control}
                            rules={{ required: `${field} es requerido` }}
                            render={({ field }) => (
                                <Textarea
                                {...field}
                                id={field}
                                style={styles.formInput}
                                />
                            )}
                            />
                            {errors[field] && <p style={styles.errorMessage}>{errors[field].message}</p>}
                        </div>
                        );
                    } else if (field === "images") {
                        return (
                        <div key={field} style={styles.fullWidth}>
                            <Label htmlFor={field}>Imágenes</Label>
                            <Input
                            id={field}
                            type="file"
                            multiple
                            onChange={handleImageChange}
                            style={styles.formInput}
                            />
                            {imageError && <p style={styles.errorMessage}>{imageError}</p>}
                            <p style={{...styles.errorMessage, color: COLORS.GRIS}}>
                            {selectedImages.length} / 15 imágenes seleccionadas
                            </p>
                            <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px'}}>
                            {selectedImages.map((image, index) => (
                                <img 
                                key={index} 
                                src={URL.createObjectURL(image)} 
                                alt={`Selected ${index + 1}`} 
                                style={{width: '100px', height: '100px', objectFit: 'cover'}} 
                                />
                            ))}
                            </div>
                        </div>
                        );
                    } else {
                        return (
                        <div key={field}>
                            <Label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                            <Controller
                            name={field}
                            control={control}
                            rules={{ required: `${field} es requerido` }}
                            render={({ field }) => (
                                <Input
                                {...field}
                                id={field}
                                type={field === "costo" || field === "anioConstruccion" ? "number" : "text"}
                                style={styles.formInput}
                                />
                            )}
                            />
                            {errors[field] && <p style={styles.errorMessage}>{errors[field].message}</p>}
                        </div>
                        );
                    }
                    })}
                </div>
                {sectionIndex === formSections.length - 1 && (
                    <Button type="submit" onClick={handleSubmit(onSubmit)} style={styles.submitButton}>
                    {params.id ? "Actualizar Propiedad" : "Crear Propiedad"}
                    </Button>
                )}
                </div>
            ))}
            </form>
        </Card>
        </div>
    </main>
    </div>
  )
}
