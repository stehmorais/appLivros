$(document).ready(function() { 
    // Função para verificar se a estante está vazia e exibir ou ocultar a mensagem
    function checkEmptyShelf() {
        if ($('#bookShelf').children().length === 0) {
            $('#emptyShelfMessage').show();
        } else {
            $('#emptyShelfMessage').hide();
        }
    }

    // Função para carregar os livros da API
    function loadBooks() {
        $.ajax({
            url: 'http://15.229.243.132:8080/books',  // Ajuste para o endpoint correto da sua API
            method: 'GET',
            success: function(response) {
                // Limpa a estante e exibe os livros retornados
                $('#bookShelf').empty();
                response.forEach(function(book) {
                    $('#bookShelf').append(`
                        <div class="book-card text-center" data-id="${book.id}">
                           <img src="data:image/png;base64,${book.cover}" alt="Capa do Livro" class="book-cover img-fluid rounded">
                            <p><strong class="book-title">${book.title}</strong> por <span class="book-author">${book.author}</span></p>
                            <p class="icon-book"><a href="#" class="text-primary edit-book-btn">✏️ Editar Livro</a></p>
                            <p class="icon-book"><a href="#" class="text-danger delete-book-btn">❌ Remover</a></p>
                        </div>
                    `);
                });
                checkEmptyShelf();  // Verifica se a estante está vazia
            },
            error: function(error) {
                console.error('Erro ao carregar livros:', error);
            }
        });
    }

    // Inicialização: Carrega os livros ao carregar a página
    loadBooks();

    // Evento de adicionar livro
    $('#addBookForm').submit(function(event) {
        event.preventDefault();
        
        // Obtém os valores dos campos do formulário
        let title = $('#bookTitle').val();
        let author = $('#bookAuthor').val();
        let cover = $('#bookCover')[0].files[0]; // Caso tenha imagem

        let formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        if (cover) formData.append('cover', cover);

        // Envia a requisição para criar o livro
        $.ajax({
            url: 'http://15.229.243.132:8080/books',  // Ajuste para o endpoint correto
            method: 'POST',
            data: formData,
            processData: false,  // Necessário para enviar o arquivo corretamente
            contentType: false,
            success: function(response) {
                // Fecha o modal e limpa o formulário
                $('#addBookModal').modal('hide');
                $('#addBookForm')[0].reset();
                
                // Recarrega a lista de livros
                loadBooks();
            },
            error: function(error) {
                console.error('Erro ao adicionar livro:', error);
            }
        });
    });

    // Função de editar livro
    $('#bookShelf').on('click', '.edit-book-btn', function(event) {
        event.preventDefault();
        
        let bookCard = $(this).closest('.book-card');
        let bookId = bookCard.data('id');
        let title = bookCard.find('.book-title').text();
        let author = bookCard.find('.book-author').text();
        
        $('#editBookTitle').val(title);
        $('#editBookAuthor').val(author);
        $('#editBookModal').data('bookId', bookId);
        
        $('#editBookModal').modal('show');
    });

    // Evento para salvar as alterações do livro
    $('#editBookForm').submit(function(event) {
        event.preventDefault();

        let bookId = $('#editBookModal').data('bookId');
        let title = $('#editBookTitle').val();
        let author = $('#editBookAuthor').val();

        $.ajax({
            url: `http://15.229.243.132:8080/books/${bookId}`,  // Ajuste para o endpoint correto
            method: 'PUT',
            data: { title: title, author: author },
            success: function(response) {
                $('#editBookModal').modal('hide');
                loadBooks();  // Recarrega a lista de livros
            },
            error: function(error) {
                console.error('Erro ao editar livro:', error);
            }
        });
    });

    // Função de exclusão de livro
    let bookToDelete;
    $('#bookShelf').on('click', '.delete-book-btn', function(event) {
        event.preventDefault();
        
        bookToDelete = $(this).closest('.book-card');
        
        let cover = bookToDelete.find('.book-cover').attr('src');
        $('#deleteBookCoverPreview').attr('src', cover);
        
        $('#deleteBookModal').modal('show');
    });

    // Confirmar exclusão do livro
    $('#confirmDeleteBook').click(function() {
        if (bookToDelete) {
            let bookId = bookToDelete.data('id');
            $.ajax({
                url: `http://15.229.243.132:8080/books/${bookId}`,  // Ajuste para o endpoint correto
                method: 'DELETE',
                success: function(response) {
                    bookToDelete.remove();
                    $('#deleteBookModal').modal('hide');
                    checkEmptyShelf();  // Verifica se a estante está vazia
                },
                error: function(error) {
                    console.error('Erro ao excluir livro:', error);
                }
            });
        }
    });
});
