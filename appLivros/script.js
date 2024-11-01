$(document).ready(function() {
    $('#search-button').click(function() {
        const query = $('#search-input').val().trim();
        if (query) {
            $.ajax({
                url: `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(query)}`,
                method: 'GET',
                success: function(response) {
                    $('#results').empty();
                    if (response.items && response.items.length > 0) {
                        response.items.forEach(item => {
                            const title = item.volumeInfo.title || 'Título não disponível';
                            const authors = item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Autor não disponível';
                            const thumbnail = item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/128x193?text=No+Image';

                            $('#results').append(`
                                <div class="book-item">
                                    <img src="${thumbnail}" alt="${title}">
                                    <h3>${title}</h3>
                                    <p><strong>Autores:</strong> ${authors}</p>
                                </div>
                            `);
                        });
                    } else {
                        $('#results').append('<p>Nenhum resultado encontrado.</p>');
                    }
                },
                error: function() {
                    $('#results').append('<p>Ocorreu um erro ao buscar os dados.</p>');
                }
            });
        } else {
            alert('Por favor, digite um título para pesquisar.');
        }
    });
});
