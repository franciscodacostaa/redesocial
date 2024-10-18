// Função para mostrar a página correspondente e esconder as outras
function showPage(pageId) {
    // Esconder todas as páginas
    const pages = document.querySelectorAll('.page');
    pages.forEach((page) => {
        page.style.display = 'none';
    });
    // Mostrar a página correspondente
    document.getElementById(pageId).style.display = 'block';
}

// Para iniciar com a página inicial visível
showPage('home');

// Seleciona os elementos necessários
const editProfileButton = document.getElementById('editProfile');
const saveChangesButton = document.getElementById('saveChanges');
const profileDetails = document.getElementById('profileDetails');
const inputs = profileDetails.querySelectorAll('input, textarea');
const profileMessage = document.getElementById('profileMessage');
const profileNameDisplay = document.getElementById('profileNameDisplay');
const profileBiographyDisplay = document.getElementById('profileBiographyDisplay');
const updatedProfileImage = document.getElementById('updatedProfileImage');
const profilePhotoInput = document.getElementById('profilePhoto');

// Função para carregar os dados do perfil do localStorage
function loadProfile() {
    const userName = localStorage.getItem('userName');
    const biography = localStorage.getItem('biography');
    const profileImageUrl = localStorage.getItem('profileImageUrl');

    if (userName) {
        profileNameDisplay.textContent = userName;
        document.getElementById('userName').value = userName;
    }

    if (biography) {
        profileBiographyDisplay.textContent = biography;
        document.getElementById('biography').value = biography;
    }

    if (profileImageUrl) {
        updatedProfileImage.src = profileImageUrl;
        updatedProfileImage.style.display = 'block';
    }
}

// Carrega o perfil ao iniciar a página
loadProfile();

// Inicia desabilitando o botão de salvar
saveChangesButton.style.display = 'none';

// Habilita a edição dos campos
editProfileButton.addEventListener('click', () => {
    // Habilita os campos de perfil
    inputs.forEach(input => input.disabled = false);
    
    // Mostra o botão de salvar alterações
    saveChangesButton.style.display = 'inline-block';
});

// Função para salvar as alterações
saveChangesButton.addEventListener('click', () => {
    // Habilita os campos de entrada para o usuário
    inputs.forEach(input => input.disabled = true);
    
    // Esconde o botão de salvar alterações
    saveChangesButton.style.display = 'none';
    
    // Atualiza a exibição do nome
    const userName = document.getElementById('userName').value;
    profileNameDisplay.textContent = userName;
    localStorage.setItem('userName', userName); // Armazena no localStorage
    
    // Atualiza a exibição da biografia
    const biography = document.getElementById('biography').value;
    profileBiographyDisplay.textContent = biography;
    localStorage.setItem('biography', biography); // Armazena no localStorage
    
    // Atualiza a imagem de perfil se uma imagem for selecionada
    const file = profilePhotoInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            updatedProfileImage.src = e.target.result;
            updatedProfileImage.style.display = 'block';
            localStorage.setItem('profileImageUrl', e.target.result); // Armazena no localStorage
        }
        reader.readAsDataURL(file);
    }

    // Mensagem de sucesso
    profileMessage.textContent = 'Alterações salvas com sucesso!';
});

