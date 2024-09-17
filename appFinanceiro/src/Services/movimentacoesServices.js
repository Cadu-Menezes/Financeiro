import { firestore } from '../../firebaseConfig'; // Ajuste o caminho conforme necessário
import { collection, addDoc, doc, updateDoc, getDocs, getDoc, deleteDoc, onSnapshot  } from 'firebase/firestore';

export const obterMovimentacoes = (callback) => {
  const movimentacoesRef = collection(firestore, 'movimentacoes');

  // Adiciona um ouvinte para mudanças na coleção
  const unsubscribe = onSnapshot(movimentacoesRef, (snapshot) => {
    const movimentacoes = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(movimentacoes);
  });

  // Retorna a função para parar de escutar
  return unsubscribe;
};

export const criarMovimentacao = async (movimentacao) => {
  await addDoc(collection(firestore, 'movimentacoes'), movimentacao);
};

export const atualizarMovimentacao = async (id, movimentacao) => {
  const movimentacaoDoc = doc(firestore, 'movimentacoes', id);
  await updateDoc(movimentacaoDoc, movimentacao);
};

export const obterMovimentacaoPorId = async (id) => {
  const movimentacaoDoc = doc(firestore, 'movimentacoes', id);
  const docSnapshot = await getDoc(movimentacaoDoc);
  return docSnapshot.exists() ? { id: docSnapshot.id, ...docSnapshot.data() } : null;
};

export const deletarMovimentacao = async (id) => {
  const movimentacaoDoc = doc(firestore, 'movimentacoes', id);
  await deleteDoc(movimentacaoDoc);
};
