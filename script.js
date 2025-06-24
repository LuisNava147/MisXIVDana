document.addEventListener('DOMContentLoaded', function() {
    const sobreCerrado = document.querySelector('.sobre-cerrado');
    const sobreAbierto = document.querySelector('.sobre-abierto');
    const portada = document.getElementById('portada');
    const invitacion = document.getElementById('invitacion');
    
    // Efecto al hacer clic en el sobre
    sobreCerrado.addEventListener('click', abrirSobre);
    sobreAbierto.addEventListener('click', abrirSobre);
    
    function abrirSobre() {
        // Deshabilitar más clics durante la animación
        sobreCerrado.style.pointerEvents = 'none';
        sobreAbierto.style.pointerEvents = 'none';
        
        // Animación de apertura del sobre
        sobreCerrado.style.opacity = '0';
        sobreCerrado.style.transform = 'scale(0.8) rotate(-5deg)';
        
        sobreAbierto.style.opacity = '1';
        sobreAbierto.style.transform = 'scale(1) rotate(0deg)';
        
        // Destello de transición
        const flash = document.createElement('div');
        flash.className = 'flash';
        document.body.appendChild(flash);
        
        // Animación del destello
        setTimeout(() => {
            flash.style.opacity = '0.9';
            
            setTimeout(() => {
                flash.style.opacity = '0';
                
                // Eliminar el destello después de la animación
                setTimeout(() => {
                    flash.remove();
                }, 500);
            }, 300);
        }, 50);
        
        // Ocultar portada y mostrar invitación
        setTimeout(() => {
            portada.style.opacity = '0';
            
            setTimeout(() => {
                portada.style.display = 'none';
                invitacion.style.display = 'block';
                
                // Fade in de la invitación
                let opacity = 0;
                const fadeIn = setInterval(() => {
                    opacity += 0.05;
                    invitacion.style.opacity = opacity;
                    if (opacity >= 1) clearInterval(fadeIn);
                }, 30);
            }, 500);
        }, 700);
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const imagenMusica = document.getElementById('imagenMusica');
    const audioPlayer = document.getElementById('audioPlayer');
    
    // Precargar la segunda imagen
    const segundaImagen = new Image();
    segundaImagen.src = "audio2.png";
    
    let isFirstImage = true;

    if (imagenMusica) {
        imagenMusica.addEventListener('click', function() {
            // Cambiar la imagen
            if (isFirstImage) {
                imagenMusica.src = "audio2.png";
                audioPlayer.play();
            } else {
                imagenMusica.src = "audio1.png";
                audioPlayer.pause();
                audioPlayer.currentTime = 0;
            }
            isFirstImage = !isFirstImage;
        });
    }
});
// Función para actualizar el contador
function actualizarContadorElegante() {
    const fechaEvento = new Date('July 13, 2025 00:00:00').getTime();
    const ahora = new Date().getTime();
    const diferencia = fechaEvento - ahora;
    
    // Cálculos de tiempo
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);
    
    // Actualizar el DOM con los nuevos IDs
    document.getElementById('dias-elegante').textContent = dias.toString().padStart(2, '0');
    document.getElementById('horas-elegante').textContent = horas.toString().padStart(2, '0');
    document.getElementById('minutos-elegante').textContent = minutos.toString().padStart(2, '0');
    document.getElementById('segundos-elegante').textContent = segundos.toString().padStart(2, '0');
}

// Iniciar el contador
actualizarContadorElegante();
setInterval(actualizarContadorElegante, 1000);

// Asegurarse de que el contador se inicie al cargar la página
document.addEventListener('DOMContentLoaded', actualizarContadorElegante);

document.addEventListener('DOMContentLoaded', function() {
    const fotosPorPagina = 6;
    const todasFotos = document.querySelectorAll('.marco-foto');
    const botonesPaginas = document.querySelectorAll('.boton-galeria');
    
    // Ocultar todas las fotos inicialmente
    todasFotos.forEach(foto => foto.style.display = 'none');
    
    // Mostrar primera página
    mostrarPagina(0);
    
    // Configurar botones
    botonesPaginas.forEach((boton, index) => {
        boton.addEventListener('click', function() {
            mostrarPagina(index);
        });
    });
    
    function mostrarPagina(numPagina) {
        // Ocultar todas
        todasFotos.forEach(foto => foto.style.display = 'none');
        
        // Calcular rango
        const inicio = numPagina * fotosPorPagina;
        const fin = inicio + fotosPorPagina;
        
        // Mostrar fotos de esta página
        for(let i = inicio; i < fin && i < todasFotos.length; i++) {
            todasFotos[i].style.display = 'block';
        }
        
        // Actualizar botón activo
        botonesPaginas.forEach(btn => btn.classList.remove('activo'));
        botonesPaginas[numPagina].classList.add('activo');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Configurar el Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animación para secciones normales
                if (entry.target.classList.contains('section-animate')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
                
                // Animación especial para tarjetas victorianas
                if (entry.target.querySelector('.tarjeta-victoriana')) {
                    const tarjeta = entry.target.querySelector('.tarjeta-victoriana');
                    tarjeta.style.opacity = '1';
                    tarjeta.style.transform = 'scale(1)';
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar todas las secciones
    const sections = document.querySelectorAll(`
        .seccion-agradecimiento,
        .seccion-contador-fullscreen,
        .seccion-ubicacion-estilizada,
        .seccion-vestimenta,
        .seccion-confirmacion,
        .seccion-galeria
    `);

    sections.forEach(section => {
        // Agregar clase inicial
        section.classList.add('section-animate');
        
        // Configurar estilos iniciales
        section.style.opacity = '0';
        
        // Observar la sección
        observer.observe(section);
    });

    // Configurar animaciones para elementos internos
    const elementosParaAnimar = document.querySelectorAll(`
    .titulo-seccion-estilizado,
    .texto-confirmacion,
    .grid-galeria,
    .boton-whatsapp
`);

    elementosParaAnimar.forEach(elemento => {
        elemento.style.opacity = '0';
        elemento.style.transform = 'translateY(20px)';
        elemento.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        const elementoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    elementoObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        elementoObserver.observe(elemento);
    });
});
// Galería de imágenes con lightbox mejorado
document.addEventListener('DOMContentLoaded', function() {
    // Crear elementos del lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    
    const lightboxImg = document.createElement('img');
    lightboxImg.className = 'lightbox-img';
    
    const closeBtn = document.createElement('span');
    closeBtn.className = 'close-lightbox';
    closeBtn.innerHTML = '&times;';
    
    lightbox.appendChild(lightboxImg);
    lightbox.appendChild(closeBtn);
    document.body.appendChild(lightbox);
    
    // Configurar eventos para todas las imágenes de la galería
    const galleryImages = document.querySelectorAll('.foto-galeria');
    
    galleryImages.forEach(image => {
        image.addEventListener('click', function() {
            // Si el lightbox ya está activo, cerrarlo
            if (lightbox.classList.contains('active')) {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto'; // Habilitar scroll
            } 
            // Si no está activo, abrirlo con esta imagen
            else {
                lightboxImg.src = this.src;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden'; // Deshabilitar scroll
            }
        });
    });
    
    // Cerrar al hacer clic en el botón
    closeBtn.addEventListener('click', function() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Cerrar al hacer clic fuera de la imagen
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Cerrar con tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

