$(document).ready(function() {
    // Função para verificar se a estante está vazia e exibir ou ocultar a mensagem
    function checkEmptyShelf() {
        if ($('#bookShelf').children().length === 0) {
            $('#emptyShelfMessage').show();
        } else {
            $('#emptyShelfMessage').hide();
        }
    }

    // Inicialização: verifica a estante no carregamento da página
    checkEmptyShelf();

    // Evento de adicionar livro
    $('#addBookForm').submit(function(event) {
        event.preventDefault();
        
        // Obtém os valores dos campos do formulário
        let title = $('#bookTitle').val();
        let author = $('#bookAuthor').val();
        
        // Adiciona um cartão de livro à estante com as classes .book-title e .book-author
        $('#bookShelf').append(`
            <div class="book-card text-center">
                <img src="https://via.placeholder.com/150x200" alt="Capa do Livro" class="book-cover img-fluid rounded">
                <p><strong class="book-title">${title}</strong> por <span class="book-author">${author}</span></p>
                <p class="icon-book"><a href="#" class="text-primary edit-book-btn">✏️ Editar Livro</a></p>
                <p class="icon-book"><a href="#" class="text-danger delete-book-btn">❌ Remover</a></p>
            </div>
        `);
        
        // Fecha o modal e limpa o formulário
        $('#addBookModal').modal('hide');
        $('#addBookForm')[0].reset();
        
        // Verifica a estante após a adição
        checkEmptyShelf();
    });

    // Função para abrir o modal de edição com os dados preenchidos
    $('#bookShelf').on('click', '.edit-book-btn', function(event) {
        event.preventDefault();
        
        // Obtém o título e o autor do livro
        let bookCard = $(this).closest('.book-card');
        let title = bookCard.find('.book-title').text();
        let author = bookCard.find('.book-author').text();
        
        // Preenche o modal de edição com os dados atuais
        $('#editBookTitle').val(title);
        $('#editBookAuthor').val(author);
        
        // Armazena o cartão do livro para uso posterior
        $('#editBookModal').data('bookCard', bookCard);
        
        // Abre o modal de edição
        $('#editBookModal').modal('show');
    });

    // Função para salvar as alterações do livro editado
    $('#editBookForm').submit(function(event) {
        event.preventDefault();
        
        // Obtém o título e autor atualizados
        let title = $('#editBookTitle').val();
        let author = $('#editBookAuthor').val();
        
        // Atualiza os dados do livro no cartão
        let bookCard = $('#editBookModal').data('bookCard');
        bookCard.find('.book-title').text(title);
        bookCard.find('.book-author').text(author);
        
        // Fecha o modal de edição
        $('#editBookModal').modal('hide');
        
        // Opcional: limpa o formulário de edição
        $('#editBookForm')[0].reset();
    });

    let bookToDelete; // Variável para armazenar o livro que será excluído
    
    // Função para abrir o modal de exclusão ao clicar no ícone de remoção
    $('#bookShelf').on('click', '.delete-book-btn', function(event) {
        event.preventDefault();
        
        // Obtém o cartão do livro que será excluído
        bookToDelete = $(this).closest('.book-card');
        
        // Define a capa do livro no modal de exclusão
        let cover = bookToDelete.find('.book-cover').attr('src');
        $('#deleteBookCoverPreview').attr('src', cover);
        
        // Abre o modal de exclusão
        $('#deleteBookModal').modal('show');
    });

    // Função para confirmar a exclusão do livro
    $('#confirmDeleteBook').click(function() {
        if (bookToDelete) {
            bookToDelete.remove(); // Remove o cartão do livro da estante
            $('#deleteBookModal').modal('hide'); // Fecha o modal de exclusão
            checkEmptyShelf(); // Verifica a estante após a exclusão
        }
    });

    document.addEventListener('DOMContentLoaded', () => {
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        const registerLink = document.getElementById('registerLink');
        const loginLink = document.getElementById('loginLink');
    
        registerLink.addEventListener('click', (e) => {
            e.preventDefault();
            loginForm.classList.add('hidden');
            registerForm.classList.remove('hidden');
        });
    
        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            registerForm.classList.add('hidden');
            loginForm.classList.remove('hidden');
        });
    
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            alert(`Login com usuário: ${username}`);
            
        });
    
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newUsername = document.getElementById('newUsername').value;
            const newPassword = document.getElementById('newPassword').value;
            alert(`Usuário ${newUsername} cadastrado!`);
            // salvar no banco de dados
        });
    });
    
});
