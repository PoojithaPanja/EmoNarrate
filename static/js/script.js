

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search");
    const imageGallery = document.getElementById("imageGallery");
    const genreDropdown = document.getElementById("genreDropdown");

    const imageData = [
        { name: "Girl Meets Boy", url: "static/covers/Girl meets boy.jpg", genres: ["Short Stories", "Fiction"], pdf_location: "pdf/Girl meets boy.pdf" },
        { name: "The Adventures of Tom Sawyer", url: "static/covers/The Adventures of Tom Sawyer.jpg", genres: ["Fiction", "Novel", "Adventure", "Literature"], pdf_location: "pdf/The adventures of tom sawyer.pdf" },
        { name: "The Gift of the Magi And Other Stories", url: "static/covers/The Gift of the Magi And Other Stories.jpg", genres: ["Fiction", "Short Stories", "Literature"], pdf_location: "pdf/The Gift of the Magi And Other Stories.pdf" },
        { name: "The Little Prince", url: "static/covers/The Little Prince.jpg", genres: ["Fantasy", "Fiction", "Literature"], pdf_location: "pdf/The Little Prince.pdf" },
        { name: "The Wizard of Oz", url: "static/covers/The Wizard of Oz.jpg", genres: ["Fantasy", "Adventure", "Fiction", "Literature"], pdf_location: "pdf/The Wizard of Oz.pdf" },
        { name: "Harry Potter and the Sorcerers Stone", url: "static/covers/Harry Potter and the Sorcerers Stone.jpg", genres: ["Fantasy", "Adventure"], pdf_location: "pdf/Harry Potter and the Sorcerers Stone.pdf" },
        { name: "Harry Potter and the Chamber of Secrets", url: "static/covers/Harry Potter and the Chamber of Secrets.jpg", genres: ["Fantasy", "Adventure"], pdf_location: "pdf/Harry Potter and the Chamber of Secrets.pdf" },

            ];
    renderImages(imageData);



    // Event listener for search input
    searchInput.addEventListener("input", function () {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredImages = imageData.filter(image => image.name.toLowerCase().includes(searchTerm));
        renderImages(filteredImages);
    });

    // Event listener for genre dropdown
    genreDropdown.addEventListener("click", function (event) {
        const selectedGenre = event.target.dataset.genre;
        
        if (selectedGenre) {
            const filteredImages = imageData.filter(image => image.genres.includes(selectedGenre));
            renderImages(filteredImages);

        }
    });

    // Function to render images on the webpage
    function renderImages(images) {
        imageGallery.innerHTML = "";

        images.forEach(image => {
            const imageTile = document.createElement("div");
            imageTile.classList.add("image-tile");

            const imgElement = document.createElement("img");
            imgElement.src = image.url;
            imgElement.alt = image.name;

            const nameElement = document.createElement("p");
            nameElement.textContent = image.name;

            imageTile.appendChild(imgElement);
            imageTile.appendChild(nameElement);
            
            // Add click event to each image tile
            imageTile.addEventListener("click", function () {
                // Navigate to a new page with book details
                window.location.href = `/bookDetails?name=${encodeURIComponent(image.name)}&url=${encodeURIComponent(image.url)}&pdf_location=${encodeURIComponent(image.pdf_location)}`;
            });

            imageGallery.appendChild(imageTile);
        });
    }
});
