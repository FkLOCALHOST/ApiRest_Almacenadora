<<<<<<< HEAD
export const handleErrors = (err, req, res, next) =>{
    if(err.status == 400 || err.errors){
=======

export const handleErrors = (err, req, res, next) => {
    if (err.status === 400 || err.errors) {

export const manejoErrores = (err, req, res, next) => {
    if (err.status === 400 || err.errors){

>>>>>>> 5aec4749495490ef8731d3c1aa5e77ad59f9ca64
        return res.status(400).json({
            success: false,
            errors: err.errors
        });
    }
    return res.status(500).json({
        success: false,
        message: err.message
    });
<<<<<<< HEAD
}
=======

}

}
>>>>>>> 5aec4749495490ef8731d3c1aa5e77ad59f9ca64
