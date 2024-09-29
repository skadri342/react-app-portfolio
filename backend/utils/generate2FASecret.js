import speakeasy from 'speakeasy';
import qrcode from 'qrcode';

export default function generate2FASecret(username) {
  const secret = speakeasy.generateSecret({
    name: `Your App Name (${username})`
  });

  return {
    secret: secret.base32,
    qrCode: qrcode.toDataURL(secret.otpauth_url)
  };
}