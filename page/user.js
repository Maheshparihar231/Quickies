import { View, Text ,FlatList,Dimensions, StyleSheet, Image,Linking} from 'react-native'
import React from 'react'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { user } from '../sample_data/userdata';
import { reeldata } from '../sample_data/api';
import { userreeldata } from '../sample_data/userdata';
import Video from 'react-native-video';

const {width} = Dimensions.get('screen');

const User = ({navigation, route}) => {
  const data = route.params.item.user; // for reading the data without fetching
  //console.log(user.social.twitter)
  

  const openLink = (url) => {
    Linking.openURL(url);
  };

  // Extract the social media links from the data
  const socialLinks = Object.entries(user.social)
    .map(([title, url]) => ({title,url}));

  const renderLink = ({ item }) => {
    return (
      <TouchableOpacity style={styles.touch} onPress={() => openLink(item.url)}>
        <View style={styles.social}></View>
        <Text style={styles.linkText}>{item.title.toUpperCase()}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView>
    <View style={styles.container}>       
      <View style={styles.profile}>
        <TouchableOpacity activeOpacity={0.7}>
          <Image
            style={styles.image}
            source={{uri:data.profileimg}}
          />
        </TouchableOpacity>
      </View>
      <View style={{justifyContent:'center',alignItems:'center'}}>
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={{color:'white' ,fontSize:35}}>@{data.username}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contant}>
        <View style={styles.box}>
          <View style={{flexDirection:'column',margin:10,alignItems:'center',justifyContent:'center',}}>
            <Text style={{color:'white',fontSize:30,fontWeight:500,padding:5,}}>{user.quickies}</Text>
            <Text style={{color:'white',fontSize:25,fontWeight:600,}}>Quickies</Text>
          </View>
          <View style={{flexDirection:'column',margin:10,alignItems:'center',justifyContent:'center'}}>
            <Text style={{color:'white',fontSize:30,fontWeight:500,padding:5,}}>{user.followers}</Text>
            <Text style={{color:'white',fontSize:25,fontWeight:600,}}>Followers</Text>
          </View>
        </View>
      </View>
      <View style={styles.socialbox}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={socialLinks}
          renderItem={renderLink}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={styles.post}>
        <FlatList
          scrollEnabled={false}
          key={'_'}
          data = {userreeldata}
          numColumns={3}
          keyExtractor={item => item.id.toString()}
          renderItem={({item})=>(
            <TouchableOpacity
            activeOpacity={0.7}
              key={item.id}
              onPress={()=>{navigation.navigate('QuickReel',{item})}}
            >
              <Animated.View sharedTransitionTag={item.id.toString()}>
                <Animated.Image
                  style={styles.thumbnail}
                  source={{uri:item.thumbnail_url}}
                />
              </Animated.View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
    </ScrollView>
  )
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"black"
  },
  profile:{
    marginTop:20,
    justifyContent:'center',
    alignItems:'center',
    //backgroundColor:'white',
  },
  image:{
    height:200,
    width:200,
    borderRadius:100,
    borderWidth:5,
    borderColor:'white',
  },
  contant:{
    //display:'flex',
    marginTop:15,
    //backgroundColor:'white',
    justifyContent:'center',
    alignItems:'center',
  },
  box:{
    //width:200,
    backgroundColor:"grey",
    paddingHorizontal:25,
    paddingVertical:5,
    flexDirection:'row',
    justifyContent:'space-around',
    borderRadius:25,
    borderWidth:2,
    borderColor:'white',
  },
  socialbox:{
    padding:15,
    //backgroundColor:'white',
    justifyContent:'center',
  },
  touch:{
    justifyContent:'center',
    alignItems:'center',
    padding:5
  },
  social:{
    height:60,
    width:60,
    margin:10,
    borderRadius:50,
    borderWidth:2,
    borderColor:'blue',
    backgroundColor:'white',
  },
  linkText: {
    fontSize: 16,
    marginHorizontal:10,
    color:'white',
  },
  post:{
    //backgroundColor:'white',
  },
  poster: {
    width: width / 3,
    height:230
  },
  thumbnail:{
    height:230,
    width:width/3,
  }
})

export default User