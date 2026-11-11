const { Router } = require("express");
const Connection = require("../db/conection");

const router = Router();



router.get("/", async (req, res) => {
    const idUsuario = req.body;
    
    try {
        const cmd = `
            SELECT * FROM Usuario
        `;

        const [result] = await Connection.query(cmd);

        return res.status(200).json({
            created: true,
            contacts: result,
            message: "Lista de contatos."
        });

    } catch (error) {
        console.error("Erro ao listar contatos:", error);

        return res.status(500).json({
            created: false,
            contacts: [],
            message: "Falha ao carregar contatos."
        });
    }
});

router.post("/registrar", async (req, res) => {
    const {nome, email, Palavra_passe} = req.body

// Validação simples dos dados recebidos
    if (!nome || !email || !Palavra_passe) {
        return res.status(400).json({
            created: false,
            message: "Todos os campos (nome, email, Palavra_passe) são obrigatórios."
        });
    }

    try{
    //Checar o que ja existe
        const Check = "SELECT * FROM usuario WHERE email = ?;"
        const [existingUsers] = await Connection.query(Check, [email]);

        if (existingUsers.length > 0) {
            return res.status(400).json({
                created: false,
                message: "Esse email ja é cadastrado"
            });
        }

        //Criar um user
        const insertCMD = "INSERT INTO usuario (nome, email, Palavra_passe) VALUES (?, ?, ?);"
        await Connection.query(insertCMD, [nome, email, Palavra_passe]);

        return res.status(201).json({
            created: true,
            message: "Usuario cadastrado com sucesso"
        })
    } catch (error) {
        console.error("Erro no cadastro:", error);
        return res.status(500).json({
            created: false,
            message: "Erro do servidor ao tentar te cadastrar."
        });
    }

})


router.post("/inserir_eletronicos", async (req, res) => {
    const [nome, descricao, preco] = req.body;

    if (!nome || !descricao || !preco){
        return res.status(400).json({
            created: false,
            message: "Os campos devem serem preenchidos"
        })
    }

    try {
        //Checar um item
        const Check = "SELECT * FROM componentes WHERE nome = ?;"
        const [ExistItem] = await Connection.query(Check, [nome]);

        if (ExistItem.length > 0) {
            return res.status(400).json({
                created: false,
                message: "Esse Item ja esta no estoque"
            });
        }

         //Criar um Item
        const inCMD = "INSERT INTO usuario (nome, descricao, preco) VALUES (?, ?, ?);"
        await Connection.query(inCMD, [nome, descricao, preco]);

        return res.status(201).json({
            created: true,
            message: "Item inserido de forma sucedida"
        })
    

    }catch (error) {
        console.error("Erro de insersao:", error);
        return res.status(500).json({
            created: false,
            message: "Houve um erro do servidor na insersao de conteudo"
        })
    }


})

router.put("/Atualizar", async (req, res) =>{
const [nome, descricao, preco] = req.body;

// Validação simples dos dados recebidos
    if (!nome || !descricao || !preco) {
        return res.status(400).json({
            created: false,
            message: "Todos os campos são obrigatórios."
        });
    }
})

router.delete("/Deletar-Componente", async (req, res) => {
const [idComponente] = req.body;

// Validação simples dos dados recebidos
    if (!idComponente) {
        return res.status(400).json({
            created: false,
            message: "Não há este item para deletar"
        });
    }
try {
        const cmd = `DELETE FROM componente WHERE idComponente`;

        const [result] = await Connection.query(cmd);

        return res.status(200).json({
            created: true,
            contacts: result,
            message: "Delecao sucedida"
        });


}catch(error){
    return res.status(500).json({
            created: false,
            message: "Houve um erro do servidor na delecao de conteudo"
        })
}
})

router.delete("/Deletar-User/", async (req, res) => {
const [idUsuario] = req.body;

// Validação simples dos dados recebidos
    if (!idUsuario) {
        return res.status(400).json({
            created: false,
            message: "Não há este Usuario para deletar"
        });
    }
try {
        const cmd = `DELETE FROM componente WHERE idUsuario = ?`;

        const [result] = await Connection.query(cmd);

        return res.status(200).json({
            created: true,
            contacts: result,
            message: "Delecao sucedida"
        });


}catch(error){
    return res.status(500).json({
            created: false,
            message: "Houve um erro do servidor na delecao de usuario"
        })
}
})


module.exports = router