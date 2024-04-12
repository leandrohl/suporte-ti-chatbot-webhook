//url de referência https://cloud.google.com/dialogflow/es/docs/integrations/dialogflow-messenger?hl=pt-br

import Categoria from "../../Modelo/categoria.js";
import Chamado from "../../Modelo/chamado.js";

//Mensagem tem como alvo o DialogFlow Messenger
export function criarMessengerCard() {
    return {
        type: "info",
        title: "",
        subtitle: "",
        image: {
            src: {
                rawUrl: ""
            }
        },
        actionLink: ""
    }
}

//Mensagem do tipo botão para o DialogFlow Messenger
export function criarMessengerButton() {
    return {
        "type": "button",
        "icon": {
            "type": "chevron_right",
            "color": "#FF9800"
        },
        "text": "",
        "link": "",
        "event": {
            "name": "",
            "languageCode": "",
            "parameters": {}
        }
    }
}

//Mensagem do tipo card para um ambiente "CUSTOM (Interface padrão)"
export function criarCustomCard() {
    return {
        card: {
            title: "",
            subtitle: "",
            imageUri: "",
            buttons: [
                {
                    text: "botão",
                    postback: ""
                }
            ]
        }
    }
}

//Função que gerar Cards de categorias para o DialogFlow
//Ambiente suportado: "CUSTOM" e "Messenger"
export async function obterCardsCategorias(tipo = "custom") { 
    const categoria = new Categoria();
    const listaCategorias = await categoria.consultar();
    const listaCards = [];
    for (const categoria of listaCategorias) {
        let card;
        if (tipo == "custom") {
            card = criarCustomCard();
            card['card']['title'] = categoria.categoriaDescricao;
            card['card']['subtitle'] = "Prazo de atendimento: " + categoria.categoriaPrazoAtendimento;
            card['card']['imageUri'] = categoria.categoriaUrlImagem;
            card['card']['buttons'][0]['text'] = "Mais informações";
            card['card']['buttons'][0]['postback'] = "http://unoeste.br"
        }
        else if (tipo == "messenger") {
            card = criarMessengerCard();
            card['title'] = categoria.categoriaDescricao;
            card['subtitle'] = "Prazo de atendimento: " + categoria.categoriaPrazoAtendimento;
            card['image']['src']['rawUrl'] = categoria.categoriaUrlImagem;
            card['actionLink'] = "http://unoeste.br";

        }
        listaCards.push(card);
    }
    return listaCards;
}