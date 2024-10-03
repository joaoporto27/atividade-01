import { Router } from "express";

const filmesRoutes = Router();

let filmesMarcantes = [
    {
        id: (Math.floor(Math.random() * 99) + 1),
        titulo: "Meu Amigo Totoro",
        genero: "Animação",
        emCartaz: false,
    },
    {  
        id:(Math.floor(Math.random() * 99) + 1),
        titulo: "Deadpool 3",
        genero: "Ação e Comédia",
        emCartaz: true,
    },
    {
        id:(Math.floor(Math.random() * 99) + 1),
        titulo: "Meu Malvado Favorito 4",
        genero: "Animação",
        emCartaz: true,
    }
]

//Rota para buscar todo os elementos do array filmesMarcantes
filmesRoutes.get("/", (req, res) => {
    return res.status(200).send(filmesMarcantes);
})

//Rota para criar um novo filme 
filmesRoutes.post("/", (req, res) => {
    const {titulo, genero, emCartaz } = req.body;

    const novoFilme = {
        id: Number(Math.floor(Math.random() * 99) + 1),
        titulo,
        genero,
        emCartaz,
    };

    filmesMarcantes.push(novoFilme);
    return res.status(201).send(filmesMarcantes);
})

//Rota para buscar um elemento específico do array filmesMarcantes
filmesRoutes.get("/:id", (req, res) => {
    const { id } = req.params;

    //console.log(id);

    const filme = filmesMarcantes.find((movie) => movie.id === Number(id));

    //console.log(guloseima);

    if (!filme) {
        return res.status(404).send({ message: "Filme não encontrado!" });
    }

    return res.status(200).send(filme);
})

//Rota para editar um filme
filmesRoutes.put("/:id", (req, res) => {
    const { id } = req.params;

    const filme = filmesMarcantes.find((movie) => movie.id === Number(id));

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
        message:"Filme atualizado!",
        filme,
    });
});

//Rota para deletar um filme 
filmesRoutes.delete("/:id", (req, res) => {
    const { id } = req.params;

    const filme = filmesMarcantes.find((movie) => movie.id === Number(id));

    
    if (!filme) {
        return res.status(404).send({ message: "Filme não encontrado!" });
    }
    
    filmesMarcantes = filmesMarcantes.filter((movie) => movie.id !== Number(id));

    return res.status(200).send ({
        message: "Filme deletado!",
        filme,
    });
});

export default filmesRoutes;