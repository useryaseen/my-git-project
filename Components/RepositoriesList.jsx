import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import { GitHubContext } from '../contextApi/AllApis';
import { useNavigation } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather';

const RepositoriesList = () => {
  const navigation = useNavigation();
  const { 
    repositories, 
    loading, 
    error, 
    setQuery, 
    queryIs, 
    handleSearch, 
    refetchRepositories, 
    isConnected 
  } = useContext(GitHubContext);

  const handleRepoClick = (repo) => {
    navigation.navigate('RepoDetails', { repo }); // Pass repo data as params
  };

  if (!isConnected) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>No internet connection. Please check your network.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ position: 'relative' }}>
        <TextInput
          onChangeText={(e) => setQuery(e)}
          style={styles.input}
          placeholder="Search..."
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <Feather name="search" size={22} color="gray" />
        </TouchableOpacity>
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}

      {repositories.length > 0 && queryIs.trim() ? (
        <FlatList
          data={repositories}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleRepoClick(item)} style={styles.item}>
              <Text style={styles.repoName}>{item.name}</Text>
              <Text style={styles.repoDescription}>{item.description || 'No description available'}</Text>
              <View style={styles.ownerContainer}>
                <Image source={{ uri: item.owner.avatar_url }} style={styles.avatar} />
                <Text style={styles.ownerName}>{item.owner.login}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.noDataText}>No repositories found. Please search.</Text>
      )}

      {repositories.length > 0 && !loading && (
        <Button title="Load More" onPress={refetchRepositories} />
      )}

      {loading && <Text>Loading...</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
  searchButton: {
    position: 'absolute',
    top: 9,
    right: 8,
  },
  item: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    elevation: 3,
  },
  repoName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  repoDescription: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
  ownerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  ownerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  errorText: {
    color: 'black',
    textAlign: 'center',
    marginVertical: 10,
    fontSize:17
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RepositoriesList;
