function Validation(values){
    let error={}
    const email_pattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
    const username_pattern = /^[a-zA-Z][a-zA-Z0-9._]{2,15}$/;

    if(values.username===""){
        error.username="Username ne smije biti prazan";
    } else if(!username_pattern.test(values.username)){
        error.username="Username se ne poklapa";
    } else{
        error.username="";
    }

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

    if(values.image===""){
        error.image="Slika ne smije biti prazna";
    } else{
        error.image="";
    }

    return error;
} export default Validation;