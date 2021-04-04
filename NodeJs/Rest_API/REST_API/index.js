const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 3030;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let DB = {
  games: [
    {
      id: 23,
      title: "Teste 1",
      year: 2019,
      price: 28,
    },
    {
      id: 28,
      title: "Teste 2",
      year: 2013,
      price: 321,
    },
    {
      id: 12,
      title: "Teste 3",
      year: 2016,
      price: 285,
    },
  ],
};

app.get("/games", (req, res) => {
  res.statusCode = 200;
  res.json(DB.games);
});

app.get("/game/:id", (req, res) => {
  let id = req.params.id;
  if (isNaN(id)) {
    res.sendStatus(400);
  } else {
    let game = DB.games.find((g) => g.id == parseInt(id));

    if (game) {
      //res.statusCode(200);
      res.json(game);
    } else {
      res.sendStatus(404);
    }
  }
});

app.post("/game", (req, res) => {
  let { title, price, year } = req.body;

  DB.games.push({
    id: 35,
    title,
    price,
    year,
  });

  res.sendStatus(200);
});

app.delete("/game/:id", (req, res) => {
  let id = req.params.id;
  if (isNaN(id)) {
    res.sendStatus(400);
  } else {
    let index = DB.games.findIndex((g) => g.id == parseInt(id));

    if (index) {
      DB.games.splice(index, 1);
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  }
});

app.put("/game/:id", (req, res) => {
  let id = req.params.id;
  if (isNaN(id)) {
    res.sendStatus(400);
  } else {
    let game = DB.games.find((g) => g.id == parseInt(id));

    if (game) {
      let { title, price, year } = req.body;
      if (title) {
        game.title = title;
      }

      if (price) {
        game.price = price;
      }

      if (year) {
        game.year = year;
      }

      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  }
});

app.listen(port, () => {
  console.log(`Your app is running at localhost:${port}`);
});
