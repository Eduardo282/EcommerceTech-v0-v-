import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  background: '#111115',
  color: '#E4D9AF',
  iconColor: '#F9B61D',
  customClass: {
    popup: 'evo-toast',
    title: 'evo-toast-title',
    htmlContainer: 'evo-toast-description',
    timerProgressBar: 'evo-toast-progress',
  },
});

function notify(icon, title, options = {}) {
  return Toast.fire({
    icon,
    title,
    text: options.description,
  });
}

function toast(title, options) {
  return notify('info', title, options);
}

toast.success = (title, options) => notify('success', title, options);
toast.error = (title, options) => notify('error', title, options);
toast.info = (title, options) => notify('info', title, options);
toast.warning = (title, options) => notify('warning', title, options);

// WHY: Vite aliases `sonner` to this module, so consumers still import a Toaster.
// SweetAlert renders imperatively; this stub keeps the existing API contract intact.
function Toaster() {
  return null;
}

export { Toaster, toast };
