import { useState, useEffect } from 'react';
import { Text, View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

export default function DetalheScreen({ route }) {
  const { id, nome } = route.params;

  const [episodios, setEpisodios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function buscarEpisodios() {
      try {
        const resposta = await fetch(`https://api.tvmaze.com/shows/${id}/episodes`);
        if (!resposta.ok) throw new Error('Falha na requisição');
        const dados = await resposta.json();
        setEpisodios(dados);
      } catch (e) {
        setErro('Erro ao carregar os episódios.');
      } finally {
        setCarregando(false);
      }
    }
    buscarEpisodios();
  }, [id]);

  if (carregando) return <ActivityIndicator size="large" style={styles.centro} />;
  if (erro) return <Text style={styles.erro}>{erro}</Text>;

  return (
    <FlatList
      data={episodios}
      keyExtractor={(item) => String(item.id)}
      ListHeaderComponent={<Text style={styles.titulo}>{nome}</Text>}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.texto}>
            Temporada {item.season} - Episódio {item.number ?? '-'} - {item.name}
          </Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  centro: { flex: 1, justifyContent: 'center' },
  erro: { padding: 20, color: 'red', textAlign: 'center' },
  titulo: { fontSize: 24, fontWeight: 'bold', padding: 15 },
  item: { padding: 12, borderBottomWidth: 1, borderColor: '#ddd', backgroundColor: '#fff' },
  texto: { fontSize: 16 },
});