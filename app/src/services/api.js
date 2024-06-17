class Servicios {
    fetchData(callback) {
        //const apiurl = 'https://frontenduch.free.beeceptor.com/login';
        const apiurl = 'app/json/chanchas.json';        
        // Aquí iría la llamada a la API para la autenticación
        // Supondré una llamada AJAX simulada
        fetch(apiurl)
            .then(response => response.json())
            .then(data => {
                callback(null, data);
            })
            .catch(error => {
                console.error('Error fetching filtered data:', error);
            });        
    }
}

// Exportar la clase para poder importarla en otro archivo
export default Servicios;