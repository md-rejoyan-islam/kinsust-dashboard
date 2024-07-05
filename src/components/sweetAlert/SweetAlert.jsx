import Swal from "sweetalert2";


const SweetAlert = (msg,icon) => {
    return (
        Swal.fire({
            icon,
        
            text: msg,
            
          })
    );
};

export default SweetAlert;