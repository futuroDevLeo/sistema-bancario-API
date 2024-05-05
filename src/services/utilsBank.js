function buscarConta(numeroconta) {
    const contaExiste = bancodedados.contas.find(conta => conta.numero === numeroconta);
    return contaExiste;
}

export default buscarConta;