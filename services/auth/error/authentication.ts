export enum AuthenticationErrorType {
  BiometricsNotEnabled = "BiometricsNotEnabled",
  BiometricsNotEnrolled = "BiometricsNotEnrolled",
}

export class AuthenticationError extends Error {
  type: AuthenticationErrorType;

  constructor(type: AuthenticationErrorType, message: string) {
    super(message);
    this.type = type;
    this.message = message;
    this.name = "AuthenticationError";

    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}
