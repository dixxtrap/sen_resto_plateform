import 'package:mobile/cores/model/otp_verification_response.dart';
import 'package:mobile/cores/networking/api_client.dart';
import 'package:mobile/cores/networking/api_result.dart';
import 'package:mobile/cores/networking/api_url.dart';
import 'package:mobile/cores/networking/network_exceptions.dart';
import 'package:mobile/cores/repositories/otp_verification_repository.dart';

class OtpVerificationRepositoryImpl implements OtpVerificationRepository {
  final ApiClient apiClient;
  OtpVerificationRepositoryImpl(this.apiClient);
  @override
  Future<ApiResult<OtpVerificationResponse>> otpVerification(
      {required String phone, required String code}) async {
    // TODO: implement otpVerification
    try {
      var json = await apiClient
          .post(ApiUri.OTP_VERIFICATION, data: {"code": code, "to": phone});
      return ApiResult.success(data: OtpVerificationResponse.fromJson(json));
    } catch (e) {
      return ApiResult.failure(error: NetworkExceptions.getDioException(e));
    }
  }
}
