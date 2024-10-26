import 'package:mobile/cores/model/banner_response.dart';
import 'package:mobile/cores/networking/api_client.dart';
import 'package:mobile/cores/networking/api_result.dart';
import 'package:mobile/cores/networking/api_url.dart';
import 'package:mobile/cores/networking/network_exceptions.dart';
import 'package:mobile/cores/repositories/banner_repository.dart';

class BannerRepositoryImpl implements BannerRepository {
  final ApiClient apiClient;
  BannerRepositoryImpl(this.apiClient);
  @override
  Future<ApiResult<BannerResponse>> banners() async {
    try {
      var json = await apiClient.get(ApiUri.BANNER_URI);
      return ApiResult.success(data: BannerResponse.fromJson(json));
    } catch (e) {
      return ApiResult.failure(error: NetworkExceptions.getDioException(e));
    }
  }
}
