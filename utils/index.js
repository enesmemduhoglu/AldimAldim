import * as Yup from "yup";

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required("E-posta alanı zorunludur")
    .email("Geçerli bir e-posta adresi girin")
    .label("E-posta"),
  password: Yup.string()
    .required("Şifre alanı zorunludur")
    .min(6, "Şifre en az 6 karakter olmalıdır")
    .label("Şifre"),
});

export const signupValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required("E-posta alanı zorunludur")
    .email("Geçerli bir e-posta adresi girin")
    .label("E-posta"),
  password: Yup.string()
    .required("Şifre alanı zorunludur")
    .min(6, "Şifre en az 6 karakter olmalıdır")
    .label("Şifre"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Şifreler eşleşmiyor.")
    .required("Şifre onayı gereklidir."),
});

export const passwordResetSchema = Yup.object().shape({
  email: Yup.string()
    .required("Lütfen kayıtlı bir e-posta adresi girin")
    .label("E-posta")
    .email("Geçerli bir e-posta adresi girin"),
});
