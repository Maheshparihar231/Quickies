import React from 'react';
import { View, FlatList, TouchableOpacity, Text, Linking } from 'react-native';

const data = {
  userid: "67890",
  username: "user123",
  profileimg: "https://fastly.picsum.photos/id/366/200/200.jpg?hmac=-4k6Dmgp7_ptjLR2h5ruv6-ntBP_zW5HUFxRsRV_9C4",
  quickies: "256",
  followers: "13.6k",
  social: {
    twitter: "https://twitter.com/DailyLoud",
    onlyfans: "https://www.youtube.com/@thedeshbhakt",
    redgif: "https://www.reddit.com/r/Cricket/",
  },
};

const SocialMediaLinks = () => {
  const renderLink = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => openLink(item.url)}>
        <Text style={styles.linkText}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  const openLink = (url) => {
    Linking.openURL(url);
  };

  // Extract the social media links from the data
  const socialLinks = Object.entries(data.social)
    .map(([title, url]) => ({title,url}));

  return (
    <View style={styles.container}>
      <FlatList
        data={socialLinks}
        renderItem={renderLink}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
  },
  linkText: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
};

export default SocialMediaLinks;
