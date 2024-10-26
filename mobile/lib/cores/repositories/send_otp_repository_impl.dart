import 'package:mobile/cores/model/base_response.dart';
import 'package:mobile/cores/networking/api_client.dart';
import 'package:mobile/cores/networking/api_result.dart';
import 'package:mobile/cores/networking/api_url.dart';
import 'package:mobile/cores/networking/network_exceptions.dart';
import 'package:mobile/cores/repositories/send_otp_repository.dart';

class SendOtpRepositoryImpl implements SendOtpRepository {
  final ApiClient apiClient;
  SendOtpRepositoryImpl(this.apiClient);

  @override
  Future<ApiResult<BaseResponseWs>> sendOtp(String phone) async {
    try {
      var json = await apiClient.get('${ApiUri.SEND_OTP}/$phone');
      return ApiResult.success(data: BaseResponseWs.fromJson(json));
    } catch (e) {
      return ApiResult.failure(error: NetworkExceptions.getDioException(e));
    }
  }
}
