export default function (errorCode) {
  switch (errorCode) {
    case 'auth/invalid-email':
      return 'Geçersiz e-posta!';
    case 'auth/email-already-exists':
      return 'Kullanıcı halihazırda var!';
    case 'auth/user-not-found':
      return 'Böyle bir kullanıcı bulunmamaktadır!';
    case 'auth/email-already-in-use':
      return 'Kullanıcı halihazırda var!';
    case 'auth/weak-password':
      return 'Zayıf Bir şifre!';
    case 'auth/wrong-password':
      return 'Yanlış Şifre!';

    default:
      return errorCode;
  }
}
