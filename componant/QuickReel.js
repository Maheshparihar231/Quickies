import {StyleSheet, TouchableOpacity} from 'react-native';
import React,{useRef,useState} from 'react';
import Animated, {
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import Video from 'react-native-video';

const QuickReel = ({route, navigation}) => {
  const data = route.params.item;
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);
    //console.log(data.video_url)
  const gesture = Gesture.Pan()
    .onUpdate(value => {
      translateX.value = value.translationX * 0.8;
      translateY.value = value.translationY * 0.8;
      const distance = Math.sqrt(
        value.translationX * value.translationX +
          value.translationY * value.translationY,
      );
      const scaleValue = Math.min(Math.max(distance / 100, 1), 0.9);
      scale.value = withTiming(scaleValue, {duration: 100});
    })
    .onEnd(() => {
      if (translateY.value > 50) {
        opacity.value = 0;
        runOnJS(navigation.goBack)();
      } else {
        translateX.value = withTiming(0, {duration: 300});
        translateY.value = withTiming(0, {duration: 300});
        scale.value = withTiming(1, {duration: 300});
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: translateX.value},
      {translateY: translateY.value},
      {scale: scale.value},
    ],
    backgroundColor: interpolateColor(
      opacity.value,
      [0, 1],
      ['transparent', 'white'],
    ),
    borderRadius: 20,
    overflow: 'hidden',
  }));
  const VideoRef = useRef(null)
  const onBuffer = buffer => {
    console.log('buffring', buffer);
  };
  const onError = error => {
    console.log('error', error);
  };
  const [longpress , setlongpress]=useState(1);
  const [showFullCaption, setShowFullCaption] = useState(false);
  const toggleCaptionVisibility = () => {
      setShowFullCaption(!showFullCaption);
  };
  const [mute, setMute] = useState(false);
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[styles.container, animatedStyle]}
        //sharedTransitionTag={id.toString()}
        >
        {/* <Animated.Image
          //sharedTransitionTag={id.toString() + '1'}
          source={{uri: uri}}
          style={styles.image}
        /> */}
        <TouchableOpacity 
          activeOpacity={0.8}
          onLongPress={()=>{setlongpress(0)}}
          onPressOut={()=>{setlongpress(1)}}
        >
        <Video
            VideoRef={VideoRef}
            onError={onError}
            onBuffer={onBuffer}
            repeat={true}
            resizeMode='cover'
            source={{uri:data.video_url}}
            style={styles.videostyle}
            rate={longpress}
        />
        </TouchableOpacity>
        <Animated.View style={styles.bottomview}>
          <Animated.View style={styles.description}>
            <TouchableOpacity 
                activeOpacity={0.8}
                onPress={toggleCaptionVisibility}
                >
                {showFullCaption ?
                    (<Animated.Text style={styles.desctext}>{data.caption}</Animated.Text>)
                    : (
                        <Animated.Text
                            numberOfLines={1}
                            ellipsizeMode='tail'
                            style={styles.desctext}>
                            {data.caption}
                        </Animated.Text>)
                }
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
        
      </Animated.View>
    </GestureDetector>
  );
};

export default QuickReel;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
  },
  videostyle:{
    height:"100%",
    width:"100%",
  },
  bottomview: {
    position: 'absolute',
    width: "100%",
    padding: 15,
    bottom: 0,
    flex: 1,
    justifyContent: 'flex-end',
    margin: 15,
  },
  description: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    marginRight: 20,
  },
  desctext: {
    color: "white",
    flex: 1
  }
});