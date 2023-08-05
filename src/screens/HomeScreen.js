import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Features from '../components/Features';
import {dummyMessages} from '../constants/messages';
import Voice from '@react-native-community/voice';

const HomeScreen = () => {
  const [messages, setMessages] = useState(dummyMessages);
  const [recording, setRecording] = useState(false);
  const [speaking, setSpeaking] = useState(true);
  const stopSpeaking = () => {
    setSpeaking(false);
  };
  const clear = () => {
    setMessages([]);
  };
  const speechStartHandler = () => {
    console.log('Speech Started');
  };
  const speechEndHandler = () => {
    console.log('Speech ended');
  };
  const speechResultsHandler = e => {
    console.log('Voice event', e);
  };
  const speechErrorHandler = e => {
    console.log('Voice event', e);
  };
  const startRecording = async () => {
    setRecording(true);
    try {
      await Voice.start('en-US');
    } catch (err) {
      console.log(err);
    }
  };
  const stopRecording = async () => {
    setRecording(false);
    try {
      await Voice.stop();
      //fetch response
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults = speechResultsHandler;
    Voice.onSpeechError = speechErrorHandler;
    return () => {
      Voice.destroy()
        .then(Voice.removeAllListeners)
    }
  }, []);
  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1 flex mx-5">
        <View className="flex-row justify-center">
          <Image
            source={require('../../assets/images/bot.png')}
            style={{height: hp(20), width: hp(20)}}></Image>
        </View>
        {messages.length > 0 ? (
          <View className="space-y-2 flex-3">
            <Text
              style={{fontSize: wp(5)}}
              className="text-gray-700 font-semibold ml-1">
              Assistant
            </Text>
            <View
              style={{height: hp(58)}}
              className="bg-neutral-200 rounded-3xl p-4">
              <ScrollView
                bounces={false}
                showsVerticalScrollIndicator={false}
                className="space-y-4">
                {messages.map((message, index) => {
                  //check if message is from assistant or user
                  if (message.role === 'assistant') {
                    // check if message is an image or text
                    if (message.content.includes('https')) {
                      //ai image
                      return (
                        <View key={index} className="flex-row justify-start">
                          <View className="p-2 flex rounded-2xl bg-emerald-100 rounded-tl-none">
                            <Image
                              source={{uri: message.content}}
                              className="rounded-2xl"
                              resizeMode="contain"
                              style={{height: wp(60), width: wp(60)}}
                            />
                          </View>
                        </View>
                      );
                    } else {
                      //text response
                      return (
                        <View
                          key={index}
                          style={{width: wp(70)}}
                          className="bg-emerald-100 rounded-xl p-2 rounded-tl-none">
                          <Text className="text-gray-600">
                            {message.content}
                          </Text>
                        </View>
                      );
                    }
                    // if message is from user
                  } else {
                    //user input
                    return (
                      <View key={index} className="flex-row justify-end">
                        <View
                          style={{width: wp(70)}}
                          className="bg-white rounded-xl p-2 rounded-tr-none">
                          <Text className="text-gray-500">
                            {message.content}
                          </Text>
                        </View>
                      </View>
                    );
                  }
                })}
              </ScrollView>
            </View>
          </View>
        ) : (
          <Features></Features>
        )}
        {/* Recording, clear and stop buttons */}
        <View className="flex justify-center items-center">
          {recording ? (
            <TouchableOpacity onPress={stopRecording}>
              <Image
                className="rounded-full mt-6"
                source={require('../../assets/images/voiceLoading.gif')}
                style={{width: hp(10), height: hp(10)}}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={startRecording}>
              <Image
                className="rounded-full mt-6"
                source={require('../../assets/images/recordingIcon.png')}
                style={{width: hp(10), height: hp(10)}}
              />
            </TouchableOpacity>
          )}
          {messages.length > 0 && (
            <TouchableOpacity
              onPress={clear}
              className="bg-neutral-600 rounded-3xl p-2 absolute right-10 bottom-5">
              <Text className="text-white font-semibold ">Clear</Text>
            </TouchableOpacity>
          )}
          {speaking && (
            <TouchableOpacity
              onPress={stopSpeaking}
              className="bg-red-600 rounded-3xl p-2 absolute left-10 bottom-5">
              <Text className="text-white font-semibold ">Stop</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};
export default HomeScreen;
