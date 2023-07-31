import {View, Text, SafeAreaView, Image} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Features from '../components/Features';
const HomeScreen = () => {
  const [messages, setMessages] = useState([]);
  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1 flex mx-5">
        <View className="flex-row justify-center">
          <Image
            source={require('../../assets/images/bot.png')}
            style={{height: hp(25), width: hp(25)}}></Image>
        </View>
        {messages.length > 0 ? <View></View> : <Features></Features>}
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
