import consultServices from "../services/consult.services.js";

// PRECISA EDITAR DAQUI PRA BAIXO

const consultarSaldo = (req, res) => {
    try {
        return res.status(200).json(services.checkBalanceService(req.query));
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const consultarExtrato = (req, res) => {
    try {
        const extrato = services.checkExtractService(req.query);
        return res.status(200).json(extrato);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}