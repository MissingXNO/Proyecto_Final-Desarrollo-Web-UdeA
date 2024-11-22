document.addEventListener('DOMContentLoaded', async () => {
    const container = document.querySelector('.grid');
    try {
        const response = await fetch('http://localhost:3000/api/vehicles');
        const vehicles = await response.json();

        container.innerHTML = vehicles.map(vehicle => `
            <a href="vehicle.html?id=${vehicle.id}" class="bg-gray-800 rounded-lg p-4 text-center">
                <img src="../assets/images/placeholder_car.png" alt="${vehicle.name}" class="h-32 w-full object-cover rounded">
                <p class="mt-2 text-gray-300 font-semibold">${vehicle.name}</p>
            </a>
        `).join('');
    } catch (error) {
        console.error('Error al cargar vehículos:', error);
    }
});


document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const vehicleId = params.get('id');

    if (vehicleId) {
        try {
            const response = await fetch(`http://localhost:3000/api/vehicles/${vehicleId}`);
            const vehicle = await response.json();

            document.querySelector('.vehicle-title').textContent = vehicle.name;
            document.querySelector('.vehicle-description').textContent = vehicle.description;
            // Completa con los datos del vehículo
        } catch (error) {
            console.error('Error al cargar detalles del vehículo:', error);
        }
    }
});


