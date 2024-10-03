import { Router } from "express";

const planetasRoutes = Router();

let planetas = [
    {
        id: (Math.floor(Math.random() * 999999) + 1),
        nome: "Dev",
        temperatura: 13.0,
        agua: false, //Indicação de existência de água
        atm: [
            "JS",
            "Node",
            "VS",
            "Code",
        ],
    },
]

//Rota para buscar todo os elementos do array planetas
planetasRoutes.get("/", (req, res) => {
    return res.status(200).send(planetas);
})

//Rota para cadastrar um novo planeta 
planetasRoutes.post("/", (req, res) => {
    const {
        nome,
        temperatura,
        agua,
        atm
    } = req.body;

    if(!nome || !temperatura || !agua) {
        return res.status(400).send({
            message: "Os campos nome, temperatura e água são obrigatórios!",
        });
    }

       // Validação de existência de água
       if (agua != "sim" && agua != "não") {
        return res.status(400).send({
            message: "Digite 'sim' ou 'não'!",
    })
}

    const novoPlaneta = {
        id: Number(Math.floor(Math.random() * 999999) + 1),
        nome,
        temperatura,
        agua,
        atm,
    };

    planetas.push(novoPlaneta);
    return res.status(201).send({
        message: "Planeta Cadastrado!",
        novoPlaneta,
    });
});

//Rota para buscar um elemento específico do array planetas
planetasRoutes.get("/:id", (req, res) => {
    const { id } = req.params;

    //console.log(id);

    const filme = planetas.find((movie) => movie.id === Number(id));

    //console.log(guloseima);

    if (!filme) {
        return res.status(404).send({ message: "Filme não encontrado!" });
    }

    return res.status(200).send(filme);
})

//Rota para editar um filme
planetasRoutes.put("/:id", (req, res) => {
    const { id } = req.params;

    const filme = planetas.find((movie) => movie.id === Number(id));

    //console.log(guloseima);

    if (!filme) {
        return res.status(404).send({ message: "Filme não encontrado!" });
    }

    const { titulo, genero, emCartaz } = req.body;
    //console.log(titulo);

    filme.titulo = titulo;
    filme.genero = genero;
    filme.emCartaz = emCartaz;

    return res.status(200).send({
        message: "Filme atualizado!",
        filme,
    });
});

//Rota para deletar um filme 
planetasRoutes.delete("/:id", (req, res) => {
    const { id } = req.params;

    const filme = planetas.find((movie) => movie.id === Number(id));


    if (!filme) {
        return res.status(404).send({ message: "Filme não encontrado!" });
    }

    planetas = planetas.filter((movie) => movie.id !== Number(id));

    return res.status(200).send({
        message: "Filme deletado!",
        filme,
    });
});

export default planetasRoutes;