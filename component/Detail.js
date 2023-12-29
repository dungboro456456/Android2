// import React, { useState } from 'react';
// import { Image, Text, View } from 'react-native';

// export default Detail = ({ id }) => {
//   const [movie, setMovie] = useState(null);

//   useEffect(() => {
//     fetch(`https://a067-113-185-72-232.ngrok-free.app/api/v1/movies/${id}`)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then((json) => setMovie(json))
//       .catch((error) => console.error(error));
//   }, [id]);

//   return (
//     <View style={{ flex: 1, padding: 24 }}>
//       {movie && (
//         <View>
//           <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{movie.title}</Text>
//           <Image
//             source={{ uri: movie.poster }}
//             style={{ width: 200, height: 300, alignSelf: 'center' }}
//           />
//           <Text style={{ fontSize: 18 }}>
//             Đạo diễn: {movie.director}
//           </Text>
//           <Text style={{ fontSize: 18 }}>
//             Diễn viên: {movie.actors}
//           </Text>
//           <Text style={{ fontSize: 18 }}>{movie.reviewIds}</Text>
//         </View>
//       )}
//     </View>
  
//   );
// }