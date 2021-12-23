import $ from 'jquery';

function loadIncludes(parent) {

    //caso nao tenha um componente pai, o corpo inteiro do site e setado
    if(!parent){
        parent = 'body';
    }

    //passa por todos elementos com atributo wm-include
    $(parent).find('[wm-include]').each(function(i, e) {
        //i = index
        //e = elemento que no caso vai vir uma url
        const url = $(e).attr('wm-include');

        //passa a url em uma chamada ajax, se der certo entra na funcao de sucesso
        $.ajax({
            url,
            success(data) {

                $(e).html(data);

                //remove atributo para essa funcao nao reinterpretar o mesmo elemento
                $(e).removeAttr('wm-include');

                //faz a funcao ser recursiva, para includes dentro de include
                loadIncludes(e);
            }
        })
    }) 
}

//inicia sem paramentro para ser o body o primeiro
loadIncludes();