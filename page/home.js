import {Dimensions, View, Text,StyleSheet ,Image,SafeAreaView,StatusBar,FlatList} from 'react-native'
import React,{useState} from 'react'
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import { reeldata } from '../sample_data/api';
import SingleReel from '../componant/SingleReel';
import { TouchableOpacity } from 'react-native';

const Width = Dimensions.get('window').width
const Height = Dimensions.get('window').height

const Home = ({navigation}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const handleChangeIndexValue = ({index}) => {
    setCurrentIndex(index);
    };
    return (
        <View style={styles.container}>
        <View style={styles.safearea}>
            <View style={styles.heading}>
                <Text style={styles.headingtext}>Quickies</Text>
            </View>
        </View>
        <SwiperFlatList
            vertical={true}
            onChangeIndex={handleChangeIndexValue}
            data={reeldata}
            renderItem={({item,index})=>(
            <SingleReel 
                item={item} 
                index={index}
                currentIndex={currentIndex}
                onPress = {()=>{navigation.navigate('User',{item})}}
            />
            )}
        />
        </View>
  )
}


const styles = StyleSheet.create({
    container:{
      width:Width,
      height:Height,
      backgroundColor: "grey",
      position: 'relative',
    },
    backgroundVideo: {
      position:'absolute',
      height:Height,
      width:Width,
    },
    safearea:{
      position:'absolute',
      top:10,
      margin:15,
      zIndex: 1,
    },
    heading:{},
    headingtext:{
      fontSize:25,
      fontFamily: "bold",
      color:"white",
      fontWeight:"700"
    },
    bottomview:{
      bottom:0,
      flex:1,
      justifyContent:'flex-end',
      margin:15,
    },
    userview:{
      flexDirection:'row',
      alignItems:'center'
    },
    user:{
      flexDirection:'row',
      alignItems:'center'
    },
    profileimg:{
      width:40,
      height:40,
      borderRadius:40,
    },
    usernametext:{
      marginHorizontal:10,
      fontSize:17,
      color:"white",
    },
    description:{
      flexDirection:'row',
      alignItems:'center',
      marginBottom:15,
    },
    desctext:{
      color:"white",
      flex:1
    }
  })

export default Home