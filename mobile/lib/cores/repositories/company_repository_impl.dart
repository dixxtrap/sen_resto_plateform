import 'package:mobile/cores/model/company_response.dart';
import 'package:mobile/cores/networking/api_client.dart';
import 'package:mobile/cores/networking/api_result.dart';
import 'package:mobile/cores/networking/api_url.dart';
import 'package:mobile/cores/networking/network_exceptions.dart';
import 'package:mobile/cores/repositories/company_repository.dart';

class CompanyRepositoryImpl implements CompanyRepository {
  final ApiClient apiClient;
  CompanyRepositoryImpl(this.apiClient);
  @override
  Future<ApiResult<CompanyResponse>> companies() async {
    try {
      var json = await apiClient.get(ApiUri.COMPANY_OR_RESTAURANT_URI);

      return ApiResult.success(data: CompanyResponse.fromJson(json));
    } catch (e) {
      return ApiResult.failure(error: NetworkExceptions.getDioException(e));
    }
  }
}
