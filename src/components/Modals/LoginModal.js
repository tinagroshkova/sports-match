import Swal from 'sweetalert2';

const LoginModal = async () => {
  try {
    const result = await Swal.fire({
      icon: "warning",
      title: "You have to log in first!",
      confirmButtonText: "Log in",
      showCancelButton: true,
      cancelButtonText: "Cancel",
    });

    return result.isConfirmed;
  } catch (error) {
    console.error('Error in LoginModal:', error);
    return false;
  }
};

export default LoginModal;