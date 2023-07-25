let regexName = /^[a-zA-Z]+$/;

export default function valodator(data){
    const {name, dificulty, duration, season, ids}=data
    let errors={}
    if(name!==''){
        if(!regexName.test(name)) errors.nameError = 'El nombre de la actividad solo puede contener letras';
    } else{errors.nameError = 'Este campo debe ser diligenciado'};
    if(dificulty!==0){
        if(dificulty<=1 && dificulty>5) errors.dificultyError = 'El grado de dificultad debe ser entre 1 y 5';
    } else{errors.dificultyError = 'Este campo debe ser diligenciado'};
    if(duration!==0) {
        if(duration===0) {errors.durationError = 'Esta actividad debe durar mas de 0.0 horas';}
    } else {errors.durationError = 'Este campo debe ser diligenciado';}
    if(season==='') errors.seasonError = 'Debe elegir una opcion';
    if(ids===[]) errors.idsError = 'Debe seleccionar al menos un pais';

    return errors
}