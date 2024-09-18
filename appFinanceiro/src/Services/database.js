import * as SQLite from 'expo-sqlite';

// Abre ou cria um banco de dados chamado 'app.db'
const db = SQLite.openDatabase('app.db');

// Função para criar a tabela de movimentações
export const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS movimentacoes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tipo TEXT,
        valor REAL,
        data TEXT
      );`
    );
  });
};

// Função para adicionar uma movimentação
export const addMovimentacao = (tipo, valor, data) => {
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO movimentacoes (tipo, valor, data, imagens) VALUES (?, ?, ?, ?);`,
      [tipo, valor, data]
    );
  });
};

// Função para obter movimentações
export const getMovimentacoes = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      `SELECT * FROM movimentacoes;`,
      [],
      (_, { rows: { _array } }) => callback(_array)
    );
  });
};

// Função para limpar a tabela de movimentações
export const clearTable = () => {
  db.transaction(tx => {
    tx.executeSql(`DELETE FROM movimentacoes;`);
  });
};
