import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { Formik } from "formik";
import { sendPasswordResetEmail } from "firebase/auth";

import { passwordResetSchema } from "../utils";
import { Colors, auth } from "../config";
import { View, TextInput, Button, FormErrorMessage } from "../components";

export const ForgotPasswordScreen = ({ navigation }) => {
  const [errorState, setErrorState] = useState("");

  const handleSendPasswordResetEmail = (values) => {
    const { email } = values;

    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("Başarılı: Şifre Sıfırlama E-postası Gönderildi.");
        navigation.navigate("Login");
      })
      .catch((error) => setErrorState(error.message));
  };

  return (
    <View isSafe style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.screenTitle}>Şifrenizi Sıfırlayın</Text>
      </View>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={passwordResetSchema}
        onSubmit={(values) => handleSendPasswordResetEmail(values)}
      >
        {({
          values,
          touched,
          errors,
          handleChange,
          handleSubmit,
          handleBlur,
        }) => (
          <>
            {/* E-posta giriş alanı */}
            <TextInput
              name="email"
              leftIconName="email"
              placeholder="E-posta adresinizi girin"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
            />
            <FormErrorMessage error={errors.email} visible={touched.email} />
            {/* Ekran hata mesajlarını göster */}
            {errorState !== "" ? (
              <FormErrorMessage error={errorState} visible={true} />
            ) : null}
            {/* Şifre Sıfırlama E-postası Gönderme butonu */}
            <Button style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>
                Şifre Sıfırlama E-postası Gönder
              </Text>
            </Button>
          </>
        )}
      </Formik>
      {/* Giriş ekranına gitme butonu */}
      <Button
        style={styles.borderlessButtonContainer}
        borderless
        title={"Giriş Ekranına Geri Dön"}
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
  },
  innercontainer: {
    alignItems: "center",
  },
  screenTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: Colors.black,
    paddingTop: 20,
    textAlign: "center",
  },
  button: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    backgroundColor: Colors.orange,
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: "700",
  },
  borderlessButtonContainer: {
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
