$(document).ready(function () {
    comentarios = [];
});

function addComentario() {
    let nome =$('#inputNome').val();
    let texto =$('#inputComentario').val();

    if ((nome === null) | (nome === "") | (nome === " ") | 
        (texto === null) | (texto === "") | (texto === " ")) {
        alert("Informe seu nome e o comentário.");
        return;
    }

    /* obtém array do storage */
    var memoria =JSON.parse(localStorage.getItem('comentarios'));
    if (memoria != null)
        comentarios =memoria;

    /* objeto comentario */
    var comentario = {
        'sequencia': proximaSequencia(),
        'nome': nome,
        'texto': texto
    };

    /* insere comentario no array */
    comentarios.push(comentario);
    
    /* armazena array no storage */
    localStorage.setItem('comentarios', JSON.stringify(comentarios));

    /* exibe comentários em tela */
    showComentarios();
};

function showComentarios() {
    let htmlcomentario = ' ';

    /* cabeçalho da tabela */
    htmlcomentario = '<thead>'
                +     '<tr>'
                +        '<th scope="col">Nome</th>'
                +        '<th scope="col">Comentário</th>'
                +        '<th scope="col">Remover</th>'
                +     '</tr>'
                + '</thead>'
                + '<tbody>';
    
    
    /* conteúdo da tabela */
    var memoria =JSON.parse(localStorage.getItem('comentarios'));
    if(memoria != null) {
        comentarios =memoria;

        /* exibe comentários */
        comentarios.forEach(function(comentario){
            /* corpo da tabela */
            htmlcomentario += '<tr>'
                        + '<td>' + comentario.nome + '</td>'
                        + '<td>' + comentario.texto + '</td>'
                        + '<td>' + '<button type="submit" class="btn btn-sm btn-block btn-danger" onclick="removerComentario(' + comentario.sequencia + ')">Remover</button>' + '</td>'
                        + '</tr>';
    
        });
    }

    /* fechamento da tabela */
    htmlcomentario += '</tbody>';

    $('#comentarios').html(htmlcomentario);
};

function limparComentarios() {
    comentarios = [];
    localStorage.clear();
    showComentarios();
};

function proximaSequencia() {
    memoria =localStorage.getItem('ultimasequencia');

    if (memoria != null) {
        sequencia =parseInt(memoria)+1;
    } else{
        sequencia =1;
    }

    localStorage.setItem('ultimasequencia',sequencia);

    return sequencia;
};

function removerComentario(remseq) {
    var item;

    /* obtém array do storage */
    var memoria =JSON.parse(localStorage.getItem('comentarios'));

    if (memoria != null)
        comentarios =memoria;
 
    /* obtém objeto do array que corresponde à linha onde o botão foi clicado */
    comentarios.forEach(function(e) {
        if (e.sequencia === remseq) {
          item =e;
          return;
        }	
    });

    /* obtém índice do objeto do array que corresponde à linha onde o botão foi clicado */
    var indice =comentarios.indexOf(item);

    /* remove objeto do array */
    comentarios.splice(indice,1);

    /* armazena novo array no storage */
    localStorage.setItem('comentarios', JSON.stringify(comentarios));

    /* exibe comentários em tela */
    showComentarios();
}
