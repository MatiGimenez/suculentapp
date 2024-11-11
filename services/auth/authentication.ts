import * as LocalAuthentication from "expo-local-authentication";
import { AuthenticationError, AuthenticationErrorType } from "./error";

const isBiometricsEnabled = async (): Promise<boolean> => {
  return await LocalAuthentication.hasHardwareAsync();
};

const isEnrolled = async (): Promise<boolean> => {
  return await LocalAuthentication.isEnrolledAsync();
};

export const authenticate =
  async (): Promise<LocalAuthentication.LocalAuthenticationResult> => {
    const hasBiometrics = await isBiometricsEnabled();
    if (!hasBiometrics) {
      throw new AuthenticationError(
        AuthenticationErrorType.BiometricsNotEnabled,
        "Biometrics are not enabled"
      );
    }

    const _isEnrolled = await isEnrolled();
    if (!_isEnrolled) {
      throw new AuthenticationError(
        AuthenticationErrorType.BiometricsNotEnrolled,
        "Biometrics are not enrolled"
      );
    }

    return await LocalAuthentication.authenticateAsync();
  };
