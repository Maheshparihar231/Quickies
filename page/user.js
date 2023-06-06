import { View, Text ,FlatList,Dimensions, StyleSheet, Image,} from 'react-native'
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
            <Text style={{color:'black',fontSize:30,fontWeight:500,padding:5,}}>{user.quickies}</Text>
            <Text style={{color:'black',fontSize:25,fontWeight:600,}}>Quickies</Text>
          </View>
          <View style={{flexDirection:'column',margin:10,alignItems:'center',justifyContent:'center'}}>
            <Text style={{color:'black',fontSize:30,fontWeight:500,padding:5,}}>{user.followers}</Text>
            <Text style={{color:'black',fontSize:25,fontWeight:600,}}>Followers</Text>
          </View>
        </View>
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
    padding:20,
    justifyContent:'center',
    alignItems:'center',
  },
  image:{
    height:200,
    width:200,
    borderRadius:100,
  },
  contant:{
    //display:'flex',
    height:200,
    //backgroundColor:'white',
    justifyContent:'center',
    alignItems:'center',
  },
  box:{
    //width:200,
    backgroundColor:"grey",
    paddingHorizontal:30,
    paddingVertical:15,
    flexDirection:'row',
    justifyContent:'space-around',
    borderRadius:25,
    borderWidth:2,
    borderColor:'white',
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