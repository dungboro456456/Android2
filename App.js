import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';

export default App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://192.168.56.1:8080/api/v1/movies')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => setData(json))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);


  return (
    <View style={{ flex: 1, padding: 24 }}>

        <FlatList
          data={data}
          keyExtractor={({ id }) => id.toString()}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 18, color: 'green', textAlign: 'center' }}>
                {item.title}
              </Text>
              <Image
                source={{ uri: item.poster }}
                style={{ width: 200, height: 300, alignSelf: 'center' }}
              />
            </View>
          )}
        />
    </View>
  );
};
