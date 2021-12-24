import $ from 'jquery'
import { onLoadHtmlSuccess } from '../core/includes';

//duracao da animacao
const duration = 600;

//funcao para mudar qual o botao esta ativo
function changeActiveButtons(city) {

    //percorre todos os botoes
    $('button').each(function (i, e){

        //remove a classe active de todos
        $(e).removeClass('active');

        //se for o botao clicado adiciona a classe active
        if(e.innerHTML === city || (!city && e.innerHTML === "Todas")){
            $(e).addClass('active');
        }

    });
}

function filterByCity(city) {
    //passa por todos elementos com atributo wm-city
    $('[wm-city]').each(function(i, e) {

        //define true se for a cidade procurada ou se nao tiver busca
        const isTarget = $(this).attr('wm-city') === city || city === null;

        //mostra ou esconde a imagem
        if(isTarget) {
            $(this).parent().removeClass('d-none');
            $(this).fadeIn(duration);
        } else {
            $(this).fadeOut(duration, () => {
                $(this).parent().addClass('d-none');
            });
        }

    });
}

$.fn.cityButtons = function() {

    //cria um set para nao ter repeticao de cidade
    const cities = new Set;

    //passa por todos as images adicionado no set os lugares
    $('[wm-city]').each(function(i, e) {
        cities.add($(e).attr('wm-city'));
    });

    //cria um array de botoes com as cidades obtidas e mapeia uma cidade para cada botao
    const btns = Array.from(cities).map(city => {

        //coloca classe e label com nome da cidade
        /* const btn = $('<button>').addClass(['btn', 'btn-info']).html(city); */
        const btn = $('<button>').addClass(['btn', 'btn-dark']).html(city);

        //chama funcao no click
        btn.on("click",e => {
            filterByCity(city);
            changeActiveButtons(city);
        });
        return btn
    });

    //cria botao para pesquisar por todas as cidades
    const btnAll = $('<button>').addClass(['btn', 'btn-dark', 'active']).html('Todas');
    btnAll.on("click", e => {
        filterByCity(null);
        changeActiveButtons(null);
    });

    //adiciona ele no array de botoes
    btns.push(btnAll);

    //cria o button group e adiciona o array de botoes nesse grupo
    const btnGroup = $('<div>').addClass(['btn-group']);
    btnGroup.append(btns);

    $(this).html(btnGroup);
    return this;
}

onLoadHtmlSuccess(function() {
    $('[wm-city-buttons]').cityButtons();
});