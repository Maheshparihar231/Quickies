import { StyleSheet, Text, View,Dimensions,Image, TouchableOpacity } from 'react-native'
import React,{useRef,useState} from 'react'
import Video from 'react-native-video';
import Icon from 'react-native-ionicons'
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;


const SingleReel = ({item,index,currentIndex,onPress}) => {
    const VideoRef = useRef(null)
    const onBuffer = buffer => {
        console.log('buffring', buffer);
    };
    const onError = error => {
        console.log('error', error);
    };
    const [longpress , setlongpress]=useState(1);
    const [mute, setMute] = useState(false);
    // const [like, setLike] = useState(item.isLike);
    // function handlePress{
    //     onPress
    //     setMute(true);}
    return (
    <View style={styles.videocontainer}>
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={()=>{setMute(!mute)}}
            onLongPress={()=>{setlongpress(0)}}
            onPressOut={()=>{setlongpress(1)}}
            style={styles.videotouch}
        >
            <Video
                videoRef={VideoRef}
                onBuffer={onBuffer}
                onError={onError}
                repeat={true}
                resizeMode='cover'
                paused={currentIndex==index?false:true}
                rate={longpress}
                source={{uri: item.video_url}}
                muted={mute}
                style={styles.videostyle}
                //poster={item.user.profileimg}
            />
        </TouchableOpacity>
        <Icon 
            size={mute?25:0}
            color='white'
            name="volume-mute" 
        />
        <View style={styles.bottomview}>
          <View style={styles.userview}>
            <TouchableOpacity 
            style={styles.user}
            onPress={
                onPress
            }
            activeOpacity={0.8}
            >
            <Image
              source={{uri:item.user.profileimg}}  //item.user.profileimg
              style={styles.profileimg}
            />
              <Text style={styles.usernametext}>{item.user.username}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.description}>
            <TouchableOpacity>
              <Text numberOfLines={1} style={styles.desctext}>{item.caption}</Text>
            </TouchableOpacity>
          </View>
        </View>
    </View>
    )
}

export default SingleReel

const styles = StyleSheet.create({
    videocontainer:{
        width:Width,
        height:Height,
        position:'relative',
        justifyContent:'center',
        alignItems:'center',
    },
    videotouch:{
        width:"100%",   
        height:"100%",
        position:'absolute',
    },
    videostyle:{
        width:"100%",
        height:"100%",
        position:'absolute',
    },
    bottomview:{
        position:'absolute',
        width:Width,
        padding:15,
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
        alignItems:'center',
        marginBottom:10,
    },
    profileimg:{
        width:40,
        height:40,
        borderRadius:40,
    },
    usernametext:{
        marginHorizontal:10,
        fontSize:20,
        color:"white",
    },
    description:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        marginBottom:15,
        marginRight:20,
    },
    desctext:{
        color:"white",
        flex:1
    }
})