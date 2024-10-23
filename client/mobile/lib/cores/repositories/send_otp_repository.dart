import 'package:mobile/cores/model/base_response.dart';
import 'package:mobile/cores/networking/api_result.dart';

abstract class SendOtpRepository {
  Future<ApiResult<BaseResponseWs>> sendOtp(String phone);
}
