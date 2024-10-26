import 'package:mobile/cores/model/company_response.dart';
import 'package:mobile/cores/networking/api_result.dart';

abstract class CompanyRepository {
  Future<ApiResult<CompanyResponse>> companies();
}
