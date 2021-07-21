'use strict'

const repository = require('../repositories/produto-repository');

exports.get = async(req, res, next) => {
    try {
        let data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        console.log(e);
        res.status(500).send({
            mensagem: 'Falha ao processar sua requisição.'
        });
    }
}

exports.getById = async(req, res, next) => {
    try {
        let data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            mensagem: 'Falha ao processar sua requisição.'
        });
    }
}

exports.post = async(req, res, next) => {
    try {
        await repository.post(req.body);
        res.status(200).send({
            mensagem: 'Produto criado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            mensagem: 'Falha ao processar sua requisição.',
            erro: e
        });
    }
}

exports.put = async(req, res, next) => {
    try {
        await repository.put(req.params.id, req.body);
        res.status(200).send({
            mensagem: 'Produto atualizado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            mensagem: 'Falha ao processar sua requisição.'
        });
    }
}

exports.delete = async(req, res, next) => {
    try {
        let produto = await repository.delete(req.params.id);
        console.log(produto);
        if(produto !== null) {
            res.status(200).send({
                mensagem: 'Produto excluido com sucesso!'
            });
        } else {
            res.status(200).send({
                mensagem: 'Produto não existe.'
            }); 
        }
    } catch (e) {
        res.status(500).send({
            mensagem: 'Falha ao processar sua requisição.'
        });
    }
}