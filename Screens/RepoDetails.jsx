import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function RepoDetails({ route }) {
  const { repo } = route.params;

  return (
    <ScrollView style={styles.container}>
      {/* Repository Name */}
      <Text style={styles.repoName}>{repo.name}</Text>

      {/* Owner Section */}
      <View style={styles.profileSection}>
        <Image source={{ uri: repo.owner.avatar_url }} style={styles.avatar} />
        <Text style={styles.ownerName}>{repo.owner.login}</Text>
      </View>

      {/* Repository Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.repoDetail}>⭐ Stars: {repo.stargazers_count}</Text>
        <Text style={styles.repoDetail}>🍴 Forks: {repo.forks_count}</Text>
        <Text style={styles.repoDetail}>🖥️ Language: {repo.language || 'Not specified'}</Text>
      </View>

      {/* Description */}
      <Text style={styles.description}>
        {repo.description || 'No description available'}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  repoName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'navy',
    textAlign: 'center',
    marginBottom: 15,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: 'gray',
    marginBottom: 10,
  },
  ownerName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  detailsContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'aliceblue',
    borderRadius: 10,
  },
  repoDetail: {
    fontSize: 16,
    color: 'dimgray',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: 'darkslategray',
    lineHeight: 22,
    textAlign: 'justify',
  },
});
