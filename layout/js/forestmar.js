// Forestmar · comportamiento de la maqueta (sin base de datos)
document.addEventListener('DOMContentLoaded', () => {

  // P-01: botón «Mostrar» la contraseña (autenticación accesible, WCAG 3.3.8)
  document.querySelectorAll('[data-mostrar]').forEach(btn => {
    btn.addEventListener('click', () => {
      const campo = document.getElementById(btn.dataset.mostrar);
      const visible = campo.type === 'text';
      campo.type = visible ? 'password' : 'text';
      btn.textContent = visible ? 'Mostrar' : 'Ocultar';
      btn.setAttribute('aria-pressed', String(!visible));
    });
  });

  // P-01: «Ingresar» lleva al inicio del rol elegido (en la maqueta no se validan credenciales)
  const formLogin = document.getElementById('formLogin');
  if (formLogin) {
    formLogin.addEventListener('submit', e => {
      e.preventDefault();
      window.location.href = document.getElementById('rolDemo').value;
    });
  }

  // P-03: el precio solo acepta números (prevención de errores)
  const precio = document.getElementById('precio');
  if (precio) {
    precio.addEventListener('input', () => {
      const ok = /^\d+$/.test(precio.value.trim());
      precio.classList.toggle('is-invalid', !ok);
      precio.setAttribute('aria-invalid', String(!ok));
      document.getElementById('errorPrecio').classList.toggle('d-none', ok);
    });
  }
  const formPlanta = document.getElementById('formPlanta');
  if (formPlanta) {
    formPlanta.addEventListener('submit', e => {
      e.preventDefault();
      document.getElementById('okPlanta').classList.remove('d-none');
    });
  }

  // P-04: vista previa del cálculo antes de guardar
  const cantMov = document.getElementById('cantMov');
  if (cantMov) {
    const actual = Number(document.getElementById('existencia').dataset.valor);
    const vista = document.getElementById('vistaPrevia');
    const calcular = () => {
      const signo = Number(document.querySelector('input[name="mov"]:checked').value);
      const cant = Math.max(0, Number(cantMov.value) || 0);
      const nueva = actual + signo * cant;
      if (nueva < 0) {
        vista.className = 'aviso aviso-error mt-3';
        vista.textContent = 'La existencia no puede quedar negativa: hay ' + actual + ' unidades.';
      } else {
        vista.className = 'aviso aviso-info mt-3';
        vista.textContent = 'Nueva existencia: ' + actual + (signo > 0 ? ' + ' : ' − ') + cant + ' = ' + nueva + ' unidades';
      }
    };
    cantMov.addEventListener('input', calcular);
    document.querySelectorAll('input[name="mov"]').forEach(r => r.addEventListener('change', calcular));
  }

  // P-06: botones − / + que no permiten vender más de lo disponible
  const cantVenta = document.getElementById('cantVenta');
  if (cantVenta) {
    document.querySelectorAll('[data-cant]').forEach(btn => {
      btn.addEventListener('click', () => {
        const max = Number(cantVenta.max);
        const nuevo = Math.min(max, Math.max(1, Number(cantVenta.value) + Number(btn.dataset.cant)));
        cantVenta.value = nuevo;
      });
    });
  }

  // P-06b: el diálogo de confirmación se abre al llegar al paso 2
  const modalConfirmar = document.getElementById('modalConfirmar');
  if (modalConfirmar && modalConfirmar.dataset.abrir === 'si' && window.bootstrap) {
    bootstrap.Modal.getOrCreateInstance(modalConfirmar).show();
  }

  // P-07 y P-08: imprimir la factura
  document.querySelectorAll('[data-imprimir]').forEach(btn => btn.addEventListener('click', () => window.print()));

  // P-08: la consulta exige los dos datos y el formato del número de factura
  const formConsulta = document.getElementById('formConsulta');
  if (formConsulta) {
    formConsulta.addEventListener('submit', e => {
      e.preventDefault();
      const num = document.getElementById('numFactura');
      const ok = /^FM-\d{4}-\d{5}$/.test(num.value.trim()) && document.getElementById('docId').value.trim() !== '';
      document.getElementById('resultado').classList.toggle('d-none', !ok);
    });
  }
});
