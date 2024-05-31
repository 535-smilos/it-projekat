function Validation(values){
    let error={}
    const email_pattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

    if(values.email===""){
        error.email="Imejl ne smije biti prazan";
    } else if(!email_pattern.test(values.email)){
        error.email="Imejl se ne poklapa";
    } else{
        error.email="";
    }

    if(values.password===""){
        error.password="Sifra ne smije biti prazna";
    } else if(!password_pattern.test(values.password)){
        error.password="Sifra se ne poklapa";
    } else{
        error.password="";
    }
    return error;
} export default Validation;