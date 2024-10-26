import 'package:mobile/cores/model/otp_verification_response.dart';
import 'package:mobile/cores/networking/api_result.dart';

abstract class OtpVerificationRepository {
  Future<ApiResult<OtpVerificationResponse>> otpVerification(
      {required String phone, required String code});
}
