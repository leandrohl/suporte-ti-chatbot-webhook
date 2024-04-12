import { obterCardsCategorias } from "../Funcoes/DialogFlow/funcoesDialogFlow.js";
import Categoria from "../Modelo/categoria.js";
import Chamado from '../Modelo/chamado.js'
import Usuario from '../Modelo/usuario.js'

export default class DialogFlowCtrl{

    async processar(requisicao, resposta){
        resposta.type('application/json');
        const intencao = requisicao.body.queryResult.intent.displayName;
        const ambienteOrigem = requisicao.body?.originalDetectIntentRequest?.source;
        const categoria = requisicao.body?.queryResult.parameters?.Categoria;
        const nome = requisicao.body?.queryResult.parameters?.person?.name;
        const email = requisicao.body?.queryResult.parameters?.email;
        const nivelPrioridade = requisicao.body?.queryResult.parameters?.nivelprioridade;
        const numeroChamado = requisicao.body?.queryResult.parameters?.number;

        const sessaoDF = requisicao.body.queryResult.outputContexts?.[0].name.split('/')[4]
        if (!global.sessao){
                global.sessao = {}
        }
        if (!global.sessao[sessaoDF]) {
            global.sessao[sessaoDF] = { categoria: '' }
        }

        if (categoria) {
            global.sessao[sessaoDF].categoria = categoria;
        }

        if (intencao && intencao == 'AbrirChamado'){

            let respostaDF = { fulfillmentMessages: [] };

            if (categoria !== '') {
                respostaDF['fulfillmentMessages'] = [
                    {
                        "text": {
                           "text":[
                                "Obrigado pelas informações! Por favor, informe qual o nível de prioridade do chamado?",
                           ]
                        }
                    }
                ];
                resposta.json(respostaDF);
            };

            if (ambienteOrigem){
                obterCardsCategorias('custom')
                .then((listaCardsCustom)=>{
                    respostaDF['fulfillmentMessages'] = [...listaCardsCustom,
                        {
                            "text": {
                               "text":[
                                    "Por favor, informe qual a categoria do chamado?",
                               ]
                            }
                        }
                    ];
                    resposta.json(respostaDF);
                })
                .catch((erro)=>{
                    respostaDF['fulfillmentMessages'] = [
                        {
                            "text": {
                               "text":[
                                    "Erro ao recuperar a lista de categorias:\n",
                                    "Não foi possível consultar o menu.",
                                    "Tente novamente mais tarde.",
                                    erro.message
                               ]
                            }
                        }
                    ];
                });
            }
            else{
                //devolver messenger cards
                obterCardsCategorias('messenger')
                .then((listaCardsMessenger)=>{
                    respostaDF['fulfillmentMessages'] = [{
                        "payload": {
                            "richContent": [[...listaCardsMessenger, 
                                {
                                    "type":"description",
                                    "title":"Inicio do Chamado!",
                                    "text":[
                                        "Por favor, informe qual a categoria do chamado?"
                                    ]
                                }
                            ]]
                        }
                    }];
                    resposta.json(respostaDF);
                })
                .catch((erro)=>{
                    respostaDF['fulfillmentMessages'] = {
                        "payload": {
                            "richContent": [
                                {
                                    "type":"description",
                                    "title":"Erro ao recuperar a lista de categorias",
                                    "text":[
                                        "Infelizmente não foi possível exibir o menu de categorias.",
                                        erro.message
                                    ]
                                }
                            ]
                        }
                    }
                });  
            }
        } else if (intencao == 'FinalizarChamado') {
            let respostaDF = { fulfillmentMessages: [] };

            try {
                const usuario = new Usuario(0, nome, email);
                await usuario.gravar()
    
                let categoriaObj = new Categoria();
                const nomeCategoria = global.sessao[sessaoDF].categoria;
                categoriaObj = await categoriaObj.consultarPeloNome(nomeCategoria);
                const chamado = new Chamado(0, "Fernando", nivelPrioridade, categoriaObj, usuario);

                await chamado.gravar();

                if (ambienteOrigem) {
                    respostaDF['fulfillmentMessages'] = [
                        {
                            "text": {
                                "text": [
                                    "Seu chamado foi registrado com sucesso!",
                                    "Nº do chamado gerado (protocolo): " + chamado.chamadoId,
                                    "Nome do técnico a quem foi atribuído o atendimento: " + chamado.chamadoNomeTecnico,
                                    "Prazo para atendimento (em horas): " + chamado.categoria.categoriaPrazoAtendimento
                                ]
                            }
                        }
                    ];
                    resposta.json(respostaDF);
                }
                else {
                    respostaDF['fulfillmentMessages'] = {
                        "payload": {
                            "richContent": [[
                                {
                                    "type": "description",
                                    "title": "Seu chamado foi registrado com sucesso!",
                                    "text": [
                                        "Nº do chamado gerado (protocolo): " + chamado.chamadoId,
                                        "Nome do técnico a quem foi atribuído o atendimento: " + chamado.chamadoNomeTecnico,
                                        "Prazo para atendimento (em horas)" + chamado.categoria.categoriaPrazoAtendimento
                                    ]
                                }
                            ]]
                            }
                        }
                    resposta.json(respostaDF);
                }
            } catch (erro) {
                respostaDF['fulfillmentMessages'] = {
                    "payload": {
                        "richContent": [
                            {
                                "type":"description",
                                "title":"Erro ao salvar chamado",
                                "text":[
                                    "Infelizmente não foi possível salvar seu chamado.",
                                    erro.message
                                ]
                            }
                        ]
                    }
                }
                resposta.json(respostaDF);
            }
        } else if (intencao == 'ConsultarChamado') {
            let respostaDF = { fulfillmentMessages: [] };
            let chamado = new Chamado();

            chamado = await chamado.consultarPorId(numeroChamado);

            if (chamado != null) {
                let categoria = new Categoria();
                categoria = await categoria.consultarPorId(chamado.categoria.categoriaId);

                if (ambienteOrigem) {
                    respostaDF['fulfillmentMessages'] = [
                        {
                            "text": {
                                "text": [
                                    "Segue o status do seu chamado!",
                                    "Nº do chamado gerado (protocolo): " + chamado.chamadoId,
                                    "Nome do técnico a quem foi atribuído o atendimento: " + chamado.chamadoNomeTecnico,
                                    "Categoria: " + categoria.categoriaDescricao,
                                    "Prazo para atendimento (em horas): " + categoria.categoriaPrazoAtendimento
                                ]
                            }
                        }
                    ];
                    resposta.json(respostaDF);
                }
                else {
                    respostaDF['fulfillmentMessages'] = {
                        "payload": {
                            "richContent": [[
                                {
                                    "type": "description",
                                    "title": "Segue o status do seu chamado!",
                                    "text": [
                                        "Seu chamado foi registrado com sucesso!",
                                        "Nº do chamado gerado (protocolo): " + chamado.chamadoId,
                                        "Nome do técnico a quem foi atribuído o atendimento: " + chamado.chamadoNomeTecnico,
                                        "Categoria: " + categoria.categoriaDescricao,
                                        "Prazo para atendimento (em horas): " + categoria.categoriaPrazoAtendimento
                                    ]
                                }
                            ]]
                            }
                        }
                    resposta.json(respostaDF);
                }

            } else {
                respostaDF['fulfillmentMessages'] = {
                    "payload": {
                        "richContent": [
                            {
                                "type":"description",
                                "title":"Código Inválido",
                                "text":[
                                    "Infelizmente não encontramos nenhum chamado com esse código!",
                                    erro.message
                                ]
                            }
                        ]
                    }
                }
                resposta.json(respostaDF);
            }
        }
    }
}