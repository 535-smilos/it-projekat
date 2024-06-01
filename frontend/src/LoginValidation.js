function Validation(values){
    let error={}
    const username_pattern = /^[a-zA-Z][a-zA-Z0-9._]{2,15}$/;
    const password_pattern=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

    if(values.username===""){
        error.username="Username ne smije biti prazan";
    } else if(!username_pattern.test(values.username)){
        error.username="Username se ne poklapa";
    } else{
        error.username="";
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