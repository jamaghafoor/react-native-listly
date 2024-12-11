import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Platform,
  } from "react-native";
  import React from "react";
  import { scale } from "react-native-size-matters";
  import Feather from "react-native-vector-icons/Feather";
  const InputField = ({
    inputref,
    error,
    placeholder,
    containerStyle,
    numberOfLines,
    keyboardType,
    eyeOffIcon,
    onChangeText,
    minLength,
    maxLength,
    height,
    multiline,
    editable,
    borderRadius,
    value,
    enablesReturnKeyAutomatically,
    onSubmitEditing,
    returnKeyType,
    onEndEditing,
    placeholderTextColor,
    marginTop,
    borderColor,
    borderWidth,
    importantForAutofill,
    padding,
    renderLeftComponent,
    secureTextEntry,
    setSecureTextEntry,
    height1,
  }) => {
    return (
      <View>
        <View
          style={{
            width: "100%",
            borderWidth: borderWidth ? borderWidth : 0.8,
            borderColor: borderColor,
            justifyContent: "center",
            marginTop: marginTop,
            flexDirection: "row",
            alignItems: "center",
            borderRadius: borderRadius,
            flexDirection: "row",
            // backgroundColor: "red",
            padding: padding,
            ...containerStyle,
          }}
        >
          <View
            style={{
              width:  25,
              height: "100%",
              justifyContent: multiline ? "flex-start": "center",
            }}
          >
            {renderLeftComponent}
          </View>
          <TextInput
            style={{
              flex: 1,
              height: height1 ? height1 : Platform.OS == "android" ? 44 : height,
              width: "100%",
              fontSize: 13,
              fontFamily: "Poppins-Regular",
              includeFontPadding: false,
              color: "black",
              verticalAlign: multiline ? "top" : "middle",
              marginTop: Platform.OS == "android" ? 2 : 0,
            }}
            autoCapitalize="none"
            ref={inputref}
            keyboardType={keyboardType}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            enablesReturnKeyAutomatically={enablesReturnKeyAutomatically}
            onChangeText={onChangeText}
            minLength={minLength}
            maxLength={maxLength}
            secureTextEntry={secureTextEntry}
            value={value}
            editable={editable}
            numberOfLines={numberOfLines}
            multiline={multiline}
            onSubmitEditing={onSubmitEditing}
            returnKeyType={returnKeyType}
            onEndEditing={onEndEditing}
            importantForAutofill={
              importantForAutofill ? importantForAutofill : "no"
            }
          />
          {eyeOffIcon && (
            <TouchableOpacity
              style={{
                paddingHorizontal: 15,
              }}
              onPress={() => setSecureTextEntry(!secureTextEntry)}
            >
              {secureTextEntry ? (
                <Feather
                  name="eye-off"
                  size={17}
                  color={"grey"}
                />
              ) : (
                <Feather
                  name="eye"
                  size={17}
                  color={"grey"}
                />
              )}
            </TouchableOpacity>
          )}
        </View>
        {error?.length > 0 ? (
          <Text color="tertiary" style={styles.error}>
            {error}
          </Text>
        ) : (
          <Text color="tertiary" style={styles.error}>
            {" "}
          </Text>
        )}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    error: {
      color: "red",
      marginLeft: scale(10),
      marginBottom: scale(10),
      fontSize: scale(10),
      fontFamily: "Poppins-Regular",
    },
  });
  export default InputField;
  