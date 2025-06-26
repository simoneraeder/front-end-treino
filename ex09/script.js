const listaUsuarios = document.getElementById('lista-usuarios')
const form = document.getElementById('form-usuario')

async function carregarUsuarios(){
    try{
        const resposta = await fetch('https://jsonplaceholder.typicode.com/users')
   const usuarios = await resposta.json();
    usuarios.forEach(usuario => {
        adicionarUsuarioNaTela(usuario.name,usuario.email);
    });
} catch (erro){
    console.error('Erro ao carregar usuários', erro)
}
} 

function adicionarUsuarioNaTela(nome,email){
    const li = document.createElement('li');
    li.textContent = `${nome} - ${email}`;
    listaUsuarios.appendChild(li);
}

form.addEventListener('submit', async (evento) => {
    evento.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;

    const novoUsuario = {
        nome: nome,
        email: email,
    }
    try{
        const resposta = await fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(novoUsuario)
        });
const usuarioCriado = await resposta.json();
adicionarUsuarioNaTela(usuarioCriado.nome,
    usuarioCriado.email);
form.reset();
} catch (erro){
    console.error('Erro ao adicionar usuário', erro)
}

})

carregarUsuarios();