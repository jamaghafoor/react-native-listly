import {
  View,
  Text,
  Modal,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import React from 'react';
import AntDesign from "react-native-vector-icons/AntDesign";
import FieldIcon3 from "react-native-vector-icons/FontAwesome";
import FieldIcon1 from "react-native-vector-icons/MaterialIcons";
import InputField from './InputField';

const TaskModal = ({
    isVisible,
    setIsVisible,
    inputData,
    setInputData,
    subjactError,
    messageError,
    vendorloading,
    onsaveData,
    setSubjectError,
    setMessageError,
}) => {

  return (
    <Modal animationType={'slide'} transparent={true} visible={isVisible}>
      <ScrollView contentContainerStyle={styles.modalContainer}>
        {/*All views of Modal*/}
        <View style={styles.modal}>
          <TouchableOpacity
            onPress={() => {
              setIsVisible(!isVisible);
              setInputData({
                title: '',
                desc: '',
                completed: false,
              })
            }}>
            <AntDesign
              name="closecircleo"
              size={20}
              color={"red"}
              style={styles.icon_close}
            />
          </TouchableOpacity>

          <View style={styles.optionTitle}>
            <Text style={styles.chooseTitle}>Add Your Goal</Text>
          </View>
          <InputField
            keyboardType="email-address"
            placeholder={`Title*`}
            placeholderTextColor={"grey"}
            importantForAutofill={'yes'}
            autoCorrect={false}
            value={inputData?.title}
            error={subjactError?.error}
            renderLeftComponent={
              <FieldIcon1
                name={'subject'}
                size={20}
                color={"grey"}
                style={{marginRight: 7}}
              />
            }
            onChangeText={value => {
              setInputData({...inputData, title: value});
              setSubjectError(null)
            }}
            onSubmitEditing={() => Keyboard.dismiss()}
            containerStyle={{
              borderWidth: 1,
              height: 45,
              padding: 10,
              borderRadius: 12,
              borderColor: subjactError?.error
                ? "red"
                : "grey",
            }}
          />

          <InputField
            keyboardType="email-address"
            placeholder={`Description*`}
            placeholderTextColor={"grey"}
            importantForAutofill={'yes'}
            autoCorrect={false}
            value={inputData?.desc}
            error={messageError?.error}
            height1={120}
            renderLeftComponent={
              <FieldIcon3
                name={'comments-o'}
                size={20}
                color={"grey"}
                style={{marginRight: 7}}
              />
            }
            onChangeText={value => {
              setInputData({...inputData, desc: value});
              setMessageError(null)
            }}
            numberOfLines={5}
            multiline={true}
            containerStyle={{
              borderWidth: 1,
              height: 120,
              padding: 10,
              borderRadius: 12,
              borderColor: messageError?.error
              ? "red"
              : "grey",
            }}
          />

         
            <TouchableOpacity
              onPress={() => {
                onsaveData();
              }}
              style={{
                backgroundColor:"#0D92F4",
                paddingVertical: 10,
                alignItems: "center",
                borderRadius: 10,
                marginBottom: 20
              }}
              >
              <Text
                style={{
                  fontSize: 16,
                  color: "white",
                  marginHorizontal: 10,
                  fontFamily: "Poppins-Medium"
                }}>
                Add Away
              </Text>
              {vendorloading && (
                <ActivityIndicator size={18} color={"white"} />
              )}
            </TouchableOpacity>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default TaskModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modal: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#fff',
    justifyContent: 'center',
    backgroundColor: "white",
    paddingHorizontal: 10,
    width: "90%",
  },
  optionTitle: {
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chooseTitle: {
    color: "#21a9ff",
    marginTop: 5,
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
  },
});
