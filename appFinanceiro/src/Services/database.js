import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('app.db');

export const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS movimentacoes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        movimentacao TEXT,
        valor REAL,
        data TEXT,
        timestamp TEXT
      );`
    );
  });

  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS categorias (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT
      );`
    );
  });
};

export const addMovimentacao = (tipo, valor, categoria, data, timestamp) => {
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO movimentacoes (movimentacao, valor, categoria, data, timestamp) VALUES (?, ?, ?, ?, ?);`,
      [tipo, valor, categoria, data, timestamp]
    );
  });
};

export const addCategoria = (nome) => {
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO categorias (nome) VALUES (?);`,
      [nome]
    );
  });
};

export const getMovimentacoes = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      `SELECT * FROM movimentacoes;`,
      [],
      (_, { rows: { _array } }) => callback(_array)
    );
  });
};

export const getCategorias = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      `SELECT * FROM categorias;`,
      [],
      (_, { rows: { _array } }) => callback(_array)
    );
  });
};

export const clearTable = () => {
  db.transaction(tx => {
    tx.executeSql(`DELETE FROM movimentacoes;`);
  });
};

export const clearTableCategory = () => {
  db.transaction(tx => {
    tx.executeSql(`DELETE FROM categorias;`);
  });
};
