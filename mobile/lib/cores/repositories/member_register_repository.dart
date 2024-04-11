import 'package:mobile/cores/model/customer_data.dart';
import 'package:mobile/cores/networking/api_result.dart';

abstract class MemberRegisterRepository {
  Future<ApiResult<Customer>> sendOtp({String phone} );
}
